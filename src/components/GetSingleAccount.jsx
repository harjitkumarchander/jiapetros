import React, { Component } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../common/Loader';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import LedgerTo from './LedgerTo';

const columns = ["Txn Date", "Opening Balance", "Description", "Bill No", "Sale", "Payments", "Closing" ];


class GetSingleAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token : localStorage.getItem('userData'),
            ledgers : [],
            closing : '',
            details : "",
            show : false,
            submitted : false,
            startDate : new Date(),
            endDate : new Date(),
            customers : this.props.location.state,
            customer_id : this.props.location.state.customers
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

	// get closing balabnce

     custClose = () => {
      let closeBal = this.state.details.opening_balance;
      this.state.ledgers.map((v,i)=>{
          if(v.type === "order"){
            closeBal = +closeBal + +v.total;
             v.closeBalance = closeBal;
          }else if(v.type === "payment"){
            closeBal = +closeBal - +v.amount;
            v.closeBalance = closeBal;
          }
      })
      this.setState({
          ledger : this.state.ledgers
      })
    //   console.log(this.state.ledgers)
    }

    custOpening = () => {
        let openBal = this.state.details.opening_balance
        this.state.ledgers.map((v,i)=>{
            if(v.type === 'order'){
                openBal = v.closeBalance - +v.total
                v.openingBalance = openBal
            }
            else if(v.type === 'payment'){
                openBal = v.closeBalance + +v.amount
                v.openingBalance = openBal
            }
        })
        this.setState({
            ledger : this.state.ledgers
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        // console.log(this.state.customer)
    }

    handleStartDate(date) {
        this.setState({
          startDate: date
        })
        // console.log(this.state.startDate)
    }

    handleEndDate(date) {
        this.setState({
          endDate: date
        // },()=>{
        //   console.log(this.state.endDate > this.state.startDate)
        //   let checkDate = this.state.endDate > this.state.startDate;
        //     if(!checkDate){
        //         toast.error('End date is not smaller then Start Date');
        //       console.log("hhhhh")
        //     }
        })
    }

    handleClose = () => {
        this.setState({
            show : false
        })
    }

    handleSubmit = (e) => {  
        e.preventDefault();
    }

    generateStatement = () => {
        this.setState({
            show : true
        })
    }

    componentDidMount(){
        this.getSingleCustomer();
        this.getCustomerLedger();
    }

    getSingleCustomer = () => {
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

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }


    getCustomerLedger = () => {
        let baseUrl = 'http://18.191.185.248/api/customer/ledger';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(res=>{
            // console.log(res)
            this.setState({
                ledgers : res.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
	.finally(()=>{
          this.custClose()
          this.custOpening()
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
              this.state.ledgers.map((v,i)=>{
               let  mydate = new Date(v.created_on);

                if(this.state.startDate < mydate && this.state.endDate > mydate){
                    dateFilterData.push(v)
                //   console.log(dateFilterData)
                }
              })
                this.setState({
                    submitted : true,
                    dateFilterData:dateFilterData
                })
        }
    }
    }

    render() {

        let { ledgers } =this.state;
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
                            <button className="btn btn-primary" onClick={this.generateStatement}>Generate Statement</button>
                            </div>
                            {!this.state.submitted ?
                        (<div>
                        <form method="post" onSubmit={this.handleSubmit}>
                        <Modal show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Generate Statement</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}}>Customer</label>
                            <InputGroup>
                            <input className="form-control" type="text" defaultValue={this.state.details.name} />
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
                       
                        </div>)
                        :(<div>
                            <PDFDownloadLink document={<LedgerTo dateFilterData={this.state.dateFilterData} 
                                                               name={this.state.details.name} 
                                                               address={this.state.details.address} 
                                                               gst_no={this.state.details.gst_no}
                                                               />} 
                                                               fileName="LedgerAccount.pdf">
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </div>)
                         }

                        
                        
                    <Link to="/accounts" >Back</Link>
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
                    <h1 className="display-5 mt-5 d-none d-sm-block">Account Details</h1>
                    <Loader loader={!this.state.loader} />
                    
                    <MUIDataTable 
                    data={ledgers.map(ledg => {if(ledg.type==='order'){
                        return [ledg.created_on, Number.parseFloat(ledg.openingBalance).toFixed(2)," ", ledg.slip_no , ledg.total, " ",Number.parseFloat(ledg.closeBalance).toFixed(2)
                    ]}
                    
                    else if(ledg.type==='payment'){
                        return [ledg.created_on,Number.parseFloat(ledg.openingBalance).toFixed(2), ledg.description, " " , " ", ledg.amount,Number.parseFloat(ledg.closeBalance).toFixed(2)
                     ]}
                    })}
                    columns={columns}
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

export default GetSingleAccount;
