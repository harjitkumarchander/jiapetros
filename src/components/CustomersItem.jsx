import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../common/Loader';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import '../css/CustomerItem.css';
import { Link } from 'react-router-dom';
import PdfBill from './PdfBill';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyPdfBill from './MyPdfBill';

const columns1 = ["Order Date", "Item", "Order No", "Quantity", "Price", "Total" ];
const columns2 = ["Payment Date", "Amount" , "Payment Mode", "Description" ];
const columns3 = ["Bill Date", "Bill No.", "Start Date", "End Date", "File Name" ];


class CustomersItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            access_token : localStorage.getItem('userData'),
            details : "",
            products : [],
            orders : [],
            payments : [],
            pdfData : [],
            DateFilterData : [],
            show : false,
            submitted : false,
            items : this.props.location.state,
            customer_id : this.props.location.state.items,
            sales :this.props.location.state,
            order_id : this.props.location.state.sales,
            payment :this.props.location.state,
            user_id : this.props.location.state.payments,
            product :this.props.location.state,
            product_id : this.props.location.state.products,
        }
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleStartDate(date) {
        this.setState({
          start_date: date
        })
        console.log(this.state.start_date)
    }

    handleEndDate(date) {
        this.setState({
          end_date: date
        // },()=>{
        //   console.log(this.state.endDate > this.state.startDate)
        //   let checkDate = this.state.endDate > this.state.startDate;
        //     if(!checkDate){
        //       alert("hhhhh")
        //     }
        })
        console.log(this.state.end_date)
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

    componentDidMount = () => {
        this.getSingleOrder();
        this.getSinglePayment();
        this.getSingleCustomer();
        this.getSingleProduct();
        this.getPdf();
    }

    getFilterData = (pdf,ids) => {
        let newStartDate = new Date(this.state.pdfData[ids].start_date)
        let newEndDate = new Date(this.state.pdfData[ids].end_date)
        let DateFilterData = [];
        // let newStartDate = this.state.pdfData.map((v,i)=> new Date(v.start_date)[ids])
        
        // let newStartDate = this.state.pdfData.map((v,i)=> new Date(v.start_date)[ids])
        // let newEndDate = this.state.pdfData.map((v,i)=> v.end_date[ids])
        // console.log(newStartDate)
        // console.log(ids);
            this.state.orders.map((v,i)=>{   
        let slipDate = new Date(v.created_on);
        if(newStartDate < slipDate && newEndDate > slipDate){
            DateFilterData.push(v)
        }
        })
        this.setState({
            DateFilterData : DateFilterData
         })

         console.log(DateFilterData)
    }

    getSingleOrder = () => {
        let baseUrl = 'http://18.191.185.248/api/orders';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
            // console.log(result);
            this.setState({
                orders : result.data
            })
        })
        .catch((error)=>{
            console.log('error', error);
        })
    }

    getSinglePayment = () => {
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

    getPdf = () => {
        let ApiUrl = 'http://18.191.185.248/api/order/get/pdfs';
        fetch(ApiUrl,{
          method : 'POST',
          body : JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then(result=>{
          console.log(result);
          this.setState({
            pdfData : result.data
            })
        })                
        .catch((error)=>{
            console.log('error', error);
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

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    render() {
        let productName = this.state.products.map((v,i)=>v.name)
        const { orders, payments, pdfData } = this.state;
        return (
            <div className="customer">
                <Topbar />
                <Sidebar />
            <div style={{fontFamily: "Exo", marginLeft : "230px", marginBottom : "200px"}} >
                <div className="container-fluid pl-0 pr-0 dashboard_page" id="main">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <div className="col main pt-3">
                            <div className="d-flex justify-content-between">
                                <h1 className="displa[new Date(v.created_on)]y-5 d-none d-sm-block">Customer Detail</h1>
                                <PdfBill 
                                    details={this.state.details}
                                    productName={productName}
                                    orders={this.state.orders}
                                    customer_id={this.state.customer_id}
                                    pdfData={this.state.pdfData}
                                />
                            </div>
                           
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

                        <h1 className="display-5 mt-5 d-none d-sm-block">Bill Details</h1>
                        <Loader loader={!this.state.loader} />
                        <MUIDataTable 
                        data={pdfData.map((pdf, i) => {return [pdf.created_on, 
                                                          <PDFDownloadLink document={<MyPdfBill
                                                            customerName={this.state.details.name}
                                                            customerAddress={this.state.details.address}
                                                            customerGstNo={this.state.details.gst_no}
                                                            customerBillNo={pdf.id}
                                                            customerBillCreateDate={pdf.created_on}
                                                            customerStartDate={pdf.start_date}
                                                            customerEndDate={pdf.end_date}
                                                            customerProductName={this.state.products}
                                                            orders={this.state.orders}
                                                            DateFilterData={this.state.DateFilterData}
                                                          />
                                                        }
                                                          ><button className="btn btn-secondary" onClick={()=>this.getFilterData(pdf,i)}>{pdf.id}</button>
                                                          </PDFDownloadLink>, pdf.start_date, pdf.end_date, pdf.path ]})}
                        columns={columns3}
                        options={{selectableRows : "none"}}
                        />

                        <h1 className="display-5 mt-5 d-none d-sm-block">Sale Details</h1>                        
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
