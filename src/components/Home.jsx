import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn : false,
            access_token : localStorage.getItem('userData')
        }
    }

    componentDidMount(){
    if(this.state.access_token){
        console.log("Hello")
    }else{
        this.setState({
            loggedIn : true
        })
    }    
    }

    componentWillUnmount(){
        this.setState({
            loggedIn : false
        })
    }

    render() {
        if(this.state.loggedIn){
            return <Redirect to={'/'} />
        }
        return (
            <div>
                <Dashboard />
            </div>
        )
    }
}
export default Home;
