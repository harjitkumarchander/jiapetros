import React, { Component } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import '../css/Dashboard.css';
import Loader from '../common/Loader';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            items : [],
            products : []
        }
    }

    componentDidMount(){
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

        fetch("http://18.191.185.248/api/products",{
            method : 'POST',
            body : JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result)
            this.setState({
                products : result.data
            }
            )
        })
        .catch((error)=>{
            console.log("error while fetching" , error)
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    render() {
        let user = this.state.items.map(item => item.name);
        let product = this.state.products.map(prod => prod.quanlity);
        return (
            <div className="dashboard left">
                <Loader loader={!this.state.loader} />
                <Topbar />
                <Sidebar />
            <div style={{fontFamily: "Exo", marginBottom : "100px", marginLeft : "230px"}} >
            <div className="container-fluid pl-0 pr-0 dashboard_page mb-5" id="main">
                <div className="row row-offcanvas row-offcanvas-left">
                    <div className="col main pt-5 mt-3">
                        <h1 className="display-4 d-none d-sm-block">Dashboard</h1>

                        <div className="row mt-3 mb-3">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success">
                                        <div className="rotate">
                                            <i className="fa fa-user fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Customers</h6>
                                        <h1 className="display-4">{this.state.items.length}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card text-white bg-danger h-100">
                                    <div className="card-body bg-danger">
                                        <div className="rotate">
                                            <i className="fa fa-list fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Active</h6>
                                        <h1 className="display-4">{this.state.items.length}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card text-white bg-info h-100">
                                    <div className="card-body bg-info">
                                        <div className="rotate">
                                            <i className="fa fa-truck fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Diesel</h6>
                                        <h1 className="display-4">{product[1]}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card text-white bg-warning h-100">
                                    <div className="card-body">
                                        <div className="rotate">
                                            <i className="fa fa-car fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Petrol</h6>
                                        <h1 className="display-4">{product[0]}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row placeholders mb-3">
                            <div className="col-6 col-sm-3 placeholder text-center">
                                <img src={require('../images/toppump1.jpg')} className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail" style={{width : "200px", height : "200px", borderRadius : "50%"}} />
                                <h4>Top 1</h4>
                                <span className="text-muted">{user[0]}</span>
                            </div>
                            <div className="col-6 col-sm-3 placeholder text-center">
                                <img src={require('../images/toppump2.jpg')} className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail" style={{width : "200px", height : "200px", borderRadius : "50%"}} />
                                <h4>Top 2</h4>
                                <span className="text-muted">{user[1]}</span>
                            </div>
                            <div className="col-6 col-sm-3 placeholder text-center">
                                <img src={require('../images/toppump3.jpg')} className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail" style={{width : "200px", height : "200px", borderRadius : "50%"}} />
                                <h4>Top 3</h4>
                                <span className="text-muted">{user[2]}</span>
                            </div>
                            <div className="col-6 col-sm-3 placeholder text-center">
                                <img src={require('../images/toppump4.jpg')} className="center-block img-fluid rounded-circle" alt="Generic placeholder thumbnail" style={{width : "200px", height : "200px", borderRadius : "50%"}} />
                                <h4>Top 4</h4>
                                <span className="text-muted">{user[3]}</span>
                            </div>
                        </div>
                        {/* <hr /> */}
                        <h2 className="sub-header mt-5">Another Services at Retail Outlet</h2>
                        <div className="mb-3">
                            <div className="card-deck">
                                <div className="card card-inverse card-success text-center">
                                    <div className="card-body">
                                        <blockquote className="card-blockquote">
                                            <img src={require('../images/water_cooler.png')} style={{width: "200px", height : "200px"}} alt="water cooler_image" />
                                            <h4>Drinking Water</h4>
                                        </blockquote>
                                    </div>
                                </div>

                                <div className="card card-inverse card-danger text-center">
                                    <div className="card-body">
                                        <blockquote className="card-blockquote">
                                        <img src={require('../images/free_air.png')} style={{width: "200px", height : "200px"}} alt="water cooler_image" />
                                            <h4>Free Air</h4>
                                        </blockquote>
                                    </div>
                                </div>

                                <div className="card card-inverse card-info text-center">
                                    <div className="card-body">
                                        <blockquote className="card-blockquote">
                                        <img src={require('../images/first_aid.png')} style={{width: "200px", height : "200px"}} alt="water cooler_image" />
                                            <h4>First Aid Box</h4>
                                        </blockquote>
                                    </div>
                                </div>

                                <div className="card card-inverse card-warning text-center">
                                    <div className="card-body">
                                        <blockquote className="card-blockquote">
                                        <img src={require('../images/toilet.png')} style={{width: "200px", height : "200px"}} alt="water cooler_image" />
                                            <h4>Toilet</h4>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <Footer />
            </div>
            </div>
        )
    }
}
export default Dashboard;
