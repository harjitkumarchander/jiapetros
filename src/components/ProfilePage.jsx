import React, { Component } from 'react';
import '../css/ProfilePage.css';
import Footer from './Footer';
import Sidebar from './Sidebar';

class ProfilePage extends Component {
    render() {
        return (
            <div className="profilepage" >
                <Sidebar />
                <div style={{fontFamily: "Exo", marginLeft : "230px", marginBottom : "200px"}} >
            <div className="container-fluid pl-0 pr-0 dashboard_page" id="main">
                <div className="row row-offcanvas row-offcanvas-left">
                    <div className="col main pt-3">
                        <h1 className="display-4 d-none d-sm-block">Profile</h1>
            <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={require("../images/logo.jpg")} alt="ProfileLogoImage" style={{borderRadius : "50%"}} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                        <h2 className="multicolortext">Jia Petros</h2>
                                        <h6 style={{color : "#000"}}>Retails Outlet Dealer</h6>
                                        <p className="proile-rating"><span>Landran Banur Road, (Near Chandigarh Group Colleges), Mohali (Punjab)</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work"></div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>jiapetross</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Proprietor Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Smt. Bimla Devi Marwaha</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>jiapetross@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>+91 9592000975</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Business</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Retail Outlet Dealer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Timing</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>24/7</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>All types of Petroleum Products</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>  
            </div>
            </div>
            </div>
            </div>
            <Footer />  
        </div>
        )
    }
}
export default ProfilePage;
