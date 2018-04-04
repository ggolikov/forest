import React from 'react';
import { render } from 'react-dom';
import Root from './js/components/Root';
import { addScreenObserver } from './js/helpers';
import './css/forestProjectPlugin.sass';

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
                            active: "sidebar-icon-active",
                            inactive: "sidebar-icon-inactive",
                            hint: "forest-plugin"
                        })
                    }
                );

                render(
                    <Root lmap={window.nsGmx.leafletMap} gmxMap={window.nsGmx.gmxMap} type="plugin" />,
                    forestPluginContainer
                );
            }
        }
    };

    if (window.gmxCore) {
		window.gmxCore.addModule(pluginName, publicInterface, {
			css: './css/forestProjectPlugin.css',
			init: function(module, path) {}
		});
	} else {
		window.nsGmx[pluginName] = publicInterface;
	}
})();
