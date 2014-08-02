function ListView(options) {
	var self = Ti.UI.createView({
		top:(Ti.Platform.getOsname() == "android") ? 0 : 20,
		layout:"horizontal",
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

	var listView = Ti.UI.createListView({
		searchView:searchBar
	});
	
	var sections = [];
	var foodSection = Ti.UI.createListSection({ headerTitle: 'Lebensmittel'});
	var foodData = fillTableViewWithFood();
	
	foodSection.setItems(foodData);
	sections.push(foodSection);
	
	listView.sections = sections;
	self.add(listView);

	return self;
};

// functions
function fillTableViewWithFood(){
	var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','hit_lebensmittel.csv');
	var csv = f.read();
	var points = [];
	var lines = csv.toString().split("\r");
	
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
	       	var foodName = String(food[0]).replace("/","");
	       	
	        foodData.push({
	        	properties:{
	        		title:foodName, 
	        		backgroundColor:color, 
	        		color:'#000000',
	        		searchableText:foodName,
	        		filterAttribute:foodName
	        	}
	        });
	        
	    }
	}
	
	return foodData;
}
module.exports = ListView;