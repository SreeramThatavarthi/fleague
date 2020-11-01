import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import MainPage from './Components/MainPage';
import 'react-toastify/dist/ReactToastify.css';
import User from './Components/User';
import Register from './Components/Register';
import Points from './Components/Points';
import Login from './Components/Login';
import {Route,BrowserRouter as Router, Switch, Redirect, Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import firebaseConfig from "./firebase/FirebaseConfig";
import {MatchContext, ResponseContext, UserContext} from "./Context/Context";
import {ToastContainer} from "react-toastify";
import Admin from './Components/Admin';
import Wswt from './Components/Wswt';
import SetUp from './Components/SetUp';
firebase.initializeApp(firebaseConfig);

const App=()=>{
  const [contuser,setcontUser]=useState();
  const [match,setMatch]=useState();
  const [accept,setAccept]=useState();
  const getData=async ()=>{

    //Getting the todays match  from firebase
    const MatchRef=await firebase.database().ref(`/match`);
    MatchRef.on('value',(snapshot)=>{
        setMatch(snapshot.val());
    });

    //Getting the accept status from firebase
    const ResRef=await firebase.database().ref(`/responses/accept`);
        ResRef.on('value',(snapshot)=>{
            setAccept(snapshot.val());
        });
  }
  

  useEffect(()=>{getData()},[]);


  return(
  
    <Router>
      <ResponseContext.Provider value={{accept,setAccept}}>
      <UserContext.Provider value={{contuser,setcontUser}}>
      <MatchContext.Provider value={{match,setMatch}}>
      <ToastContainer/>
        <div class="jumbotron" >
          <Link to="/" style={{textDecoration:"none"}}>
              <h1 style={{textAlign:"center",color:"#333945",padding:"0px",margin:"0px"}}>F.R.I.E.N.D.S LEAGUE</h1>
          </Link>
        </div>
        <div >
        <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/setup" component={SetUp}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/points" component={Points}/>
        <Route exact path="/wswt" component={Wswt}/>
        <Route exact path="/register" component={Register}/>
        </Switch>
        </div>
      </MatchContext.Provider>
      </UserContext.Provider>
      </ResponseContext.Provider>
  </Router>
  
  );
}

export default App;
