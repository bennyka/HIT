
var leftMenuView = Ti.UI.createView({
	backgroundColor:'white',
	width: Ti.UI.FILL,
	height: Ti.UI.FILL
});

//init foodlistview	
var FoodListView = require('ui/common/FoodListView');
var foodListView = new FoodListView();

// create a menu
var leftTableView = Ti.UI.createTableView({
	font:{fontSize:12},
	rowHeight:40,
	data:[
		Titanium.UI.createTableViewRow({
			title:'Menü',
			font:{ fontSize:'18sp' },
			touchEnabled:false,
			backgroundSelectedColor:'transparent',
			color:'#000000',
			textAlign:'center',
			height:45
		}),
		Titanium.UI.createTableViewRow({
			title:'Lebensmittel',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		}),
		Titanium.UI.createTableViewRow({
			title:'Medikamente',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		}),
		Titanium.UI.createTableViewRow({
			title:'Alle',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		}),
		Titanium.UI.createTableViewRow({
			title:'Information',
			font:{ fontSize:'16sp', fontWeight:'bold' },
			touchEnabled:false,
			backgroundSelectedColor:'transparent',
			color:'#000000',
			height:30
		}), 
		Titanium.UI.createTableViewRow({
			title:'Einstellungen',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		}),
		Titanium.UI.createTableViewRow({
			title:'Erklärung',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		}),
		Titanium.UI.createTableViewRow({
			title:'Impressum',
			font:{ fontSize:'14sp' },
			touchEnabled:false,
			color:'#000000',
			height:30
		})   
	]
});
leftMenuView.add(leftTableView);



leftTableView.addEventListener("click", function(e){
	Ti.API.info("isAnyWindowOpen: " + drawer.isAnyWindowOpen());
	switch(e.index){
		case 0:
			// do nothing
			break;
		case 1:
			// show food list
			drawer.setCenterWindow(foodListView);
			drawer.toggleLeftWindow(); //animate back to center
			break;
		case 2:
			// open medicine list
			alert("show medicine");
			// drawer.setCenterWindow(centerView);
			// drawer.toggleLeftWindow(); 
			break;
		case 3:
			// do nothing
			alert("show all");
			break;
		case 4:
			// do nothing
			break;
		case 5:
			// do nothing
			alert("show Settings");
			break;
		case 6:
			// do nothing
			alert("show Description");
			break;
		case 7:
			// do nothing
			alert("show Impress");
			break;
	}
});

// CREATE THE MODULE
var NappDrawerModule = require('dk.napp.drawer');
var drawer = NappDrawerModule.createDrawer({
	fullscreen:false, 
	leftWindow: leftMenuView,
	centerWindow: foodListView,
	fading: 0.2, // 0-1
	parallaxAmount: 0.2, //0-1
	shadowWidth:"40dp", 
	leftDrawerWidth: "200dp",
	animationMode: NappDrawerModule.ANIMATION_SCALE,
	closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_MARGIN,
	openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
	orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
});


drawer.addEventListener("didChangeOffset", function(e){
	//Ti.API.info("didChangeOffset: " + e.offset);
});

drawer.addEventListener("windowDidOpen", function(e){
	if(e.window == NappDrawerModule.LEFT_WINDOW) {
		Ti.API.info("windowDidOpen - LEFT DRAWER");
	} else if (e.window == NappDrawerModule.RIGHT_WINDOW) {
		Ti.API.info("windowDidOpen - RIGHT DRAWER");
	}
});
drawer.addEventListener("windowDidClose", function(e){
	Ti.API.info("windowDidClose");
});


// Action Bar - REAL example
drawer.addEventListener('open', onNavDrawerWinOpen);
function onNavDrawerWinOpen(evt) {
    this.removeEventListener('open', onNavDrawerWinOpen);

    if(this.getActivity()) {
        // need to explicitly use getXYZ methods
        var actionBar = this.getActivity().getActionBar();

        if (actionBar) {
            // Now we can do stuff to the actionbar  
            actionBar.setTitle(Ti.App.name);
            
            // show an angle bracket next to the home icon,
            // indicating to users that the home icon is tappable
            actionBar.setDisplayHomeAsUp(true);

            // toggle the left window when the home icon is selected
            actionBar.setOnHomeIconItemSelected(function() {
                drawer.toggleLeftWindow();
           });
        }
    }    
}


// lets open it
drawer.open();
