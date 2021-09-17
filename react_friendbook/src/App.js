import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import Newsfeed from './views/Newsfeed'
import SinglePost from './views/SinglePost'
import NavBar from './components/NavBar'
import CreatePost from './views/CreatePost'
import MyPosts from './views/MyPosts.js'
import EditPost from './views/EditPost'
import ProtectedRoute from './components/ProtectedRoute'


import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      token: "",
      user_id:""
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
      user_id: localStorage.getItem("user_id"),
    };
  };

  setUser = (user) => {
    this.setState({ user });
  };

  setToken = (token) => {
    this.setState({ token });
  };

  setUserId = (user_id) => {
    this.setState({ user_id })
  }

  doLogout = () => {
    localStorage.clear()
    this.setToken('')
    this.setUser('')
    this.setUserId('')
  };


  render() {
    return (
      <div>
        {this.state.token? <NavBar token={this.state.token} user={this.state.user}/> : null}
         <Switch>
            <ProtectedRoute token={this.state.token} exact path = "/" render={()=><Newsfeed user_id={this.state.user_id}/>}/>
            <ProtectedRoute token={this.state.token} exact path = "/post:id" render={(props)=><SinglePost {...props} />}/>
            <ProtectedRoute token={this.state.token} exact path = "/mypost" render={()=><MyPosts user_id={this.state.user_id}/>}/>
            <ProtectedRoute token={this.state.token}  exact path = "/createpost" render={()=><CreatePost user={this.state.user} user_id={this.state.user_id}/>}/>
            <ProtectedRoute token={this.state.token} exact path = "/edit/post:id" render={(props)=><EditPost {...props} />}/>
            <ProtectedRoute token={this.state.token} exact path = "/logout" render={()=><Logout doLogout={this.doLogout}/>}/>

            <Route exact path = "/login" render={()=><Login setUserId={this.setUserId} setToken={this.setToken} setUser={this.setUser}/>}/>
            <Route exact path = "/register" render={()=><Register/>}/>
          </Switch>
      </div>
    )
  }
}

