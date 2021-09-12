const express = require('express')
const cors = require('cors')

const DB = require("./DB/connection")
const tweetsDB = require("./DB/collections/tweetCollection")
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

DB.connection();
const TweetModel = tweetsDB.getTweetsCollection()


app.get('/api', (req, res) => {
  res.send('Hello from API')
});

 // update a tweet by id
app.post('/api/tweet/edit',(req,res)=>{
  const id = req.body['id']
  const tweetContent = req.body['tweet']
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();

  TweetModel.findByIdAndUpdate(id, 
    {'tweet':tweetContent,'lastModifiedOn':today.toLocaleDateString("en-US", options)},{upsert:true},
     function (err, docs) {
    if (err){
        res.send(err)
    }
    else{
        res.send("updated tweet")
    }
});
})

// delete a tweet by id
app.post('/api/tweet/delete',(req,res)=>{
  const id = req.body['id']
  TweetModel.deleteOne({_id:id},(err)=>{
    if(!err)res.send('delete tweet')
    else res.send(err)
  })
})

// post a tweet
app.post('/api/tweet',(req,res)=>{
  const postedBy = req.body['postedBy']
  const tweetContent = req.body['tweet']
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  let tweet = new TweetModel({
    'tweet':tweetContent,
    'postedBy':postedBy,
    'lastModifiedOn':today.toLocaleDateString("en-US", options)
  });
  tweet.save();
  res.send("tweeted")
})

// tweets made by user
app.post('/api/user-tweets',(req,res)=>{
  tweetsDB.fetchUserTweets(res,TweetModel,req.body['username'])
})

// tweet with given id
app.get('/api/tweet/:id',(req,res)=>{
  let id = req.params.id
  TweetModel.findById(id,(err,tweet)=>{
    if(!err) res.json(tweet)
    else res.json(err)
  })
})

// generates feed for user
app.post('/api/feed',(req,res)=>{
  tweetsDB.fetchUserFeed(res,TweetModel,req.body['username'])
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`)
});