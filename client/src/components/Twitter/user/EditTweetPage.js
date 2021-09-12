import {useState,React} from 'react';
import {Form,Button} from 'react-bootstrap';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../Nav/NavBar'
import '../CSS/TweetPage.css'

toast.configure();

const EditTweetPage = (props)=>{
  
  const [tweet, updateTweet] = useState("")

  const handleTweetBoxChange = (e)=>{
    updateTweet(e.target.value)
  }
  const editTweet = (e)=>{
      e.preventDefault()
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify({'id':props.id,'tweet':tweet}),
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      };
      fetch('/tweet/edit',requestOptions)
      .then(()=> {
          toast.success('Your Tweet is Edited')
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
          <Form.Control  required as="textarea" rows={4} onChange={handleTweetBoxChange} >props.tweet</Form.Control>
        </Form.Group>
        <Button variant="primary" type = "submit">
          Edit
        </Button>
      </Form>
    </div>
  )
}

export default EditTweetPage