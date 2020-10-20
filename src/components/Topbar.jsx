import React, { Component } from 'react';
import Loader from '../common/Loader';
import '../css/Topbar.css';
import { Link, Redirect } from 'react-router-dom';

class Topbar extends Component {
  constructor(props){
    super(props);
    this.state = {
    loggedOut : false,
    access_token : localStorage.getItem('userData')
    }
  } 

    handleLogout = () => {
      console.log(this.state);
      fetch('http://18.191.185.248/api/user/logout',{
        method : 'POST',
        body : JSON.stringify(this.state)
      })
      .then((res)=>res.json())
      .then(result=>{
        console.log(result);  
        this.setState({
          access_token : localStorage.clear('userData'),
          loggedOut : true
        },()=>this.toggleLoader())    
      })
      .catch((error)=>{
        console.log('Logout Error', error);
      })
    }

    toggleLoader = () => {
      this.setState({
        loader : !this.state.loader
      })
    }


    render() {
      if(this.state.loggedOut){
        return <Redirect to = "/" push={true} />
      }
        return (
            <div>
              <Loader loader={this.state.loader} />
              <header className="header topbar_page" style={{width : "100%", position : "fixed", zIndex : "1000"}}>
                <nav className="navbar navbar-toggleable-md navbar-light p-0 ">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Link to="/" className="navbar-brand p-0"><img src={require("../images/logo.png")} width="100" alt="logo_image" /></Link>
                  <div className="float-left"> <div style={{cursor : "pointer"}} className="button-left"><span className="fa fa-fw fa-bars"></span></div> </div>
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown user-menu">
                          <div className="dropdown">
                            <a className="nav-link" href="!#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <span className="hidden-xs"><i className="fa fa-user display-5"></i></span>
                            </a>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button">Profile</button>
                                <Link to="/changepassword"><button className="dropdown-item" type="button">Change Password</button></Link>
                                <button className="dropdown-item" type="button" onClick={this.handleLogout}>Logout</button>
                              </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </nav>
              </header>
            </div>
        )
    }
}

export default Topbar
