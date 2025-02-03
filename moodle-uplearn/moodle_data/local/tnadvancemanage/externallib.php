<?php

require_once($CFG->dirroot . '/local/tnadvancemanage/classes/external/page_api.php');
require_once($CFG->dirroot . '/local/tnadvancemanage/classes/external/glossary_api.php');
require_once($CFG->dirroot . '/local/tnadvancemanage/classes/external/database_api.php');
require_once($CFG->dirroot . '/local/tnadvancemanage/classes/external/quiz_api.php');

/**
 * External functions for the tnadvancemanage plugin
 */
class local_tnadvancemanage_external extends \core_external\external_api {
    use \local_tnadvancemanage\external\page_api;
    use \local_tnadvancemanage\external\glossary_api;
    use \local_tnadvancemanage\external\database_api;
    use \local_tnadvancemanage\external\quiz_api;
}