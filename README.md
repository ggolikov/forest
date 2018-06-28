# Geomixer forest project

Front-end часть Лесного сервиса. Создана на React+Redux.
Может быть собрана в 2 вариантах - как плагин к GeoMNixer или standalone-приложение. Standalone используется для девелопмента.

##### npm scripts

- `npm start` - запуск дев-сервера
- `npm run build` - сборка standalone-приложения
- `npm run build-plugin` - сборка плагина
- `npm run build-plugin-copy` - сборка плагина и копирование сборки в локальную папку GeoMixer

##### Структура проекта

- AC - action creators для Redux
- components - компоненты React
- helpers - методы для запросов к API, формирования JSON для генерации отчета и пр.
- HOC - декораторы для компонентов
- reducers - Redux-reducers
- middlewares - Redux-middlewares
- template - шаблон отчета 
