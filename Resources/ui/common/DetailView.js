function DetailView(options) {
	var data = options.data;
	var self = Ti.UI.createView({
		layout:"horizontal",
		backgroundColor:'#ffffff'
	});

	var title = Ti.UI.createLabel({
		height:100,
		width:Ti.UI.FILL,
		borderWidth:1,
		borderColor:'#000000',
		text:data[0].value,
		textAlign:'center',
		font:{ fontSize:'22sp'},
		color:'#000000'
	});
	self.add(title);
	
	return self;
};

module.exports = DetailView;