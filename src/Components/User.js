import React, { useContext,useState,useEffect } from "react";
import {ResponseContext, UserContext} from "../Context/Context";
import firebase from "firebase/app";
import {toast} from "react-toastify";
import {ListGroup,ListGroupItem} from 'reactstrap'


const User=()=>{
    const {contuser}=useContext(UserContext);
    const [team1,setTeam1]=useState("");
    const [team2,setTeam2]=useState("");
    const {accept}=useContext(ResponseContext);
   const [val,setVal]=useState("");

    const getData=async ()=>{
        //Getting the team 1 to display in the user page
        const MatchRef=await firebase.database().ref(`/match/team1`);
        MatchRef.on('value',(snapshot)=>{
            setTeam1(snapshot.val());
        });

        //Getting the team 2 to display in the user page
        const MtchRef=await firebase.database().ref(`/match/team3`);
        MtchRef.on('value',(snapshot)=>{
            setTeam2(snapshot.val());
        });

        //Getting the matches that user won
        const wonRef=await firebase.database().ref(`/wonmatches/${contuser}/`);
         wonRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
              setVal(snapshot.val());
          }); 
      }

    const handleSubmit=(team)=>{
        console.log(accept);
        //checking whether the responses are accepting or not
        if(accept==true){
            //Inserting the selected team into firebase
            firebase.database()
            .ref(`/selectedteam/${contuser}`)
            .update(
                {
                    value:team
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast(`You have selected ${team} team`,{type:"success"})
              })
              .catch(err=>{
                toast(`Error,Please select the team again`,{type:"error"})
              })
        }
        //Sending a toast message if admin is not accepting responses
        else{
            toast("Sorry,We are not accepting responses now",{type:"info"});
        }
        
    }
      useEffect(()=>{getData()},[]);

    return(
        <>
        {
        (contuser!=null)?(<div style={{textAlign:"center"}}>
            <h3>Helloo,{contuser.charAt(0).toUpperCase() + contuser.slice(1)}</h3>
            <h4>Select your team</h4>
            <div style={{padding:"15px"}}>
            <button type="button" class="btn btn-lg btn-block" style={{height:"100px",backgroundColor:"#777E8B",color:"#ffffff"}} onClick={()=>handleSubmit(team1)}>
                <h1>{team1}</h1>
            </button>
            <button type="button" class="btn btn-lg btn-block" style={{height:"100px",backgroundColor:"#758AA2",color:"#ffffff"}} onClick={()=>handleSubmit(team2)}>
                <h1>{team2}</h1>
            </button>
            </div>
            
            <h4 style={{padding:"20px"}}>Previous matches you won</h4>
            <ol>
            {
                //Displaying all the matches user won

               (val!=null)?(
                Object.entries(val).map(([key,value])=>(
                    <li style={{float:"left",display:"inline-block",width:"45%"}}>
                        <ListGroupItem key={key} style={{fontSize:"80%",fontWeight:"220%"}}> 
                         <h6 style={{textAlign:"left"}}>{value}</h6>
                       </ListGroupItem>
                    </li>
                ))
               ):(<>You have not won any matches till now.</>)
            }
            </ol>
        </div>):(<h3><a href="/login">Login to select the team</a></h3>)
}
        </>
    )
}

export default User;