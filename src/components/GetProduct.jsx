import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Loader from '../common/Loader';
import { Button, Modal, InputGroup } from 'react-bootstrap';

const columns = ["Product ID", "Product Name", "Quantity","Sale Price", "Action"];


// const options = {
//     filterType: 'checkbox'
//       };


class GetProduct extends Component {
    constructor(){
        super();
        this.state = {
            items : [],
            access_token: localStorage.getItem('userData'),
            product_id : "",
            name : '',
            description : '',
            image : '',
            quantity : '',
            price : '',
            status : '',
            created_on : '',
            updated_on : '',
            show : false      
          }

        //   this.deleteRow = this.deleteRow.bind(this)
    }

    // deleteRow = (index,e) => {
    //     let rows = this.state.rows;
    //     rows.splice(index, 1);
    //     this.setState({
    //         rows : rows 
    //     })
    //     console.log("deleted", e)
    // }

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

    handleEditShow = (item, id) => {
        console.log(item, id)
        this.setState({
            name : item.name,
            description : item.description,
            price : item.price,
            quantity : item.quantity,
            category_id: item.category_id,
            show : true
        })
        
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    componentDidMount(){
        fetch("http://18.191.185.248/api/products",{
            method : 'POST',
            body : JSON.stringify(this.state.access_token)
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result)
            this.setState({
                items : result.data
            },()=>{this.toggleLoader()
            })
        })
        .catch((error)=>{
            console.log("error while fetching" , error)
        })
    }

    handleEdit = (productId) => {
        fetch('http://18.191.185.248/api/product/edit',{
            method : 'POST',
            body : JSON.stringify({name : this.state.name,
                                   price : this.state.price, 
                                   product_id : this.state.product_id, 
                                   quantity : this.state.quantity,
                                   description : this.state.description,
                                   access_token : this.state.access_token
                                })
        })
        .then((res)=>res.json())
        .then(result=>{
            this.setState({
                show : false
            })
            // console.log(result);
        })
        .catch((error)=>{
            console.log("error", error);
        })
    }

        render(){
            const { items } = this.state;
            return (
            
                <div className="get_customers_main pl-5">
                    <div className="col-lg-12 col-md-12 mt-3 customers_col">
                    <div id="customer_table" className=""> 
                    <Loader loader={!this.state.loader} /> 
                        <MUIDataTable

                            className="pl-0 pr-0"
                            // title={"Employee List"}
                            data={items.map((item,i) => {return [item.id,item.name,item.quantity,item.price,
                                    <li className="row ml-0 mr-5 action-btn">
                                        <button className="btn btn-light bg-transparent" onClick={()=>this.handleEditShow(item,item.id)}><i className="col fa fa-edit"></i></button>
                                        {/* <button className="btn btn-light bg-transparent"><i className="col fa fa-trash" aria-hidden="true"></i></button> */}
                                    </li>
                                    ]}
                                    )}
                            columns={columns}
                            // options={options}
                            options={{ selectableRows: "none"}}
                        /> 
                </div>
                <form onSubmit={this.handleSubmit}>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Edit Products</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                                <label style={{fontSize : 20}}>Name</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="name" value={this.state.name} placeholder="Product Name" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Quantity</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="quanlity" value={this.state.quantity} placeholder="Quantity" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Price</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="price" value={this.state.price} placeholder="Price" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Product ID</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="product_id" value={this.state.product_id} placeholder="Product ID" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}}>Description</label>
                            <InputGroup>
                            <input className="form-control" type="text" name="description" value={this.state.description} placeholder="Customer Due Payment" onChange={this.handleChange}/>
                            </InputGroup>
                            </div>
                            </div>

                            </Modal.Body>
                            <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={(e)=>this.handleEdit(e)}>Edit & Close</Button>
                        {/* <ToastContainer /> */}
                            </Modal.Footer>
                        </Modal>
                        </form>
                </div>
                </div>
            )
        }
        
    }   
export default GetProduct;
