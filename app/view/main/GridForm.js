Ext.define('TestApp.view.main.GridForm', {
	extend: 'Ext.panel.Panel',
	xtype: 'layout-grid-form',
	
	requires: [
        'Ext.layout.container.HBox'
    ],
	
	 layout: {
        type: 'hbox',
        align: 'stretch'
    },
	
	items:[{		
		xtype: 'grid',
		id: 'MyGridPanel',

		frame: true,
		margin: '0 10 0 0',
		bind: {
			selection: '{theRow}',
		},
		selModel: {
			type: 'checkboxmodel'
		},
		layout: 'fit',
		flex: 2,
		scrolable: true,
		columnLines: true,
		rowLines: false,
		
		requires: [ 
			'TestApp.store.Record'
		],
		store: {
			type: 'record'
		},
		modelValidation: true,
		columns: [
			{ text: 'Id',  dataIndex: 'id', width:40},
			{ text: 'Name', dataIndex: 'name', flex: 1},
			{ text: 'Start date', dataIndex: 'startDate', flex: 1, sortable: true, formatter: 'date("d-m-Y H:i:s")' },
			{ text: 'End date', dataIndex: 'endDate', flex: 1,  width: 120, sortable: true, formatter: 'date("d-m-Y H:i:s")' },
			{ text: 'Status', dataIndex: 'status', flex: 1}
		],
		
		listeners: {
			selectionchange: 'onSelectionChange'
		}
	},
	{
		xtype: 'tabpanel',

		frame: true,
		layout: 'fit',
		flex: 1,
		items:[{
			title: 'Details',
			bodyPadding: 5,
			items:[
			{
				xtype: 'fieldset',
				title: 'General options',
				cls: 'field-get-opts',				
				items:[{
				
				
					xtype: 'form',
					modelValidation: true,
					reference: 'formPanel',
					defaults: {
						anchor: '100%'
					},
					items: [{
						xtype: 'fieldcontainer',
						fieldLabel: 'Id',
						bind: {
							disabled: '{!isSingleRow}',
							html:'{theRow.id}'
						}
					},{
						xtype: 'hiddenfield',
						bind: {
							value:'{theRow.id}'
						}
					}, {
						xtype: 'textfield',
						fieldLabel: 'Name',
						bind: {
							disabled: '{!isSingleRow}',
							value: '{theRow.name}'
						}
					}, {
						xtype: 'datefield',
						fieldLabel: 'Start Date',
						itemId: 'startdt',
						vtype: 'daterange',
						formatter: 'date("d/m/Y")',
						endDateField: 'enddt',
						bind: {
							disabled: '{!isSingleRow}',
							value: '{theRow.startDate}',
							maxValue: '{theRow.endDate}'
						}
					}, {
						xtype: 'datefield',
						fieldLabel: 'End Date',
						itemId: 'enddt',
						vtype: 'daterange',
						formatter: 'date("d/m/Y")',
						startDateField: 'startdt',
						bind: {
							disabled: '{!isSingleRow}',
							value: '{theRow.endDate}',
							minValue: '{theRow.startDate}'
						}
					}]
				}],
			}]
		}]
	}]
});