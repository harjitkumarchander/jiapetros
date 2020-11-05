import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Loader from '../common/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import '../css/ChangePassword.css';

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
        let validated = this.validate();
        if(validated){
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
}

    validate=()=>{
        let validated = true
        let {password} = this.state;
        if(password === '' ){
            validated = false;
            toast.error('Password not to be Empty');
        }else if(password.length < 8){
            validated = false;
            toast.error('Password must be at least 8 characters');
        }else if(password.search(/[a-z]/i) < 0){
            validated = false;
            toast.error('Password must contain at least one letter.');
        }else if(password.search(/[0-9]/) < 0){
            validated = false;
            toast.error('Password must contain at least one digit.');
        }
        else if(password.search(/[!@#$%^&*?]/) < 0){
            validated = false;
            toast.error('Password should contain atleast one special character');
        }
        return validated ?
        toast.success('Submitted Successfully')
        : null
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
            <div className="changepassword">
                <div style={{height:"100vh" }} className="container-fluid">
				<Loader loader = {this.state.loader} />
                <Sidebar />
                <ToastContainer />
                	<div className="row h-100" >
		<div className="align-item-center d-flex mx-auto justify-content-center">
			<div className="user_card" style={{height : "250px"}}>
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
							<div className="d-flex justify-content-between mt-3 login_container">
				 	<button type="submit" name="button" className="btn login_btn" onClick={this.ChangePassword}>Change Password</button>
                     <Link to="/dashboard"><button type="submit" name="button" className="btn login_btn ml-4">Cancel</button></Link>
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
