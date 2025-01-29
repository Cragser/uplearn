# Documentación referenciada al proyecto.

## adapter

Servicios o librerías que pueden cambiarse, por lo que se deben crear abstracciones en lo posible.
Puede incluir funciones o componentes que utilicen esas librerías.
Para este proyecto estamos pensando usar lectura de markdown.

## app

Solo las páginas utilizadas por next.js
Verificar que exita siempre:
[] src/app/api/health.ts
[x] app/health/page.tsx

## client

Información relacionada con este proyecto en específico. Por ejemplo módulos, componentes, hooks, wrappers

## domain

Muestra la información que no cambiará pues es del negocio.

## lib

Contiene componentes que queremos pasar a una librería.

## server

Funciones que traen información de un servidor, por ejemplo la llamada a la API de deepsek y la llamada a la api de mooodle y la llamada a la api de anki.

## shared

Contiene elementos que se puede compartir entre client y server.
