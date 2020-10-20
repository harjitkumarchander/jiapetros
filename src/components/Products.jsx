import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/Products.css';
import GetProduct from './GetProduct';

class Product extends Component {
    constructor(){
        super();
        this.state = {

        }
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
