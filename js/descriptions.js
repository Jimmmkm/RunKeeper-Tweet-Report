function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var text=document.getElementById('textFilter');
	var trial=document.getElementById('searchText');
	var count=document.getElementById('searchCount');
	trial.innerHTML='';
	count.innerHTML=0;
	var cc=0;
	for (let i=0; i<tweet_array.length; i++) {
		var say=tweet_array[i].writtenText
		if (say.includes('ra')==true) {
			cc++;
		}
	}

	const inputHandler=function(e) {
		var tweetCount=0;
		var div = document.getElementById("tweetTable");
		
		div.textContent='';
		for (let i=0; i<tweet_array.length; i++) {
			var row = document.createElement('tr');
			var inside1 = document.createElement('th');
			var inside2 = document.createElement('th');
			var inside3 = document.createElement('th');
			var inside4 = document.createElement('a');
			var inside5 = document.createElement('span');
			var say=tweet_array[i].writtenText;
			if (e.target.value.length==0){
				count.innerHTML=0;
				div.textContent = '';
			}
			else if (say.includes(e.target.value)==true) {
				tweetCount++;
				var start=tweet_array[i].text.indexOf('http')
				var address=tweet_array[i].getHTMLTableRow(tweetCount)
				inside4.setAttribute('href', address);
				inside4.append(address)
				inside1.textContent=tweetCount;
				inside2.textContent=tweet_array[i].activityType
				inside3.textContent=tweet_array[i].text.substring(0, start-1)+' '
				var end=tweet_array[i].text.substring(start+address.length, tweet_array[i].length)
				inside5.append(end);
				inside3.appendChild(inside4)
				inside3.appendChild(inside5)
				row.appendChild(inside1)
				row.appendChild(inside2)
				row.appendChild(inside3)
				div.appendChild(row);

			} else {
				continue;
			}
		}
		count.innerHTML=tweetCount;
		trial.innerHTML=e.target.value;
	}
	text.addEventListener('input', inputHandler)


	
}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});