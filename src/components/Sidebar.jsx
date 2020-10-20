import React, { Component } from 'react';
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';
import Topbar from './Topbar';

class Sidebar extends Component {
    render() {
        return (
            <div style={{marginTop : '100px'}}>
               <Topbar />
             <div className="main sidebar_page position-fixed">
                <aside>
                  <div className="sidebar left float-left">
                    <div className="user-panel">
                      <div className="pull-left image">
                        <img src={require("../images/logo.png")} className="rounded-circle" alt="User_Image" />
                      </div>
                      <div className="pull-left info">
                        <h3>Jia Petros</h3>
                      </div>
                    </div>
                    <ul>
                      <li> <Link to="/dashboard" data-target="#dashboard" className="collapsed pt-4 pb-4" > <i className="fa fa-th-large"></i> <span className="nav-label"> Dashboards </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li>
                      <li> <Link to="/customers" className="collapsed pt-4 pb-4" > <i className="fa fa-users"></i> <span className="nav-label"> Customers </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li>
                      <li> <Link to="/products" data-target="#dashboard" className="collapsed pt-4 pb-4" > <i className="fa fa-list-alt"></i> <span className="nav-label"> Products </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li>
                      <li> <Link to="/sales" data-target="#dashboard" className="collapsed pt-4 pb-4" > <i className="fa fa-shopping-cart"></i> <span className="nav-label"> Sale </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li>
                      {/* <li> <Link to="/purchase" data-target="#dashboard" className="collapsed pt-4 pb-4" > <i className="fa fa-shopping-basket"></i> <span className="nav-label"> Purchase </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li> */}
                      <li> <Link to="/payments" data-target="#dashboard" className="collapsed pt-4 pb-4" > <i className="fa fa-credit-card"></i> <span className="nav-label"> Payments </span> <span className="fa fa-chevron-right pull-right"></span> </Link></li> 
                      <li> <Link to="/accounts" data-target="collapse" className="collapsed pt-4 pb-4"><i className="fa fa-file"></i> <span className="nav-label">Accounts</span><span className="fa fa-chevron-right pull-right"></span></Link>

                      {/* <li> <Link to="/reports" data-toggle="collapse" className="collapsed pt-4 pb-4" data-target="#tables" ><i className="fa fa-file"></i> <span className="nav-label">Reports</span><span className="fa fa-chevron-right pull-right"></span></Link> */}
                        {/* <ul  className="sub-menu collapse" id="tables" >
                          <li><Link to="/customers" className="collapsed pt-4 pb-4"> Customer</Link></li>
                          <li><Link to="/sales" className="collapsed pt-4 pb-4"> Sale</Link></li>
                          <li><Link to="/purchase" className="collapsed pt-4 pb-4"> Purchase</Link></li>
                          <li><Link to="/payments" className="collapsed pt-4 pb-4"> Payments</Link></li>
                        </ul> */}
                      </li>    
                    </ul>
                  </div>
                </aside>
            </div>
        </div>
        )
    }
}

export default Sidebar;
