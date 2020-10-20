import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

class Footer extends Component {
    render() {
        return (
            <div style={{ fontFamily: "Exo" }}>
              <footer className="footer_page page-footer font-small cyan darken-3" style={{zIndex : "1000"}}>
                <div className="container bg-info">
                  <div className="row" style={{backgroundColor : "#3c8dbc"}}>
                    <div className="col-md-12">
                      <div className="p-4 flex-center">
                        <a href="https://www.facebook.com" className="fb-ic"><i className="fa fa-facebook-f fa-lg text-white mr-md-5 mr-3 fa-2x"> </i></a>
                        <a href="https://www.twitter.com" className="tw-ic"><i className="fa fa-twitter fa-lg text-white mr-md-5 mr-3 fa-2x"> </i></a>
                        <a href="https://www.instagram.com" className="ins-ic"><i className="fa fa-instagram fa-lg text-white mr-md-5 mr-3 fa-2x"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mr-5">
                <div className="footer-copyright text-center py-1" style={{backgroundColor: "#3c8dbc"}}>© 2020 Copyright:
                  <Link to="/" className="text-white font-weight-bold">JIA PETROS</Link>
                </div>
                </div>
              </footer>
            </div>

        )
    }
}

export default Footer;
