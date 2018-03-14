import React from 'react';
import { render } from 'react-dom';
import Root from './src/js/components/Root';
import './src/js/translations.js';
import './src/js/translationsHash.js';

(function () {
    'use strict';

	window.nsGmx = window.nsGmx || {};

    var pluginName = 'forestproject',
		homePath;

    var publicInterface = {
        pluginName: pluginName,

        afterViewer: function (params, map) {
			if (window.nsGmx) {
                var forestPluginContainer = window.iconSidebarWidget.setPane(
                    "forest-project", {
                        createTab: window.createTabFunction({
                            icon: "s-tree.svg",
                            active: "uploadfile-uploadfile-sidebar",
                            inactive: "uploadfile-uploadfile-sidebar",
                            hint: "layers-tree"
                        })
                    }
                );

                render(
                    <Root lmap={window.nsGmx.leafletMap} gmxMap={window.nsGmx.gmxMap} />,
                    forestPluginContainer
                );
            }
        }
    };

    if (window.gmxCore) {
		window.gmxCore.addModule(pluginName, publicInterface, {
			css: './css/main.css',
			init: function(module, path)
			{
				// homePath = path;	// Папка где расположен плагин
                //
				// var def = $.Deferred();
				// gmxCore.loadScriptWithCheck([
				// 	{
				// 		check: function(){ return window.links; },
				// 		script: path + '../timeline/vis.js',
				// 		css: path + '../timeline/vis.css'
				// 	},
				// 	{
				// 		check: function(){ return window.L.control.dialog; },
				// 		css: 'http://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
				// 	}
				// ]).done(function() {
				// 	def.resolve();
				// });
                //
				// return def;
			}
		});
	} else {
		window.nsGmx[pluginName] = publicInterface;
	}
})();
