    import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
    import { auth } from '../components/FirebaseConfig/FirebaseConfig';
    import { useMemo } from 'react';

    const date = new Date()
    const dater = date.getDate()
    const month = (date.getMonth() + 1).toString().padStart(2,"0")
    const year = date.getFullYear().toString().slice(2)

    const styles = StyleSheet.create({
        image:{
            height: "70px",
            width : "170px",
            display : "flex",
            justifyContent : "center",
            alignItems : "center"
        },
        mainDiv:{
            display: "flex",
            justifyContent : "space-evenly",
            flexDirection : "row"
        },
        plainLine :{
            width : "100vw",
            border : 1,
            borderStyle : "solid"
        },
        content : {
            marginTop : "50px",
            display : "flex",
            flexDirection : "column",
            gap : "30px",
            
        },
        table : {
            display : 'table',
            width: 'auto',
            borderRightWidth: 0,
            borderBottomWidth: 0,
            justifyContent : "center",
            borderLeftWidth: 1,
            borderRightWidth : 1,
            textAlign :"center",
            marginLeft: "15%",
        },
        tableRow: {
            display :"flex",
            flexDirection: 'row',
            maxWidth : "30px",
            minWidth : "30px"
        },
        tableCol: {
            width: '25%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 1,
            flexDirection: "column",
            maxWidth : "90px",
            minWidth : "90px",
        },
        tableCell: {
            margin: 5,
            fontSize: 14,
          },
          headerCell: {
            margin: 5,
            fontSize: 14,
            fontWeight: 'bold',
          },
          totalPDFCart :{
            marginTop : "10%",
            display : 'flex',
            justifyContent : "flex-end",
            gap : "30px",
          },
          bottomPDF :{
            display : "flex",
            marginRight : "70%",
            gap : "30px",
          },
          paidimage:{
            height : "100px",
            width : "80px"
          }
        
    })

    export default function ThePDF({orderIDProp, cartAdder, productDetails, orderTypePDF,deliveryAddressPDF,deliveryFee}){
        
        const subTotalPDF = useMemo(()=>{
            return productDetails.reduce((accum, prod)=>{
                if(cartAdder[prod.id] > 0){
                    return accum + (cartAdder[prod.id] * prod.price)
                }
                return accum
            },0)
        })




        return(
            <Document>
                    <Page size="A4">
                    <View style={styles.mainDiv}>
                        <Image src="/foodhubforbusiness.png" alt="foodhub" style={styles.image}></Image>
                        <Text>{dater}/{month}/{year}</Text>
                    </View>
                <View style={styles.plainLine}></View>
                
                    <View style={styles.content}>
                        <Text> Thank you for placing an order with us {auth?.currentUser?.displayName} !! </Text>
                        <Text>Your Invoice : {orderIDProp} </Text>
                        <Text>Order Type : {orderTypePDF}</Text>
                    </View>
{orderTypePDF === "Collection" ?
        <>
        {productDetails.map(elem=>{
                        if(cartAdder[elem.id] > 0){
                            return(
                            <View style={styles.table}>

          <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{elem.name}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{cartAdder[elem.id]} item/ items</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>£{elem.price}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{cartAdder[elem.id] * elem.price}</Text>
          </View>
          </View>
        </View>            
                            )
                        }
                    })}

                    <View style={styles.totalPDFCart}>
                        <Text>Sub Total : {(subTotalPDF).toFixed(2)} </Text>
                        <Text>Total : {(subTotalPDF).toFixed(2)} </Text>
                    </View>


                    <View style={styles.bottomPDF}>
                    <Image src="/paid-logo.png" alt="Paid Logo" style={styles.paidimage}></Image>
                    </View> 
                    </>
                    :
                    <>
                <View style={styles.content}>
                    <Text>Address : </Text>
                    <Text>{deliveryAddressPDF.door},</Text>
                    <Text>{deliveryAddressPDF.street},</Text>
                    <Text>{deliveryAddressPDF.town},</Text>
                    <Text>{deliveryAddressPDF.postcode}.</Text>
                </View>

                    {productDetails.map(elem=>{
                        if(cartAdder[elem.id] > 0){
                            return(
                            <View style={styles.table}>

          <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{elem.name}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{cartAdder[elem.id]} item/ items</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>£{elem.price}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{cartAdder[elem.id] * elem.price}</Text>
          </View>
          </View>
        </View>            
                            )
                        }
                    })}

                    <View style={styles.totalPDFCart}>
                        <Text>Sub Total : {(subTotalPDF).toFixed(2)} </Text>
                        <Text>Delivery Fee : {(deliveryFee).toFixed(2)}</Text>
                        <Text>Total : {(subTotalPDF + deliveryFee).toFixed(2)} </Text>
                    </View>


                    <View style={styles.bottomPDF}>
                    <Image src="/paid-logo.png" alt="Paid Logo" style={styles.paidimage}></Image>
                    </View> 
                    
                    
                    
                    </>}


                    </Page>
            </Document>
        )
    }

