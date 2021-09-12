import {React,useEffect,useState} from 'react';
import Nav from '../../Nav/NavBar'
import FeedTweet from './FeedTweet'


const YourTweetsPage = ()=>{
  const [userFeed,setUserFeed] = useState([])
  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem('user'))['identifier']
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({'username':username}),
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    };
    fetch('/api/feed',requestOptions)
    .then(response => response.json())
    .then((data)=> {
        setUserFeed(data)
    })
    .catch((error) => {
        console.log(error)
    });
  },[])
  return (
    <div>
      <Nav/>
      {userFeed.length !== 0? userFeed.map((value,index) => {
        return <FeedTweet key={index} id ={value['_id']} postedBy ={value['postedBy']} tweet={value['tweet']} lastModifiedOn = {value['lastModifiedOn']}/>
      }):(
        <h1 style={{"margin":"50px 30% 0 30%"}}>There are no new feeds!!</h1>
      )}
    </div>
  )
}

export default YourTweetsPage