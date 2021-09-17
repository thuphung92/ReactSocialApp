import React, { Component } from 'react'
import {getMyPosts} from '../api/apiClientWithToken'
import {Redirect} from 'react-router-dom'

import PostCard from '../components/PostCard'
import { Container, Alert} from 'react-bootstrap'

export default class MyPosts extends Component {

    constructor(){
        super();
        this.state={
            posts:[],
            serverError:false,
            tokenError:false,
        }
    }

    componentDidMount(){
        this.getAllMyPosts()
    }

    getAllMyPosts = async () => {
        const posts = await getMyPosts(localStorage.getItem('token'))
        if(posts === 400){this.setState({tokenError:true})}
        if(posts === 500){this.setState({serverError:true})}
        if (posts !== 500 && posts !== 400){
            this.setState({posts})
            console.log(this.state.posts.post)
    }}

    render() {
        return (
            <div>
                {this.state.serverError?<Alert variant="danger">Error Try Again Later</Alert>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}

                <div className="myposts mt-5" style={{flex:'5.5'}}>
                    <div className="wrapper" style={{padding:'20px'}}>
                        <Container>                 
                        {this.state.posts.post.map((i)=><PostCard key={i.id} i={i}/>)}
                        
                        </Container>
                    </div>  
                </div>
            </div>
        )
    }
}
