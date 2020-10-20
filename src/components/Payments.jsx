import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/Payments.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal, InputGroup } from 'react-bootstrap';
import GetPayments from './GetPayments';


class Payments extends Component {
    constructor(){
        super();
        this.state = {
            user1 : [],
            user2 : [],
            customer_name : "",
            customer_id : '',
            amount : '',
            access_token : localStorage.getItem('userData'),
            payment_method : '',
            description : '',
            created_on : new Date(),
            show : false,
            showSearchBox : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addPayment = () => {
        this.setState({
            show : true
        })
    }

    handleDate = (date) => {
        this.setState({
            created_on : date
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleClose = () => {
        this.setState({
            show : false
        })
    }

    componentDidMount(){
        this.getCustomerId();
    }

    getCustomerId = () => {
        let baseUrl = 'http://18.191.185.248/api/customers';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state.access_token)
        })
        .then((res)=>res.json())
        .then(res=>{
            console.log(res);
            let tempArr = [];
            for(const obj of res.data) {
                if(obj !== undefined) {
                  tempArr.push(obj);
                }
              }
            this.setState({
                user1 : tempArr,
                user2 : tempArr
            })
        })
            .catch((error)=>{
                console.log('error', error);
            })
    }
         
        handleIdSearch = (e) => {
        let user2 = [];
            for(const obj of this.state.user1){
        let customerId = obj.id
        let customerName = obj.name
            if(e.target.value.toLowerCase() === customerName.substring(0, e.target.value.length).toLowerCase() ||
               e.target.value.toLowerCase() === customerId.substring(0, e.target.value.length).toLowerCase() ){
        user2.push(obj)
      }
    }
    console.log(user2)
    this.setState({
        user2,
        customer_id : e.target.value
    })
    }

    handleAdd = () => {
        let validated = this.validate();
        if(validated){
        let url = 'http://18.191.185.248/api/payment/add';
            fetch(url,{
                method : 'POST',
                body : JSON.stringify(this.state)
            })
            .then(res=> res.json())
            .then((res)=>{
                this.setState({
                    show : false
                })
                console.log(res);
            })
        }
    }

    validate=()=>{
        let validated = true
        let {customer_id, amount, payment_method, description, created_on } = this.state;
        if(customer_id === '' || customer_id.match(/^[a-zA-Z]+$/)){
            validated = false;
            toast.error('Please enter a valid Customer ID');
        }
        else if(amount === ''){
            validated = false;
            toast.error('Please enter Amount received from customer');
        }
        else if(created_on === '' ){
            validated = false;
            toast.error('Please choose document Date');
        }
        else if(payment_method === ''){
            validated = false;
            toast.error('Please enter Payment method');
        }
        else if(description === ''){
            validated = false;
            toast.error('Please enter Description');
        }
        return validated ?
        toast.success('Submitted Successfully')
        : null
    }

    render() {
        return (
            <div className="payment">
                <Topbar />
                <Sidebar />
            <div style={{ fontFamily: "Exo", marginBottom : "100px", marginTop : "100px" }}>
                    <div className="customers_main mt-3 mb-5">
                    <div className="row">
                        <div className="d-flex col-md-12 mt-3">
                            <h1 className="d-flex justify-content-start display-4 col-md-6 d-none d-sm-block">Payments</h1>
                        <div className="d-flex justify-content-end col-md-6">
                        <Button className="" variant="primary" onClick={this.addPayment}>Add Payment</Button>
                        <form onSubmit={this.handleSubmit}>
                        <Modal show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add Payments</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                                <label style={{fontSize : 20}} id="labelBefore">Customer ID</label>
                            <InputGroup>
                            <input className="form-control" type="text" placeholder="Enter Customer ID" onChange={this.handleIdSearch} onFocus={()=>this.setState({showSearchBox : true})} onBlur={()=>this.setState({showSearchBox : false})} />
                            </InputGroup>
                            
                            {this.state.showSearchBox ? 
                            <div className="container p-0 col-md-8 col-sm-12 searchlistcontainer">
                               { this.state.user2.map((v,i)=>{
                                    return(
                                        <ul key={i} className="list-group" id="selectList" >
                                          <div className="row">
                                            <li className="list-group-item p-0 d-flex" >
                                                <p className="ml-4 text-left">{v.id}</p>
                                                <p className="ml-2 text-center">{v.name}</p>
                                                <p className="ml-2 text-right">{v.address}</p>
                                            </li>
                                          </div>
                                        </ul>
                                    );
                                })
                            }
                                </div>
                                :null
                            }
                            </div>
                            

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Payment</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Amount" className="form-control" name="amount" onChange={this.handleChange} />
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Date</label>  
                            <InputGroup>
                            <div className="form-control">
                            {/* <input type="date" className="col-md-12" name="created_on" value={this.state.created_on} onChange={ this.handleDate } dateFormat="dd/MM/yyyy"/> */}
                            <DatePicker selected={this.state.created_on} className="col-md-12" name="created_on" value={this.state.created_on} onChange={ this.handleDate } dateFormat="dd/MM/yyyy"/>
                            </div>
                            </InputGroup>
                            </div>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Payment Method</label>  
                            <InputGroup>
                            <select type="text" placeholder="Enter Payment Method" className="form-control" name="payment_method" onChange={this.handleChange} >
                                <option>Select Payment Method</option>
                                <option>Cash</option>
                                <option>Online</option>
                                <option>Cheque</option>
                            </select>    
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Description</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Description" className="form-control" name="description" onChange={this.handleChange} />
                            </InputGroup>
                            </div>
                            </div>

                            </Modal.Body>
                            <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleAdd}>Add</Button>
                        <ToastContainer />
                            </Modal.Footer>
                        </Modal>
                        </form>
                        </div>
                        </div>
                        <GetPayments />
                    </div>
                </div>
                <hr />
            </div>
            <Footer />
            </div>
        )
    }
}

export default Payments;
