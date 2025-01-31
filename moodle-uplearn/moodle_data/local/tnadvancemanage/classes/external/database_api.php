<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>..

namespace local_tnadvancemanage\external;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/externallib.php');
require_once($CFG->dirroot . '/course/modlib.php');

use external_api;
use external_function_parameters;
use external_value;
use external_single_structure;
use stdClass;
use context_course;
use external_multiple_structure;

trait database_api {
    /**
     * Returns description of method parameters
     * @return external_function_parameters
     */
    public static function create_database_parameters() {
        return new external_function_parameters(
            [
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
                'name' => new external_value(PARAM_TEXT, 'Database name'),
                'intro' => new external_value(PARAM_RAW, 'Database description'),
                'visible' => new external_value(PARAM_BOOL, 'Database visibility', VALUE_DEFAULT, true),
                'entries' => new external_multiple_structure(
                    new external_single_structure(
                        [
                            'word' => new external_value(PARAM_TEXT, 'The vocabulary word'),
                            'meaning' => new external_value(PARAM_RAW, 'The meaning of the word'),
                            'context' => new external_value(PARAM_RAW, 'The context where the word is used'),
                            'related_words' => new external_value(PARAM_TEXT, 'Related words')
                        ]
                    ),
                    'Array of entries to add to the database',
                    VALUE_DEFAULT,
                    []
                )
            ]
        );
    }

    /**
     * Create a new database in the specified course section
     *
     * @param int $courseid The course ID
     * @param int $sectionid The section ID
     * @param string $name The database name
     * @param string $intro The database description
     * @param bool $visible Database visibility
     * @param array $entries Array of database entries
     * @return array created database details
     */
    public static function create_database($courseid, $sectionid, $name, $intro, $visible = true, $entries = []) {
        global $CFG, $DB, $USER;

        $params = self::validate_parameters(
            self::create_database_parameters(),
            [
                'courseid' => $courseid,
                'sectionid' => $sectionid,
                'name' => $name,
                'intro' => $intro,
                'visible' => $visible,
                'entries' => $entries
            ]
        );

        // Check course exists
        $course = $DB->get_record('course', ['id' => $params['courseid']], '*', MUST_EXIST);
        $context = context_course::instance($course->id);
        self::validate_context($context);

        // Check capabilities
        require_capability('moodle/course:manageactivities', $context);

        // Verify section exists in the course and get section number
        $section = $DB->get_record('course_sections',
                                ['id' => $params['sectionid'], 'course' => $course->id],
                                'section, id',
                                MUST_EXIST
        );
        $sectionnum = $section->section;
        
        // Prepare database data
        $moduleinfo = new stdClass();
        $moduleinfo->course = $course->id;
        $moduleinfo->section = $sectionnum;
        $moduleinfo->module = $DB->get_field('modules', 'id', ['name' => 'data']);
        $moduleinfo->name = $params['name'];
        $moduleinfo->intro = $params['intro'];
        $moduleinfo->introformat = FORMAT_HTML;
        $moduleinfo->visible = $params['visible'];
        $moduleinfo->visibleoncoursepage = 1;
        $moduleinfo->cmidnumber = '';
        $moduleinfo->modulename = 'data';
        $moduleinfo->coursemodule = 0;
        $moduleinfo->add = 'data';
        $moduleinfo->return = 0;
        $moduleinfo->sr = 0;

        // Set required format parameters
        $moduleinfo->assessed = 0;
        $moduleinfo->scale = 0;
        $moduleinfo->assesstimestart = 0;
        $moduleinfo->assesstimefinish = 0;
        $moduleinfo->comments = 0;
        $moduleinfo->timeavailablefrom = 0;
        $moduleinfo->timeavailableto = 0;
        $moduleinfo->timeviewfrom = 0;
        $moduleinfo->timeviewto = 0;
        $moduleinfo->requiredentries = 0;
        $moduleinfo->requiredentriestoview = 0;
        $moduleinfo->maxentries = 0;
        $moduleinfo->rssarticles = 0;
        $moduleinfo->singletemplate = '';
        $moduleinfo->listtemplate = '';
        $moduleinfo->listtemplateheader = '';
        $moduleinfo->listtemplatefooter = '';
        $moduleinfo->addtemplate = '';
        $moduleinfo->rsstemplate = '';
        $moduleinfo->csstemplate = '';
        $moduleinfo->jstemplate = '';
        $moduleinfo->asearchtemplate = '';
        $moduleinfo->approval = 0;

        // Create the database
        $cmid = add_moduleinfo($moduleinfo, $course);

        // Add the fields
        $fields = [
            ['name' => 'word', 'type' => 'text', 'required' => 1],
            ['name' => 'meaning', 'type' => 'textarea', 'required' => 1],
            ['name' => 'context', 'type' => 'textarea', 'required' => 0],
            ['name' => 'related_words', 'type' => 'text', 'required' => 0]
        ];

        foreach ($fields as $field) {
            $fieldobj = new stdClass();
            $fieldobj->dataid = $cmid->instance;
            $fieldobj->type = $field['type'];
            $fieldobj->name = $field['name'];
            $fieldobj->description = '';
            $fieldobj->required = $field['required'];
            $fieldid = $DB->insert_record('data_fields', $fieldobj);

            // Store the field id for later use
            $fieldids[$field['name']] = $fieldid;
        }

        // Add the entries if provided
        if (!empty($params['entries'])) {
            foreach ($params['entries'] as $entry) {
                $recordobj = new stdClass();
                $recordobj->dataid = $cmid->instance;
                $recordobj->userid = $USER->id;
                $recordobj->groupid = 0;
                $recordobj->timecreated = time();
                $recordobj->timemodified = $recordobj->timecreated;
                $recordid = $DB->insert_record('data_records', $recordobj);

                foreach ($entry as $fieldname => $value) {
                    $contentobj = new stdClass();
                    $contentobj->recordid = $recordid;
                    $contentobj->fieldid = $fieldids[$fieldname];
                    $contentobj->content = $value;
                    $DB->insert_record('data_content', $contentobj);
                }
            }
        }

        return [
            'id' => $cmid->id,
            'courseid' => $course->id,
            'name' => $params['name'],
            'sectionid' => $section->id,
        ];
    }

    /**
     * Returns description of method result value
     * @return external_single_structure
     */
    public static function create_database_returns() {
        return new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'Database course module ID'),
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'name' => new external_value(PARAM_TEXT, 'Database name'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
            ]
        );
    }
}