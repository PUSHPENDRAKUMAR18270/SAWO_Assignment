import {useState,React, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import  { useParams } from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../Nav/NavBar'
import '../CSS/TweetPage.css'

toast.configure();

const EditTweetPage = ()=>{
  
  const { id } = useParams()
  const [tweet, updateTweet] = useState("")
  const handleTweetBoxChange = (e)=>{
    updateTweet(e.target.value)
  }
  useEffect(()=>{
    const requestOptions = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    };
    let url = "/api/tweet/"+id
    fetch(url,requestOptions)
    .then(response =>response.json())
    .then(data =>{
        updateTweet(data['tweet'])
    })
  },[id])
  const editTweet = (e)=>{
      e.preventDefault()
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify({'id':id,'tweet':tweet}),
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      };
      fetch('/api/tweet/edit',requestOptions)
      .then((res)=> {
        if (res.status >= 400) {
          toast.error('error occured! please try again')
        }
        else{
          toast.success('Your Tweet is Edited')
        }
          
      })
      .catch((error) => {
          toast.error('error occured please try again')
      });
  }
  return (
    <div>
      <Nav/>
      <Form className="tweetBox" onSubmit={editTweet}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tweet</Form.Label>
          <Form.Control  required as="textarea" rows={4} onChange={handleTweetBoxChange} defaultValue = {tweet}/>
        </Form.Group>
        <Button variant="primary" type = "submit">
          Edit
        </Button>
      </Form>
    </div>
  )
}

export default EditTweetPage