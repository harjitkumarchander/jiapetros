import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import '../css/Sales.css';
import '../css/Customers.css';
import GetSales from './GetSales';
import { Button, Modal, InputGroup } from 'react-bootstrap';


toast.configure();

class Sales extends Component {
    constructor(){
        super();
        this.state = {
            user1 : [],
            user2 : [],
            product1 : [],
            product2 : [],
            access_token: localStorage.getItem('userData'),
            customer_id : '',
            product_id : "",
            vehicle_no : '',
            slip_no : '',
            price : '',
            quantity : '',
            show : false,
            showCustomerSearchBox : false,
            showProductSearchBox : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addNewSlip = () => {
        this.setState({
            show : true
        })
    }
    addNewSale = () => {
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

    componentDidMount(){
        this.getCustomerId();
        this.getProductId();
    }

    getCustomerId = () => {
        let baseUrl = 'http://18.191.185.248/api/customers';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state.access_token)
        })
        .then((res)=>res.json())
        .then(res=>{
            // console.log(res);
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

    getProductId = () => {
        let baseUrl = 'http://18.191.185.248/api/products';
        fetch(baseUrl,{
            method  : 'POST',
            body : JSON.stringify(this.state.access_token)
        })
        .then((res)=>res.json())
        .then(res=>{
            // console.log(res);
            let tempArr = [];
            for(const obj of res.data) {
                if(obj !== undefined) {
                  tempArr.push(obj);
                }
              }
            this.setState({
                product1 : tempArr,
                product2 : tempArr
            })
        })
            .catch((error)=>{
                console.log('error', error);
            })
    }

        handleCustomerIdSearch = (e) => {
            let user2 = [];
                for(const obj of this.state.user1){
            let customerId = obj.id
            let customerName = obj.name
                if(e.target.value.toLowerCase() === customerName.substring(0, e.target.value.length).toLowerCase() ||
                   e.target.value.toLowerCase() === customerId.substring(0, e.target.value.length).toLowerCase() ){
            user2.push(obj)
              }
            }
            // console.log(user2)
            this.setState({
                user2,
                customer_id : e.target.value
            })
        }

        handleProductIdSearch = (e) => {
            let product2 = [];
                for(const obj of this.state.product1){
            let productId = obj.id
            let productName = obj.name
                if(e.target.value.toLowerCase() === productName.substring(0, e.target.value.length).toLowerCase() ||
                   e.target.value.toLowerCase() === productId.substring(0, e.target.value.length).toLowerCase() ){
            product2.push(obj)
              }
            }
            // console.log(product2)
            this.setState({
                product2,
                product_id : e.target.value
            })
        }

    handleAdd = () => {
        let validated = this.validate();
        if(validated){
         let url = 'http://18.191.185.248/api/order/add';
         fetch(url,{
             method : 'POST',
             body : JSON.stringify(this.state)
         })
         .then((res)=>res.json())
         .then(result=>{
            //  console.log(result)
             this.setState({
                 show : false,
                 result : result.data
             })
         })
         .catch((error)=>{
             console.log("error", error);
         })
    }
    }

    validate=()=>{
        let validated = true
        let { customer_id, product_id, vehicle_no, slip_no,price, quantity } = this.state;
        
         if(customer_id === "" || customer_id.match(/^[a-zA-Z]+$/)){
            validated = false;
            toast.error('Please enter Customer ID');
        }
        else if(product_id === ''){
            validated = false;
            toast.error('Please enter Product ID');
        }
        else if(vehicle_no === ''){
            validated = false;
            toast.error('Please type valid Vehicle No.');
        }
        else if(slip_no === '' ){
            validated = false;
            toast.error('Please type slip No.');
        }
        else if(quantity === ''){
            validated = false;
            toast.error('Please fill valid Quantity');
        }
        else if(price === '' ){
          validated = false;
          toast.error('Please enter price of selected product');
        }
        return validated ?
          toast.success('Submitted Successfully')
        : null
    }

    render() {
        return (
            <div className="sale">
                <Topbar />
                <Sidebar />
            <div style={{ fontFamily: "Exo", marginTop : "100px" }}>
                <div className="customers_main mt-3 mb-5" style={{marginBottom : "200px"}} >
                    <div className="row">
                        <div className="d-flex col-md-12 mt-3">
                            <h1 className="d-flex justify-content-start display-4 col-md-6 d-none d-sm-block">Sales</h1>
                            <div className="d-flex col-md-6 justify-content-end">
                        <Button className="" variant="primary" onClick={this.addNewSlip}>New Slip Entry</Button>

                        <form onSubmit={this.handleSubmit}>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add New Sale</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Customer ID</label>
                            <InputGroup>
                            <input className="form-control" type="text" placeholder="Enter Customer ID" onChange={this.handleCustomerIdSearch} onFocus={()=>this.setState({showCustomerSearchBox : true})} onBlur={()=>this.setState({showCustomerSearchBox : false})} />
                            </InputGroup>
                            
                            {this.state.showCustomerSearchBox ? 
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
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Product ID</label>                            
                            <InputGroup>
                            <input className="form-control" type="text" name="product_id" placeholder="Enter Product ID" onChange={this.handleProductIdSearch} onFocus={()=>this.setState({showProductSearchBox : true})} onBlur={()=>this.setState({showProductSearchBox : false})} />
                            </InputGroup>

                            {this.state.showProductSearchBox ? 
                            <div className="container p-0 col-md-8 col-sm-12 searchlistcontainer">
                               { this.state.product2.map((v,i)=>{
                                    return(
                                        <ul key={i} className="list-group" id="selectList" >
                                          <div className="row">
                                            <li className="list-group-item p-0 d-flex" >
                                                <p className="ml-4 text-left">{v.id}</p>
                                                <p className="ml-2 text-center">{v.name}</p>
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
                            
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Vehicle</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="vehicle_no" placeholder="Enter Vehicle Number" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Slip No.</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="slip_no" placeholder="Enter Slip No." onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Quantity in Lt.</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="quantity" placeholder="Enter Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Price</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="price" placeholder="Enter Price" value={this.state.price} onChange={this.handleChange}/>
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
                    </div>
                    <GetSales /> 
                </div>
                <hr />
            </div>
            <Footer />
            </div>
        )
    }
}

export default Sales;
