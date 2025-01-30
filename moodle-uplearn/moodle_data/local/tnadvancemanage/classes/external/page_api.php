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

trait page_api {
    /**
     * Returns description of method parameters
     * @return external_function_parameters
     */
    public static function create_page_parameters() {
        return new external_function_parameters(
            [
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
                'name' => new external_value(PARAM_TEXT, 'Page name'),
                'content' => new external_value(PARAM_RAW, 'Page content'),
                'visible' => new external_value(PARAM_BOOL, 'Page visibility', VALUE_DEFAULT, true)
            ]
        );
    }

    /**
     * Create a new page in the specified course section
     *
     * @param int $courseid The course ID
     * @param int $sectionid The section ID
     * @param string $name The page name
     * @param string $content The page content
     * @param bool $visible Page visibility
     * @return array created page details
     */
    public static function create_page($courseid, $sectionid, $name, $content, $visible = true) {
        global $CFG, $DB;

        $params = self::validate_parameters(
            self::create_page_parameters(),
            [
                'courseid' => $courseid,
                'sectionid' => $sectionid,
                'name' => $name,
                'content' => $content,
                'visible' => $visible
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
        
        // Prepare page data
        $moduleinfo = new stdClass();
        $moduleinfo->course = $course->id;
        $moduleinfo->section = $sectionnum;
        $moduleinfo->module = $DB->get_field('modules', 'id', ['name' => 'page']);
        $moduleinfo->name = $params['name'];
        $moduleinfo->intro = '';
        $moduleinfo->introformat = FORMAT_HTML;
        $moduleinfo->content = $params['content'];
        $moduleinfo->contentformat = FORMAT_HTML;
        $moduleinfo->visible = $params['visible'];
        $moduleinfo->visibleoncoursepage = 1;
        $moduleinfo->cmidnumber = '';
        $moduleinfo->modulename = 'page';
        #- Added`coursemodule = 0` to properly initialize the course module
        #- Added`add = 'page'` to specify the module type
        #- Added`return = 0` to prevent unnecessary redirects
        #- Added`sr = 0` for section return parameter
        $moduleinfo->coursemodule = 0;
        $moduleinfo->add = 'page';
        $moduleinfo->return = 0;
        $moduleinfo->sr = 0;


        // Create the page
        $cmid = add_moduleinfo($moduleinfo, $course);

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
    public static function create_page_returns() {
        return new external_single_structure(
            [
                'id' => new external_value(PARAM_INT, 'Page course module ID'),
                'courseid' => new external_value(PARAM_INT, 'Course ID'),
                'name' => new external_value(PARAM_TEXT, 'Page name'),
                'sectionid' => new external_value(PARAM_INT, 'Section ID'),
            ]
        );
    }
}