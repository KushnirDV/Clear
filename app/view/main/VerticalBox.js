/**
 * Vbox layout contains stack of parallel panels
 */
Ext.define('TestApp.view.main.VerticalBox', {
    extend: 'Ext.panel.Panel',
		
    xtype: 'layout-vertical-box',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
	
	buttonAlign: 'right',
    bodyPadding: '0 5 5 5',
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',

		items: [
			{
				text: 'Add',
				tooltip: 'Add a new record',
				iconCls: 'framing-buttons-add',
				handler: 'addReccord'
			}, {
				text: 'Remove',
				tooltip: 'Remove the selected record',
				iconCls:'framing-buttons-remove',
				bind: {
					disabled: '{!theRow}'
				},
				handler: 'removeRecords'
			},'-', {
				text: 'Run',
				tooltip: 'Run records',
				iconCls: 'framing-buttons-play',
				bind: {
					disabled: '{!isPlayButtonActive}'
				},
				handler: 'runEachSelected'
			}, {
				text: 'Stop',
				tooltip: 'Stop records',
				iconCls: 'framing-buttons-stop',
				bind:{
					disabled: '{!isStopButtonActive}'
				},
				handler: 'stopEachSelected'
			}
		]
	}],

    items: [
        {
			bodyPadding: 5,
			margin: '0 0 10 0',
			frame: true,
			items: [{
				xtype: 'textfield', 
				fieldLabel: 'Name',
				emptyText: 'Enter filter text..',
				margin: '0 5',
				listeners:{ change : 'onChangeFilter' }
			}]
        },
        {
				/* Main grid and form*/
			xtype:'layout-grid-form',
			flex: 1
        }
    ],

	fbar: [{
        text: 'Submit',
        minWidth: 80,
        formBind: true,
        listeners: {
            click: 'onSubmitClick'
        }
    }, {
        minWidth: 80,
        text: 'Cancel',
		listeners:{
			click: 'onCancelClick'
		}
    }]

});