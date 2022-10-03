function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	var info = new Array();
	var firstGraph = new Array();
	var allActivity=[];
	for (let i=0; i<tweet_array.length; i++) {
		var type=tweet_array[i].activityType;
		if (allActivity.includes(type)==false  && type != "unknown" ) {
			allActivity.push(type);
		}
	}

	document.getElementById("numberActivities").innerHTML=allActivity.length;

	var eachCount=[];
	var element=0;
	while (element < allActivity.length) {
		var currentCount=0
		for (let i=0; i<tweet_array.length; i++) {
			let type=tweet_array[i].activityType
			if (type==allActivity[element]) {
				currentCount++
			}
		}
		eachCount.push(currentCount);
		element++;
	}

	var maxCount=0;
	var maxType='';
	for (let i=0; i<allActivity.length; i++){
		let dict={};
		dict['Type']=allActivity[i];
		dict['Count']=eachCount[i];
		firstGraph.push(dict);
		if (eachCount[i]>maxCount) {
			maxCount=eachCount[i];
			maxType=allActivity[i];
		}
	}
	document.getElementById("firstMost").innerHTML=maxType;

	var secondCount=0;
	var secondType='';
	for (let i=0; i<allActivity.length; i++){
		if (eachCount[i]>secondCount && eachCount[i]!=maxCount) {
			secondCount=eachCount[i];
			secondType=allActivity[i];
		}
	}
	document.getElementById("secondMost").innerHTML=secondType;

	var thirdCount=0;
	var thirdType='';
	for (let i=0; i<allActivity.length; i++){
		if (eachCount[i]>thirdCount && eachCount[i]!=maxCount && eachCount[i] != secondCount) {
			thirdCount=eachCount[i];
			thirdType=allActivity[i];
		}
	}
	document.getElementById("thirdMost").innerHTML=thirdType;


	for (let i=0; i<tweet_array.length; i++) {
		let dict = {};
		let distance=tweet_array[i].distance;
		let type=tweet_array[i].activityType;
		if (type==maxType || type==secondType || type==thirdType) {
			dict["distance"]=distance
			dict["activityType"]=type
			dict["weekday"]=tweet_array[i].weekday
			info.push(dict)
		}
	}

	var mean = [];
	var everyType=[];
	var thirdActivityDistance=0;
	var thirdActivityCount=0;
	var thirdAverage=0;
	for (let i=0; i<tweet_array.length; i++) {
		let type=tweet_array[i].activityType;
		let distance=tweet_array[i].distance;
		if (type==thirdType && distance!=null) {
			thirdActivityCount++;
			thirdActivityDistance+=distance;
		}
	}
	thirdAverage=thirdActivityDistance/thirdActivityCount;
	everyType.push(thirdType);
	mean.push(thirdAverage);

	var secondActivityDistance=0;
	var secondActivityCount=0;
	var secondAverage=0;
	for (let i=0; i<tweet_array.length; i++) {
		let type=tweet_array[i].activityType;
		let distance=tweet_array[i].distance;
		if (type==secondType && distance!=null) {
			secondActivityCount++;
			secondActivityDistance+=distance;
		}
	}
	secondAverage=secondActivityDistance/secondActivityCount;
	everyType.push(secondType);
	mean.push(secondAverage);


	var maxActivityDistance=0;
	var maxActivityCount=0;
	var maxAverage=0;
	for (let i=0; i<tweet_array.length; i++) {
		let type=tweet_array[i].activityType;
		let distance=tweet_array[i].distance;
		if (type==maxType && distance!=null) {
			maxActivityCount++;
			maxActivityDistance+=distance;
		}
	}
	maxAverage=maxActivityDistance/maxActivityCount;
	everyType.push(maxType);
	mean.push(maxAverage);
	console.log(mean);

	var maxDis=0;
	for (let i=0; i<mean.length; i++) {
		if (mean[i]>maxDis) {
			maxDis=mean[i];
		}
	}

	var minDis=maxDis;
	for (let i=0; i<mean.length; i++) {
		if (mean[i]<minDis) {
			minDis=mean[i];
		}
	}

	for (let i=0; i<mean.length; i++) {
		if (mean[i]==maxDis) {
			document.getElementById("longestActivityType").innerHTML=everyType[i];
		} if (mean[i]==minDis) {
			document.getElementById("shortestActivityType").innerHTML=everyType[i];
		}
	}

	var allDay=[];
	var allAvg=[];
	var monDistance=0;
	var monCount=0;
	var tueDistance=0;
	var tueCount=0;
	var wedDistance=0;
	var wedCount=0;
	var thuDistance=0;
	var thuCount=0;
	var friDistance=0;
	var friCount=0;
	var satDistance=0;
	var satCount=0;
	var sunDistance=0;
	var sunCount=0;
	for (let i=0; i<tweet_array.length; i++) {
		let day=tweet_array[i].weekday;
		let distance=tweet_array[i].distance;
		if (day=='Sun' && distance!=null) {
			sunDistance+=distance;
			sunCount++;
		} if (day='Sat' && distance!=null) {
			satDistance+=distance;
			satCount++;
		} if (day=='Fri' && distance!=null) {
			friDistance+=distance;
			friCount++;
		} if (day=='Thu' && distance!=null) {
			thuDistance+=distance;
			thuCount++;
		} if (day=='Wed' && distance!=null) {
			wedDistance+=distance;
			wedCount++;
		} if (day=='Tue' && distance!=null) {
			tueDistance+=distance;
			tueCount++;
		} if (day=='Mon' && distance!=null) {
			monDistance+=distance;
			monCount++;
		}
	}
	allAvg.push(sunDistance/sunCount);
	allDay.push('Sunday');

	allAvg.push(satDistance/satCount);
	allDay.push('Saturday');

	allAvg.push(friDistance/friCount);
	allDay.push('Friday');

	allAvg.push(thuDistance/thuCount);
	allDay.push('Thursday');

	allAvg.push(wedDistance/wedCount);
	allDay.push('Wednesday');

	allAvg.push(tueDistance/tueCount);
	allDay.push('Tuesday');

	allAvg.push(monDistance/monCount);
	allDay.push('Monday');

	var maxDisWeek=0;
	for (let i=0; i<allAvg.length; i++) {
		if (allAvg[i]>maxDisWeek) {
			maxDisWeek=allAvg[i];
		}
	}
	for (let i=0; i<allAvg.length; i++) {
		if (allAvg[i]==maxDisWeek) {
			document.getElementById('weekdayOrWeekendLonger').innerHTML=allDay[i];
		}
	}




	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": firstGraph
	  },
	  //TODO: Add mark and encoding
	  "mark" : "bar",
	  "width" : 1300,
	  "height" : 400,
	  "encoding": {
		  "x": {
			  "field": "Type",
			  "type" : "nominal",
			  "axis": { 'labelAngle': 0}
		  },
		  
		  "y": {
			"field": "Count",
			"type" : "quantitative",
		},
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	activity_vis_spec1 = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distance of three most popular activities in a week.",
		"data" : {
			"values": info
		},

		"mark": "point",
		"width": 200,
		"encoding": {
			"x": {
				"field": "weekday",
				"type": "nominal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {
					'labelAngle': 0
				}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
			},

			"color": {
				"field": "activityType"
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', activity_vis_spec1, {action:false});

	activity_vis_spec2 = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the average distance of three most popular activities in a week.",
		"data" : {
			"values": info
		},

		"mark": "point",
		"width": 200,
		"encoding": {
			"x" : {
				"field": "weekday",
				"type": "nominal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {
					'labelAngle': 0
				}
			},
			"y": {
				"field": "distance",
				"type": "quantitative",
				"aggregate": "mean"
			},

			"color": {
				"field": "activityType"
			}
		}
	};

	document.getElementById("aggregate").setAttribute('onClick', 'toggle()');
	


}

function toggle() {
	if(document.getElementById("aggregate").innerHTML=="Show means"){
	  document.getElementById("aggregate").innerHTML="Show all activities";
	  document.getElementById("distanceVisAggregated").style.display="block";
	  document.getElementById("distanceVisAggregated").innerText=vegaEmbed
	  ('#distanceVisAggregated', activity_vis_spec2, {action:false});
	  document.getElementById("distanceVis").style.display="none";
	}
	else{
		document.getElementById("aggregate").innerHTML="Show means";
		document.getElementById("distanceVis").style.display="block";
		document.getElementById("distanceVis").innerText=vegaEmbed('#distanceVis', activity_vis_spec1, {action:false});
		document.getElementById("distanceVisAggregated").style.display="none";
	}
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});