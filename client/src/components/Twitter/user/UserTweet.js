import {Card} from 'react-bootstrap';


const UserTweet = (props)=>{

  return(
    <div>
        <Card style={{ width: '30rem','margin':'20px','marginLeft':'10%','alignItems':'left', 'float':'left'}}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">lastModified: {props.lastModifiedOn}</Card.Subtitle>
            <Card.Text>
              {props.tweet}
            </Card.Text>
            <Card.Link href={"/tweet/edit/"+props.id}>Edit</Card.Link>
            <Card.Link href={"/tweet/delete/"+props.id}>Delete</Card.Link>
          </Card.Body>
        </Card>
    </div>
  )
}
export default UserTweet