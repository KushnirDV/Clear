Ext.define('TestApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
		isPlayButtonActive: false,
		isStopButtonActive: false,
		isSingleRow: false,
		theRow: ''
    }
});
