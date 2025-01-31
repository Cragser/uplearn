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

defined('MOODLE_INTERNAL') || die();

$functions = [
    'local_tnadvancemanage_create_page' => [
        'classname' => 'local_tnadvancemanage\external\page_api',
        'methodname' => 'create_page',
        'description' => 'Creates a new page in a course section',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'moodle/course:manageactivities'
    ],
    'local_tnadvancemanage_create_glossary' => [
        'classname' => 'local_tnadvancemanage\external\glossary_api',
        'methodname' => 'create_glossary',
        'description' => 'Creates a new glossary in a course section',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'moodle/course:manageactivities'
    ],
    'local_tnadvancemanage_create_database' => [
        'classname' => 'local_tnadvancemanage\external\database_api',
        'methodname' => 'create_database',
        'description' => 'Creates a new database in a course section',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'moodle/course:manageactivities'
    ],
    'local_tnadvancemanage_create_quiz' => [
        'classname' => 'local_tnadvancemanage\external\quiz_api',
        'methodname' => 'create_quiz',
        'description' => 'Creates a new quiz in a course section',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'moodle/course:manageactivities'
    ]
];