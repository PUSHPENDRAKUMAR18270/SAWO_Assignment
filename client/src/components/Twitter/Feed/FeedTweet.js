import {Card} from 'react-bootstrap';


const FeedTweet = (props)=>{

  return(
    <div>
        <Card style={{ width: '30rem','margin':'20px','marginLeft':'10%','alignItems':'left', 'float':'left'}}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">postedBy: {props.postedBy}</Card.Subtitle>
            <Card.Text>
              {props.tweet}
            </Card.Text>
           
          </Card.Body>
        </Card>
    </div>
  )
}
export default FeedTweet