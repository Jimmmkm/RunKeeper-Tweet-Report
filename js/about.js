function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	var mt=new Array();
	var completeCount=0;
	var liveCount=0;
	var achieveCount=0;
	var misCount=0;
	var writtenText=0;
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	console.log(tweet_array[0].time)
	for (let i=0; i<tweet_array.length; i++){
		mt.push(tweet_array[i].time.toLocaleDateString(undefined, options))
		if (tweet_array[i].source=='completed_event') {
			completeCount++;
		} if (tweet_array[i].source=='achievement'){
			achieveCount++;
		} if (tweet_array[i].source=='miscellaneous'){
			misCount++;
		} if (tweet_array[i].source=='live_event') {
			liveCount++;
		} if (tweet_array[i].written == true && tweet_array[i].source=='completed_event'){
			writtenText++;
		}
	}
	
	
	document.getElementById('firstDate').innerText = mt[tweet_array.length-1]
	document.getElementById('lastDate').innerText = mt[0];
	document.getElementsByClassName('completedEvents')[0].innerText = completeCount;
	document.getElementsByClassName('completedEventsPct')[0].innerText = math.format(completeCount/tweet_array.length*100, 2)+'%';
	document.getElementsByClassName('liveEvents')[0].innerText = liveCount;
	document.getElementsByClassName('liveEventsPct')[0].innerText = math.format(liveCount/tweet_array.length*100, 2)+'%';
	document.getElementsByClassName('achievements')[0].innerText = achieveCount;
	document.getElementsByClassName('achievementsPct')[0].innerText = math.format(achieveCount/tweet_array.length*100, 2)+'%';
	document.getElementsByClassName('miscellaneous')[0].innerText = misCount;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = math.format(misCount/tweet_array.length*100, 2)+'%';
	document.getElementsByClassName('completedEvents')[1].innerText = completeCount;
	document.getElementsByClassName('written')[0].innerText = writtenText;
	document.getElementsByClassName('writtenPct')[0].innerText = math.format(writtenText/completeCount*100, 2)+'%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});