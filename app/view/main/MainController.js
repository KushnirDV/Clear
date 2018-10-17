Ext.define('TestApp.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',

	getMainGrid: function(){
		return Ext.getCmp('MyGridPanel');
	},
	getMainStore: function(){
		var grid = this.getMainGrid();
		return grid.getStore();
	},

	addReccord: function () {
		this.getMainStore().add({});
	}, 
	
	getEachSelectedRow(){
		return this.getMainGrid().getSelectionModel().getSelection();
	},
	
	removeRecords: function(){
		this.getMainStore().remove(this.getEachSelectedRow());
	},
	
	hasModifiedRecords(){
		var records = this.getMainStore().getModifiedRecords();
		return (records.length > 0);
	},
	
	onSubmitClick: function(){
		var self =  this;
		if(this.hasModifiedRecords()){
			Ext.Msg.show({
				title:'Save changes?',
				message: 'Do you want to save latest changes?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn) {
					if (btn === 'yes') {
						self.getMainStore().commitChanges();
						self.showToast('<b>OK!</b><br/>Saved');
					} 
				}
			});
		}else{
			this.showToast('<b>Worning!</b><br/>There are not any corect changes');
		}
	},
	
	onCancelClick: function(){
		var self =  this;
		if(this.hasModifiedRecords()){
			Ext.Msg.show({
				title:'Reject changes?',
				message: 'Do you want to reject lates changes?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function(btn) {
					if (btn === 'yes') {
						self.getMainStore().rejectChanges();
					} 
				}
			});
		}else{
			this.showToast('<b>Worning!</b><br/>There are not any corect changes');
		}
	},
	
	runEachSelected: function(){
		Ext.each(this.getEachSelectedRow(), function(record){
			record.set('status', 'RUNNING');
		});
		this.changeButtonsStatus();
	},
	
	stopEachSelected: function(){
		Ext.each(this.getEachSelectedRow(), function(record){
			record.set('status', 'STOPPED');
		});
		this.changeButtonsStatus();
	},
	
	onSelectionChange: function(dv, selected) {
		this.changeViewModelSingleRowStatus(selected);
		this.showWarnigWhenFormDataInvalid();
		this.changeButtonsStatus();
	},
	
	changeButtonsStatus(){
		var self = this;
		var data = this.getButtonsStatus();	
		for(var type in data){
			self.getViewModel().set(type, data[type]);
		}
	},
	
	getButtonsStatus(){
		var status = {
				isPlayButtonActive: false,
				isStopButtonActive: false
			};
		var selectedRows = this.getEachSelectedRow();
		if(selectedRows.length > 0){
			Ext.each(selectedRows, function(el){
				if(el && el.data){
					if(el.data.status === 'STOPPED')
						status.isPlayButtonActive = true;
					else if(el.data.status === 'RUNNING')
						status.isStopButtonActive = true;
				}
			});
		}
		return status;	
	},
	
	isTheRowExisted: function(form){
		var rowId,
		    isLeaveRowExists, 
		    formVal = form.getValues();
			  
		Ext.each(Object.getOwnPropertyNames(formVal), function(name){
			if(name.indexOf('hiddenfield') !== -1){
				rowId = parseInt(formVal[name]);
			}
		});

		if(rowId)
			isLeaveRowExists = this.getMainStore().getById(rowId);
			
	    return isLeaveRowExists;
	},
	
	showWarnigWhenFormDataInvalid(){
		var formPanel = this.lookupReference('formPanel'),
		    form = formPanel.getForm();

		if(form && !form.isValid() && this.isTheRowExisted(form)){
			this.showToast('<b>Worning!</b><br/>Form data is not valid. Saving was a failure.');
		};
	},
	
	changeViewModelSingleRowStatus(selected){
		var isOnlyOneRecordSelected = (selected && selected.length === 1) ? true : false;		
		this.getViewModel().set('isSingleRow', isOnlyOneRecordSelected);
		
			/* fixed bug with last selection in standard work of bind selection of grid panel 
				(when rows select use check-box then last single selected row is not always the same with form values)
				Other words some time form values bind to unselected row of grid 
			*/
		if(isOnlyOneRecordSelected){
			var singleRow = (isOnlyOneRecordSelected) ? selected[0]['data'] : '';
			var standardSelectionRow = this.getViewModel().get('theRow');
			
			if(standardSelectionRow && standardSelectionRow.id !== singleRow.id){
				var realRowsNumburs = selected[0].store.data.indices;
				var indexRow = (realRowsNumburs && realRowsNumburs[singleRow.id]) ? realRowsNumburs[singleRow.id] : false;
				if(indexRow !== false)
					this.getMainGrid().getView().select(indexRow);
			}
		}  /*  ---  */
	},
	
	onChangeFilter: function(dv, newValue, oldValue){
		var filterByName = Ext.create('Ext.util.Filter', {
				filterFn: function (item) {
					if(item && item.data.name.indexOf(newValue) !== -1){
						return true;
					}else{
						return false;
					}
				}
			});
		if (newValue) {
			this.getMainStore().filter(filterByName);
		} else {
			this.getMainStore().removeFilter(filterByName);
		}
	},

	
	showToast: function(s) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideDUration: 400,
            maxWidth: 400
        });
	}
});