import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button, Card, Container, Form, InputGroup,
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import '../assets/application.scss';
import axios from 'axios';
import useAuth from './hooks/index.jsx';
import routes from './routes.js';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      UserName: '',
      Password: '',

    },
    validationSchema: Yup.object({
      UserName: Yup.string()
        .max(15, 'Must be 10 characters or less')
        .required('Required'),
      Password: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      axios.post(routes.loginPath(), values)
        .then((response) => {
          console.log(response);
          let from = location.state?.from?.pathname || '/';
          auth.logIn();
          navigate(from, { replace: true });
          localStorage.setItem('userId', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  function ProtectedPage() {
    return <h3>Protected</h3>;
  }

  return (
    <Card
      style={{
        width: '18rem',
        marginTop: 100,
      }}
      className="container-md "
    >
      <Container
        className="  justify-content-md-center"
        style={{
          width: '12rem',
          marginBlock: 50,
        }}
      >
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup size="lg">
            <Form.Group
              className="mb-3 "
              style={{ width: '10rem' }}
              controlId="formGroupUsername"
            >
              <Form.Label className="mb-1 ps-3 ">Username</Form.Label>
              <Form.Control
                size="lg"
                name="UserName"
                type="UserName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.UserName}
              />
              {formik.touched.UserName && formik.errors.UserName ? (
                <div>{formik.errors.UserName}</div>
              ) : null}
            </Form.Group>

            <Form.Group
              className="mb-3"
              style={{ width: '10rem' }}
              controlId="formGroupPassword"
            >
              <Form.Label className="mb-1 ps-3 ">Password</Form.Label>
              <Form.Control
                size="lg"
                name="Password"
                type="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <div>{formik.errors.Password}</div>
              ) : null}
              <br />

              <Button
                variant="primary"
                type="submit"
                style={{ width: '10rem' }}
                size="lg"
                active
              >
                Submit
              </Button>

            </Form.Group>

          </InputGroup>
        </Form>
      </Container>
    </Card>
  );
}

export default Login;
