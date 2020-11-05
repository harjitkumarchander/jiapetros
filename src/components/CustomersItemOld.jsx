import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, Modal, InputGroup } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../common/Loader';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import BillTo from './BillTo';
import '../css/CustomerItem.css';
import { Link } from 'react-router-dom';

const columns1 = ["Order Date", "Item", "Order No", "Quantity", "Price", "Total" ];
const columns2 = ["Payment Date", "Amount" , "Payment Mode", "Description" ];


class CustomersItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token : localStorage.getItem('userData'),
            details : "",
            products : [],
            orders : [],
            payments : [],
            show : false,
            submitted : false,
            startDate : new Date(),
            endDate : new Date(),
            items : this.props.location.state,
            customer_id : this.props.location.state.items,
            sales :this.props.location.state,
            order_id : this.props.location.state.sales,
            payment :this.props.location.state,
            user_id : this.props.location.state.payment,
            product :this.props.location.state,
            product_id : this.props.location.state.products
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleStartDate(date) {
        this.setState({
          startDate: date
        })
        console.log(this.state.startDate)
    }

    handleEndDate(date) {
        this.setState({
          endDate: date
        // },()=>{
        //   console.log(this.state.endDate > this.state.startDate)
        //   let checkDate = this.state.endDate > this.state.startDate;
        //     if(!checkDate){
        //       alert("hhhhh")
        //     }
        })
    }


    addNewSale = () => {
        this.setState({
            show : true,

        })
    }

    handleClose = () => {
        this.setState({
            show : false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    getSingleCustomer(){
        let baseUrl = 'http://18.191.185.248/api/customer/details';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(res=>{
            // console.log(res)
            this.setState({
                details : res.data
            },()=>{this.toggleLoader()
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    componentDidMount(){
        this.getSingleOrder();
        this.getSinglePayment();
        this.getSingleCustomer();
        this.getSingleProduct();
    }

    getSingleOrder(){
        let baseUrl = 'http://18.191.185.248/api/orders';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
            // console.log(result)
            this.setState({
                orders : result.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    getSinglePayment(){
        let baseUrl = 'http://18.191.185.248/api/payments';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(results=>{
            // console.log(results)
            this.setState({
                payments : results.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    validate=()=>{
        let validated = true
        let {startDate, endDate} = this.state;
        if(startDate > endDate){
            validated = false;
            toast.error('End Date is not smaller then Start Date');
        }
        return validated ?
        toast.success('Submitted Successfully')
        : null
    }

    handleAdd = (e) => {
        let validated = this.validate()
        if(validated){
        const { startDate, endDate } = this.state;
            if(!startDate || !endDate){
                alert("All fields are required");
                e.preventDefault()
            }
            else{
              let dateFilterData = [];
              this.state.orders.map((v,i)=>{
               let  mydate = new Date(v.created_on);

                if(this.state.startDate < mydate && this.state.endDate > mydate){
                    dateFilterData.push(v)
                  console.log(dateFilterData)
                }
              })
                this.setState({
                    submitted : true,
                    dateFilterData:dateFilterData
                })
        }
    }
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
        const { orders, payments } = this.state;
        return (
            <div className="customer">
                <Topbar />
                <Sidebar />
            <div style={{fontFamily: "Exo", marginLeft : "230px", marginBottom : "200px"}} >
                <div className="container-fluid pl-0 pr-0 dashboard_page" id="main">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <div className="col main pt-3">
                            <div className="d-flex justify-content-between">
                                <h1 className="display-5 d-none d-sm-block">Customer Detail</h1>
                                <button className="btn btn-primary" onClick={this.addNewSale}>Make Bill</button>
                            </div>
                            {!this.state.submitted ?
                            (<div>
                                <form method="post" onSubmit={this.handleSubmit}>
                                <Modal show={this.state.show} onHide={this.handleClose} >
                                        <Modal.Header closeButton>
                                    <Modal.Title style={{fontSize : 35}}>Make Bill</Modal.Title>
                                        </Modal.Header>

                                    <Modal.Body>
                                    <div className="form-group col-md-12">
                                    <label style={{fontSize : 20}}>Customer</label>
                                    <InputGroup>
                                    <input className="form-control" type="text" id="customerName" defaultValue={this.state.details.name} />
                                    </InputGroup>
                                    </div>

                                    <div className="d-flex">
                                    <div className="form-group col-md-6">
                                    <label style={{fontSize : 20}}>Start Date</label>  
                                    <InputGroup>
                                    <div className="form-control">
                                    <DatePicker selected={this.state.startDate} className="col-md-12" name="stateDate" value={this.state.startDate} onChange={ this.handleStartDate } dateFormat="dd/MM/yyyy"/>
                                    </div>
                                    </InputGroup>
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label style={{fontSize : 20}}>End Date</label>  
                                    <InputGroup>
                                    <div className="form-control">
                                    <DatePicker selected={this.state.endDate} className="col-md-12" name="endDate" value={this.state.endDate} onChange={ this.handleEndDate } dateFormat="dd/MM/yyyy"/>
                                    </div>
                                    </InputGroup>
                                    </div>
                                    </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                        <Button variant="primary" onClick={this.handleAdd}>Generate</Button>
                                        <ToastContainer />
                                    </Modal.Footer>
                                </Modal>
                                </form>
                       
                        </div>):
                        (
                            <div>
                            <PDFDownloadLink document={<BillTo dateFilterData={this.state.dateFilterData} 
                                                               name={this.state.details.name} 
                                                               address={this.state.details.address} 
                                                               gst_no={this.state.details.gst_no}
                                                               productName={productName}
                                                               />} 
                                                               fileName="NewBill.pdf">
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </div>
                         )
                        }
                        <Link to="/customers" >Back</Link>
                        <div className="d-flex row mt-5 col-sm-12">
                            <ul className="list-group col-sm-6">
                              <div className="d-flex"><label className="col-sm-2">Customer ID :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.id}</li></div>
                              <div className="d-flex mt-2"><label className="col-sm-2">Full Name :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.name}</li></div>
                              <div className="d-flex mt-2"><label className="col-sm-2">Address :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.address}</li></div>
                            </ul>
                            <ul className="list-group col-sm-6">
                            <div className="d-flex"><label className="col-sm-2">Phone :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.phone}</li></div>
                              <div className="d-flex mt-2"><label className="col-sm-2">Email :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.email}</li></div>
                              <div className="d-flex mt-2"><label className="col-sm-2">Created Date :</label><li className="list-group-item col-sm-10 rounded">{this.state.details.created_on}</li></div>
                            </ul>
                        </div>
                        <h1 className="display-5 mt-5 d-none d-sm-block">Sale Details</h1>
                        <Loader loader={!this.state.loader} />
                        
                        <MUIDataTable 
                        data={orders.map(sale => {return [sale.created_on, productName[sale.product_id-1], sale.slip_no, sale.quantity, sale.price, sale.total ]})}
                        columns={columns1}
                        options={{selectableRows : "none"}}
                        />

                        <h1 className="display-5 mt-5 d-none d-sm-block">Payment Details</h1>
                        <MUIDataTable 
                        data={payments.map(payment => {return [payment.created_on, payment.amount, payment.payment_method, payment.description ]})}
                        columns={columns2}
                        options={{selectableRows : "none"}}
                        />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        )
    }
}

export default CustomersItem;
