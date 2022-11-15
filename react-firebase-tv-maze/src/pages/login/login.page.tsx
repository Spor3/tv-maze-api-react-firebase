

//Import hooks 
import { useState } from "react";
import { Container } from "react-bootstrap";
//Imports bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
//Imports firebaseAuth service
import { loginUser } from '../../_service/firebase/firebaseAuth.service'

const Login = () => {

    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        const email = event.target[0].value as string;
        const password = event.target[1].value as string;

        loginUser(email, password)
            .then(() => navigate('/'))
            .catch(err => setLoginError(err));

    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {loginError ? <div>{loginError}</div> : ''}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )

}

export default Login