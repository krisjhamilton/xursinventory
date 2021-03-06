//var CACHE_INVALIDATE = false;
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var xurResponse = {};
var xurHere = false;

var splashTextColor = 'yellow';
var splashBgColor = 'black'; 
var menuTextColor = 'white';
var menuTextHLColor = 'black';
var menuBgColor = 'black';
var menuBgHLColor = 'yellow';

var basalt = false;

if(Pebble.getActiveWatchInfo) {
	basalt = true;
}else{
	basalt = false;
}

if(basalt){
	var watchinfo = Pebble.getActiveWatchInfo();
	var platform = watchinfo.platform;
	console.log(platform);
	console.log('basalt');
	splashTextColor = 'yellow';
	splashBgColor = 'black'; 
	menuTextColor = 'white';
	menuBgColor = 'black';
	menuTextHLColor = 'black';
	menuBgHLColor = 'yellow';
}else{
	console.log('aplite');
	splashTextColor = 'white';
	splashBgColor = 'black'; 
	menuTextColor = 'black';
	menuBgColor = 'white';
	menuTextHLColor = 'white';
	menuBgHLColor = 'black';
}

// Show splash screen while waiting for data
var splashWindow = new UI.Window({
	backgroundColor: 'black',
	fullscreen: true
});

// Text element to inform user
var text = new UI.Text({
	position: new Vector2(0, 50),
	size: new Vector2(144, 168),
	text:'Checking if Xur \n is around',
	font:'GOTHIC_14_BOLD',
	color: splashTextColor,
	textOverflow:'wrap',
	textAlign:'center',
	backgroundColor: splashBgColor
});	

// Second Text element to inform user
var text2 = new UI.Text({
	position: new Vector2(0, 50),
	size: new Vector2(144, 168),
	text:'Xur in not \n around at the \n moment',
	font:'GOTHIC_14_BOLD',
	color: splashTextColor,
	textOverflow:'wrap',
	textAlign:'center',
	backgroundColor: splashBgColor
});	

var image = new UI.Image({
	position: new Vector2(58, 110),
	size: new Vector2(26, 24),
	image: 'images/main_logo_t_w.png',
	compositing: 'or'
});

splashWindow.add(text);
splashWindow.add(image);
splashWindow.show();

function parseFeed(data) {
	var items = [];
	var placeHolder = data.Response.definitions.items;
	//console.log(Object.keys(placeHolder).length); // Test for the variable "placeHolder" in order to count the number of items by 'key'
	for (var key in placeHolder) {
		if (placeHolder.hasOwnProperty(key)) {
			var val = placeHolder[key];
			console.log(val);

			function itemInfo(){
				var itemName;
				var itemTypeName;
				var itemDescription;
				var classType;
				var itemType;
				itemName = val.itemName;
				itemTypeName = val.itemTypeName;
				itemDescription = val.itemDescription;
				classType = val.classType;
				itemType = val.itemType;
				items.push({
					title: itemTypeName,
					subtitle: itemName,
					body: itemDescription,
					classType: classType
				});
			}
			switch (val.itemType) {
				case 2:
					itemInfo();
					break;
				case 3:
					itemInfo();
					break;
				case 8:
					itemInfo();
					break;
				default:
					break;
			}
		}
	}
	return items;
}

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
		console.log(xursCode + "hi");
		if(Object.getOwnPropertyNames(xursCode).length === 0){
			splashWindow.add(text2);
			splashWindow.add(image);
			return false;
		}else{
			xurHere = xurResponse.Response.definitions.vendorDetails['2796397637'].summary.visible;
			//console.log(xurHere); // For testing the out put of the variable "xurHere"
			if(xurHere === true){
				//var placeHolder = xurResponse.Response.definitions.items.[909225554].itemName;
				//console.log(placeHolder + "hi");
				var menuItems = parseFeed(xurResponse);
				//console.log(menuItems);
				var resultsMenu = new UI.Menu({
					backgroundColor: menuBgColor,
					textColor: menuTextColor,
					highlightTextColor: menuTextHLColor,
					highlightBackgroundColor: menuBgHLColor,

					//backgroundColor: 'VividCerulean',
					sections: [{
						title: "Xur's Items",
						items: menuItems
					}]

				});
				// Add an action for SELECT
				resultsMenu.on('select', function(e) {	
					if(e.item.classType === 0){
						var card1 = new UI.Card({
							bodyColor: 'black',
							titleColor:"black",
							subtitleColor:"black",
							title: 'Titan ' + e.item.title,
							subtitle: e.item.subtitle,
							body: 'Description: \n' +e.item.body,
							scrollable: true,
							style: "small",
							backgroundColor: 'yellow',
							//textColor: 'white'
						});
						card1.show();
					}else if(e.item.classType === 1){
						var card2 = new UI.Card({
							bodyColor: 'black',
							titleColor:"black",
							subtitleColor:"black",
							title: 'Hunter ' + e.item.title,
							subtitle: e.item.subtitle,
							body: 'Description: \n' +e.item.body,
							scrollable: true,
							style: "small",
							backgroundColor: 'yellow',
							//textColor: 'white'
						});
						card2.show();
					}else if(e.item.classType === 2){
						var card3 = new UI.Card({
							bodyColor: 'black',
							titleColor:"black",
							subtitleColor:"black",
							title: 'Warlock ' + e.item.title,
							subtitle: e.item.subtitle,
							body: 'Description: \n' +e.item.body,
							scrollable: true,
							style: "small",
							backgroundColor: 'yellow',
							//textColor: 'white'
						});
						card3.show();
					}else{
						var card4 = new UI.Card({
							bodyColor: 'black',
							titleColor:"black",
							subtitleColor:"black",
							title: e.item.title,
							subtitle: e.item.subtitle,
							body: '\n Description: \n' +e.item.body,
							scrollable: true,
							style: "small",
							backgroundColor: 'yellow',
							//textColor: 'white'
						});
						card4.show();
					}

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