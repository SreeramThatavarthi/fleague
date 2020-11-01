import React,{useState,useEffect,useContext} from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import {UserContext} from "../Context/Context";
import { toast } from "react-toastify";
const Login=()=>{
    const [password,setPassword]=useState("");
    let history = useHistory();
    const {contuser,setcontUser}=useContext(UserContext);
    const [user,setUser]=useState("");
    let crct=0;
    const [fireUsers,setfireUsers]=useState("");

    //Getting the data of the users
    const getData=async ()=>{
        const UserRef=await firebase.database().ref(`/passwords`);
        UserRef.on('value',(snapshot)=>{
            setfireUsers(snapshot.val());
        });

    }

    //handling the submit
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(user);
        console.log(password);
        setUser("");
        setPassword("");
        console.log(fireUsers);

        //looping through the users to match the entered user id and pasword
        if(fireUsers!=null){
            Object.entries(fireUsers).map(([key,value])=>{
                if(key==user && value.password==password){
                    crct=1;
                    setcontUser(key);
                    history.push('/user');
                    console.log(true);
                }
            });
        }
        //If user data doesnt exists ,sending a toast message
        if(crct==0){
            toast("UserName or Password is not correct,Try Again",{type:"error"});
        }
    }

    useEffect(()=>{getData()},[]);

    return(
    <form onSubmit={(e)=>{handleSubmit(e);}} style={{padding:"12px"}}>
        <div class="form-group">
            <label for="exampleInputEmail1">User Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user} onChange={e=>setUser(e.target.value)} placeholder="Enter UserName"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    )
}

export default Login;