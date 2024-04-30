import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Dictaphone from './Speech';

const General = () => {
    const [Data, setVoiceData] = useState();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        desc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to the server
            const response = await axios.post("http://localhost:8080/general", formData);
            console.log(response.data); // Log the response from the server
            navigate("/patients");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="background mt-4 d-flex justify-content-center align-items-center h-100">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center">General Disease Report Form</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="desc">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="desc"
                                            value={Data}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-3">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default General;
