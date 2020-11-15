import React, { Component } from 'react';
import { Button, Modal, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BillTo from './BillTo';


const pathName = Math.random().toString(36).substr(2, 9) + ".pdf";


class PdfBill extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token : localStorage.getItem('userData'),
            pdfData : [],
            show : false,
            submitted : false,
            customer_id : this.props.customer_id,
            start_date : new Date(),
            end_date : new Date(),
            path : pathName
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleStartDate(date) {
        this.setState({
          start_date: date
        })
        // console.log(this.state.start_date)
    }

    handleEndDate(date) {
        this.setState({
          end_date: date
        })
        // console.log(this.state.end_date)
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

    componentDidMount(){
        this.generatePdf();
    }

    validate=()=>{
        let validated = true
        let {start_date, end_date} = this.state;
        // let onlyStart_date =  +start_date.getFullYear() + +(start_date.getMonth() +1) +  +start_date.getDate();
        let onlyStart_date = new Date(+start_date.getFullYear(),+start_date.getMonth(),+start_date.getDate());
        let pdfLastData = this.state.pdfData[this.state.pdfData.length-1];
        let pdfLastDate = pdfLastData.end_date;
        let pdfinalLastDate = new Date(pdfLastDate)
        let onlyPdfFinalDate = new Date(+pdfinalLastDate.getFullYear(),+pdfinalLastDate.getMonth(),+pdfinalLastDate.getDate());
        // let onlyPdfFinalDate = +pdfinalLastDate.getFullYear() + +(pdfinalLastDate.getMonth() +1) + +pdfinalLastDate.getDate();

        if(start_date > end_date){
            validated = false;
            toast.error('End Date is not smaller then Start Date');
        }
        else if(onlyPdfFinalDate >= onlyStart_date){
            validated = false
            toast.error('This bill already generated download from bill details');
        }
        return validated ?
        toast.success('Submitted Successfully')
        : null
    }

    handleAdd = (e) => {
        let validated = this.validate()
        if(validated){
            let {start_date, end_date } = this.state;
            if(!start_date && end_date){
                console.log('Start date and End date is required');
            }
            else{
                let ApiUrl = 'http://18.191.185.248/api/order/save/pdf';
        fetch(ApiUrl,{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.text())
        .then(result=>{
            console.log(result);
            let dateFilterData = [];
            this.props.orders.map((v,i)=>{
            let  mydate = new Date(v.created_on);
            if(this.state.start_date < mydate && this.state.end_date > mydate){
            dateFilterData.push(v)
            }    
        })
        this.setState({
            submitted : true,
            dateFilterData,
            show : false  
        }) 
        })
        .catch((error)=>{
            console.log('error', error);
        })
            }
            
            }    
}

generatePdf = () => {
    let ApiUrl = 'http://18.191.185.248/api/order/get/pdfs';
    fetch(ApiUrl,{
      method : 'POST',
      body : JSON.stringify(this.state)
    })
    .then((res)=>res.json())
    .then(result=>{
        // console.log(result)
      this.setState({
          pdfData : result.data
      })
    })
    .catch((error)=>{
        console.log('error', error);
    })
  }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between">
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
                                    <label style={{fontSize : 20}}>Customer ID</label>
                                    <InputGroup>
                                    <input className="form-control" type="text" defaultValue={this.props.details.id} />
                                    </InputGroup>
                                    </div>
                                    <div className="form-group col-md-12">
                                    <label style={{fontSize : 20}}>Customer Name</label>
                                    <InputGroup>
                                    <input className="form-control" type="text" id="customerName" defaultValue={this.props.details.name}  />
                                    </InputGroup>
                                    </div>

                                    <div className="d-flex">
                                    <div className="form-group col-md-6">
                                    <label style={{fontSize : 20}}>Start Date</label>  
                                    <InputGroup>
                                    <div className="form-control">
                                    <DatePicker selected={this.state.start_date} className="col-md-12" value={this.state.start_date} onChange={ this.handleStartDate } dateFormat="dd/MM/yyyy"/>
                                    </div>
                                    </InputGroup>
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label style={{fontSize : 20}}>End Date</label>  
                                    <InputGroup>
                                    <div className="form-control">
                                    <DatePicker selected={this.state.end_date} className="col-md-12" value={this.state.end_date} onChange={ this.handleEndDate } dateFormat="dd/MM/yyyy"/>
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
                                                               pdfData={this.state.pdfData}
                                                               name={this.props.details.name} 
                                                               address={this.props.details.address} 
                                                               gst_no={this.props.details.gst_no}
                                                               productName={this.props.productName}
                                                               startDate={this.state.start_date}
                                                               endDate={this.state.end_date}
                                                               path={this.state.path}
                                                               />} 
                                                            //    fileName="NewBill.pdf"
                                                               >
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                          </div>
                         )
                        }
            </div>
        )
    }
}

export default PdfBill;
