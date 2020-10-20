import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

const columns = ["Sr. No.", "Name", "Team Name", "Games Played","Minutes Per Game","Field Goal Percentage", "Action"];

class GetPurchase extends Component {
    constructor(){
        super();
        this.state = {
            items : [],
            loading : false      
          }
    }

    componentDidMount(){
        fetch("https://nba-players.herokuapp.com/players-stats")
        .then(res=>res.json())
        .then(items=>{
            this.setState({
                items : items,
                loading : true
            })
            console.log(items)
        })
        .catch((error)=>{
            console.log("error while fetching" , error)
        })
    }

    render() {
        const { items } = this.state;
        return (
            <div className="get_customers_main pl-5">
                    <div className="col-lg-12 col-md-12 mt-3 customers_col">
                    <div id="customer_table" className="">  
                        <MUIDataTable

                            className="pl-0 pr-0"
                            data={items.map((item,i) => {return [i,item.name,item.team_name,item.games_played,item.minutes_per_game,item.field_goal_percentage,
                                    <li className="row ml-0 mr-5 action-btn">
                                        <button className="btn btn-light bg-transparent"><i className="col fa fa-edit"></i></button>
                                        <button className="btn btn-light bg-transparent"><i className="col fa fa-trash" aria-hidden="true"></i></button></li>]})}
                            columns={columns}
                            options={{ selectableRows: false}}
                            // options={options}
                        /> 
                </div>
                </div>
                </div>
        )
    }
}

export default GetPurchase
