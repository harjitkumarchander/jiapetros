import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Loader from '../common/Loader';
import { Link } from 'react-router-dom';
import { Button, Modal, InputGroup } from 'react-bootstrap';

const columns = ["Customer ID", "Name", "Address", "Phone","Email","GST No.", "Opening Bal.","Actions"];

class NewTable extends Component {
    constructor(){
        super();
        this.state = {
            items : [],
            sales : [],
            payments : [],
            products : [],
            name : '',
            address : '',
            phone : '',
            gst_no : '',
            email : '',
            opening_balance : '',
            show : false,
            product : {}  
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

    componentDidMount(){
        this.getCustomers();
        this.getProducts();
    }

    handleEditShow = (item, id) => {
        console.log(item, id)
        this.setState({
            name : item.name,
            address : item.address,
            phone : item.phone,
            email : item.email,
            gst_no : item.gst_no,
            opening_balance : item.opening_balance,
            show : true
        })
    }

    // handleEdit = (id) => {
    //     const apiUrl = 'http://18.191.185.248/api/customers';
    //     fetch(apiUrl,{
    //         method : 'POST',
    //         body : JSON.stringify({
    //             id : this.state.id,
    //             name : this.state.name
    //         })
    //     })
    //     .then((res)=>res.json())
    //     .then(result=>{
    //         this.setState({
    //             customers : result,
    //             show : false
    //           })
    //     })
    // }

      getCustomers = () => {
        let baseUrl = 'http://18.191.185.248/api/customers';
    
            fetch(baseUrl,{
                method  : 'POST',
                body : JSON.stringify(this.state)
            })
            .then((res)=>res.json())
            .then(res=>{
                // console.log(res)
                this.setState({
                    items : res.data
                },()=>{this.toggleLoader()
                })
            })
        }

        toggleLoader = () => {
            this.setState({
                loader : !this.state.loader
            })
        }

        getProducts = () => {
            fetch("http://18.191.185.248/api/products",{
                method : 'POST',
                body : JSON.stringify(this.state)
            })
            .then(res=>res.json())
            .then(result=>{
                // console.log(result)
                this.setState({
                    products : result.data
                })
            })
            .catch((error)=>{
                console.log("error while fetching" , error)
            })
        }

        render(){
            const { items } = this.state;
            return (
                <div className="get_customers_main pl-5">
                
                    <div className="col-lg-12 col-md-12 mt-3 customers_col">
                    <div id="customer_table" className="">
                    <Loader loader={!this.state.loader} />
                    {
                        <MUIDataTable
                        
                            className="pl-0 pr-0"
                            data={items.map(item => {return [item.id,
                                        <Link to={{ pathname : "/customersitem", state : {items : item.id, sales : item.id, payments :item.id, products : item.id} }}>{item.name}</Link>
                                        ,item.address,item.phone,item.email,item.gst_no,item.opening_balance,
                                    <li className="row ml-0 mr-5 action-btn">
                                        <button className="btn btn-light bg-transparent" 
                                        // onClick={()=>this.handleEditShow(item,item.id)} 
                                        ><i className="col fa fa-edit"></i></button>
                                    </li>
                                    ]}
                                    )}
                            columns={columns}
                            options={{ selectableRows: "none"}}
                        /> 
                    }
                </div>
                <form onSubmit={this.handleSubmit}>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Edit Customer</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                                <label style={{fontSize : 20}}>Name</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="name" value={this.state.name} placeholder="Customer Name" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>

                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}}>Address</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="address" value={this.state.address} placeholder="Customer Address" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Phone</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="phone" value={this.state.phone} placeholder="Customer Phone No." onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Email</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="email" value={this.state.email} placeholder="Customer Email Address" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>GST/TIN</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="gst_no" value={this.state.gst_no} placeholder="Customer GST/TIN No." onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Opning Bal.</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="opening_balance" value={this.state.opening_balance} placeholder="Customer Due Payment" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            </Modal.Body>
                            <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" 
                        // onClick={()=>this.handleEdit(this.state.id)}
                        >Edit & Close</Button>
                        {/* <ToastContainer /> */}
                            </Modal.Footer>
                        </Modal>
                        </form>
                </div>
                </div>
            )
        }
        
    }   
export default NewTable;
