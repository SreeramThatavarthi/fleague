import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import { MatchContext } from "../Context/Context";

const MainPage=()=>{
    let history = useHistory();
    const {match,setMatch}=useContext(MatchContext); // Getting todays match from matchContext
    return(
        <>
        <div style={{padding:"10px"}}>
          <button type="button"  class="btn btn-secondary btn-lg btn-block" onClick={()=>{history.push('/points')}}>Points Table</button>
          <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={()=>{history.push('/login')}}>Login</button>
          <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={()=>{history.push('/wswt')}}>WSWT</button>
          <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={()=>{history.push('/register')}}>Register</button>
          <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={()=>{history.push('/admin')}}>Admin</button>
        </div>
        <div style={{textAlign:"center",marginTop:"20px"}}>
      <h3 onClick={()=>{history.push('/admin')}}>Todays Match</h3>

      {
      //Displaying todays match
        (match!=null)?(Object.entries(match).map(([key,value])=>(
          <span style={{color:"#192A56",fontSize:"200%",fontWeight:"500"}}>{value}</span>
      ))):(
        <h5 >Loading....</h5>
      )
      }
      <h6 style={{marginTop:"10px"}}>Login and select your team</h6>
      </div>
        </>
    )
}

export default MainPage;