import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import {titleCase} from '../helpers'
import {createPost} from '../api/apiClientWithToken'
import {Alert} from 'react-bootstrap'

export default class CreatePost extends Component {
    constructor(props) {
        super(props),
        this.state={
            body:'',
            successfulPost:false,
            unsuccessfulPost:false,
            user_id: localStorage.getItem('user_id')
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        const data = {'body':this.state.body,'user_id':this.state.user_id}
        console.log(data)
        this.handlePost(data)
    };

    handlePost = async (data) => {
        const res = await createPost(localStorage.getItem('token'),data);
        console.log (res)
        if (res){
            this.setState({successfulPost:true,unsuccessfulPost:false,body:''})
        }else{
            this.setState({unsuccessfulPost:true,successfulPost:false})
        }    
    } 

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value,
                        user_id:localStorage.getItem('user_id')})
    }
     
    render() {

        return (
            <div>
               <Container className="mt-5">
               {this.state.successfulPost?<Alert variant="success">Your Post was sucessfully created</Alert>:""}
                {this.state.unsuccessfulPost?<Alert variant="danger">There was an error while creating your post. Please Try again</Alert>:""}

                        <div className="post">
                            <div className="wrapper">
                                <div className="top mb-3 fw-bold">
                                    {titleCase(this.props.user)}                  
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <textarea class = "form-control" rows = "3" type="text" placeholder="What's in your mind?" value={this.state.body} name="body" onChange = {this.handleInputChange}/>
                                  
                                    <hr className="hrPost"/>
                                 
                                    <button className="button" type="submit" >Share</button>
                                </form>
                            </div>
                        </div>
                            
                </Container> 
            </div>
        )
    }
}
