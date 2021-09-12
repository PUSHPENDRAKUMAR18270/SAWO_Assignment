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

app.post('/api/tweet/delete',(req,res)=>{
  const id = req.body['id']
  TweetModel.remove({_id:id},(err)=>{
    if(!err)res.send('delete tweet')
    else res.send(err)
  })
})

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

app.post('/api/user-tweets',(req,res)=>{
  tweetsDB.fetchUserTweets(res,TweetModel,req.body['username'])
})

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