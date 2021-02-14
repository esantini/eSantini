


/* Animated Logo *\/*
#whiteLettersGroup path {
	stroke: #d5d5d5;
	stroke-width: 2;
	
}
#replayDiv {
	opacity: 0;
	
	-webkit-transition-property: opacity;
	-moz-transition-property: opacity;
	-o-transition-property: opacity;
	-ms-transition-property: opacity;
	transition-property: opacity;
	
	-webkit-transition-duration: 0.5s;
	-moz-transition-duration: 0.5s;
	-o-transition-duration: 0.5s;
	-ms-transition-duration: 0.5s;
	transition-duration: 0.5s;
}
#replayDiv.ready {
	opacity: 1;
}

*/


var eSlogo = Snap.select("#esantiniLogoSVG").attr({ opacity: 0 });
var s0 = "m 146.1,28.66 0,0 c 0.7,-3.23 2,-4.5 4,-4.4 3.2,0.15 7.5,4.52 5.6,7.86 l 0,0 0,0 0,0 0,0 0,0 0,0 c -2,1.93 -2.9,3.46 -7,4 -4.9,0.34 -3,-3.97 -2.6,-7.46 z"
	, s1 = "m 145.9,17.99 0,0 c 0,0 -9.7,-5.87 -8.2,-9.884 1.7,-4.704 13.3,-3.497 14.7,-2.886 l 0,0 0,0 0,0 0,0 0,0 c 6.1,1.81 7.8,9.41 7.9,11.81 0.2,3.81 -0.8,17.32 -11.6,19.09 -8.3,0.81 1.7,-11.62 -2.8,-18.13 z"
	, s2 = "m 123.2,18.53 0,0 c 0,0 -7.1,2.1 -8.1,-0.4 -1.9,-4.59 10,-11.052 10,-11.052 l 0,0 0,0 0,0 0,0 0,0 c 0,0 15.4,-6.4585 27.3,-1.858 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -4.7,-0.32 -17.4,2.11 -17.4,2.11 z"
	, s3 = "m 105.6,33.77 0,0 c 0,0 -12.11,12.78 -18.33,9.76 -2.55,-1.24 -1.48,-8.39 -1.48,-8.39 l 0,0 0,0 0,0 6.8,-7.69 c 5.46,-5.04 11.51,-9.67 14.61,-11.83 12.6,-8.862 29.8,-16.4 45.2,-10.4 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -18.1,0.85 -28.5,11.17 -35,17.35 z"
	, s4 = "m 107.5,99.48 0,0 c 6,11.02 11.3,20.12 4.1,23.72 -8.7,4.3 -17.02,-14.3 -19.86,-21.4 l 0,0 0,0 0,0 C 86.02,91.2 75.03,80.69 76,58.92 c 1.62,-18.8 16.8,-33.1 31.2,-43.3 12.6,-8.92 29.8,-16.4 45.2,-10.4 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -17.3,0.1 -31.5,12.4 -42.01,24.8 -15.73,22.31 -5.25,38.55 8.91,58.26 z"
	, s5 = "m 112.8,135.5 0,0 c -1.8,2.5 -9.1,14.6 -14.57,11.6 -6.87,-3.8 4.57,-13.5 2.57,-23.4 l 0,0 0,0 C 100.6,121 96.07,109.2 90.74,100 83.8,88.99 74.63,76.15 76,58.92 c 1.62,-18.8 16.8,-33.1 31.2,-43.3 12.6,-8.92 29.8,-16.4 45.2,-10.4 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -17.3,0.1 -31.5,12.4 -42.01,24.8 -10.2,12.1 -10.1,29.2 -1.37,42.7 8.88,13.7 17.88,26.68 17.98,38.28 -0.3,4.4 -0.7,11 -2.4,13.3 z"
	, s6 = "m 71.82,164.5 0,0 c -4.27,1.5 -28.06,9.7 -27.71,2.1 0.23,-4.9 22.94,-7.2 35.68,-15.5 l 0,0 0,0 C 102.5,140.3 103.4,126.3 99,115.9 91,97.12 74.1,80.82 76,58.92 c 1.62,-18.8 16.8,-33.1 31.2,-43.3 12.6,-8.92 29.8,-16.4 45.2,-10.4 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -17.3,0.1 -31.5,12.4 -42.01,24.8 -10.2,12.1 -10.1,29.2 -1.37,42.7 8.88,13.7 21.08,29.28 17.28,46.38 -4.3,19.2 -25.68,28 -42.68,34.2 z"
	, s7 = "m 20.82,170.1 c -4.77,-1 -5.51,-1.8 -7.23,-3.2 -3.35,-2.9 -1.63,-9.5 -0.67,-9.4 1.34,0.2 7.16,3.9 10.8,5.1 6.53,1.7 15.01,1.4 24.21,-0.3 15.6,-2.8 30.2,-8.6 43.2,-18.1 C 100.4,137.5 103.4,126.3 99,115.9 91,97.12 74.1,80.82 76,58.92 c 1.62,-18.8 16.8,-33.1 31.2,-43.3 12.6,-8.92 29.8,-16.4 45.2,-10.4 13.6,5.4 8,29.7 -3.7,30.9 -9.8,0.96 6.9,-19.8 -8.1,-19.7 -17.3,0.1 -31.5,12.4 -42.01,24.8 -10.2,12.1 -10.1,29.2 -1.37,42.7 8.88,13.7 21.08,29.28 17.28,46.38 -4.3,19.2 -25.68,28 -42.68,34.2 -16.1,5.9 -33.8,8.4 -51,5.6 z"
	, sLast = "m20.5 170c-14.7-2.38-11-18.5-2.27-26.4 6.29-5.69 18-17.3 23.2-17-7.02 10.4-21.1 16.7-23.8 28.9-2.35 10.6 21.1 8.49 30.3 6.82 15.6-2.84 30.2-8.66 43.2-18.1 9.3-6.77 12.3-17.9 7.87-28.3-8-18.8-24.9-35.1-23-57 1.62-18.8 16.8-33.1 31.2-43.3 12.6-8.92 29.8-16.4 45.2-10.4 13.6 5.4 8.02 29.7-3.73 30.9-9.76.96 6.97-19.8-8.08-19.7-17.3.0596-31.5 12.4-42 24.8-10.2 12.1-10.1 29.2-1.37 42.7 8.87 13.7 21.1 29.3 17.3 46.4-4.28 19.2-25.7 28-42.7 34.2-16.1 5.87-33.8 8.37-51 5.58z"
	;

eSlogo.select("#whiteLettersGroup").attr({ fillOpacity: 0 });
eSlogo.select("#letterS").attr({ d: s0 });

eSlogo.select("#spiderWeb").attr({ opacity: 0, d: "m 111.53315,138.63121 c 0,0 0.0121,-0.83318 0.0121,-0.94047 0,-0.13026 0.0594,-3.39257 2.53354,-6.19074 0,0 -0.336,0.482 -1.34,0 l -0.303,-3.27 c 0.118,5.93 -1.11828,2.45412 -1.11828,8.80355 0,0.4156 -0.0126,1.59043 -0.0126,1.59043 0.09,0.0959 0.22824,0.007 0.22824,0.007 z" });

eSlogo.select("#spider").attr({ transform: 't0,-80s0,0' });


var whiteLetters = [
	['letterE'],
	['letterA'],
	['letterN1'],
	['letterT'],
	['letterI1'],
	['letterN2'],
	['letterI2']
]
webDevLetters = [
	['webDevelopingW', -20, 0],
	['webDevelopingE', -17, 6],
	['webDevelopingB', -14, 12],
	['webDevelopingD', -11, 18],
	['webDevelopingE2', -8, 24],
	['webDevelopingV', -4, 30],
	['webDevelopingE3', 00, 40],
	['webDevelopingL', 04, 45],
	['webDevelopingO', 08, 40],
	['webDevelopingP', 11, 35],
	['webDevelopingI', 14, 30],
	['webDevelopingN', 17, 25],
	['webDevelopingG', 20, 25]
],
	componentsWhite = [],
	componentsWebDev = [],
	i = 0,
	j = 0,
	k = 0,
	isLogoAnimated = false,
	replayReady = false;

var setLetters = function () {
	for (i = 0; i < whiteLetters.length; i++) {
		var el = whiteLetters[i]
		elid = el[0];
		element = eSlogo.select("#" + elid);
		element.attr({ opacity: 1 });
		componentsWhite.push(element);
	};
	for (i = 0; i < webDevLetters.length; i++) {
		var el = webDevLetters[i]
		elid = el[0];
		element = eSlogo.select("#" + elid);
		element.attr({ opacity: 0, transform: "t" + (el[1]) + "," + (el[2]) });
		componentsWebDev.push(element);
	};
};
setLetters();

function animateWhiteLetters() {
	if (!componentsWhite[j]) return;
	componentsWhite[j].animate({
		transform: "t" + (0) + "," + (0),
		"fill-opacity": 1
		//,opacity: 1
	}, 500, mina.easeout);
	setTimeout(animateWhiteLetters, 300);

	j++;
};

function animateWebDev() {
	if (!componentsWebDev[k]) {
		setTimeout(function () { replayIsReady() }, 1000);
		return;
	}
	componentsWebDev[k].animate({
		transform: "t" + (0) + "," + (0),
		opacity: 1
	}, 300, mina.easeout);
	setTimeout(animateWebDev, 50);

	k++;
};

function showSpider() {
	var spider = eSlogo.select("#spider");
	eSlogo.select("#spiderWeb").attr({ opacity: 1 });

	spider.animate({ transform: 't0,-80s1,1' }, 300, mina.easinout);
}
function animateSpiderWeb() {
	var duration = 1000;
	var spiderWeb = eSlogo.select("#spiderWeb");
	var spider = eSlogo.select("#spider");
	spiderWeb.animate({ d: "m 111.53315,218.40392 c 0,0 0.0121,-72.51336 0.0121,-72.62065 0,-0.13026 0.0594,-11.4851 2.53354,-14.28327 0,0 -0.336,0.482 -1.34,0 l -0.303,-3.27 c 0.118,5.93 -1.11828,10.54665 -1.11828,16.89608 0,0.4156 -0.0126,73.27061 -0.0126,73.27061 0.09,0.0959 0.22824,0.007 0.22824,0.007 z" }
		, duration, mina.backout);
	spider.animate({ transform: 'translate(0,0)' }, duration, mina.backout);
}

function animateLetterS1() {
	var dur = 25;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s1 }
		, 25, mina.easinout);

	setTimeout(function () { animateLetterS2(); }, dur);
}
function animateLetterS2() {
	var dur = 25;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s2 }
		, dur, mina.easinout);

	setTimeout(function () { animateLetterS3(); }, dur);
}
function animateLetterS3() {
	var dur = 150;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s3 }
		, dur, mina.easinout);

	setTimeout(function () { animateLetterS4(); }, dur);
}
function animateLetterS4() {
	var dur = 150;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s4 }
		, dur, mina.easinout);

	setTimeout(function () { animateLetterS5(); }, dur);
}
function animateLetterS5() {
	var dur = 50;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s5 }, dur, mina.easinout);

	setTimeout(function () { animateLetterS6(); }, dur);
}
function animateLetterS6() {
	var dur = 100;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s6 }, dur, mina.easinout);

	setTimeout(function () { animateLetterS7(); }, dur);
}
function animateLetterS7() {
	var dur = 50;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: s7 }, dur, mina.easinout);

	setTimeout(function () { animateLetterSLast(); }, dur);
}
function animateLetterSLast() {
	var dur = 50;
	var letterS = eSlogo.select("#letterS");
	letterS.animate({ d: sLast }, dur, mina.easinout);

}

function animateLogo() {
	if (isLogoAnimated) { return };
	isLogoAnimated = true;

	eSlogo.attr({ opacity: 1 });
	setTimeout(animateWhiteLetters, 350);
	setTimeout(animateWebDev, 1750);// 1750);

	new Vivus('esantiniLogoSVG', {
		type: 'scenario-sync',
		duration: 10,
		start: 'autostart',
		dashGap: 20,
		forceRender: false
	});

	setTimeout(showSpider, 300);
	setTimeout(animateSpiderWeb, 1000);
	setTimeout(animateLetterS1, 0);


};

function replay() {
	if (replayReady) {
		replayReady = false;
		$('#replayDiv').removeClass('ready');

		eSlogo.attr({ opacity: 0 });
		j = 0;
		k = 0;
		componentsWhite = [];
		componentsWebDev = [];
		setLetters();

		$("#whiteLettersGroup path").each(function (el) {
			$($("#whiteLettersGroup path")[el]).attr({ style: "fill-opacity: 0;" });
		});

		eSlogo.select("#letterS").attr({ d: s0 });
		eSlogo.select("#spiderWeb").attr({ opacity: 0, d: "m 111.53315,138.63121 c 0,0 0.0121,-0.83318 0.0121,-0.94047 0,-0.13026 0.0594,-3.39257 2.53354,-6.19074 0,0 -0.336,0.482 -1.34,0 l -0.303,-3.27 c 0.118,5.93 -1.11828,2.45412 -1.11828,8.80355 0,0.4156 -0.0126,1.59043 -0.0126,1.59043 0.09,0.0959 0.22824,0.007 0.22824,0.007 z" });
		eSlogo.select("#spider").attr({ transform: 't0,-80s0,0' });

		isLogoAnimated = false;
		animateLogo();
	}
};

function replayIsReady() {
	replayReady = true;
	$('#replayDiv').addClass('ready');
};
