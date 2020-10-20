import React, { Component } from 'react';

class GetSingleSale extends Component {
    constructor(){
        super();
        this.state = {
            access_token: localStorage.getItem('userData'),
            orders : "",
            sales : this.props.location.state,
            customer_id : this.props.location.state.sales,
        }
    }


    componentDidMount(){
        this.getSingleOrder();
    }

    getSingleOrder(){
        let baseUrl = 'http://18.191.185.248/api/order/detail';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
            console.log(result)
            // this.setState({
            //     details : result.data
            // })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>hello</h1>
                {this.state.orders}
            </div>
        )
    }
}

export default GetSingleSale
