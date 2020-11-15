import React, { Component } from 'react';
import converter from 'number-to-words';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import logo from '../images/logo.png'

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  logo: {
      width: 74,
      height: 66,
      marginLeft: '20',
      marginRight: 'auto'
  },
  table: {
    fontSize: 8,
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch"
  },
  header: {
    backgroundColor: "#eee"
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c",
    margin: 10  
  },
  tableText: {
    margin: 10,
    fontSize: 10
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    fontSize : '10'
},
date: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1
},
items: {
  width: '20%',
  borderRightColor: borderColor,
  borderRightWidth: 1
},
vehicle: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
},
slip: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
},
qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
},
rate: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
},
total: {
    width: '10%',
    // paddingLeft : 5
},
});

class MyPdfBill extends Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      newStartDate : props.customerStartDate,
      newEndDate : props.customerEndDate
    }
  }


  // componentDidMount(){

    //   this.props.orders.map((v,i)=>{
    //     let DateFilterData = [];
    // let slipDate = new Date(v.created_on);
    //   if(this.state.newStartDate < slipDate && this.state.newEndDate > slipDate){
    //     DateFilterData.push(v)
    //     this.setState({
    //       DateFilterData
    //     })
    //     }
    //     console.log(DateFilterData)    
    // })
// }

  render(){
    let ProductName = this.props.customerProductName.map((v,i)=>v.name)
    let billDate = new Date(this.props.customerBillCreateDate)
    let customerBillStartDate = new Date(this.props.customerStartDate)
    let customerBillEndDate = new Date(this.props.customerEndDate)
    const total = this.props.DateFilterData.map((item,i) => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0)    
    return(
  <Document>
    <Page size="A4" style={{ margin : '10', paddingBottom : 30, paddingTop : 30  }}>
       
      <View style={{ flexDirection :'row', alignItems : 'center', height : '20'}}>
        <Text style={{ width : '30%', fontSize : 12, textAlign : 'left'}}>GST No. 03ABTPD4264F1ZT</Text>
        <Text style={{ width : '34%', fontSize : 12, textAlign : 'center'}}>INVOICE</Text>
        <Text style={{ width : '30%', fontSize : 12, textAlign : 'right', marginRight : '20'}}>M: 9592000975</Text>
      </View>

      <View style={{ alignItems : 'center', height : '100', flexDirection : 'row'}}>
        <Text><Image style={styles.logo} src={logo} /></Text>
        <Text style={{ width : '60%', textAlign : 'center', fontSize : '50', marginBottom : '30'}}>JIA PETROS</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '90%', textAlign : 'center', fontSize : '12', marginBottom : '80'}}>Landran Banur Road, (Near Chandigarh Group Colleges), Mohali (Punjab)</Text>
      </View>

      <View style={{ flexDirection :'row', alignItems : 'center', height : '20', fontSize : '13'}}>
        <Text style={{ width : '30%', textAlign : 'left', marginBottom : '60'}}>Bill No. {this.props.customerBillNo}</Text>
        <Text style={{ width : '63%', textAlign : 'right', marginBottom : '60'}}>Date:{billDate.getDate()+"/"+ (billDate.getMonth()+1) +"/"+ billDate.getFullYear()} </Text>
      </View>
             

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '30%', textAlign : 'left', fontSize : '20', marginBottom : '60'}}>Bill To</Text>
        <Text style={{ width : '40%', textAlign : 'center', fontSize : '20', marginBottom : '60'}}>{this.props.customerName}</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '100%', textAlign : 'center', fontSize : '15', marginBottom : '60'}}>{this.props.customerAddress}</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '100%', textAlign : 'center', fontSize : '15', marginBottom : '60'}}>GST NO : {this.props.customerGstNo}</Text>
      </View>

      <View style={{ flexDirection :'row', alignItems : 'center', height : '20', fontSize : '13', marginTop : '10'}}>
        <Text style={{ width : '30%', textAlign : 'center', marginLeft : '100', marginBottom : '60'}}>{customerBillStartDate.getDate()+"/"+ (customerBillStartDate.getMonth()+1) +"/"+ customerBillStartDate.getFullYear()}</Text>
        <Text style={{marginBottom : '60'}}>To</Text>
        <Text style={{ width : '30%', textAlign : 'center', marginRight : '150', marginBottom : '60'}}>To {customerBillEndDate.getDate()+"/"+ (customerBillEndDate.getMonth()+1) +"/"+ customerBillEndDate.getFullYear()}</Text>
      </View>
      
      <View style={styles.table}>
      <View style={styles.container}>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.items}>Items</Text>
        <Text style={styles.vehicle}>Vehicle No</Text>
        <Text style={styles.slip}>Slip No</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>@</Text>
        <Text style={styles.total}>Total</Text>
      </View>
          {
            this.props.DateFilterData.map((order,index)=>{
              
              let d = new Date(order.created_on)
              return(
                <View style={{flexDirection: 'row', fontSize : 8, borderBottomColor: '#bff0fd', borderBottomWidth: 1, alignItems: 'center', height: 24, fontStyle: 'bold',}} key={index} >
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{d.getDate()+"/"+ (d.getMonth()+1) +"/"+ d.getFullYear()}</Text>
                  <Text style={{width: '20%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{ProductName[order.product_id-1]}</Text>
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.vehicle_no}</Text>
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.slip_no}</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.quantity}</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.price}</Text>
                  <Text style={{width: '10%', textAlign: 'right', paddingRight: 8 }}>{order.total}</Text>
              </View>
              )
          })
        }
    </View>

          <View style={{flexDirection: 'row', borderBottomColor: '#bff0fd', borderBottomWidth: 1, alignItems: 'right', height: 24, fontSize: 10, fontStyle: 'bold',}}>
            <Text style={{ width: '70%', textAlign: 'left', borderRightColor: borderColor, borderRightWidth: 1, paddingRight: 8,}} >{converter.toWords(total).toUpperCase()}</Text>
            <Text style={{ width: '10%', textAlign: 'center', borderRightColor: borderColor, borderRightWidth: 1, paddingRight: 8,}} >TOTAL</Text>
            <Text style={{width: '20%', textAlign: 'center', paddingRight: 8,}}>{ Number.parseFloat(total).toFixed(2)}</Text>            
          </View>

        <View>
          <Text style={{ width: '80%', textAlign: 'right', fontSize : '12',marginTop : '20', marginRight: '20' }}>For Jia Petros</Text>
        </View>

    </Page>  
  </Document>
    );
  }
} 
export default MyPdfBill;