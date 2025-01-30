<?php

require_once(__DIR__ . '/classes/external/page_api.php');
require_once(__DIR__ . '/classes/external/glossary_api.php');

/**
 * External functions for the tnadvancemanage plugin
 */
class local_tnadvancemanage_external extends \core_external\external_api {
    use \local_tnadvancemanage\external\page_api;
    use \local_tnadvancemanage\external\glossary_api;
}