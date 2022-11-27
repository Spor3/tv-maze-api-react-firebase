//Import hooks 
import { useState } from "react";
import { Container } from "react-bootstrap";
//Imports bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
//Imports firebaseAuth service
import { registerUser } from '../../_service/firebase/firebaseAuth.service'
//Imports bootstrap icon
import { Key, PersonCircle, PersonBadge, BoxArrowInDown } from 'react-bootstrap-icons';

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
                .then(() => {navigate('/')})
                .catch(err => setRegisterError(err));
        }

        setValidated(true);
    };

    return (
        <Container fluid className="min-h-100 p-0 bg-login-register green">
            <Form noValidate className="d-flex flex-column justify-content-center align-items-center min-h-100 fixed p-5 bg-form-card" validated={validated} onSubmit={handleSubmit}>
            <h2 className='form-title mb-5 animate-in' style={{animationDelay:'100ms'}}>REGISTER</h2>
                <Form.Group className="mb-4 form-input" controlId="name">
                    <Form.Label className='d-flex align-items-center label-input mb-3 animate-in' style={{animationDelay:'200ms'}}> <PersonBadge /> <div className="ms-2">Name or Nickname*</div> </Form.Label>
                    <Form.Control className="animate-in"  type="text" placeholder="Name or Nickname..." style={{animationDelay:'300ms'}} required />
                    <Form.Control.Feedback type="invalid" className="animate-in">
                        Please insert a valid name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4 form-input" controlId="formBasicEmail">
                    <Form.Label className='d-flex align-items-center label-input mb-3 animate-in' style={{animationDelay:'400ms'}}> <PersonCircle /> <div className='ms-2'>Email address*</div> </Form.Label>
                    <Form.Control className="animate-in" type="email" placeholder="Enter email" style={{animationDelay:'500ms'}} required />
                    <Form.Control.Feedback type="invalid" className="animate-in">
                        Please insert a valid e-mail.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted font-1 animate-in ms-1" style={{animationDelay:'600ms'}}>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-5 form-input" controlId="formBasicPassword">
                    <Form.Label className='d-flex align-items-center label-input mb-3 animate-in' style={{animationDelay:'700ms'}}> <Key /> <div className='ms-2'>Password*</div> </Form.Label>
                    <Form.Control type="password" placeholder="Password" className="animate-in" style={{animationDelay:'800ms'}} required minLength={8} />
                    <Form.Control.Feedback type="invalid" className="animate-in">
                        Min. Lenght 8 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                {registerError ? <div>{registerError}</div> : ''}
                <Button className='form-button d-flex align-items-center animate-in' type="submit" style={{animationDelay:'900ms'}}>
                   <>REGISTER</>
                   <BoxArrowInDown className='ms-2'/>
                </Button>
            </Form>
        </Container>
    )
}

export default Register;