<?php
namespace local_tnadvancemanage\external;

// This file is part of Moodle - http://moodle.org/
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

define('QUIZ_REVIEW_IMMEDIATELY', 0x10000);

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/lib.php');
require_once($CFG->dirroot . '/mod/quiz/lib.php');
require_once($CFG->dirroot . '/mod/quiz/locallib.php');
require_once($CFG->dirroot . '/question/engine/lib.php');
require_once($CFG->dirroot . '/question/type/multichoice/question.php');
// /Users/cragser/InternalProjects/uplearn/moodle-uplearn/moodle_data/lib/questionlib.php
require_once($CFG->dirroot . '/lib/questionlib.php');
require_once($CFG->dirroot . '/lib/accesslib.php');       // Access control
// functions.
// require_once($CFG->libdir.'/formslib.php');

use external_function_parameters;
use external_value;
use external_single_structure;
use external_multiple_structure;
use stdClass;
use context_course;
use context_module;
use core_question\local\bank\question_version_status;
use question_answer;

/**
 * External function for creating quiz activities with multiple choice questions
 */
trait quiz_api {

  /**
   * Returns description of create_quiz parameters
   *
   * @return external_function_parameters
   */
  public static function create_quiz_parameters() {
    return new external_function_parameters(
      [
        'courseid' => new external_value(PARAM_INT, 'Course ID'),
        'sectionid' => new external_value(PARAM_INT, 'Section ID'),
        'name' => new external_value(PARAM_TEXT, 'Quiz name'),
        'questions' => new external_multiple_structure(
          new external_single_structure(
            [
              'question' => new external_value(PARAM_TEXT, 'Question text'),
              'options' => new external_multiple_structure(
                new external_value(PARAM_TEXT, 'Answer option')
              ),
              'answer' => new external_value(PARAM_TEXT, 'Correct answer')
            ]
          )
        )
      ]
    );
  }
  
  /**
   * Creates a new quiz activity with multiple choice questions
   *
   * @param int $courseid The ID of the course
   * @param int $sectionid The section ID
   * @param string $name The name of the quiz
   * @param array $questions Array of question data
   * @return array created quiz information
   */
  public static function create_quiz($courseid, $sectionid, $name, $questions) {
    global $DB, $CFG;

    // Validate parameters
    $params = self::validate_parameters(self::create_quiz_parameters(),
                                        [
                                          'courseid' => $courseid,
                                          'sectionid' => $sectionid,
                                          'name' => $name,
                                          'questions' => $questions
                                        ] 
    );

    $course = $DB->get_record('course', ['id' => $params['courseid']], '*', MUST_EXIST);
    $context = context_course::instance($course->id);
    self::validate_context($context);
    
    $course = $DB->get_record('course', ['id' => $params['courseid']], '*', MUST_EXIST);

    // Check capability
    require_capability('moodle/course:manageactivities', $context);

    // Verify that section exists and get section number
    $section = $DB->get_record(
      'course_sections',
      ['id' => $params['sectionid'], 'course' => $course->id],
      'section, id',
      MUST_EXIST
    );
    $sectionNum = $section->section;

    /**
     * To understand the order in which you should add entities to the Moodle database for handling quizzes,
     * we must consider the structure and relationships between:
     *
     * 1. question_categories
     *
     * A category must be created before adding questions, as all questions belong to a category.
     * A contextid is required, which defines the course or module to which the category belongs.
     *
     * 2. question
     *
     * Each question must be assigned to a category.
     * It also has a contextid, which must match the one in question_categories.
     *
     * 3. quiz
     *
     * A quiz is the container for questions.
     * It is linked to a course, and its configuration is stored in this table.
     *
     * 4. quiz_slots
     *
     * Links questions to a quiz.
     * Stores the questionid and quizid, along with details such as the page it will appear on and its order.
     *
     * 5. quiz_sections (Optional)
     *
     * If you use sections in the quiz, you must define them before assigning quiz_slots to them.
     */


    $categoryName = \local_tnadvancemanage\util\question_category
      ::get_question_category();
    $questionCategory = self::get_or_create_question_category($categoryName, $context);
    
    // create quiz
    $quiz = self::create_local_quiz($course, $params['name'], $sectionNum);
    
    // for each question in the quiz, create question_bank_entry and question_references
    $counter = 1;
 
    foreach ($params['questions'] as $question) {
      $questionBankEntryId = self::create_question_bank_entry($questionCategory->id);
      $questionId = self::create_question($question);

      // create version to conect questionId and questionBankEntryId
      self::create_question_version($questionBankEntryId, $questionId);
        
        // create quiz_slot
        $quizSlotId = self::create_quiz_slots($quiz->id, $counter++);
        
      // save quiz slot reference
      // create question_reference to connect questionBankEntryId and quiz_slotId
      self::create_question_references(
        $quiz->courseModuleId,
        $questionBankEntryId, 
        $quizSlotId
      );
    }

    return [
      'id' =>$quiz->id, 
      'courseid' => $course->id,
      'name' => $params['name'],
      'sectionid' => $section->id
    ];
  }
 

  private static function create_local_quiz(
    $course,
    $quizName,
    $sectionNum
  ) {
    global $DB, $USER;
    $moduleInfo = new stdClass();
    $moduleInfo->course = $course->id;
    $moduleInfo->name = $quizName;
    $moduleInfo->intro = 'The perfect name';
    $moduleInfo->introformat = FORMAT_HTML;
    $moduleInfo->section = $sectionNum;
    $moduleInfo->module = $DB->get_field('modules', 'id', ['name' => 'quiz']);
    $moduleInfo->modulename = 'quiz';
    $moduleInfo->visible = true;
    $moduleInfo->visibleoncoursepage = true;
    $moduleInfo->cmidnumber = '';
    $moduleInfo->coursemodule = 0;
    $moduleInfo->add = 'quiz';
    $moduleInfo->return = 0;
    $moduleInfo->sr = 0;
    $moduleInfo->quizpassword = '';
 
    // Add the module
    $cmid = add_moduleinfo($moduleInfo, $course);
    $courseModuleId = $cmid->coursemodule;
    $quizContext = context_module::instance($courseModuleId);
    // Get the newly created quiz
    $quiz = $DB->get_record('quiz', ['id' => $cmid->instance], '*', MUST_EXIST);

    $quiz->courseModuleId = $quizContext->id; 
    return $quiz;
  }
  
  private static function create_quiz_slots(int $quizId, int $slotSpace): 
  int {
    global $DB;

    $slot = new stdClass();
    $slot->quizid = $quizId;
    $slot->page = 1;
    $slot->displaynumber = '';
    $slot->requireprevious = 0;
    $slot->slot = $slotSpace;
    $response =  $DB->insert_record('quiz_slots', $slot);
    return $response;
  }
  

  /**
   * Creates a question
   *
   * @param array $questionData Question data
   * @param int $categoryId Category ID
   * @param int $bankEntryId Bank entry ID
   * @param int $versionId Version ID
   * @return int Created question ID
   */
  private static function create_question( $questionData): int {
    global $DB, $USER;

    $question = new stdClass();
    // $question->category = $categoryId;
    $question->parent = 0;
    $question->name = $questionData['question'];
    $question->questiontext = $questionData['question'];
    $question->questiontextformat = FORMAT_HTML;
    $question->questiongrade = 0;
    $question->generalfeedback = "No feedback";
    $question->generalfeedbackformat = FORMAT_HTML;
    $question->penalty = 0.3333333;
    $question->qtype = 'multichoice';
    $question->length = 1;
    $question->hidden = 0;
    $question->timemodified = time();
    $question->createdby = $USER->id;
    $question->modifiedby = $USER->id;

    return  $DB->insert_record('question', $question);

  }

  /**
   * Creates a question bank entry
   *
   * @param int $categoryId Question category ID
   * @return int Created question bank entry ID
   */
  private static function create_question_bank_entry(int $categoryId): int {
    global $DB, $USER;
    
    $entry = new stdClass();
    $entry->questioncategoryid = $categoryId;
    $entry->idnumber = null;
    $entry->ownerid = $USER->id;
    $entry->createdby = $USER->id;
    $entry->modifiedby = $USER->id;
    $entry->timecreated = time();
    $entry->timemodified = time();

    return $DB->insert_record('question_bank_entries', $entry);
  }

  /**
   * Creates a question version
   *
   * @param int $bankEntryId Question bank entry ID
   * @return int Created version ID
   */
  private static function create_question_version(int $bankEntryId, int $questionId): int {
    global $DB;

    $version = new stdClass();
    $version->questionbankentryid = $bankEntryId;
    $version->questionid = $questionId;
    $version->version = 1;
    $version->status = question_version_status::QUESTION_STATUS_READY;

    return $DB->insert_record('question_versions', $version);
  }

  private static function create_question_references(
    int $contextId,
    int $questionBankEntryId, 
    int $quizSlotId
  ): int {
    global $DB;
    
    $reference = new stdClass();
    // Temporal fix. We should use context->id. But we are using
    // context->instance
    $reference->usingcontextid = $contextId;
    $reference->component = 'mod_quiz';
    $reference->questionarea = 'slot';
    $reference->itemid = $quizSlotId;
    $reference->questionbankentryid = $questionBankEntryId;
    $reference->version = null;
    $response = $DB->insert_record('question_references', $reference);
    return $response;
  }

  /**
   * Creates question options
   *
   * @param int $questionId Question ID
   * @return int Created options ID
   */
  private static function create_question_options(int $questionId): int {
    global $DB;

    $options = new stdClass();
    $options->questionid = $questionId;
    $options->single = 1;
    $options->shuffleanswers = 1;
    $options->correctfeedback = '';
    $options->correctfeedbackformat = FORMAT_HTML;
    $options->partiallycorrectfeedback = '';
    $options->partiallycorrectfeedbackformat = FORMAT_HTML;
    $options->incorrectfeedback = '';
    $options->incorrectfeedbackformat = FORMAT_HTML;
    $options->answernumbering = 'abc';
    $options->shownumcorrect = 0;

    return $DB->insert_record('qtype_multichoice_options', $options);
  }

  /**
   * Creates question answers
   *
   * @param int $questionId Question ID
   * @param array $options Answer options
   * @param string $correctAnswer Correct answer
   * @return array Array of created answer IDs
   */
  private static function create_question_answers(int $questionId, array $options, string $correctAnswer): array {
    global $DB;

    $answerIds = [];
    foreach($options as $option) {
      $answer = new stdClass();
      $answer->question = $questionId;
      $answer->answer = $option;
      $answer->answerformat = FORMAT_HTML;
      $answer->fraction = ($option === $correctAnswer) ? 1 : 0;
      $answer->feedback = '';
      $answer->feedbackformat = FORMAT_HTML;

      $answerIds[] = $DB->insert_record('question_answers', $answer);
    }

    return $answerIds;
  }

  /**
   * Links questions to a quiz
   *
   * @param int $quizId The quiz ID
   * @param array $questionIds Array of question IDs
   */
  private static function add_questions_to_quiz($quizId, $questionIds) {
    global $DB;

    // Get quiz
    $quiz = $DB->get_record('quiz', ['id' => $quizId], '*', MUST_EXIST);

    $slot = 1;
    foreach ($questionIds as $questionId) {
      // Create quiz_slots record
      $quizSlot = new stdClass();
      $quizSlot->slot = $slot;
      $quizSlot->quizid = $quizId;
      $quizSlot->page = 1;
      $quizSlot->requireprevious = 0;
      $quizSlot->maxmark = 1;
      $quizSlot->questionid = $questionId;
      $DB->insert_record('quiz_slots', $quizSlot);

      $slot++;
    }
  }

  /**
   * Gets or creates a question category for the quiz
   *
   * @input name
   * @return object The question category
   */
  private static function get_or_create_question_category($name, $context) {
    global $DB;


    $category = $DB->get_record('question_categories', [
      'name' => $name,
      'contextid' => $context->id
    ]);

    if (!$category) {
      $category = new stdClass();
      $category->name = $name;
      $category->contextid = $context->id;
      $category->info = 'The default category for questions shared in quiz context.';
      $category->infoformat = FORMAT_HTML;
      $category->stamp = make_unique_id_code();
      $category->parent = 0;
      $category->sortorder = 999; 
      $category->id = $DB->insert_record('question_categories', $category);
    }
    return $category;
  }


  /**
   * Returns description of create_quiz returns
   *
   * @return external_single_structure
   */
  public static function create_quiz_returns() {
    return new external_single_structure(
      [
        'id' => new external_value(PARAM_INT, 'Quiz instance ID'),
        'courseid' => new external_value(PARAM_INT, 'Course ID'),
        'name' => new external_value(PARAM_TEXT, 'Quiz name'),
        'sectionid' => new external_value(PARAM_INT, 'Section ID')
      ]
    );
  }
}
