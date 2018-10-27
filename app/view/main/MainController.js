Ext.define('TestApp.view.main.MainController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.main',

	getMainGrid: function(){
		return Ext.getCmp('MyGridPanel');
	},
	getMainStore: function(){
		return this.getMainGrid().getStore();
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

	onSubmitClick: function(){
		var self =  this;
		if(this.getMainStore().isDirty()){
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
		if(this.getMainStore().isDirty()){
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
		var rows = this.getEachSelectedRow();
		Ext.each(rows, function(record){
			record.set('status', 'RUNNING');
		});
		this.setSelectedRecords(rows);
	},
	
	stopEachSelected: function(){
		var rows = this.getEachSelectedRow();
		Ext.each(rows, function(record){
			record.set('status', 'STOPPED');
		});
		this.setSelectedRecords(rows);
	},
	
	onSelectionChange: function(dv, selected) {
		if(selected.length === 1)
			this.getViewModel().set('theRow', selected[0]);
		else
			this.getViewModel().set('theRow', '');
		
		this.setSelectedRecords(selected);		
		this.showWarnigWhenFormDataInvalid();
	},
	
	setSelectedRecords: function(selection){
		this.getViewModel().set('selectedRecords', selection);
	},
	
	showWarnigWhenFormDataInvalid(){
		var form = this.lookupReference('formPanel').getForm();
		if(form && !form.isValid()){
			this.showToast('<b>Worning!</b><br/>Form data was not valid.');
		};
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