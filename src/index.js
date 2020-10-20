import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import Customers from './components/Customers';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Sales from './components/Sales';
import Payments from './components/Payments';
import Accounts from './components/Accounts';
import CustomersItem from './components/CustomersItem';
import GetSingleAccount from './components/GetSingleAccount';
import ChangePassword from './components/ChangePassword';

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/customers" component={Customers} />
        <Route path="/customersitem" component={CustomersItem} />
        <Route path="/products" component={Products} />
        <Route path="/sales" component={Sales} />
        <Route path="/payments" component={Payments} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/getsingleaccount" component={GetSingleAccount} />
        <Route path="/changepassword" component={ChangePassword} />
      </Switch>
    </Router>
// </React.StrictMode>
  ,document.getElementById('root')
);
serviceWorker.unregister();
