import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Login() {
    const handleLogin = event => {
        event.preventDefault();

        axios({
            method: "POST",
            url: "https://api.cablejs.emeraldsys.xyz/v1/auth/login",
            data: {
                login: event.target.user.value,
                password: event.target.pass.value
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log(res);
            alert(res.status);
        })
        .catch(err => {
            console.log(err);
            alert(err.status);
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Form onSubmit={handleLogin}>
                <img src="https://emeraldsys.github.io/images/products/3132702-200-2.png" alt="CableJS" />
                <br />
                <br />
                <Form.Group controlId="formUser">
                    <Form.Control id="user" placeholder="Username" required />
                </Form.Group>
                <br />
                <Form.Group controlId="formPass">
                    <Form.Control id="pass" type="password" placeholder="Password" required />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">Login</Button>
                <Button variant="secondary">Forgot Password</Button>
            </Form>
        </Container>
    );
}