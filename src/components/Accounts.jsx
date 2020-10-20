import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Loader from '../common/Loader';
import '../css/Accounts.css';

const columns = ["Sr No","Name", "Address", "Email", "Mobile", "Start Date"];

class Accounts extends Component {
    constructor(){
        super();
        this.state = {
            customers : []
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
                customers : res.data
            },()=>{this.toggleLoader()
            })
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    render() {
        const { customers } = this.state;
        return (
            <div className="accounts">
                <Topbar />
                <Sidebar />
                <div style={{fontFamily: "Exo", marginLeft : "230px", marginBottom : "200px"}} >
            <div className="container-fluid pl-0 pr-0 dashboard_page" id="main">
                <div className="row row-offcanvas row-offcanvas-left">
                    <div className="col main pt-3">
                        <h1 className="display-4 d-none d-sm-block">Accounts</h1>

                        <Loader loader={!this.state.loader} />
                    {   
                        <MUIDataTable
                            className="pl-0 pr-0"
                            id="myCheck"    
                            data={customers.map(item => {return [item.id,
                                                                <Link to={{pathname : "/getsingleaccount", state : {customers : item.id}  }}>{item.name}</Link>,
                                                                item.address,
                                                                item.email, 
                                                                item.phone, 
                                                                item.gst_no
                                                                ]}
                                )}
                            columns={columns}
                            options={{ selectableRows: "none"}}
                            
                        /> 
                    }
                        </div>
                        </div>
                        </div>
                <Footer />
            </div>
            </div>
        )
    }
}

export default Accounts;
