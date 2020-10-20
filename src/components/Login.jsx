import React, { Component } from 'react';
import Loader from '../common/Loader';
import { Redirect } from 'react-router-dom';
import { PostData } from '../common/PostData';
import '../css/Login.css';

class Login extends Component {
        state = {
            username : "",
			password : "",
			loggedIn : false
        }
	
	handleSubmit = (e) => {
		e.preventDefault();
	}

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

	handleLogin = () => {
		let { username , password } = this.state;
		if(username && password){
		PostData('login',this.state)
    	.then(result=>{
		   console.log(result)
		   let responseData = result
    	     if(responseData.data){
    	         localStorage.setItem('userData', responseData.data.access_token)
    	         this.setState({
    	             loggedIn : true
    	         },()=>this.toggleLoader())
    	     }else{
				alert("Wrong Username and Password");
			}
    	 })
		}   
	}
	
	toggleLoader = () => {
		this.setState({
			loader : !this.state.loader
		})
	}

    render() {
        if(this.state.loggedIn || localStorage.getItem('userData')){ 
        	return <Redirect to={ '/home' } /> 
		}
       	 	return (
            <div style={{height:"100vh"}} className="container-fluid bg-dark">
				<Loader loader = {this.state.loader} />
                	<div className="row h-100">
		<div className="align-item-center d-flex mx-auto justify-content-center">
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src={require("../images/logo.jpg")} className="brand_logo  justify-content-center align-item-center" alt="Logo" />
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={this.handleSubmit} >
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fa fa-user"></i></span>
							</div>
							<input type="text" name="username" className="form-control input_user" placeholder="Username" onChange={this.handleChange.bind(this)} />
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fa fa-key"></i></span>
							</div>
							<input type="password" name="password" className="form-control input_pass" placeholder="Password" onChange={this.handleChange.bind(this)} />
						</div>
						{/* <div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customControlInline" />
								<label className="custom-control-label" >Remember me</label>
							</div>
						</div> */}
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="submit" name="button" className="btn login_btn" onClick={this.handleLogin.bind(this)}>Login</button>
				   </div>
					</form>
				</div>
		
				{/* <div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <Link to="/" className="ml-2">Sign Up</Link>
					</div>
					<div className="d-flex justify-content-center links">
						<Link to="/">Forgot your password?</Link>
					</div>
				</div> */}
			</div>
		</div>
	</div>
            </div>
            );
    }
}


export default Login