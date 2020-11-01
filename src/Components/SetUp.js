import React from "react";
import firebase from "firebase/app";

const SetUp=()=>{
    const handleSubmit=()=>{
        firebase.database().ref('/match/').set({
            team1: "",
            team2: " VS ",
            team3 : ""
          });
        firebase.database().ref('/responses/').set({
            accept:true
          });
    }
    return(
        <>
        <h3>SetUp Page</h3>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit} style={{marginTop:"10px"}}>Set Up Firebase</button>
        </>
        
        //Work in Progress
    )
}

export default SetUp;