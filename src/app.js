var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data) {
	var items = [];
	var placeHolder = data.Response.definitions.items;
	//console.log(Object.keys(placeHolder).length); // Test for the variable "placeHolder" in order to count the number of items by 'key'

	for (var key in placeHolder) {
		if (placeHolder.hasOwnProperty(key)) {
			var val = placeHolder[key];
			console.log(val);
			var itemName = val.itemName;
			var itemTypeName = val.itemTypeName;
			console.log(itemTypeName);
			items.push({
				title: itemName,
				subtitle: itemTypeName
			});
		}
	}
	
	//Another way to do this...
	/*
		for(var key in placeHolder){
			var value = placeHolder[key];
			var itemName = value.itemName;
			var itemTypeName = value.itemTypeName;
			//console.log(value.itemName);
			//console.log(value.itemTypeName);
			items.push({
				title: itemName,
				subtitle: itemTypeName
			});
		}*/

	return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

var logo_image = new UI.Image({
	position: new Vector2(58, 20),
	size: new Vector2(28, 26),
	compositing: 'invert',
	image: 'images/main_logo.png'
});


// Text element to inform user
var text = new UI.Text({
	position: new Vector2(0, 60),
	size: new Vector2(144, 168),
	text:'Checking if Xur \n is around',
	font:'GOTHIC_14_BOLD',
	color:'white',
	textOverflow:'wrap',
	textAlign:'center',
	backgroundColor:'black'
});	

// Second Text element to inform user
var text2 = new UI.Text({
	position: new Vector2(0, 60),
	size: new Vector2(144, 168),
	text:'Xur in not \n around at the \n moment',
	font:'GOTHIC_14_BOLD',
	color:'white',
	textOverflow:'wrap',
	textAlign:'center',
	backgroundColor:'black'
});	

splashWindow.add(text);
splashWindow.add(logo_image);
splashWindow.show();


ajax(
	{ 
		// url: 'http://krisjhamilton.github.io/xurtest.json', // Test json file from a previous week
		url:  'https://www.bungie.net/platform/destiny/advisors/xur/?definitions=true', // Live link to the Xur JSON endpoint with definitions
		type: 'json'
	},
	function(data) {
		var xursCode = data.Response.definitions.vendorDetails;
		if(Object.getOwnPropertyNames(xursCode).length === 0){
			splashWindow.add(text2);
			return false;
		}else{
			var xurHere = data.Response.definitions.vendorDetails['2796397637'].summary.visible;
			//console.log(xurHere); // For testing the out put of the variable "xurHere"
			if(xurHere === true){
				var menuItems = parseFeed(data);
				var resultsMenu = new UI.Menu({
					highlightBackgroundColor: 'black',
					highlightTextColor: 'white',
					sections: [{
						title: "Xur's Items",
						items: menuItems
					}]
				});
				resultsMenu.show();
				splashWindow.hide();
			}
		}
	},
	function( error ) {
		console.log( 'The ajax request B failed: ' + error );
	}
);