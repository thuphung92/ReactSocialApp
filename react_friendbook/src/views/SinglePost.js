import React, { Component } from 'react';
import { getPost } from '../api/apiClientWithToken'
import PostCard from '../components/PostCard'
import {Container} from 'react-bootstrap'

export default class SinglePost extends Component {
    constructor() {
        super();
        this.state={
            post:false
        }
    }

    componentDidMount() {
        this.getSinglePost()
    }

    getSinglePost = async () =>{
        const post = await getPost(localStorage.getItem('token'), this.props.match.params.id)
        if(post === 400){this.setState({tokenError:true})}
        if(post === 500){this.setState({serverError:true})}
        if (post !== 500 && post !== 400){
            this.setState({post})
        }
    }

    render() {
        return (
            <div>
            <Container className="mt-5">
               {this.state.post ?
                    <PostCard post={this.state.post}/>
                    :
                    ''
               } 
            </Container>
            </div>
        )
    }
}
