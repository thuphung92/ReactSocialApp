import React, { Component } from 'react'
import {editPost} from '../api/apiClientWithToken'
import {Container} from 'react-bootstrap'
import {titleCase} from '../helpers'

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state={
            body:'',
            successfulPatch:false,
            unsuccessfulPatch:false,
            user_id: localStorage.getItem('user_id')
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {'id': this.props.location.state.post.id,
                        'body':this.state.body,
                       'user_id':this.state.user_id}
        this.handleUpdate(data)
    };

    handleUpdate = async (data) => {
        const res = await editPost(localStorage.getItem('token'),data);
        console.log (res)
        if (res){
            this.setState({successfulPatch:true,unsuccessfulPatch:false,body:''})
        }else{
            this.setState({unsuccessfulPatch:true,successfulPatch:false})
        }    
    } 
   
    
    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div>
                {this.state.successfulPatch?<Alert variant="success">Your post has been updated successfully!</Alert>:""}
                {this.state.unsuccessfulPatch?<Alert variant="danger">There was an error while updating your post. Please try again!</Alert>:""}

                <Container className="mt-5">
                        <div className="post">
                            <div className="wrapper">
                                <div className="top mb-3 fw-bold">
                                    {titleCase(localStorage.getItem('user'))}                  
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <textarea class = "form-control" rows = "3" defaultValue={this.props.location.state.post.body} value={this.props.body} name="body" onChange = {this.handleInputChange}/>
                                  
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
