Ext.define('TestApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
		selectedRecords: [],
		theRow: '',
		filter:''
    },
	
	stores: {
        record: {
            model: 'TestApp.model.Record',
			data: [
				{id: 1, name: 'Task 1', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'STOPPED'},
				{id: 2, name: 'Task 2', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'RUNNING'},
				{id: 3, name: 'Task 3', startDate: '2018-10-18T00:00:00Z', endDate: '2018-10-18T00:00:00Z', status: 'STOPPED'}
			],
			filters: [{
				property: 'name',
				filterFn: '{filterByName}'
			}],
		    isDirty: function() {
				return (this.getNewRecords().length > 0 || this.getUpdatedRecords().length > 0 || this.getRemovedRecords().length > 0);
			}
		}
    },
	
	formulas: {
	
		filterByName: function(get) {
			return function(item) {
				return !get('filter') || ( item && item.data.name.indexOf(get('filter')) !== -1 );
			};
		},
		
		isSelectionEmpty: function(get){
			return get('selectedRecords').length > 0;
		},
		
		recordsStatus: function(get){
			var selections = get('selectedRecords');
			var status = {
				isPlayButtonActive: false,
				isStopButtonActive: false
			};
			if(selections.length > 0){
				Ext.each(selections, function(el){
					if(el && el.data){
						if(el.data.status === 'STOPPED')
							status.isPlayButtonActive = true;
						else if(el.data.status === 'RUNNING')
							status.isStopButtonActive = true;
					}
				});
			}
			return status;
		}
	}
});