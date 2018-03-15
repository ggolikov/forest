import React from 'react';
import { render } from 'react-dom';
import Root from './src/js/components/Root';

(function () {
    'use strict';

	window.nsGmx = window.nsGmx || {};

    var pluginName = 'forestproject';

    var publicInterface = {
        pluginName: pluginName,

        afterViewer: function (params, map) {
			if (window.nsGmx) {
                var forestPluginContainer = window.iconSidebarWidget.setPane(
                    "forest-project", {
                        createTab: window.createTabFunction({
                            icon: "s-forest-plugin",
                            active: "uploadfile-uploadfile-sidebar",
                            inactive: "uploadfile-uploadfile-sidebar",
                            hint: "forest-plugin"
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
			init: function(module, path) {}
		});
	} else {
		window.nsGmx[pluginName] = publicInterface;
	}
})();
