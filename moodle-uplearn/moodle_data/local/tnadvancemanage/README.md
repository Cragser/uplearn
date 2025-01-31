Tech9 WebService Advance Manage (tnadvancemanage)
====================================================

This local plugin allows you to manage a moodle course via REST API.

# Development process

## Section Management and API Exposure
Goal of this development was to create a plugin that exposes the most relevant entities, optimizing integration and enabling more robust operations.

---

## Page API

Our current implementation of the **Page API** offers an efficient and straightforward solution for creating pages in Moodle. Key features include:

### Current Implementation (page_api.php)

1. **Simplified Structure**
   - Unified interface for creating pages in specific sections.
   - Integrated validation of parameters, permissions, and context.
   - Automatic handling of module configuration, reducing client complexity.

2. **Data Management**
   - Robust validation of course and section.
   - Granular control over visibility and module state.
   - Direct integration with Moodle's module system for immediate configuration.

3. **Technical Advantages**
   - Atomic operation for page creation, reducing the risk of inconsistencies.
   - Exhaustive validation of capabilities and context, enhancing security.
   - Structured data return that simplifies API consumption.

### Alternatives in Moodle 4-4.5

1. **Core Module API**
   - Requires multiple calls to configure the module.
   - Higher complexity in parameter management and validations.
   - Additional code is needed for secure integration.

2. **Standard Web Services**
   - Uses the *mod_page_create_page* service but is limited in configuration options.
   - Multiple calls are needed to achieve full configuration.

3. **Course Module API**
   - Offers greater flexibility, but is low-level and requires more implementation code.

### Advantages of Our Implementation

- **Efficiency**
  - Simplifies client code and reduces database calls.
  - Enables atomic operations that ensure data integrity.

- **Maintainability**
  - Organized and well-documented code with clear separation of concerns.
  - Easy to extend and adapt for future changes.

- **Reliability**
  - Comprehensive validation of parameters and permissions.
  - Consistent error handling and assurance of configuration integrity.

---

## Glossary API

The current implementation of the **Glossary API** provides robust functionality for creating glossaries, characterized by:

1. **Key Capabilities**
   - Creation of glossaries in specific course sections.
   - Support for terms and definitions in HTML format, enabling rich content.
   - Detailed control over glossary visibility.
   - Ability to mass-create terms in a single operation, streamlining the process.

### Alternatives in Moodle 4.5

1. **Core Web Services**
   - Uses the *mod_glossary_add_entry* API to add entries individually.
   - Does not support the complete atomic creation of a glossary.

2. **External Services**
   - Allows registration of custom external services, offering greater flexibility but requiring more complex configuration.

3. **Native REST API**
   - Provides predefined endpoints for basic operations, though with less control over the complete data structure.

### Advantages of Our Implementation

- **Atomic Operation**
  - Enables simultaneous creation of the glossary and its terms, reducing potential errors.
  
- **Advanced Control**
  - Greater control over configuration and input validation.
  - Better error handling and consistency in validations.

---

## Database API

The current implementation of the **Database API** in Moodle 4 offers a balance between usability, flexibility, and security:

1. **Main Features**
   - Support for multiple field types (text, number, date, file, etc.).
   - Template system for record visualization.
   - Granular permission control at both the database and record levels.
   - Data export and import functionalities.
   - Support for presets and predefined templates that simplify configuration.

2. **Integration with Web Services**
   - External API documented in *mod_data_external*.
   - Endpoints for CRUD operations (create, read, update, delete) on records.
   - Support for complex queries and data filtering.
   - Integrated permission validation for each operation.

3. **Security and Validation**
   - Strict validation of data types and formats.
   - Access control based on user capabilities.
   - Input and output sanitization to prevent vulnerabilities such as XSS.

### Alternatives in Moodle 4

1. **Core Database API**
   - Direct access through the global `$DB` variable, offering higher performance but lower abstraction.
   - Requires more custom code for validations.

2. **External Services**
   - Allows the creation of custom web services for greater flexibility, although with more complex configuration.

3. **Table API**
   - Designed for dynamic HTML table creation, useful for visualization but limited in functionality compared to the Database API.

### Balance of the Current Implementation

- **Ease of Use vs. Flexibility**
  - The API offers simple usage without sacrificing advanced functionalities.
  
- **Security vs. Performance**
  - Security and data validation are prioritized without significantly impacting performance.
  
- **Functionality vs. Complexity**
  - Provides a robust set of features without requiring overly complex implementations.

---

## Quiz API

The current implementation of the **Quiz API** offers significant advantages compared to alternatives in Moodle 4-4.5:

### Current Implementation (quiz_api.php)

1. **Simplified Structure**
   - Unified interface for creating quizzes and questions in a single operation.
   - Automatic handling of the complex relationships between entities, simplifying the process for the client.
   - Abstraction of the inherent complexity in Moodle's table structure.

2. **Data Management**
   - Atomic creation of quizzes, questions, and associated relationships.
   - Efficient management of question categories, including creation or retrieval of the appropriate category.
   - Precise control over question versions and states, ensuring the correct version is used.

3. **Technical Advantages**
   - Reduction in the number of database operations, optimizing performance.
   - Improved transaction management and atomic operations that ensure data integrity.
   - Granular control of module context, ensuring proper assignment of permissions and validations.

### Alternatives in Moodle 4-4.5

1. **Core Quiz API**
   - Requires multiple separate calls to create quizzes and questions.
   - Higher complexity in managing indirect relationships and table dependencies.
   - Manual management of question versions and states is needed.

2. **Standard Web Services**
   - Limited to basic operations, with no support for bulk creation or integration of complex relationships.
   - Requires multiple endpoints to achieve complete functionality.

3. **Question Engine API**
   - Focused on the question engine, without handling complete quiz creation.
   - Additional code is required to integrate quiz creation and question association.

### Advantages of Our Implementation

- **Efficiency**
  - Simplifies client code and minimizes database operations.
  - Optimizes performance through atomic operations and improved transaction management.

- **Maintainability**
  - Clean, modular code with clear separation of concerns.
  - Facilitates future updates and modifications without impacting overall structure.

- **Reliability**
  - Integrated validation of parameters, question versions, and states.
  - Consistent error handling and assurance of data integrity in relationships.

### Data Structure Analysis

It is essential to note that **there is no direct connection between the Quiz and Questions tables**. Instead, they are managed through multiple intermediary relationships:

- **Involved Tables**
  - **QuizSlots:** Defines the position and page where questions are inserted within the quiz.
  - **QuizSections:** Allows the organization of questions into sections if necessary.
  - **QuestionReferences:** Associates each quiz slot with an entry in the question bank.
  - **QuestionBankEntries:** Connects each question to a specific category.
  - **QuestionVersions:** Manages the versions of questions, allowing selection of the correct version (e.g., the latest non-draft version).
  - **QuestionCategories:** Defines the classification of questions.
  - **QuestionSetReferences:** Manages references for random questions and their filters.
  - **QuestionQuestions:** Finally, links the question version to the question itself.

- **Key Aspects**
  - The **joining of multiple tables** using `LEFT JOIN` and functions like `COALESCE` in the SQL query allows handling cases where some relationships may not exist.
  - A preliminary analysis of the main tables was conducted to understand the values and contexts, facilitating validation and data management in our implementation.
  - Although complex, this design provides great **flexibility** and robustness in managing quizzes, for both fixed and random questions.

#### Example SQL Query

```sql
SELECT
    slot.slot,
    slot.id AS slotid,
    slot.page,
    slot.displaynumber,

    /* Verification of main references */
    CASE WHEN qr.id IS NULL THEN 'No' ELSE 'Yes' END AS has_assigned_question,
    CASE WHEN qsr.id IS NULL THEN 'No' ELSE 'Yes' END AS has_random_questions,

    /* Validation of versions and status */
    COALESCE(CAST(qv.status AS TEXT), 'NULL') AS version_status,
    COALESCE(CAST(qv.version AS TEXT), 'NULL') AS version_number,

    /* Critical identification fields */
    COALESCE(CAST(q.id AS TEXT), 'NULL') AS questionid,
    COALESCE(CAST(qbe.id AS TEXT), 'NULL') AS questionbankentryid,
    COALESCE(CAST(qc.id AS TEXT), 'NULL') AS questioncategory,

    /* Contexts and relationships */
    COALESCE(CAST(qr.usingcontextid AS TEXT), 'NULL') AS reference_context,
    COALESCE(CAST(qc.contextid AS TEXT), 'NULL') AS category_context,

    /* Validation of key parameters */
    COALESCE(qsr.filtercondition, 'NULL') AS random_filter,
    COALESCE(CAST(slot.maxmark AS TEXT), 'NULL') AS max_grade

FROM mdl_quiz_slots slot

/* Verification of direct questions */
LEFT JOIN mdl_question_references qr
    ON qr.usingcontextid = :quizcontextid
    AND qr.component = 'mod_quiz'
    AND qr.questionarea = 'slot'
    AND qr.itemid = slot.id

/* Detection of entries in the question bank */
LEFT JOIN mdl_question_bank_entries qbe
    ON qbe.id = qr.questionbankentryid

/* Key change: Replacing parameter with literal value 'draft' */
LEFT JOIN (
    SELECT
        lv.questionbankentryid,
        MAX(CASE WHEN lv.status <> 'draft' THEN lv.version END) AS usableversion,  -- Fixed literal
        MAX(lv.version) AS anyversion
    FROM mdl_quiz_slots lslot
    JOIN mdl_question_references lqr
        ON lqr.usingcontextid = :quizcontextid2
        AND lqr.component = 'mod_quiz'
        AND lqr.questionarea = 'slot'
        AND lqr.itemid = lslot.id
    JOIN mdl_question_versions lv
        ON lv.questionbankentryid = lqr.questionbankentryid
    WHERE lslot.quizid = :quizid2
    AND lqr.version IS NULL
    GROUP BY lv.questionbankentryid
) latestversions ON latestversions.questionbankentryid = qr.questionbankentryid

LEFT JOIN mdl_question_versions qv
    ON qv.questionbankentryid = qbe.id
    AND qv.version = COALESCE(
        qr.version,
        latestversions.usableversion,
        latestversions.anyversion
    )

LEFT JOIN mdl_question_categories qc
    ON qc.id = qbe.questioncategoryid

LEFT JOIN mdl_question q
    ON q.id = qv.questionid

LEFT JOIN mdl_question_set_references qsr
    ON qsr.usingcontextid = :quizcontextid3
    AND qsr.component = 'mod_quiz'
    AND qsr.questionarea = 'slot'
    AND qsr.itemid = slot.id

WHERE
    slot.quizid = :quizid
ORDER BY slot.slot;
```

> [!NOTE]
> The above query illustrates the handling of versions and the verification of whether questions are assigned or random in the quiz, showing how data from various tables is joined to obtain a consolidated view.