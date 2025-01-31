# Problemas

## Manejo de Secciones y Exposición de la API

- Para gestionar las secciones, fue necesario instalar un plugin adicional que expone la API de Moodle.
- Posteriormente, se decidió desarrollar un plugin propio para exponer las entidades de mayor interés, optimizando la integración y permitiendo operaciones más robustas.

---

## Page API

Nuestra implementación actual del **Page API** ofrece una solución eficiente y directa para la creación de páginas en Moodle. Entre sus características se destacan:

### Implementación Actual (page_api.php)

1. **Estructura Simplificada**
   - Interfaz unificada para crear páginas en secciones específicas.
   - Validación integrada de parámetros, permisos y contexto.
   - Manejo automático de la configuración del módulo, reduciendo la complejidad para el cliente.

2. **Gestión de Datos**
   - Validación robusta del curso y la sección.
   - Control granular de visibilidad y estado del módulo.
   - Integración directa con el sistema de módulos de Moodle para una configuración inmediata.

3. **Ventajas Técnicas**
   - Operación atómica para la creación de páginas, lo que reduce el riesgo de inconsistencias.
   - Validación exhaustiva de capacidades y contexto, mejorando la seguridad.
   - Retorno estructurado de datos que facilita el consumo de la API.

### Alternativas en Moodle 4-4.5

1. **Core Module API**
   - Requiere múltiples llamadas para configurar el módulo.
   - Mayor complejidad en el manejo de parámetros y validaciones.
   - Necesita código adicional para una integración segura.

2. **Web Services Estándar**
   - Utiliza el servicio *mod_page_create_page*, pero resulta limitado en opciones de configuración.
   - Requiere múltiples llamadas para alcanzar una configuración completa.

3. **Course Module API**
   - Ofrece una mayor flexibilidad, aunque es de bajo nivel y requiere más código de implementación.

### Ventajas de Nuestra Implementación

- **Eficiencia**
  - Simplifica el código cliente y reduce llamadas a la base de datos.
  - Permite operaciones atómicas que garantizan la integridad de los datos.

- **Mantenibilidad**
  - Código organizado y bien documentado, con clara separación de responsabilidades.
  - Fácil de extender y adaptar a futuros cambios.

- **Confiabilidad**
  - Validación completa de parámetros y permisos.
  - Manejo consistente de errores y aseguramiento de la integridad de la configuración.

---

## Glossary API

La implementación actual del **Glossary API** proporciona una funcionalidad robusta para la creación de glosarios, destacándose por:

1. **Capacidades Principales**
   - Creación de glosarios en secciones específicas del curso.
   - Soporte para términos y definiciones en formato HTML, permitiendo contenido enriquecido.
   - Control detallado de la visibilidad del glosario.
   - Capacidad de crear masivamente términos en una sola operación, optimizando el proceso.

### Alternativas en Moodle 4.5

1. **Web Services Core**
   - Utiliza el API *mod_glossary_add_entry* para agregar entradas individualmente.
   - No permite la creación integral de un glosario completo de forma atómica.

2. **External Services**
   - Permite registrar servicios externos personalizados, brindando mayor flexibilidad, pero requiere una configuración más compleja.

3. **REST API Nativa**
   - Ofrece endpoints predefinidos para operaciones básicas, aunque con menos control sobre la estructura completa de los datos.

### Ventajas de Nuestra Implementación

- **Operación Atómica**
  - Permite la creación conjunta de glosario y términos, reduciendo errores en el proceso.
  
- **Control Avanzado**
  - Mayor control sobre la configuración y validación de entradas.
  - Mejor manejo de errores y consistencia en las validaciones.

---

## Database API

La implementación actual del **Database API** en Moodle 4 ofrece un balance entre usabilidad, flexibilidad y seguridad:

1. **Características Principales**
   - Soporte para múltiples tipos de campos (texto, número, fecha, archivo, etc.).
   - Sistema de plantillas para la visualización de registros.
   - Control de permisos granular tanto a nivel de base de datos como de cada registro.
   - Funcionalidades de exportación e importación de datos.
   - Soporte para presets y plantillas predefinidas que simplifican la configuración.

2. **Integración con Web Services**
   - API externa documentada en *mod_data_external*.
   - Endpoints para operaciones CRUD (crear, leer, actualizar y eliminar) sobre registros.
   - Soporte para consultas complejas y filtrado de datos.
   - Validación de permisos integrada para cada operación.

3. **Seguridad y Validación**
   - Validación estricta de tipos de datos y formatos.
   - Control de acceso basado en capacidades de usuario.
   - Sanitización de entradas y salidas para prevenir vulnerabilidades como XSS.

### Alternativas en Moodle 4

1. **Core Database API**
   - Acceso directo a través de la variable global `$DB`, ofreciendo mayor rendimiento, pero con menor abstracción.
   - Requiere mayor código personalizado para validaciones.

2. **External Services**
   - Permite la creación de servicios web personalizados para una mayor flexibilidad, aunque implica una configuración más compleja.

3. **Table API**
   - API destinada a la creación de tablas HTML dinámicas, útil para la visualización, pero con funcionalidades limitadas en comparación con la Database API.

### Balance de la Implementación Actual

- **Facilidad de Uso vs. Flexibilidad**
  - La API ofrece un uso sencillo sin sacrificar funcionalidades avanzadas.
  
- **Seguridad vs. Rendimiento**
  - Se prioriza la seguridad y validación de datos sin impactar significativamente el rendimiento.
  
- **Funcionalidad vs. Complejidad**
  - Proporciona un conjunto robusto de características sin la necesidad de implementaciones excesivamente complejas.

---

## Quiz API

La implementación actual del **Quiz API** presenta ventajas significativas en comparación con las alternativas en Moodle 4-4.5:

### Implementación Actual (quiz_api.php)

1. **Estructura Simplificada**
   - Interfaz unificada para la creación de quiz y preguntas en una sola operación.
   - Manejo automático de las complejas relaciones entre entidades, simplificando el proceso para el cliente.
   - Abstracción de la complejidad inherente a la estructura de tablas de Moodle.

2. **Gestión de Datos**
   - Creación atómica de quiz, preguntas y relaciones asociadas.
   - Gestión eficiente de las categorías de preguntas, incluyendo la creación o recuperación de la categoría adecuada.
   - Control preciso sobre las versiones y estados de las preguntas, asegurando que se utilice la versión correcta.

3. **Ventajas Técnicas**
   - Reducción del número de operaciones a la base de datos, optimizando el rendimiento.
   - Mejor manejo de transacciones y operaciones atómicas que garantizan la integridad de los datos.
   - Control granular del contexto del módulo, asegurando la correcta asignación de permisos y validaciones.

### Alternativas en Moodle 4-4.5

1. **Core Quiz API**
   - Requiere múltiples llamadas separadas para la creación de quiz y preguntas.
   - Mayor complejidad en el manejo de relaciones indirectas y dependencias entre tablas.
   - Necesita gestión manual de versiones y estados de las preguntas.

2. **Web Services Estándar**
   - Limitados a operaciones básicas, sin soporte para creación masiva o integración de relaciones complejas.
   - Requiere el uso de múltiples endpoints para lograr una funcionalidad completa.

3. **Question Engine API**
   - Enfocado en el motor de preguntas, sin gestionar la creación completa del quiz.
   - Requiere código adicional para integrar la creación y asociación de preguntas al quiz.

### Ventajas de Nuestra Implementación

- **Eficiencia**
  - Simplifica el código cliente y minimiza las operaciones sobre la base de datos.
  - Optimiza el rendimiento mediante operaciones atómicas y una mejor gestión de transacciones.

- **Mantenibilidad**
  - Código limpio y modular, con una clara separación de responsabilidades.
  - Facilita actualizaciones y modificaciones futuras sin impactar la estructura general.

- **Confiabilidad**
  - Validación integrada de parámetros, versiones y estados de las preguntas.
  - Manejo consistente de errores y garantías de integridad en las relaciones de datos.

### Análisis de la Estructura de Datos

Es fundamental destacar que **no existe una conexión directa entre las tablas de Quiz y Questions**. En su lugar, se gestionan a través de múltiples relaciones intermedias:

- **Tablas Involucradas**
  - **QuizSlots:** Define la posición y la página en la que se insertan las preguntas dentro del quiz.
  - **QuizSections:** Permite la organización de preguntas en secciones, si es necesario.
  - **QuestionReferences:** Asocia cada slot del quiz con una entrada en el banco de preguntas.
  - **QuestionBankEntries:** Conecta cada pregunta con una categoría específica.
  - **QuestionVersions:** Gestiona las versiones de las preguntas, permitiendo seleccionar la versión correcta (por ejemplo, la última versión no borrador).
  - **QuestionCategories:** Define la clasificación de las preguntas.
  - **QuestionSetReferences:** Maneja las referencias para preguntas aleatorias y sus filtros.
  - **QuestionQuestions:** Finalmente, enlaza la versión de la pregunta con la pregunta misma.

- **Aspectos Clave**
  - La **unión de múltiples tablas** mediante `LEFT JOIN` y el uso de funciones como `COALESCE` en la consulta SQL permite manejar casos en los que algunas relaciones puedan no existir.
  - Se realizó un análisis previo de las tablas principales para comprender los valores y contextos, lo que facilitó la validación y manejo de datos en nuestra implementación.
  - Este diseño, aunque complejo, permite una gran **flexibilidad** y robustez en la gestión de quizzes, tanto para preguntas fijas como aleatorias.

#### Ejemplo de Consulta SQL

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

Nota: La consulta anterior ilustra el manejo de versiones y la verificación de la existencia de preguntas asignadas o aleatorias en el quiz, mostrando cómo se unen los datos de diversas tablas para obtener una vista consolidada.


Referencias: 

Agradecimiento a estos sitios que ayudaron a la investigación

https://docs.moodle.org/405/en/ad-hoc_contributed_reports#Quiz_Activity
https://www.examulator.com/er/4.5/
https://moodledev.io/docs/5.0/apis#activity-module-apis
https://moodledev.io/docs/5.0/apis/core/activitycompletion
