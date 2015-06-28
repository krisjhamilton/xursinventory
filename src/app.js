var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data, quantity) {
	var items = [];
	/*for(var i = 0; i < quantity; i++) {
		//var itemName = data.Response.definitions.items(i).itemName;
		var itemTypeName = data.Response.definitions.items(i).itemTypeName;
		items.push({
			title: "Test",
			subtitle: itemTypeName
		});
	}*/


	var placeHolder = data.Response.definitions.items;
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

	return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();
var splashWindow2 = new UI.Window();
/*
var logo_image = new UI.Image({
	position: new Vector2(58, 20),
	size: new Vector2(28, 26),
	compositing: 'invert',
	image: 'images/main_logo.png'
});
*/

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

// Text element to inform user
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
//splashWindow.add(logo_image);
splashWindow.show();


ajax(
	{ 
		url: 'https://www.bungie.net/platform/destiny/advisors/xur/?definitions=true',
		type: 'json'
	},
	function(data) {
		var xurHere = //data.Response.definitions.vendorDetails['2796397637'].summary.visible;
		console.log(xurHere);
		if(xurHere === true){
			var menuItems = parseFeed(data, 10);
			var resultsMenu = new UI.Menu({
				sections: [{
					title: "Xur's Items",
					items: menuItems
				}]
			});
			resultsMenu.show();
			splashWindow.hide();
		}else{
			
			splashWindow2.add(text2);
			//splashWindow.add(logo_image);
			splashWindow2.show();
			splashWindow.hide();
		}
	},
	function( error ) {
		console.log( 'The ajax request B failed: ' + error );
	}
);