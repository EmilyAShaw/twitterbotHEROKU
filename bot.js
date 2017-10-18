console.log("the bot is starting");

var Twit = require("twit");
var brevity = require("brevity");


var config = require('./config');
//console.log(config);

 var T = new Twit(config);

 //requests/ three methodologies

 //get(); //by hashtag, by location, by user (could do user as in @peoplzoo
//post(); //tweeting, poetry machine i.e
//stream(); //connecting continously, like connecting certain events. (i.e. if someone @mentions)

var cars = 
[
"\nDawn gifts a soft touch\n An invitation to love\n Sweetest surrender",
 "\nYour cinnamon skin\naromatic and sensual\non tip of my tongue ",
  "\nLove's only weakness\nIs also its greatest strength:\nIt defies reason ",
   "\nYour breath in my ear\nFingertips tracing dragons\nA beautiful dream ",
    "\nPetal soft kisses\nwe open up like flowers\nfor love's touch blooming ",
     "\nWhen love leaves\nIt takes the heart\nToo ",
      "\nMy love is like the paint brush\nPainting all of my longing\nInto 'being'",
       "\nFlowers of love\nCarry the scent of ocean within\nAnd hues of passion in the heart",
        "\nToo fearful to love\nheart snaps in two like a twig\nburn it as kindle.",
         "\nstill filled with water\nher vase of wilted roses\n",
        
         ]


var arrayNo = Math.floor((Math.random() * 10) + 1);
/*
var params = {
	q: '@peoplezoopoetry' ,
	count: 2
}

T.get('search/tweets', params, gotData);


T.post('statuses/update', { 

	status: 'hello world'  + cars[arrayNo]

}, function(err, data, response) {
  console.log(data)
})

	 

function gotData(err, data, response) {
  var tweets = data.statuses;
  for (var i = 0; i<tweets.length; i++){
  	console.log(tweets[i].text);
  }
}
*/




var maxLength = 66; 
var retweetBody = 0;
var DontRetweetOwnTweet = cars[arrayNo];






function retweetRecent() {
T.get('search/tweets', {q: "#peoplezoo", result_type: "recent"}, function (err, data,response) {
if (!err) {
var tweet = data.statuses[0];
var tooLong = '@' + tweet.user.screen_name + ' sorry, your tweet was too long for my poetry, it was ';

var lengthMesureString =  tweet.text 

var length = brevity.tweetLength(lengthMesureString);
var difference = length - maxLength;


		if ((length - maxLength) <= maxLength){
			retweetBody = lengthMesureString + cars[arrayNo] + '\n - @' + tweet.user.screen_name 

		}
		if ((length - maxLength) >= maxLength ) {

			retweetBody = tooLong + ' ' + difference + ' characters long'
		}
		 if (tweet.user.screen_name == "PeopleZooPoetry"){
		 	retweetBody = DontRetweetOwnTweet
		 }


		
//+ cars[6];






	T.post('statuses/update',{status:retweetBody}, function (err,response) {




		if (response) {
		console.log('Quote Tweeted Tweet ID: ' + tweet.id_str);
		}

		if (err) {
		console.log('Quote Tweet Error: ' + 'status was:;' + retweetBody, err);
	
		}

	});

} else {
console.log('Search Error: ', err);
}
});
}

retweetRecent();
setInterval(retweetRecent, 1800000);