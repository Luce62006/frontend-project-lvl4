import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Login = () => (
    <div>
        <h1>Войти</h1>
        <div className="justify-content-center">
            <img src="../assets/avatar.jpg" className="rounded-circle" alt="Войти"/>
        </div>
        <Formik
            initialValues={{
                userName: '',
                password: '',
            }}
            validationSchema={
                Yup.object().shape({
                    userName: Yup.string()
                        .min(5, 'Too Short!')
                        .max(10, 'Too Long!')
                        .required('Required'),
                    password: Yup.string()
                        .min(5, 'Too Short!')
                        .max(10, 'Too Long!')
                        .required('Required'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                })
            }
            onSubmit={(values) => {
                    // same shape as initial values
                console.log(values);
            }}
        >
            {({errors, touched}) => (


                <Form>
                    <br/>
                    <div className="form-group" id="userName">
                        <Field name="userName" className="form-control-lg  is-size-2" type="text" placeholder="Ваш ник"/>
                        {errors.userName && touched.userName ? (
                            <div>{errors.userName}</div>
                        ) : null}
                    </div>
                    <br/>
                    <div className="form-group" id="password">
                        <Field name="form-control lg" className="form-control-lg is-size-2" type="password" placeholder="Password"/>
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                    </div>
                        <br/>
                    <div className="form-group mb-3" id="button">
                        <button type="submit" className="btn btn-primary btn-lg" >Войти</button>
                    </div>
                </Form>
            )
            }
        </Formik>
    </div>
)
            export default Login;
