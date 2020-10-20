import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Loader from '../common/Loader';
import '../css/Loader.css';

const columns = ["Customer ID", "Name", "Amount", "Date","Payment Mode", "Description", "Action"];

class GetPayments extends Component {

    constructor(){
        super();
        this.state = {
            payments : [],
            loading : false      
          }
    }

    componentDidMount(){
        fetch("http://18.191.185.248/api/payments",{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
            // console.log(result.data)
            this.setState({
                payments : result.data
            },()=>{this.toggleLoader()
            })
        })
        .catch((error)=>{
            console.log('error', error)
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    render() {
        const { payments } = this.state;
        return (
            <div className="get_customers_main pl-5">
                    <div className="col-lg-12 col-md-12 mt-3 customers_col">
                    <div id="customer_table" className="">  
                    <Loader loader={!this.state.loader} />
                        <MUIDataTable

                            className="pl-0 pr-0"
                            data={payments.map((item,i) => {return [item.customer_id, item.customer_name, item.amount,item.created_on, item.payment_method, item.description,
                                    <li className="row ml-0 mr-5 action-btn"><button className="btn btn-light bg-transparent"><i className="col fa fa-edit"></i></button></li>
                                    ]}
                                    )}
                            columns={columns}
                            options={{ selectableRows: "none"}}
                        /> 
                </div>
                </div>
                </div>
        )
    }
}

export default GetPayments;
