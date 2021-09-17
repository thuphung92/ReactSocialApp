import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {getToken} from '../api/apiClient'

const loginFormSchema = Yup.object().shape({
    "email": Yup.string().email("Must be a valid e-mail format").required('Required'),
    "password": Yup.string().required('')
})

const loginFormInitialValues={
    email:'',
    password:''
}

export default class Login extends Component {

    constructor(){
        super();
        this.state={
            badLogin:false,
            serverError:false,
            redirect:false,
        }
    }

    handleSubmit=async ({email, password})=>{
        const res = await getToken(email, password);
        if (res ===401){return this.setState({badLogin:true, serverError:false})};
        if (res ===500){return this.setState({badLogin:false, serverError:true})};
        console.log(res);
        const token = res.token
        const user = res.user
        const user_id = res.user_id
        localStorage.setItem('token', token);
        this.props.setToken(token);
        localStorage.setItem('user', user);
        this.props.setUser(user)
        localStorage.setItem('user_id', user_id);
        this.props.setUserId(user_id)
        this.setState({redirect:true})
    }

    render() {

        const styles={
            error:{color:'red'}
        }
        return (
            <div>
                 
                {this.state.badLogin?<Alert variant="danger">Invalid Email or Password</Alert>:''}
                {this.state.searverError?<Alert variant="danger">Unexpected error. Please try again!</Alert>:''}
                                                
                <Row >
                    <Col className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-contain bg-no-repeat" ></Col>
                        <Col className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <Card className="shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">

                                    {this.state.redirect ? <Redirect to={{pathname:"/", props:{token:localStorage.getItem("token")} }}/>:''}

                                    <Formik 
                                        initialValues={loginFormInitialValues}
                                        validationSchema={loginFormSchema}
                                        onSubmit={(values)=>{console.log(values); this.handleSubmit(values)}}
                                        >

                                        {({errors, touched})=>(
                                            <Form>
                                                <h2 className="fw-700 display1-size display2-md-size mb-3">Login into <br/> your account</h2>

                                                <label htmlFor="email" className="form-label">Email</label>
                                                <Field name="email" className="form-control"/>

                                                {errors.email && touched.email ? (<div style={styles.error}>{errors.username}</div>):null}

                                                <label htmlFor="password" className="form-label">Password</label>
                                                <Field name="password" className="form-control" type="password"/>
                                                
                                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                                
                                               

                                                <Button className="btn text-center style2-input text-white fw-600 bg-dark border-0 p-1 mt-2 w-100" type="submit">Login</Button>  
                                            </Form>
                                        )}
                                    </Formik>
                                    <Col className="col-sm-12 p-0 text-left">
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Don't have an account? <Link to={{pathname:"/register"}} className="fw-700 ms-1">Register</Link>
                                        </h6>
                                    
                                    </Col>
                                </div>

                            </Card>
                        
                        </Col>                   
                </Row>
            </div>
        )
    }
}
