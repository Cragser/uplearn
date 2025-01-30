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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

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

trait glossary_api {
    /**
     * Returns description of method parameters
     * @return external_function_parameters
     */
    public static function create_glossary_parameters() {
        return new external_function_parameters(
            [
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
                'name' => new external_value(PARAM_TEXT, 'Glossary name'),
                'intro' => new external_value(PARAM_RAW, 'Glossary description'),
                'visible' => new external_value(PARAM_BOOL, 'Glossary visibility', VALUE_DEFAULT, true),
                'terms' => new external_multiple_structure(
                    new external_single_structure(
                        [
                            'concept' => new external_value(PARAM_TEXT, 'The glossary term'),
                            'definition' => new external_value(PARAM_RAW, 'The definition of the term')
                        ]
                    ),
                    'Array of terms to add to the glossary',
                    VALUE_DEFAULT,
                    []
                )
            ]
        );
    }

    /**
     * Create a new glossary in the specified course section
     *
     * @param int $courseid The course ID
     * @param int $sectionid The section ID
     * @param string $name The glossary name
     * @param string $intro The glossary description
     * @param bool $visible Glossary visibility
     * @return array created glossary details
     */
    public static function create_glossary($courseid, $sectionid, $name, $intro, $visible = true, $terms = []) {
        global $CFG, $DB, $USER;

        $params = self::validate_parameters(
            self::create_glossary_parameters(),
            [
                'courseid' => $courseid,
                'sectionid' => $sectionid,
                'name' => $name,
                'intro' => $intro,
                'visible' => $visible,
                'terms' => $terms
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
        
        // Prepare glossary data
        $moduleinfo = new stdClass();
        $moduleinfo->course = $course->id;
        $moduleinfo->section = $sectionnum;
        $moduleinfo->module = $DB->get_field('modules', 'id', ['name' => 'glossary']);
        $moduleinfo->name = $params['name'];
        $moduleinfo->intro = $params['intro'];
        $moduleinfo->introformat = FORMAT_HTML;
        $moduleinfo->visible = $params['visible'];
        $moduleinfo->visibleoncoursepage = 1;
        $moduleinfo->cmidnumber = '';
        $moduleinfo->modulename = 'glossary';
        $moduleinfo->coursemodule = 0;
        $moduleinfo->add = 'glossary';
        $moduleinfo->return = 0;
        $moduleinfo->sr = 0;
        // Set required format parameters
        $moduleinfo->mainglossary = 1;
        $moduleinfo->showspecial = 1;
        $moduleinfo->showalphabet = 1;
        $moduleinfo->showall = 1;
        $moduleinfo->allowduplicatedentries = 0;
        $moduleinfo->defaultapproval = 1;
        $moduleinfo->globalglossary = 0;
        $moduleinfo->entbypage = 10;
        $moduleinfo->displayformat = 'dictionary';
        $moduleinfo->assessed = 0;
        $moduleinfo->assesstimestart = 0;
        $moduleinfo->assesstimefinish = 0;
        $moduleinfo->scale = 0;
        $moduleinfo->rsstype = 0;
        $moduleinfo->rssarticles = 0;
        $moduleinfo->grade = 0;

        // Create the glossary
        $cmid = add_moduleinfo($moduleinfo, $course);

        // Add the terms if provided
        if (!empty($params['terms'])) {
            foreach ($params['terms'] as $term) {
                $entry = new stdClass();
                $entry->glossaryid = $cmid->instance;
                $entry->concept = $term['concept'];
                $entry->definition = $term['definition'];
                $entry->definitionformat = FORMAT_HTML;
                $entry->userid = $USER->id;
                $entry->timecreated = time();
                $entry->timemodified = $entry->timecreated;
                $entry->approved = 1;

                $DB->insert_record('glossary_entries', $entry);
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
    public static function create_glossary_returns() {
        return new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'Glossary course module ID'),
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'name' => new external_value(PARAM_TEXT, 'Glossary name'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
            ]
        );
    }
}