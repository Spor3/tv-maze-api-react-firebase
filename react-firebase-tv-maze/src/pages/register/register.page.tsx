//Import hooks 
import { useState } from "react";
import { Container } from "react-bootstrap";
//Imports bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
//Imports firebaseAuth service
import { registerUser } from '../../_service/firebase/firebaseAuth.service'

const Register = () => {

    const [validated, setValidated] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();

            const name = event.target[0].value as string;
            const email = event.target[1].value as string;
            const password = event.target[2].value as string;

            registerUser(email, password, name)
                .then(() => navigate('/'))
                .catch(err => setRegisterError(err));
        }

        setValidated(true);
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name or Nickname</Form.Label>
                    <Form.Control type="text" placeholder="Name or Nickname..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please insert a valid e-mail
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Password" required minLength={8} />
                    <Form.Control.Feedback type="invalid">
                        Min. Lenght 8 characters
                    </Form.Control.Feedback>
                </Form.Group>
                {registerError ? <div>{registerError}</div> : ''}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Register;