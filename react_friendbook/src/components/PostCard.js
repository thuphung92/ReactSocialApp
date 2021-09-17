import React, { Component } from 'react'
import { MoreVert } from "@material-ui/icons";
import './PostCard.css'
import {titleCase} from '../helpers'
import {Redirect} from 'react-router-dom'
import {deletePost, getPosts} from '../api/apiClientWithToken'
import {Alert} from 'react-bootstrap'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class PostCard extends Component {
    constructor(){
        super();
        this.state={
            clicked:false,
            successfulDelete:false,
            unsuccessfulDelete:false,
            post:{},
            editClicked: false,
            rejectEdit: false,
            acceptEdit:false,
        }
    }

    //componentDidMount(){
    //    this.getAllPosts()    
    //}

    getAllPosts = async () =>{
        const posts = await getPosts(localStorage.getItem('token'))
        if(posts === 400){this.setState({tokenError:true})}
        if(posts === 500){this.setState({serverError:true})}
        if (posts !== 500 && posts !== 400){
            this.setState({posts:posts})}
            console.log(this.state.posts)
    }

    handleRenderEditForm=()=>{
        if(this.props.post.author_id == localStorage.getItem('user_id')){
            this.setState({editClicked:true, acceptEdit:true})
        }else{this.setState({editClicked:true, rejectEdit:true})}
        
    }

    handleRenderPost=()=>{
        this.setState({clicked:true})
    }

    handleDeletePost= async ()=>{
        if (window.confirm(`Are you sure you want to delete this post?`)){
            const res = await deletePost(localStorage.getItem('token'),this.props.post.id)        
            if (res) {
                if(res === 403){this.setState({forbidden:true})
                }else{
                    this.setState({successfulDelete:true, unsuccessfulDelete:false, post:{}})
                }
                //this.getAllPosts() // reload all current posts
            }else{
                this.setState({successfulDelete:false, unsuccessfulDelete:true})
            }
        }
    } 

    render() {
        const styles={
            btn:{
                height: 'auto', width: 'auto', border: 'none', backgroundColor:'white'
            }
        }
        return (
            <div>
                {this.state.successfulDelete?<Alert variant="success">Your Post was deleted sucessfully</Alert>:""}
                {this.state.unsuccessfulDelete?<Alert variant="danger">There was an error while deleteting your post. Please Try again</Alert>:""}
                {this.state.forbidden?<Alert variant="warning">You can only delete your own post!</Alert>:""}
                {this.state.clicked ? <Redirect to={`/post${this.props.post.id}`}/>:''}
                {this.state.acceptEdit ? <Redirect to={{pathname:`/edit/post${this.props.post.id}`,
                                                        state:{...this.props}
                                                        }}/>:''}
                {this.state.rejectEdit ? <Alert variant="warning">You can only edit your own post!</Alert>:''}           

                <div className="post mb-3">
                <div className="wrapper">
                    <div className="top">
                        <div className="topLeft">
                            <span className="username" >{titleCase(this.props.post.author)}</span>
                            <span className="date">5 min ago</span>
                        </div>
                        <div className="topRight">
                            
                        </div>
                    </div>
                    <hr className="hrPost"/>
                    <div className="postCenter">
                        <span className="postText">{this.props.post.body}</span>
                    </div>
                    <div className="bottom">
                        <div className="postBottomLeft">
                            
                            <button style={styles.btn} clasName="icon" ><ThumbUpAltIcon color="primary"/></button>
                            <button style={styles.btn} clasName="icon"><FavoriteIcon color="secondary"/></button>
                        </div>

                        <div className="postBottomRight">
                            <div className="options">
                                <button style={styles.btn} className="icon" onClick={()=>this.handleRenderEditForm()}><EditIcon/></button>
                                <button style={styles.btn} clasName="icon" onClick={()=>this.handleDeletePost()}><DeleteIcon color="secondary"/></button>
                                <button style={styles.btn} clasName="icon" onClick={()=>this.handleRenderPost()}><MoreVert/></button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


