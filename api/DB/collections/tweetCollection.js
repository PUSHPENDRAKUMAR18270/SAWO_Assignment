const mongoose = require("mongoose");

/**
 * 
 * @returns Model For Tweets Collection
 */
module.exports.getTweetsCollection = function () {
    const tweetsCollection = mongoose.Schema({
        'tweet':String,
        'lastModifiedOn':String,
        'postedBy':String
    });
    return mongoose.model("tweets", tweetsCollection);
};

module.exports.fetchUserTweets = function(response,TweetModel,username){
  TweetModel.find({'postedBy':username},function(err,tweets){
        if(err){
            response.send(err);
        }
        else{
            response.json(tweets);
        }
    })
}

module.exports.fetchUserFeed = function(response,TweetModel,username){
    TweetModel.find({'postedBy':{$ne:username}},function(err,tweets){
          if(err){
              response.send(err);
          }
          else{
              response.json(tweets);
          }
      })
  }