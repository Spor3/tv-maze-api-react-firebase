import { PersonCircle, Key, BoxArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

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

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        const email = event.target[0].value as string;
        const password = event.target[1].value as string;

        try {
            await loginUser(email, password)
            navigate('/')
        } catch (error:any) {
            setLoginError(error)
        }

    };

    return (
        <Container fluid className="min-h-100 p-0 bg-login-register">
            <Form className="d-flex flex-column justify-content-center align-items-center min-h-100 fixed p-5 bg-form-card" onSubmit={handleSubmit}>
            <h2 className='form-title mb-5 animate-in' style={{animationDelay:'100ms'}}>LOG IN</h2>
                <Form.Group className="mb-5 form-input" controlId="formBasicEmail">
                    <Form.Label className='d-flex align-items-center label-input yellow mb-3 animate-in' style={{animationDelay:'200ms'}}><PersonCircle /><div className='ms-2'>Email address</div></Form.Label>
                    <Form.Control className="animate-in" type="email" placeholder="Enter email" style={{animationDelay:'300ms'}}/>
                </Form.Group>

                <Form.Group className="mb-2 form-input" controlId="formBasicPassword">
                    <Form.Label className='d-flex align-items-center label-input yellow mb-3 animate-in' style={{animationDelay:'400ms'}}><Key /><div className='ms-2'>Password</div></Form.Label>
                    <Form.Control className="animate-in" type="password" placeholder="Password" style={{animationDelay:'500ms'}}/>
                </Form.Group>
                <Form.Text className="text-muted mb-5 font-1 animate-in" style={{animationDelay:'600ms'}}>
                        If you don???t have an account create a free one <Link to="/register" style={{color:'#bdbb49'}}>here!</Link>
                </Form.Text>
                {loginError ? <div>{loginError}</div> : ''}
                <Button type="submit" className='form-button yellow d-flex align-items-center animate-in' style={{animationDelay:'700ms'}}>
                   <>SIGN IN</>
                    <BoxArrowRight className='ms-2' />
                </Button>
            </Form>
        </Container>
    )

}

export default Login