import React, { Component } from 'react';
import { Button, Modal, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
// import MakePdf from './MakePdf';
import BillTo from './BillTo';

toast.configure();

class Sales1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer : '',
            show : false,
            submitted : false,
            startDate : new Date(),
            endDate : new Date()
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state.customer)
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
        })
        console.log(this.state.endDate)
    }

    addNewSale = () => {
        this.setState({
            show : true
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
    
    handleAdd = (e) => {
        const { customer, startDate, endDate } = this.state;
            if(!customer || !startDate || !endDate){
                alert("All fields are required");
                e.preventDefault()
            }            
            else{
                this.setState({
                    submitted : true             
                })
    }
}

    render() {
        return (
            <div>
                <Button className="ml-5 mr-5 mt-3" variant="primary" onClick={this.addNewSale}>New Bill</Button>
                {!this.state.submitted ?
                (<div>
                
                        <form method="post" onSubmit={this.handleSubmit}>
                        <Modal show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add New Sale</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}}>Customer</label>
                            <InputGroup>
                            <select className="form-control" type="text" value={this.state.customer} name="customer" placeholder="Choose Customer" onChange={this.handleChange}>
                                    <option>Choose Customer</option>
                                    <option>Jia Petros</option>
                                    <option>Rehaan Filling</option>
                                    <option>Ramnik Gas Agency</option>
                                </select>
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
                       
                        </div>
                         ):
                         (
                            <div>
                            <PDFDownloadLink document={<BillTo />} fileName="NewBill.pdf">
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </div>
                         )
                        //  (<MakePdf 
                        //     customer={this.state.customer} 
                        //     startDate={this.state.startDate.getDate() + "/" + (this.state.startDate.getMonth()+1) + "/" + this.state.startDate.getFullYear()} 
                        //     endDate={this.state.endDate.getDate() + "/" + (this.state.endDate.getMonth()+1) + "/" + this.state.endDate.getFullYear()} 
                        // />)
                         }
            </div>
          )
    }
}

export default Sales1;
