import React,{useState,useEffect} from "react";
import firebase from "firebase/app";
import {ListGroup,ListGroupItem} from 'reactstrap'
import Spinner from 'react-bootstrap/Spinner'

const Wswt=()=>{
    const [loading,setLoading]=useState(true);
    const [selectedTeam,setSelectedTeam]=useState("");
    const getData=async ()=>{
        //Getting the selected of all users from firebase
        const SelectRef=await firebase.database().ref('selectedteam/');
        SelectRef.on('value',(snapshot)=>{
            setLoading(false);
            setSelectedTeam(snapshot.val());
            console.log(snapshot.val());

        });
    }
    useEffect(()=>{getData()},[]);

    return(
        <>
        <h5 style={{textAlign:"center",paddingBottom:"7px",color:"#2c3e50"}}>
        WHO SELECTED WHICH TEAM
        </h5>
        {
            loading==true?(
                <Spinner animation="border" className="spinner" style={{left:"50%"}}/>
            ):(<></>)
          }
        <div className="list" style={{paddingRight:"20px",marginLeft:"-20px"}}>
            <ul style={{listStyleType:"none"}}>
        {
            //Displaying the selected teams of all users
            (selectedTeam!=null)?
            (
            Object.entries(selectedTeam).map(([key,value])=>(
                <li key={key} style={{color:"#ffffff",padding:"2px"}}>
                   <ListGroupItem key={key} className="bg-secondary" style={{fontSize:"120%",fontWeight:"220%"}}> 
                    {key}
                    <span className="float-right bg-secondary"style={{fontSize:"90%"}}>
                      {value.value}
                       </span> 
                    </ListGroupItem>
                 </li> 
            ))):(<>No usrs are registered</>)
        }
        </ul>
        </div>
        </>

    )
}

export default Wswt;