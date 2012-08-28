var win = Ti.UI.createWindow({
	backgroundColor : "#000",
	navBarHidden : false,
	title : "Main Window",
	width : '100%',
	height : 'auto',
});

var GridCont = Ti.UI.createScrollableView({
	showPagingControl : true,
	width : '100%',
	height : '100%',
});
win.add(GridCont);

Ti.Gesture.addEventListener('orientationchange', function(e) {
	getDashboardView();
});

getDashboardView();

win.open();


function getDashboardView(){
	var cellWidth = 92;
	var cellHeight = 92;

	var IconWidth = 128;
	var IconHeight = 128;

	var _screenW = parseInt(Titanium.Platform.displayCaps.platformWidth);
	var _screenH = parseInt(Titanium.Platform.displayCaps.platformHeight);
	
	var colorSet = [
		"#D44646",
		"#46D463",
		"#46D4BE",
		"#C2D446",
		"#D446D5",
		"#4575D5",
		"#E39127",
		"#879181",
		"#E291D4"
	];
	var colorSetIndex = 0;
	var cellIndex = 0;

	var GridView = [];
	GridCont.views = GridView;
	
	var totalIcons = 30;
	var x, y, iconH, iconW;
	
	if (_screenW > _screenH) {
		x = 4;
		y = 2;
	} else {
		x = 3;
		y = 3;
	}
	iconW = _screenW / x;
	iconH = (_screenH - (_screenH * 0.25) ) / y;
	
	IconWidth = (iconW<128) ? 92 : IconWidth;
	IconHeight = (iconH<128) ? 92 : IconHeight;
	
	cellWidth = (iconW<128) ? 64 : cellWidth;
	cellHeight = (iconH<128) ? 64 : cellHeight;


	var thisLabelFontSize = (cellWidth==92) ? 16 : 14;
	
	var tmpCnt = Math.ceil(totalIcons / (x * y));
	var totalView = (totalIcons > (x * y)) ? tmpCnt : 1;
	
	var thisView, thisView1, thisView2, thisLabel;
	
	for (var i = 0; i < totalView; i++) {
		var IconContainer = Ti.UI.createView({
			height : 'auto',
			width : 'auto',
			layout : "horizontal",
			id : i,

		});
		GridView.push(IconContainer);
		for (var j = 0; j < y; j++) {
			for (var k = 0; k < x; k++) {
				thisView = Ti.UI.createView({
					height : iconH,
					width : iconW,
					textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
					top : 0,
				});

				thisView1 = Ti.UI.createView({
					backgroundColor : "#e8e8e8",
					height : IconWidth,
					width : IconHeight,
					textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
					borderRadius : 10,
					borderColor : '#f8f8f8',
					borderWidth : 1,
				});

				
				thisView2 = Ti.UI.createView({
					backgroundColor: colorSet[colorSetIndex],
					height : cellHeight,
					width : cellWidth,
					top : 10,
				});

				thisLabel = Ti.UI.createLabel({
					color : "#000",
					top : cellHeight + 10,
					height : 22,
					font : {
						fontSize : thisLabelFontSize,
						fontWeight : 'bold'
					},
					text : 'Icon - ' + cellIndex,
				});
				thisView1.add(thisView2);
				thisView1.add(thisLabel);
				thisView.add(thisView1);
				IconContainer.add(thisView);

				cellIndex++;
				colorSetIndex++;
				
				if( colorSetIndex === colorSet.length ){
		            colorSetIndex = 0;
		        }
				if (cellIndex == totalIcons) {
					i = totalView;
					j = y;
					k = x;
				}

			}
		}

	}
	GridCont.views = GridView;	
	
}
