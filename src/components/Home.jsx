import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from './Dashboard'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            access_token : localStorage.getItem('userData')
        }
    }

    render() {
        if(!this.state.access_token){
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
