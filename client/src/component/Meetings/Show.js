import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './index.css'

export default function Show(props) {
  return (
    <Card bg='Info' >
      <Card.Img className="card-image" variant='top' src={props.image} />
      <Card.Body className="card-body">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className='text'>
          {props.description}
        </Card.Text>
        <Link to={{
          pathname: `/rooms/${props.title}`,
          state: {
            title: props.title,
          }
        }}>
          <button class="btn btn-danger" type="submit" >
            Join
          </button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Room ID:{props.room}; Category: {props.category}; Game: {props.game}</Card.Footer>
    </Card>
  );
}


