function ListWindow() {
	//init view	
	var ListView = require('ui/common/ListView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		orientationModes:[Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT],
		navBarHidden: true
	});
		
	//construct UI
	var listView = new ListView();
	self.add(listView);

	listView.addEventListener("shouldCloseView", function () {
		self.close();
	});

	return self;
	
};

module.exports = ListWindow;
