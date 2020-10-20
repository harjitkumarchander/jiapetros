import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Loader from '../common/Loader';

class ChangePassword extends Component {
    constructor(){
        super()
        this.state = {
            access_token : localStorage.getItem('userData'),
            old_password : '',
            password : '',
            validatePassword : false
        }
    }

    handleSubmit = (e) => {
		e.preventDefault();
	}

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    ChangePassword = () => {
        fetch('http://18.191.185.248/api/user/cpassword',{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
                console.log(result)
            this.setState({
                validatePassword : true
            },()=>this.toggleLoader())            
        })
        .catch((error)=>{
            console.log("Wrong Password" , error);
        })
    }

    toggleLoader = () => {
		this.setState({
			loader : !this.state.loader
		})
    }
    
    render() {
        if(this.state.validatePassword){
            return <Redirect to={ '/home' } /> 
        }
        return (
            <div className="dashboard left">
                <div style={{height:"100vh"}} className="container-fluid bg-dark">
				<Loader loader = {this.state.loader} />
                <Sidebar />
                	<div className="row h-100" >
		<div className="align-item-center d-flex mx-auto justify-content-center">
			<div className="user_card" style={{height : "400px"}}>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={this.handleSubmit} >
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fa fa-key"></i></span>
							</div>
							<input type="password" name="old_password" className="form-control input_user" placeholder="Old Password" onChange={this.handleChange} />
						</div>

						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fa fa-key"></i></span>
							</div>
							<input type="password" name="password" className="form-control input_pass" placeholder="New Password" onChange={this.handleChange} />
						</div>
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="submit" name="button" className="btn login_btn" onClick={this.ChangePassword}>Change Password</button>
				   </div>
					</form>
				</div>
			</div>
		</div>
	</div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default ChangePassword;
