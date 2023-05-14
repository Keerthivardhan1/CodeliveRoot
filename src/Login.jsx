import React, { useEffect, useState } from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';
import  {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast'

const Login = () => {

    const navigate = useNavigate();

    const [submited , setSubmited]= useState(false);

    let [teamID , setTeamID] = useState("");
    const [userName , setUserName] = useState("");

    const handelSubmit = (e)=>{
        e.preventDefault();
        console.log("submit is clickd ");
        if(teamID == "" || userName  == "") {
            toast.error("Team ID and username are required")
            return;
        }
        navigate(`/Home/${teamID}` , {
            state: {
                userName
            }
        })
    }

    const createNewTeam = (e)=>{
        e.preventDefault();
        const id = uuidv4();
        console.log("id --" , id);
        setTeamID(id)
        toast.success("Created New Team")
    }

    const handleEnter = (e)=>{
        if(e.code === 'Enter'){
            handelSubmit(e);
        }
    }

  return (
    <>
        <div className="loginForm">
            <form onSubmit={handelSubmit} action="" method="get">
                <input type="text" placeholder='Enter the Team ID' name='teamID' value={teamID } onKeyUp={handleEnter} onChange={(e)=>setTeamID(e.target.value)} />
                <input type="text" placeholder='User Name' name='teamID' value={userName} onKeyUp={handleEnter} onChange={(e)=>setUserName(e.target.value)} />
                {/* <input type="submit" value="Submit" onChange={()=>setSubmited(true)} /> */}
                <button type="submit" onChange={()=>setSubmited(true)}>Join</button>
                
            </form>
            <span>If your are the Team Lead , <a onClick={createNewTeam} href="" >Create Team ID</a></span>
        </div>
    </>
  )
}

export default Login