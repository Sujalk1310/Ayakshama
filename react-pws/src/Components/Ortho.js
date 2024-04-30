import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Dictaphone from './Speech';

const Ortho = () => {
    const [Data, setVoiceData] = useState();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        img: '',
        desc: '',
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
            const response = await axios.post("http://localhost:8080/ortho", formData);
            console.log(response.data);
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
                                <h3 className="text-center">Ortho Disease Report Form</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="age">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="desc"
                                            className='h-1/2'
                                            value={Data}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Dictaphone Data={Data} setVoiceData={setVoiceData} />
                                    </Form.Group>
                                    <Form.Group controlId="xray">
                                        <Form.Label>X-Ray URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="img"
                                            value={formData.img}
                                            onChange={handleChange}
                                            required
                                        />
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

export default Ortho;
