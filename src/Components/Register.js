import React,{useEffect, useState} from "react";
import firebase from "firebase/app";
import { toast } from "react-toastify";

const Register=()=>{
    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    let crct=0;
    const [fireUsers,setfireUsers]=useState("");
    const getData=async ()=>{
        const UserRef=await firebase.database().ref(`/passwords`);
        UserRef.on('value',(snapshot)=>{
            setfireUsers(snapshot.val());
            
        });

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(fireUsers!=null){
            Object.entries(fireUsers).map(([key,value])=>{
                if(key==user){
                    crct=1;
                    toast("UserName is not available,Try another user name",{type:"error"});
                }
            });
        }

        if(crct==0){
            firebase.database().ref(`/passwords/${user}`).set({
                password
               });
            firebase.database().ref(`/scores/${user}`).set({
                value:0
               });
            firebase.database().ref(`/selectedteam/${user}`).set({
                value:"Not Selected"
               });
            toast("You have successfully registered",{type:"success"});
        }
        setUser("");
        setPassword("");
    }

    useEffect(()=>{getData()},[]);
    return(
        <form onSubmit={(e)=>{handleSubmit(e);}} style={{padding:"12px"}}>
        <div class="form-group">
            <label for="exampleInputEmail1">User Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user} onChange={e=>setUser(e.target.value)} placeholder="Enter UserName"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Set Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form> 
    )
}

export default Register;