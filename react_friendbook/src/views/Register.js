import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import { Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const registerFormSchema = Yup.object().shape({
    "first_name": Yup.string().required('Required'),
    "last_name": Yup.string().required('Required'),
    "email": Yup.string().email("Must be a valid e-mail format").required('Required'),
    "password": Yup.string().required('Required'),
    "confirm_password": Yup.string().oneOf([Yup.ref('password','')],'Passwords must match').required('Required')
})

const registerFormInitialValues={
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    confirm_password:''
}

export default class Register extends Component {

    constructor(){
        super();
        this.state={
            badRegister: false,
            serverError:false,
            successRegister:false,
        }
    }

    handleSubmit = (values) => {
        axios.post('http://127.0.0.1:5000/api/user',values).then(
            res => {console.log(res);this.setState({successRegister:true})}
        ).catch(err => {
            if (err.response){
                if(err.response.status === 400){return this.setState({badRegister:true,serverError:false})}
                if(err.response.status === 500){return this.setState({badRegister:false,serverError:true})}
                return   
            }   
        })
    }

    render() {

        const styles={
            error:{color: 'red'}
        }

        return (
            <div>
                {this.state.successRegister ? <Alert variant="success" to={{pathname:"/login"}}>A New Account Has Been Created</Alert>:''}
                {this.state.badRegister?<Alert variant="danger">Email has been registered before</Alert>:''}
                {this.state.searverError?<Alert variant="danger">Unexpected error. Please try again!</Alert>:''}
            <Row >
                <Col className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-contain bg-no-repeat" ></Col>
                    <Col className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <Card className="shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                            
                            <Formik 
                                        initialValues={registerFormInitialValues}
                                        validationSchema={registerFormSchema}
                                        onSubmit={(values)=>{this.handleSubmit(values)}}>

                                        {({errors, touched})=>(
                                            <Form>
                                                <h2 className="fw-700 display1-size display2-md-size mb-3">Create <br/> your account</h2>

                                                <label htmlFor="first_name" className="form-label">First Name</label>
                                                <Field name="first_name" className="form-control"/>

                                                {errors.first_name && touched.first_name ? (<div style={styles.error}>{errors.first_name}</div>):null}

                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <Field name="last_name" className="form-control"/>
                                                
                                                {errors.last_name && touched.last_name ? (<div style={styles.error}>{errors.last_name}</div>):null}

                                                <label htmlFor="email" className="form-label">Email</label>
                                                <Field name="email" className="form-control"/>

                                                {errors.email && touched.email ? (<div style={styles.error}>{errors.username}</div>):null}

                                                <label htmlFor="password" className="form-label">Password</label>
                                                <Field name="password" className="form-control" type="password"/>
                                                
                                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}

                                                <label htmlFor="confirm_password" className="form-label">Password</label>
                                                <Field name="confirm_password" className="form-control" type="password"/>
                                                
                                                {errors.confirm_password && touched.password ? (<div style={styles.error}>{errors.confirm_password}</div>):null}

                                                <Button className="btn text-center style2-input text-white fw-600 bg-dark border-0 p-1 mt-2 w-100" type="submit">Register</Button>  
                                            </Form>
                                        )}
                                    </Formik>
                                <Col className="col-sm-12 p-0 text-left">
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Don't have an account? <Link to={{pathname:"/login"}} className="fw-700 ms-1">Login</Link>
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