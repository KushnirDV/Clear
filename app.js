/*
 * This call registers your application to be launched when the browser is ready.
 */
Ext.application({
    name: 'TestApp',
	extend: 'TestApp.Application',

    requires: [
        'TestApp.*'
    ]
});
