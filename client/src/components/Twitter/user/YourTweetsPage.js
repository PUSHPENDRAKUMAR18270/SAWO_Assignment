import {React,useEffect,useState} from 'react';
import Nav from '../../Nav/NavBar'
import UserTweet from './UserTweet'


const YourTweetsPage = ()=>{
  const [userTweets,setUserTweets] = useState([])
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
    fetch('/user-tweets',requestOptions)
    .then(response => response.json())
    .then((data)=> {
        setUserTweets(data)
    })
    .catch((error) => {
        console.log(error)
    });
  },[])
  return (
    <div>
      <Nav/>
      {userTweets.length !== 0? userTweets.map((value,index) => {
        return <UserTweet key={index} id ={value['_id']} tweet={value['tweet']} lastModifiedOn = {value['lastModifiedOn']}/>
      }):(
        <h1 style={{"margin":"50px 30% 0 30%"}}>You don't have any tweets</h1>
      )}
    </div>
  )
}

export default YourTweetsPage