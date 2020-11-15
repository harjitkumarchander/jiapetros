import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Loader from '../common/Loader';
import '../css/Loader.css';

const columns = ["Customer ID", "Customer Name","Product", "Veh. No.","Slip No.", "Qty", "Price" ,"Total Amount", "Action"];

class GetPayments extends Component {

    constructor(){
        super();
        this.state = {
            sales : [],
            products : [],
            loading : false      
          }
    }

    componentDidMount(){
        this.getSingleProduct();
        this.getOrders();
    }

    getOrders = () => {
        fetch("http://18.191.185.248/api/orders",{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result);
            this.setState({
               sales : result.data 
            },()=>{this.toggleLoader()
            })
        })
        .catch((error)=>{
            console.log("error while fetching" , error)
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    getSingleProduct = () => {
        let apiUrl = 'http://18.191.185.248/api/products';
        fetch(apiUrl,{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
            // console.log(result);
            this.setState({
                products : result.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    render() {
        let productName = this.state.products.map((v,i)=>v.name)
        const { sales } = this.state;
        return (
            <div className="get_customers_main pl-5">
                    <div className="col-lg-12 col-md-12 mt-3 customers_col">
                    <div id="customer_table" className=""> 
                    <Loader loader={!this.state.loader} /> 
                        <MUIDataTable
                            className="pl-0 pr-0"
                            data={sales.map((item,i) => {return [item.customer_id, 
                                                                 item.customer_name, 
                                                                 productName[item.product_id-1],
                                                                 item.vehicle_no,
                                                                 item.slip_no,
                                                                 item.price,
                                                                 item.quantity,
                                                                 item.total,
                            <li className="row ml-0 mr-5 action-btn" key={i}>
                                <button className="btn btn-light bg-transparent"><i className="col fa fa-edit"></i></button>
                            </li>]
                            })
                                }
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
