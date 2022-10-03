class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (/completed/.test(this.text)==true || /posted/.test(this.text)==true){
            return 'completed_event';
        }else if (/now/.test(this.text)==true || /watch/.test(this.text)==true){
            return 'live_event';
        }else if (/Achieved/.test(this.text)==true) {
            return 'achievement';
        }else {
            return 'miscellaneous';
        }
    }
    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (/ - /.test(this.text)==true) {
            return true;
        } else {
            return false;
        }
        
    }
    
    get writtenText():string {
        if (!this.written) {
            return "";
        } else {
            var http=this.text.toLowerCase().indexOf("http");
            var start=this.text.indexOf('-')+2;
            var writing="";
            for (let i=start; i<http; i++) {
                writing+=this.text[i];
            }
            return writing;
        }
    }
    
    get activityType() {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        else {
            if (this.written==true) {
                var type='';
                for (let i=0; i < this.text.indexOf('-'); i++) {
                    type+=this.text[i]
                }
                var result='';
                if (/km/.test(type)==true) {
                    var start=this.text.indexOf('km')+3;
                    for (let i=start; i < (this.text.indexOf('-')); i++) {
                        if (this.text[i]==' ') {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                    
                }
                else if (/mi/.test(type)==true) {
                    var start=this.text.indexOf('mi')+3;
                    for (let i=start; i < (this.text.indexOf('-')); i++) {
                        if (this.text[i]==" ") {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                } else {
                    if (/an/.test(type)==true && this.text[this.text.indexOf('an')+2]==' ') {
                        var start=this.text.indexOf('an')+3;
                    }
                    else {
                        var start=this.text.indexOf('a')+2;
                    }
                    for (let i=start; i < (this.text.indexOf('-')); i++) {
                        if (this.text[i]==" ") {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                }
            } if (this.written==false) {
                var type='';
                for (let i=0; i < this.text.indexOf('Runkeeper'); i++) {
                    type+=this.text[i]
                }
                var result='';
                if (/km/.test(type)==true) {
                    var start=this.text.indexOf('km')+3;
                    for (let i=start; i < (this.text.indexOf('Runkeeper')); i++) {
                        if (this.text[i]==' ') {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                    
                }
                else if (/mi/.test(type)==true) {
                    var start=this.text.indexOf('mi')+3;
                    for (let i=start; i < (this.text.indexOf('Runkeeper')); i++) {
                        if (this.text[i]==" ") {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                } else {
                    if (/an/.test(type)==true && this.text[this.text.indexOf('an')+2]==' ') {
                        var start=this.text.indexOf('an')+3;
                    }
                    else {
                        var start=this.text.indexOf('a')+2;
                    }
                    for (let i=start; i < (this.text.indexOf('Runkeeper')); i++) {
                        if (this.text[i]==" ") {
                            if (result == 'activity') {
                                return 'unknown';
                            } else {
                                return result;
                            }
                        }
                        result += this.text[i];
                    }
                }

            } 
        }
    }

    get distance() {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        else {
            if (/mi/.test(this.text.toLowerCase())==true) {
                var num = this.text.match(/\d+(.){1}\d*/);
                if (num != null) {
                    return parseFloat(num[0]);
                } else {
                    return 'unknown';
                }
                
            } if (/km/.test(this.text.toLowerCase())==true) {
                var num = this.text.match(/\d+(.){1}\d*/);
                if (num != null) {
                    return parseFloat(num[0])/1.609;
                } else {
                    return 'unknown';
                }
            } 
        }
    }

    get weekday() {
        var day = this.time.toDateString()
        if (/sun/.test(day.toLowerCase())==true) {
            return 'Sun';
        } if (/sat/.test(day.toLowerCase())==true) {
            return 'Sat';
        } if (/fri/.test(day.toLowerCase())==true) {
            return 'Fri';
        } if (/thu/.test(day.toLowerCase())==true) {
            return 'Thu';
        } if (/wed/.test(day.toLowerCase())==true) {
            return 'Wed';
        } if (/tue/.test(day.toLowerCase())==true) {
            return 'Tue';
        } if (/mon/.test(day.toLowerCase())==true) {
            return 'Mon';
        }
    }

    getHTMLTableRow(rowNumber: number) {
        var start=this.text.indexOf('http')
        rowNumber=0;
        for (let i=start; i<this.text.length; i++) {
            if (this.text[i]==' ') {
                break;
            }
            rowNumber++;
        }
        var link=this.text.substring(start, start+rowNumber);
        return link;
    }
}