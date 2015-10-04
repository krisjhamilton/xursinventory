//var CACHE_INVALIDATE = false;
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var xurResponse;
var xurHere = false;

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

/*var logo_image = new UI.Image({
						position: new Vector2(58, 20),
						size: new Vector2(28, 26),
						compositing: 'invert',
						image: 'images/main_logo.png'
					});*/



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
//splashWindow.add(logo_image);
splashWindow.show();


ajax(
	{ 
		//url: 'http://krisjhamilton.github.io/xurtest.json', // Test json file from a previous week
		url:  'https://www.bungie.net/platform/destiny/advisors/xur/?definitions=true', // Live link to the Xur JSON endpoint with definitions
		type: 'json',
		headers: {

			"X-API-Key": "461d389ee0d547c39357527c6afea244"
		}
	},
	function(data) {
		xurResponse = data;
		var xursCode = xurResponse.Response.definitions.vendorDetails;
		if(Object.getOwnPropertyNames(xursCode).length === 0){
			splashWindow.add(text2);
			return false;
		}else{
			xurHere = xurResponse.Response.definitions.vendorDetails['2796397637'].summary.visible;
			//console.log(xurHere); // For testing the out put of the variable "xurHere"
			if(xurHere === true){
				buildMenu();
			}
		}
	},
	function( error ) {
		console.log( 'The ajax request B failed: ' + error );
	}
);

function parseFeed(data) {
	var items = [];
	var placeHolder = data.Response.definitions.items;
	//console.log(Object.keys(placeHolder).length); // Test for the variable "placeHolder" in order to count the number of items by 'key'
	for (var key in placeHolder) {
		if (placeHolder.hasOwnProperty(key)) {
			var val = placeHolder[key];
			console.log(val);
			var itemName;
			var itemTypeName;
			switch (val.itemTypeName) {
				case "Gauntlets":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Helmet":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Chest Armor":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Leg Armor":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Helmet Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Chest Armor Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Leg Armor Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Gauntlet Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Primary Weapon Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Special Weapon Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				case "Heavy Weapon Engram":
					itemName = val.itemName;
					itemTypeName = val.itemTypeName;
					items.push({
						title: itemTypeName,
						subtitle: itemName
					});
					break;
				default:
					
					break;
			}
		}
	}
	return items;
}


function buildMenu(){
	var menuItems = parseFeed(xurResponse);
	//console.log(menuItems);
	var resultsMenu = new UI.Menu({
		highlightBackgroundColor: 'white',
		highlightTextColor: 'black',
		sections: [{
			title: "Xur's Items",
			items: menuItems
		}]
	});
	resultsMenu.show();
	splashWindow.hide();
}



// WIP
/*
		// Add an action for SELECT
		resultsMenu.on('select', function(e) {
			//var menuItems2 = parseFeed2(data);
			// Construct Menu to show to user
			var powerLevel = data.Response.data.characters[e.itemIndex].characterBase.powerLevel;
			var defense = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_DEFENSE.value;
			var decipline = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_DISCIPLINE.value;
			var intellect = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_INTELLECT.value;
			var strength = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_STRENGTH.value;
			var armor = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_ARMOR.value;
			var agility = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_AGILITY.value;
			var recovery = data.Response.data.characters[e.itemIndex].characterBase.stats.STAT_RECOVERY.value;
			var glimmer = data.Response.data.inventory.currencies[0].value;
			var grimoireScore = data.Response.data.grimoireScore;
			var charId = data.Response.data.characters[e.itemIndex].characterBase.characterId;

			var charUrl = "http://www.bungie.net/Platform/Destiny/"+ platform +"/Account/"+ memId +"/Character/"+ charId +"/progression/";
			console.log(charUrl);
			produceNow();
			function produceNow(){
				ajax(
					{ 
						url: charUrl, 
						type: 'json'
					}, function(data3) {
						var vanLv = data3.Response.data.progressions[15].level;
						var vanProg = data3.Response.data.progressions[15].progressToNextLevel;
						var vanNext = data3.Response.data.progressions[15].nextLevelAt;
						var cruLv = data3.Response.data.progressions[16].level;
						var cruProg = data3.Response.data.progressions[16].progressToNextLevel;
						var cruNext = data3.Response.data.progressions[16].nextLevelAt;
						var cripLv = data3.Response.data.progressions[11].level;
						var cripProg = data3.Response.data.progressions[11].progressToNextLevel;
						var cripNext = data3.Response.data.progressions[11].nextLevelAt;


						//console.log(vanExp);
						var charDetails = new UI.Menu({
							sections: [{
								title: e.item.title,
								items: [{
									title: "Power Level",
									subtitle: powerLevel
								},{
									title: "Glimmer",
									subtitle: glimmer + " / 25000"
								},{
									title: "Grimoire Score",
									subtitle: grimoireScore
								}]
							},{
								title: "Progression",
								items: [{
									title: "Vanguard Level",
									subtitle: vanLv
								},{
									title: "Vanguard Exp",
									subtitle: vanProg + " / " + vanNext
								},{
									title: "Cruicible Level",
									subtitle: cruLv
								},{
									title: "Cruicible Exp",
									subtitle: cruProg + " / " + cruNext
								},{
									title: "Cryptarch Level",
									subtitle: cripLv
								},{
									title: "Cryptarch Exp",
									subtitle: cripProg + " / " + cripNext
								}]
							},{
								title: "Primary Stats",
								items: [{
									title: "Defense",
									subtitle: defense
								},{
									title: "Intellect",
									subtitle: intellect
								},{
									title: "Decipline",
									subtitle: decipline
								},{
									title: "Strength",
									subtitle: strength
								}]
							},{
								title: "Secondary Stats",
								items: [{
									title: "Armor",
									subtitle: armor + " / 10"
								},{
									title: "Agility",
									subtitle: agility + " / 10"
								},{
									title: "Recovery",
									subtitle: recovery + " / 10"
								}]
							}]
						});
						charDetails.show();
					});
			}
		});
		*/