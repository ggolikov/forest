/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
	'use strict';

	window.nsGmx = window.nsGmx || {};

	var pluginName = 'HelloWorld',
	    homePath;

	var publicInterface = {
		pluginName: pluginName,

		afterViewer: function afterViewer(params, map) {
			if (window.nsGmx) {
				var layersByID = nsGmx.gmxMap.layersByID,
				    layerID = params.layerID || '47A9D4E5E5AE497A8A1A7EA49C7FC336',
				    testLayer = layersByID[layerID],
				    showID = function showID(id) {
					var div = L.DomUtil.create('div', 'HelloWorld'),
					    legendDiv = L.DomUtil.create('div', 'legendDiv', div),
					    container = L.DomUtil.create('div', 'container', div);
					id = 97787; // Закоментарить эту строку - при реальном использовании
					fetch(homePath + id + '.js') // Запрос за JSON данными графиков
					.then(function (resp) {
						return resp.json();
					}).then(function (json) {
						var groups = new vis.DataSet(json.groups);
						var dataset = new vis.DataSet(json.items);
						var options = {
							dataAxis: { showMinorLabels: false },
							start: json.start,
							end: json.end
						};
						var graph2d = new vis.Graph2d(container, json.items, groups, options);
					});

					var dialog = L.control.dialog({
						anchor: [60, 190],
						size: [920, 490]
					}).setContent(div).addTo(map);
				};

				if (testLayer) {
					testLayer.bindPopup('', { maxWidth: 560 }).on('popupopen', function (ev) {
						var popup = ev.popup,
						    container = L.DomUtil.create('div', 'myPopup'),
						    prop = L.DomUtil.create('div', 'myName', container),
						    buttonDiv = L.DomUtil.create('div', 'myImage', container),

						//props = ev.gmx.properties,	// Свойства объекта
						id = ev.gmx.id;

						prop.innerHTML = '<h3>Объект: ' + id + '</h3><br>';
						buttonDiv.innerHTML = '<button>Показать график</button>';
						L.DomEvent.on(buttonDiv, 'click', L.DomEvent.stopPropagation);
						L.DomEvent.on(buttonDiv, 'click', function () {
							showID(id); // Вызов метода для отображения графиков
						});
						popup.setContent(container);
					}, testLayer);
				}
			}
		}
	};

	if (window.gmxCore) {
		window.gmxCore.addModule(pluginName, publicInterface, {
			css: 'HelloWorld.css',
			init: function init(module, path) {
				homePath = path; // Папка где расположен плагин

				var def = $.Deferred();
				gmxCore.loadScriptWithCheck([{
					check: function check() {
						return window.links;
					},
					script: path + '../timeline/vis.js',
					css: path + '../timeline/vis.css'
				}, {
					check: function check() {
						return window.L.control.dialog;
					},
					css: 'http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
				}]).done(function () {
					def.resolve();
				});

				return def;
			}
		});
	} else {
		window.nsGmx[pluginName] = publicInterface;
	}
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0UHJvamVjdFBsdWdpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4Y2JmNWRmYWQ2NzExZDNmOTM5YSIsIndlYnBhY2s6Ly8vcGx1Z2luLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGNiZjVkZmFkNjcxMWQzZjkzOWEiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHR3aW5kb3cubnNHbXggPSB3aW5kb3cubnNHbXggfHwge307XHJcblxyXG4gICAgdmFyIHBsdWdpbk5hbWUgPSAnSGVsbG9Xb3JsZCcsXHJcblx0XHRob21lUGF0aDtcclxuXHJcbiAgICB2YXIgcHVibGljSW50ZXJmYWNlID0ge1xyXG4gICAgICAgIHBsdWdpbk5hbWU6IHBsdWdpbk5hbWUsXHJcblxyXG4gICAgICAgIGFmdGVyVmlld2VyOiBmdW5jdGlvbiAocGFyYW1zLCBtYXApIHtcclxuXHRcdFx0aWYgKHdpbmRvdy5uc0dteCkge1xyXG5cdFx0XHRcdHZhciBsYXllcnNCeUlEID0gbnNHbXguZ214TWFwLmxheWVyc0J5SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJJRCA9IHBhcmFtcy5sYXllcklEIHx8ICc0N0E5RDRFNUU1QUU0OTdBOEExQTdFQTQ5QzdGQzMzNicsXHJcblx0XHRcdFx0XHR0ZXN0TGF5ZXIgPSBsYXllcnNCeUlEW2xheWVySURdLFxyXG5cdFx0XHRcdFx0c2hvd0lEID0gZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnSGVsbG9Xb3JsZCcpLFxyXG5cdFx0XHRcdFx0XHRcdGxlZ2VuZERpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWdlbmREaXYnLCBkaXYpLFxyXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdjb250YWluZXInLCBkaXYpO1xyXG5cdFx0XHRcdFx0XHRpZCA9IDk3Nzg3O1x0XHQvLyDQl9Cw0LrQvtC80LXQvdGC0LDRgNC40YLRjCDRjdGC0YMg0YHRgtGA0L7QutGDIC0g0L/RgNC4INGA0LXQsNC70YzQvdC+0Lwg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40LhcclxuXHRcdFx0XHRcdFx0ZmV0Y2goaG9tZVBhdGggKyBpZCArICcuanMnKVx0XHQvLyDQl9Cw0L/RgNC+0YEg0LfQsCBKU09OINC00LDQvdC90YvQvNC4INCz0YDQsNGE0LjQutC+0LJcclxuXHRcdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXNwKXsgcmV0dXJuIHJlc3AuanNvbigpOyB9KVxyXG5cdFx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwcyA9IG5ldyB2aXMuRGF0YVNldChqc29uLmdyb3Vwcyk7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgZGF0YXNldCA9IG5ldyB2aXMuRGF0YVNldChqc29uLml0ZW1zKTtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBvcHRpb25zID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhQXhpczoge3Nob3dNaW5vckxhYmVsczogZmFsc2V9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydDoganNvbi5zdGFydCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kOiBqc29uLmVuZFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBncmFwaDJkID0gbmV3IHZpcy5HcmFwaDJkKGNvbnRhaW5lciwganNvbi5pdGVtcywgZ3JvdXBzLCBvcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBkaWFsb2cgPSBMLmNvbnRyb2wuZGlhbG9nKHtcclxuXHRcdFx0XHRcdFx0XHRhbmNob3I6IFsgNjAsIDE5MCBdLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6IFsgOTIwLCA0OTAgXVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQgIC5zZXRDb250ZW50KGRpdilcclxuXHRcdFx0XHRcdFx0ICAuYWRkVG8obWFwKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGlmICh0ZXN0TGF5ZXIpIHtcclxuXHRcdFx0XHRcdHRlc3RMYXllclxyXG5cdFx0XHRcdFx0XHQuYmluZFBvcHVwKCcnLCB7IG1heFdpZHRoOiA1NjAgfSlcclxuXHRcdFx0XHRcdFx0Lm9uKCdwb3B1cG9wZW4nLCBmdW5jdGlvbihldikge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBwb3B1cCA9IGV2LnBvcHVwLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ215UG9wdXAnKSxcclxuXHRcdFx0XHRcdFx0XHRcdHByb3AgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbXlOYW1lJywgY29udGFpbmVyKSxcclxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbkRpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdteUltYWdlJywgY29udGFpbmVyKSxcclxuXHRcdFx0XHRcdFx0XHRcdC8vcHJvcHMgPSBldi5nbXgucHJvcGVydGllcyxcdC8vINCh0LLQvtC50YHRgtCy0LAg0L7QsdGK0LXQutGC0LBcclxuXHRcdFx0XHRcdFx0XHRcdGlkID0gZXYuZ214LmlkO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRwcm9wLmlubmVySFRNTCA9ICc8aDM+0J7QsdGK0LXQutGCOiAnICsgaWQgKyAnPC9oMz48YnI+JztcclxuXHRcdFx0XHRcdFx0XHRidXR0b25EaXYuaW5uZXJIVE1MID0gJzxidXR0b24+0J/QvtC60LDQt9Cw0YLRjCDQs9GA0LDRhNC40Lo8L2J1dHRvbj4nO1xyXG5cdFx0XHRcdFx0XHRcdEwuRG9tRXZlbnQub24oYnV0dG9uRGl2LCAnY2xpY2snLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbik7XHJcblx0XHRcdFx0XHRcdFx0TC5Eb21FdmVudC5vbihidXR0b25EaXYsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNob3dJRChpZCk7XHRcdC8vINCS0YvQt9C+0LIg0LzQtdGC0L7QtNCwINC00LvRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPINCz0YDQsNGE0LjQutC+0LJcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRwb3B1cC5zZXRDb250ZW50KGNvbnRhaW5lcik7XHJcblx0XHRcdFx0XHRcdH0sIHRlc3RMYXllcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAod2luZG93LmdteENvcmUpIHtcclxuXHRcdHdpbmRvdy5nbXhDb3JlLmFkZE1vZHVsZShwbHVnaW5OYW1lLCBwdWJsaWNJbnRlcmZhY2UsIHtcclxuXHRcdFx0Y3NzOiAnSGVsbG9Xb3JsZC5jc3MnLFxyXG5cdFx0XHRpbml0OiBmdW5jdGlvbihtb2R1bGUsIHBhdGgpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRob21lUGF0aCA9IHBhdGg7XHQvLyDQn9Cw0L/QutCwINCz0LTQtSDRgNCw0YHQv9C+0LvQvtC20LXQvSDQv9C70LDQs9C40L1cclxuXHJcblx0XHRcdFx0dmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHRcdFx0XHRnbXhDb3JlLmxvYWRTY3JpcHRXaXRoQ2hlY2soW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRjaGVjazogZnVuY3Rpb24oKXsgcmV0dXJuIHdpbmRvdy5saW5rczsgfSxcclxuXHRcdFx0XHRcdFx0c2NyaXB0OiBwYXRoICsgJy4uL3RpbWVsaW5lL3Zpcy5qcycsXHJcblx0XHRcdFx0XHRcdGNzczogcGF0aCArICcuLi90aW1lbGluZS92aXMuY3NzJ1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Y2hlY2s6IGZ1bmN0aW9uKCl7IHJldHVybiB3aW5kb3cuTC5jb250cm9sLmRpYWxvZzsgfSxcclxuXHRcdFx0XHRcdFx0Y3NzOiAnaHR0cDovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjUuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XSkuZG9uZShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGRlZi5yZXNvbHZlKCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZWY7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aW5kb3cubnNHbXhbcGx1Z2luTmFtZV0gPSBwdWJsaWNJbnRlcmZhY2U7XHJcblx0fVxyXG59KSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcGx1Z2luLmpzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdkRBO0FBQ0E7QUF5REE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdEJBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=