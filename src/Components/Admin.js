import React,{useEffect, useState} from "react";
import {toast} from "react-toastify"; 
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import {v4} from 'uuid';
const Admin=()=>{
    let val;
    const [isAdmin,setISAdmin]=useState(false);
    const [accept,setAccept]=useState("");
    let history = useHistory();
    const [team1,setTeam1]=useState("");
    const [adminpass,setAdminpass]=useState("");
    const [team2,setTeam2]=useState("");
    const [winteam,setwinTeam]=useState("");
    const [selectedTeam,setSelectedTeam]=useState("");
    let err=false;

    const getData=async ()=>{
        //Getting the responses accepting status
        const ResRef=await firebase.database().ref(`/responses/accept`);
        ResRef.on('value',(snapshot)=>{
            setAccept(snapshot.val());
            console.log(snapshot.val());
        });

    //Getting the user data with their selected teams
     const SelectRef=await firebase.database().ref('selectedteam/');
        SelectRef.on('value',(snapshot)=>{
            setSelectedTeam(snapshot.val());
            console.log(snapshot.val());
        });

    }

    //Calculating the score
    const getScore=()=>{
        //Looping through every user
        Object.entries(selectedTeam).map(([key,value])=>{
        
        const get=async ()=>{
            console.log(key);

            //Getting the won matches of every user 
            //Here calculating the score by getting the no of matches won by every user
            const ScoreRef=await firebase.database().ref(`/wonmatches/${key}/`);
            ScoreRef.on('value',(snapshot)=>{
                val=snapshot.val();
                console.log(val);
            }); 

            if(val!=null){
                console.log(val);
                let a=0;
                //Looping through every won match and adding 2 points per every match
                Object.entries(val).map(([key,value])=>{
                   a=a+2;
                 })
                console.log(a);

                //Setting the calculated score in firebase
              firebase.database()
                .ref(`/scores/${key}`)
                .update(
                       {value:a}
                 )
                .then(()=>{
                    err=false;
                   })
               .catch(err=>{
                    err=true;
                   })
          }
        }
        get();
        })
        if(!err){
            toast(`Successfully Updated`,{type:"success"})
          }
          else{
            toast(`Error,Please select the team again`,{type:"error"})    
          }
    }

    //Setting up the won matches
    const handleScore=(e)=>{    
        e.preventDefault();
        //Getting the selected team of every user and adding the match to the won matches if user win the match
        Object.entries(selectedTeam).map(([key,value])=>{
            console.log(value.value);
                if(value.value==winteam){
                    firebase.database().ref(`wonmatches/${key}/`+v4()).set(
                        winteam
                    )
            }
       
    });
    setTimeout(function() {
    getScore();
    }, 1000);
    handleReset();
    setwinTeam("");
}  
   //Setting up the today's match teams
    const handleSubmit=()=>{
        //Updating the todays match teams in firebase
        firebase.database()
            .ref(`/match/`)
            .update(
                {
                    team1:team1,
                    team3:team2
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast(`Successfully Updated`,{type:"success"})
              })
              .catch(err=>{
                toast(`Error,Please select the team again`,{type:"error"})
                
              })
    }
    const handleAdmin=()=>{
        // Checking the password for admin
        //Change your password if you want to
        if(adminpass=="password"){
            //if the password is correct then setting the state to true to access this page
          setISAdmin(true)
        }
        else{
            toast("Your admin password is incorrect",{type:"error"});
        }
      }

      //Resetting the selected teams
      const handleReset=()=>{
          Object.entries(selectedTeam).map(([key,value])=>{
              console.log(key);
              firebase.database().ref(`/selectedteam/${key}`)
                .update({
                    value:"Not Selected"
                })
          })
          
      }

    //Handling responses whether to accept or not
    const handleResponses=()=>{
        firebase.database()
            .ref(`/responses/`)
            .update(
                {
                    accept:!accept
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast(`Successfully Updated`,{type:"success"})
              })
              .catch(err=>{
                toast(`Error,Please select the team again`,{type:"error"})
                
              })
    }

    const redirectToSetUp=()=>{
        history.push('/setup');
    }

    useEffect(()=>{getData()},[]);

    return(
        (isAdmin)?(
        <div style={{padding:"10px"}}>
        <h3>Team 1</h3>
        <input type="email" value={team1} onChange={(e)=>setTeam1(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

        <h3 style={{marginTop:"20px"}}>Team 2</h3>
        <input type="email" value={team2} onChange={(e)=>setTeam2(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

        <button type="submit" class="btn btn-primary" onClick={handleSubmit} style={{marginTop:"10px"}}>Submit</button>

        <div>
        {
            (accept)?(
        <button type="submit" class="btn btn-primary" onClick={handleResponses} style={{marginTop:"10px"}}>Stop Accepting Responses</button>
            ):(
        <button type="submit" class="btn btn-primary" onClick={handleResponses} style={{marginTop:"10px"}}>Accept Responses</button>
            )
        }
        </div>
        
        <div>
            <button type="submit" class="btn btn-primary" onClick={getScore} style={{marginTop:"10px"}}>Calculate Score</button>
        </div>

        <div>
            <button type="submit" class="btn btn-primary" onClick={redirectToSetUp} style={{marginTop:"10px"}}>Go To SetUp Page</button>
        </div>

    <form onSubmit={(e)=>{handleScore(e)}} style={{padding:"12px"}}>
    <div class="form-group" onSubmit={handleScore}>
        <label for="exampleInputEmail1">Win Team</label>
        <input type="text" value={winteam} onChange={(e)=>setwinTeam(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter UserName"/>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>        
            </div>
        ):(<div style={{margin:"20px"}}>
            <h5 style={{textAlign:"center"}}>Enter your Admin Password</h5>
            <input type="password" placeholder={"Your Admin Password"} value={adminpass} onChange={(e)=>setAdminpass(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <button type="button" class="btn btn-primary" onClick={handleAdmin} style={{marginTop:"20px",marginLeft:"20px"}}>Submit</button>
    </div>)
    )
}

export default Admin;