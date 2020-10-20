import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import GetPurchase from './GetPurchase'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import '../css/Purchase.css';
import { Button, Modal, InputGroup } from 'react-bootstrap';

toast.configure();

class Purchase extends Component {
    constructor(){
        super();
        this.state = {
            items : '',
            document : '',
            startDate : "",
            vehicle_no : '',
            transport : '',
            driver : '',
            show : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addPurchase = () => {
        this.setState({
            show : true
        })
    }

    handleDate = (date) => {
        this.setState({
            startDate : date
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
            let url = 'http://whispering-refuge-34674.herokuapp.com/api/pg';
       axios.post(url)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('error while posting !', err)
            })
        }
    }

    validate=()=>{
        let validated = true
        let {items, document, startDate, vehicle_no, transport, driver} = this.state;
        if(items ===''){
            validated = false;
            toast.error('Please select Item from dropdown');
        }
        else if(document === ''){
            validated = false;
            toast.error('Please enter Valid document No.');
        }
        else if(startDate === '' ){
            validated = false;
            toast.error('Please choose document Date');
        }
        else if(vehicle_no === ''){
            validated = false;
            toast.error('Please enter Truck No.');
        }
        else if(transport === '' ){
          validated = false;
          toast.error('Please enter Transport Name');
        }
        
        else if(driver === ""){
          validated = false;
          toast.error('Please type Driver Name');
        }
            return validated ?
        toast.success('Submitted Successfully')
        : null
    }

    render() {
        return (
            <div className="purchase">
                <Topbar />
                <Sidebar />
                <div style={{ fontFamily: "Exo", marginBottom : "100px", marginTop : "100px" }}>
                <div className="customers_main mt-3 mb-5">
                    <div className="row">
                        <div className="d-flex col-md-12 mt-3">
                            <h1 className="d-flex justify-content-start display-4 col-md-6 d-none d-sm-block">Purchase</h1>
                        <div className="d-flex justify-content-end col-md-6">
                        <Button className="" variant="primary" onClick={this.addPurchase}>New Purchase</Button>
                        <form onSubmit={this.handleSubmit}>
                        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add New Purchase</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>

                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}}>Choose Product</label>
                            <InputGroup>
                            <select className="form-control" type="text" name="items" placeholder="Choose Customer" onChange={this.handleChange}>
                            <option>Select Product</option>
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>2T 20 ML</option>
                                <option>2T 40 ML</option>
                                <option>@t Oil Supreme 4LT</option>
                                <option>Servo 4T Lt</option>
                                <option>Servo 4T Zoom To W 30</option>
                                <option>Servo 4T Synth 1 Lt</option>
                                <option>Servo 2T Sureme 500 ML</option>
                                <option>Servo 2T Supreme 1 Lt</option>
                                <option>Servo Futura Synth 5 W 50 1Lt</option>
                                <option>Servo Futura Synth 5 Lt</option>
                                <option>MGO 05 W 30 1 Lt</option>
                                <option>MGO 5 W 30 3.5 Lt</option>
                                <option>Maruti Genuine Oil 1 Lt</option>
                                <option>Maruti Genuine Oil 3 Lt</option>
                                <option>Maruti Genuine Diesel 1 Lt</option>
                                <option>Maruti Genuine Gear Oil 1 Lt</option>
                                <option>Hyindai Eng. Oil 1 Lt</option>
                                <option>Hyindai Eng. Oil 3 Lt</option>
                                <option>Hycoolant 1 Lt</option>
                                <option>Hy Stearing Oil 1 LT</option>
                                <option>Hy Gear Oil 2.5 Lt</option>
                                <option>Hy Break Oil 500 ML</option>
                                <option>Servo Futura P 1 W 30 1 Lt</option>
                                <option>Servo Futura AP 1 W 30 4 Lt</option>
                                <option>Servo Futura AD 15 W 40 1 Lt</option>
                                <option>Servo Futura D 15 W 40 4 Lt</option>
                                <option>Servo Price XL 1 Lt</option>
                                <option>Servo Supreme MG 20 W 40 500 ML</option>
                                <option>Servo Supreme 20 W 40 1 Lt</option>
                                <option>Servo Supreme 20 W 40 5 Lt</option>
                                <option>Servo Prem ALT 15 W 40 1 Lt</option>
                                <option>Servo Prem CF 415 W 40 1 Lt</option>
                                <option>Servo Prem CF 415 W 40 5 Lt</option>
                                <option>Servo Pride 15 W 40 1 Lt</option>
                                <option>Servo Pride 15 W 40 5 Lt</option>
                                <option>Break Oil 250 ML</option>
                                <option>Break Oil 500 ML</option>
                                <option>Servo Cool Plus 1 Lt</option>
                                <option>Servo cool plus 1 Lt</option>
                                <option>Servo Grease 1/2 KG</option>
                                <option>Distil Water</option>
                            </select>
                            </InputGroup>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Document No.</label>                            
                            <InputGroup>
                            <input className="form-control" name="document" placeholder="Enter Document No." onChange={this.handleChange} />
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Date</label>  
                            <InputGroup>
                            <input className="form-control" type="date" name="startDate" onChange={ this.handleDate } style={{flexDirection: "row"}} />
                             {/* <DatePicker selected={ this.state.startDate } className="form-group" onChange={ this.handleDate } dateFormat="dd/MM/yyyy"/> */}
                            </InputGroup>
                            </div>
                            </div>

                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}}>Transport Name</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="transport" placeholder="Enter Transport Name" onChange={this.handleChange}/>
                            </InputGroup>
                            </div> 

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Vehicle No</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="vehicle_no" placeholder="Enter Vehicle Number" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Driver Name</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="driver" placeholder="Enter Driver Name" onChange={this.handleChange}/>
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
                        <GetPurchase />
                    </div>
                    
                </div>
                </div>
                <hr />
                <Footer />
            </div>
        )
    }
}

export default Purchase;
