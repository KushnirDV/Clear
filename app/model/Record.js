Ext.define('TestApp.model.Record', {
	extend: 'Ext.data.Model',

	schema: {
		namespace: 'TestApp.model'
	},
	
	identifier: {
		type: 'sequential',
		seed: 4,
	},
	
	fields: [
		{ name: 'id',			type: 'int'},
		{ name: 'name',		type: 'string'},
		{ name: 'startDate',	type: 'date'  },
		{ name: 'endDate',	type: 'date'  },
		{ name: 'status',		type: 'string', defaultValue: 'STOPPED'}
	],
    
	validators: {
		name: { type: 'length', min: 1, max: 255 },
		status: { type: 'inclusion', list: ['RUNNING', 'STOPPED'] }
	}
});
