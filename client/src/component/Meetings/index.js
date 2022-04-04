import React, { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show";
import FilterBar from "./FilterBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css'

export default function Meetings(props) {
  useEffect(() => {
    document.title = "Meetings";  
  }, []);


  const [appointments, setAppointments] = useState([]);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get('/api/appointments'),
      axios.get('/api/games'),
      axios.get('/api/categories')
    ])
      .then((result) => {
        // all the %%%Data is an array of object
        const appointmentsData = result[0].data.appointments;
        const gamesData = result[1].data.games;
        const categoriesData = result[2].data.categories;
        setAppointments(appointmentsData);
        setGames(gamesData);
        setCategories(categoriesData);
      })
      .catch(err => console.log('Error', err));
  }, []);

  const appointmentsList = appointments.filter((appointment) => {
    if (searchTerm === '') {
      return appointment
    } else if (appointment.game.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return appointment
    }
  }).map((appointment) => {
    return (
      <Show
        key={appointment.id}
        host_id={appointment.host_id}
        room={appointment.room}
        title={appointment.title}
        description={appointment.description}
        image={appointment.image}
        category={appointment.category}
        game={appointment.game}
      />
    )
  }
  );

  return (
    <div className="appointment-container">
      <Container fluid>
        <Row>
          <Col xs lg="3">
            <FilterBar setSearchTerm={setSearchTerm} games={games} categories={categories} />
          </Col>
          <Col className="card-container">
            {appointmentsList}
          </Col>
        </Row>
      </Container>
    </div>
  );
}