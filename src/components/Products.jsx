import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/Products.css';
import GetProduct from './GetProduct';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal, InputGroup } from 'react-bootstrap';

class Product extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            description : '',
            quantity : '',
            price : '',
            access_token : localStorage.getItem('userData'),
            show : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addProduct = () => {
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
        let validated = this.validate();
        if(validated){
        let url = 'http://18.191.185.248/api/product/add';
            fetch(url,{
                method : 'POST',
                body : JSON.stringify(this.state)
            })
            .then(res=> res.json())
            .then((result)=>{
                console.log(result)
                this.setState({
                    show : false
                })
            })
            .catch((error)=>{
                console.log('Error while adding Product', error);
            })
        }
    }

    validate=()=>{
        let validated = true
        let {name, quantity, description, price } = this.state;
        if(name === '' ){
            validated = false;
            toast.error('Please enter a valid Product Name');
        }
        else if(quantity === ''){
            validated = false;
            toast.error('Please enter Quantity');
        }
        else if(price === '' ){
            validated = false;
            toast.error('Please Enter Price of single Product');
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
            <div className="product">
                <Topbar />
                <Sidebar />
            <div style={{ fontFamily: "Exo", marginBottom : "100px", marginTop : "100px" }}>
                <div className="customers_main mt-3 mb-5">
                    <div className="row">
                        <div className="d-flex col-md-12 mt-3">
                            <h1 className="d-flex justify-content-start display-4 col-md-6 d-none d-sm-block">Products</h1>
                        <div className="d-flex justify-content-end col-md-6">
                        <Button className="" variant="primary" onClick={this.addProduct}>Add Product</Button>
                        <form onSubmit={this.handleSubmit}>
                        <Modal show={this.state.show} onHide={this.handleClose} >
                                <Modal.Header closeButton>
                            <Modal.Title style={{fontSize : 35}}>Add Product</Modal.Title>
                                </Modal.Header>

                            <Modal.Body>
                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}} id="labelBefore">Product Name</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Product Name" className="form-control" name="name" onChange={this.handleChange} />
                            </InputGroup>
                            </div>

                            <div className="d-flex">
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Price</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Price" className="form-control" name="price" onChange={this.handleChange} />  
                            </InputGroup>
                            </div>
                            <div className="form-group col-md-6">
                            <label style={{fontSize : 20}} id="labelBefore">Quantity</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Quantity" className="form-control" name="quantity" onChange={this.handleChange} />
                            </InputGroup>
                            </div>
                            </div>

                            <div className="form-group col-md-12">
                            <label style={{fontSize : 20}} id="labelBefore">Description</label>  
                            <InputGroup>
                            <input type="text" placeholder="Enter Description" className="form-control" name="description" onChange={this.handleChange} />
                            </InputGroup>
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
                        <GetProduct />
                    </div>
                </div>
                <hr />
            </div>
            <Footer />
            </div>
                )
            }
}
export default Product;
