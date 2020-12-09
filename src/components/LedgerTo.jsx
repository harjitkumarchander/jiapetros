import React, { Component } from 'react';
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
opening: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
},
vehicle: {
    width: '20%',
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

class LedgerTo extends Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    }
  }

  render(){
      console.log(this.props);
      let startDate=new Date(this.props.startDate)
      let endDate=new Date(this.props.endDate)
      let dt = this.state.date;
    
    return(
  <Document>
    <Page size="A4" style={{ margin : '10', paddingBottom : 35, paddingTop : 30 }}>
       
      <View style={{ flexDirection :'row', alignItems : 'center', height : '20'}}>
        <Text style={{ width : '30%', fontSize : 12, textAlign : 'left'}}>GST No. 03ABTPD4264F1ZT</Text>
        <Text style={{ width : '34%', fontSize : 12, textAlign : 'center'}}>ACCOUNT</Text>
        <Text style={{ width : '30%', fontSize : 12, textAlign : 'right', marginRight : '20'}}>M: 9592000975</Text>
      </View>

      <View style={{ alignItems : 'center', height : '100', flexDirection : 'row'}}>
        <Text><Image style={styles.logo} src={logo} /></Text>
        <Text style={{ width : '60%', textAlign : 'center', fontSize : '50', marginBottom : '30'}}>JIA PETROS</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '90%', textAlign : 'center', fontSize : '12', marginBottom : '80'}}>Landran Banur Road, (Near Chandigarh Group Colleges), Mohali (Punjab)</Text>
      </View>

      <View style={{ flexDirection :'row', alignItems : 'center', height : '20', fontSize : '15'}}>
        <Text style={{ width : '30%', textAlign : 'left', marginBottom : '60'}}>Account Detail</Text>
        <Text style={{ width : '63%', textAlign : 'right', marginBottom : '60'}}>Date:{dt.getDate()+"/"+ (dt.getMonth()+1) +"/"+ dt.getFullYear()} </Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '30%', textAlign : 'left', fontSize : '20', marginBottom : '60'}}></Text>
        <Text style={{ width : '40%', textAlign : 'center', fontSize : '20', marginBottom : '60'}}>{this.props.name}</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '100%', textAlign : 'center', fontSize : '15', marginBottom : '60'}}>{this.props.address}</Text>
      </View>

      <View style={{ alignItems : 'center', height : '20', flexDirection : 'row'}}>
        <Text style={{ width : '100%', textAlign : 'center', fontSize : '15', marginBottom : '60'}}>GST NO : {this.props.gst_no}</Text>
      </View>

      <View style={{ flexDirection :'row', alignItems : 'center', height : '20', fontSize : '13', marginTop : '10'}}>
        <Text style={{ width : '30%', textAlign : 'center', marginLeft : '100', marginBottom : '60'}}>{startDate.getDate()+"/"+ (startDate.getMonth()+1) +"/"+ startDate.getFullYear()}</Text>
        <Text style={{marginBottom : '60'}}>To</Text>
        <Text style={{width : '30%', textAlign : 'center', marginRight : '150', marginBottom : '60'}}>{endDate.getDate()+"/"+ (endDate.getMonth()+1) +"/"+ endDate.getFullYear()} </Text>
      </View>
      
      <View style={styles.table}>
      <View style={styles.container}>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.opening}>Opening</Text>
        <Text style={styles.vehicle}>Description</Text>
        <Text style={styles.slip}>Bill No</Text>
        <Text style={styles.qty}>Sale</Text>
        <Text style={styles.rate}>Payment</Text>
        <Text style={styles.total}>Closing</Text>
    </View>
          {
            this.props.dateFilterData.map((order,index)=>{
                let d = new Date(order.created_on)
              if(order.type === 'order'){
              return(
                <View style={{flexDirection: 'row', fontSize : 8, borderBottomColor: '#bff0fd', borderBottomWidth: 1, alignItems: 'center', height: 24, fontStyle: 'bold',}} key={index} >
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{d.getDate()+"/"+ (d.getMonth()+1) +"/"+ d.getFullYear()}</Text>
                  <Text style={{width: '15%', textAlign: 'right', paddingRight: 8,borderRightColor: '#000', borderRightWidth: 1 }}>{Number.parseFloat(order.openingBalance).toFixed(2)}</Text>
                  <Text style={{width: '20%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>-</Text>
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.slip_no}</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.total}</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>-</Text>
                  <Text style={{width: '10%', textAlign: 'right', paddingRight: 8 }}>{Number.parseFloat(order.closeBalance).toFixed(2)}</Text>
              </View>
              )
              }else if(order.type === 'payment'){
                  return(
                <View style={{flexDirection: 'row', fontSize : 8, borderBottomColor: '#bff0fd', borderBottomWidth: 1, alignItems: 'center', height: 24, fontStyle: 'bold',}} key={index} >
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{d.getDate()+"/"+ (d.getMonth()+1) +"/"+ d.getFullYear()}</Text>
                  <Text style={{width: '15%', textAlign: 'right', paddingRight: 8,borderRightColor: '#000', borderRightWidth: 1 }}>{Number.parseFloat(order.openingBalance).toFixed(2)}</Text>
                  <Text style={{width: '20%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.description}</Text>
                  <Text style={{width: '15%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>-</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>-</Text>
                  <Text style={{width: '10%', textAlign: 'center', borderRightColor: '#000', borderRightWidth: 1, paddingRight : 2 }}>{order.amount}</Text>
                  <Text style={{width: '10%', textAlign: 'right', paddingRight: 8 }}>{Number.parseFloat(order.closeBalance).toFixed(2)}</Text>
                </View>
                  );
              }  
          })
        }
    </View>

        <View style={{flexDirection : 'row', marginTop : '20', fontSize : 12}}>
          <Text style={{ width: '60%', textAlign: 'left', marginLeft: '20' }}>Thanks for your Business</Text>
          <Text style={{ width: '35%', textAlign: 'center' }}>For Jia Petros</Text>
        </View>

    </Page>  
  </Document>
    );
  }
} 
export default LedgerTo;