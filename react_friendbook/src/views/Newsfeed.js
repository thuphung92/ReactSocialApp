import React, { Component } from 'react'
import {getPosts} from '../api/apiClientWithToken'

import PostCard from '../components/PostCard'
import { Container, Alert} from 'react-bootstrap'

export default class Newsfeed extends Component {

    constructor() {
        super();
        this.state={
            posts:[],
            serverError:false,
            tokenError:false,
        }
    }

    componentDidMount(){
        this.getAllPosts()    
    }

    getAllPosts = async () =>{
        const posts = await getPosts(localStorage.getItem('token'))
        if(posts === 400){this.setState({tokenError:true})}
        if(posts === 500){this.setState({serverError:true})}
        if (posts !== 500 && posts !== 400){
            this.setState({posts:posts})}
            console.log(this.state.posts)
    }

    render() {
        return (
            <div className="newsfeed mt-5" style={{flex:'5.5'}}>
                {this.state.serverError?<Alert variant='danger'>Error Try Again Later</Alert>:''}
                {this.state.tokenError?<Redirect to='/login'/>:''}

                <div className="wrapper" style={{padding:'20px'}}>
                    <Container>                 
                        {this.state.posts.map((post)=><PostCard key={post.id} post={post}/>)}
                    
                    </Container>
                </div>  
            </div>
        )
    }
}
