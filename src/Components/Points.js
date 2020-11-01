import React,{useState,useEffect} from "react";
import firebase from "firebase/app";
import {ListGroup,ListGroupItem} from 'reactstrap'
import { parse } from "uuid";
import Spinner from 'react-bootstrap/Spinner'

const Points=()=>{
  const [loading,setLoading]=useState(true);
    const [points,setPoints]=useState("");
    var arr=[];
    let sortedData=[];
    let i=0;

    //Getting user name and score from firebase 
    const getData=async ()=>{
        const UserRef=await firebase.database().ref(`/scores`);
        UserRef.on('value',(snapshot)=>{
            console.log(snapshot.val())
            setPoints(snapshot.val());
        });
      setLoading(false);
    }

    //Storing the username and score into an array
    if(points!=null){
    Object.entries(points).map(([key,value])=>{
      arr[i]=`${key},${value.value}`
      i++;
    })};

    //Sorting the data according to the score
    if(arr!=null && arr!=[]){
      sortedData = arr.sort((a, b) => b.split(',')[1]-a.split(',')[1]);
   }
    
    useEffect(()=>{getData();
    },[]);


    return(
      <>
        <h5 style={{textAlign:"center",paddingBottom:"7px",color:"#2c3e50"}}> POINTS TABLE</h5>
        {
            loading==true?(
                <Spinner animation="border" className="spinner" style={{left:"50%"}}/>
            ):(<></>)
        }
      
        <div className="list" style={{paddingRight:"20px",marginLeft:"-20px"}}>
            <ul style={{listStyleType:"none"}}>
             {
               //Displaying the sorted data
               (sortedData!=null)?(
                sortedData.map((item)=>(
                    <li key={item} style={{color:"#ffffff",padding:"2px"}}>
                      <ListGroupItem key={item} className="bg-secondary" style={{fontSize:"120%",fontWeight:"220%"}}> 
                       {item.split(',')[0]}
                       <span className="float-right bg-secondary" style={{fontWeight:"220%"}}>
                         {item.split(',')[1]} points
                          </span> 
                       </ListGroupItem>
                    </li>
               ))):(<>No Users are registered</>)
             }
            </ul>
          </div>  
        </>
    )
}



export default Points;



