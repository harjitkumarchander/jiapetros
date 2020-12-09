import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import '../css/Customers.css';
import GetCustomers from './GetCustomers';
import { Button, Modal, InputGroup } from 'react-bootstrap';


toast.configure();

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            address : '',
            phone : '',
            gst_no : '',
            email : '',
            opening_balance : '',
            show : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addCustomer = () => {
        this.setState({
            show : true
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

    handleAdd = () => {
        let validated = this.validate()
        if(validated){
        let url = 'http://18.191.185.248/api/customer/add';
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
        .catch((error)=>{
            console.log('Error', error)
        })
}
    }
    
    validate=()=>{
        let validated = true
        let {name, address, phone, gst_no, email, opening_balance} = this.state;
        if(name ===''){
            validated = false;
            toast.error('Please type Valid Name of Customer');
        }
        else if(address === ''){
            validated = false;
            toast.error('Please type valid Address');
        }
        else if(phone === '' || phone.length !== 10){
            validated = false;
            toast.error('Please enter 10 digit Mobile No.');
        }
        else if(gst_no === ''){
            validated = false;
            toast.error('Please fill your correct GST/TIN No.');
        }
        else if(email === '' || !email.includes('@') || !email.includes('.')){
          validated = false;
          toast.error('Please fill your valid Email ID');
        }
        
        else if(opening_balance === ""){
          validated = false;
          toast.error('Fill Pending Payment');
        }
            return validated ?
        toast.success('Submitted Successfully')
        : null
    }

    render() {
        return (
            <div className="customer">
                <Topbar />
                <Sidebar />
            <div style={{ fontFamily: "Exo", marginBottom : "120px", marginTop : "100px" }}>
                <div className="customers_main mt-3 mb-5">
                    <div className="row">
                        <div className="d-flex col-md-12 mt-3">
                            <h1 className="d-flex justify-content-start display-4 col-md-6 d-none d-sm-block">Customers</h1>
                            <div className="d-flex justify-content-end col-md-6">
    
                        <Button className="" variant="primary" onClick={this.addCustomer}>Add Customer</Button>
                        <form onSubmit={this.handleSubmit}>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add Customer</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                                <label style={{fontSize : 20}} id="labelBefore">Name</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="name" value={this.state.name} placeholder="Customer Name" onChange={this.handleChange} />
                            </InputGroup>
                            </div>

                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}} id="labelBefore">Address</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="address" value={this.state.address} placeholder="Customer Address" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Phone</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="phone" value={this.state.phone} placeholder="Customer Phone No." onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Email</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="email" value={this.state.email} placeholder="Customer Email Address" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">GST/TIN</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="gst_no" value={this.state.gst_no} placeholder="Customer GST/TIN No." onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Opning Bal.</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="opening_balance" value={this.state.opening_balance} placeholder="Customer Due Payment" onChange={this.handleChange}/>
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
                        
                    <GetCustomers  />
                    </div>
                </div>
            </div>
            <Footer />
            </div>
                        )
    }
}

export default Customers;
