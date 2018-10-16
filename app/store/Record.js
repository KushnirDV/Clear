Ext.define('TestApp.store.Record', {
    extend: 'Ext.data.Store',

    alias: 'store.record',

    model: 'TestApp.model.Record',

    data: [
		{ name: 'Task 1', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'STOPPED'},
		{ name: 'Task 2', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'RUNNING'},
		{ name: 'Task 3', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'STOPPED'}
	]
	
});
