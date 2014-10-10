function FoodListView(options) {
	var self = Ti.UI.createView({
		top:0,
		layout:"vertical",
		backgroundColor:'#ffffff'
	});
	
	// Use action bar search view
	var searchBar = Ti.UI.createSearchBar({
	    hintText: "Suche...",
	    top:0,
	    height:40,
	    showCancel:false,
	    width:Ti.UI.FILL
	});
	self.add(searchBar);
	var listView = Ti.UI.createListView({
		search:searchBar
	});
	
	var sections = [];
	var foodSection = Ti.UI.createListSection({ headerTitle: 'Lebensmittel'});
	var foodData = fillTableViewWithFood();
	
	foodSection.setItems(foodData);
	sections.push(foodSection);
	
	listView.sections = sections;
	self.add(listView);
	
	listView.addEventListener("itemclick", function(e){
		var itemData = e.section.getItemAt(e.itemIndex).properties.data;
		//show details	
		var DetailView = require('ui/common/DetailView');
		var detailView = new DetailView({
			data:itemData
		});
		Ti.App.fireEvent("openView",{view:detailView});
	});
	
	return self;
};

// functions
function fillTableViewWithFood(){
	var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','food.csv');
	var csv = f.read();
	var points = [];
	var lines = csv.toString().split("\r");
	var headerInfo = lines[0].split(";");
	var foodData = [];
	
	for (var c=0;c<lines.length;c++){
	    var line = lines[c];
	    var food = line.split(";");
	    if (food.length > 1){
       	
	       	// categorization of the food 
	       	switch(food[2]){
	       		case "1":
	       			var color = '#302AFF00'; // good
	       			break;
	       		case "2":
	       			var color = '#30EAFF00'; // okay
	       			break;
	       		case "3":
	       			var color = '#30FF9100'; // bad
	       			break;
	       		case "4":
	       			var color = '#30FF1500'; // very bad
	       			break;
	       	}
	       	// fill data for detailview
	       	var data = [];
	       	for (i in headerInfo){
	       		data.push({
	       			'name':headerInfo[i],
	        		'value':food[i]
	       		});
	       	}
	       	// create table row
	       	var foodName = String(food[0]).replace("/","");
	        foodData.push({
	        	properties:{
	        		title:foodName, 
	        		backgroundColor:color, 
	        		color:'#000000',
	        		searchableText:foodName,
	        		filterAttribute:foodName,
	        		data:data
	        	}
	        });
	        
	    }
	}
	
	return foodData;
}
module.exports = FoodListView;