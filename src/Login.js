import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory, withRouter } from "react-router-dom";

function Login() {
    const cookies = new Cookies();
    const history = useHistory();

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
            let parsedToken = res.data.token;
            cookies.set("cableAuth", parsedToken, { path: "/" });
            history.push("/channels/@me");
        })
        .catch(err => {});
    };

    useEffect(() => {
        document.title = "CableJS";
    });

    if (cookies.get("cableAuth")) history.push("/channels/@me");

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Form onSubmit={handleLogin}>
                <div style={{ height: "20px" }} />
                <img style={{ height: "70px" }} src="https://emeraldsys.github.io/images/products/3132702-200-2.png" alt="CableJS" />
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: "25px", marginLeft: "10px" }}>CableJS</span>
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

export default withRouter(Login);