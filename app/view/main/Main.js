Ext.define('TestApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
	controller: 'main',
	viewModel: {type:'main'},

    items: [{
        title: 'Dummy tasks',
        xtype: 'layout-vertical-box'
    }]
});