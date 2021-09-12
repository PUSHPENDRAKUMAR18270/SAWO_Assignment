import {React,useEffect} from 'react';
import  { Redirect,useParams } from 'react-router-dom'

const DeleteTweetPage = ()=>{
  const { id } = useParams()
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
  },[id])
  
  return (
    <Redirect to = '/your-tweets'/>
  )
}

export default DeleteTweetPage