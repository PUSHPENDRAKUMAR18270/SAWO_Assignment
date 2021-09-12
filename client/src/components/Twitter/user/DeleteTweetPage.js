import {React,useEffect} from 'react';
import  { Redirect } from 'react-router-dom'

const DeleteTweetPage = (props)=>{
  // const id = props.match.params.id
  const id = ''
  useEffect(()=>{
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({'id':id}),
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    };
    fetch('/tweet/delete',requestOptions)
  },[])
  
  return (
    <Redirect to = '/your-tweets'/>
  )
}

export default DeleteTweetPage