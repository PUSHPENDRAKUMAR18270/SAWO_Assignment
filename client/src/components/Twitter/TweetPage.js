import {useState,React} from 'react';
import {Form,Button} from 'react-bootstrap';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../components/Nav/NavBar'
import './CSS/TweetPage.css'

toast.configure();

const TweetPage = ()=>{
  
  const [tweet, updateTweet] = useState("")

  const handleTweetBoxChange = (e)=>{
    updateTweet(e.target.value)
  }
  const postTweet = (e)=>{
      e.preventDefault()
      const postedBy = JSON.parse(localStorage.getItem('user'))['identifier']
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify({'tweet':tweet,'postedBy':postedBy}),
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      };
      fetch('/tweet',requestOptions)
      .then(()=> {
          toast.success('Your Tweet is Posted')
      })
      .catch((error) => {
          toast.error('error occured please try again')
      });
  }
  return (
    <div>
      <Nav/>
      <Form className="tweetBox" onSubmit={postTweet}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Tweet</Form.Label>
          <Form.Control  required as="textarea" rows={4} onChange={handleTweetBoxChange} />
        </Form.Group>
        <Button variant="primary" type = "submit">
          Tweet
        </Button>
      </Form>
    </div>
  )
}

export default TweetPage