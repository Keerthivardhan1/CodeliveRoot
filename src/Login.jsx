import React, { useEffect, useState } from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom';
import  {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast'
import logo from './assets/logo.svg'
import git from './assets/git.svg'
import linkedin from './assets/linkedin.svg'
import twitter from './assets/twitter.svg'
import hashnode from './assets/hashnode-svgrepo-com.svg'

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
        <div className='login-page'>

            <nav>
                <img className='logo3' src={logo} alt="" />
                <h5 >Collaborative Code</h5>
            </nav>
            
            <span className='main-heading'> <h1>Code With Your Team<span className='highlite'>.</span> Anytime<span className='highlite'>.</span> <br /> Anywhere</h1></span>
            <p className="tagline">
                 <span className='highlite' >Our Collaborative Code Editor</span>  is designed to revolutionize the way teams collaborate on code. With our powerful and intuitive platform, you can <span className='highlite'> code together in real-time,</span>  no matter where your team members are located </p>

            <div className="preview">
                <div className="preview-content-div">
                    <p className='preview-content'>Experience the future of collaborative coding with our innovative and powerful Collaborative Code Editor. Empower your team to work together seamlessly, boost productivity, and bring your ideas to life like never before. Start coding together, and let the possibilities unfold.</p>               
                </div>
            </div>

            <section>
                     
            <div className='leftContent'>
                <h1> Let<span className='highlite' >'</span>s <span className='highlite' >Code</span> <br /> Togeather</h1>
            </div>

            <div className='loginboxwrapper'>
           
            <div className="login-box"> 
                <form  onSubmit={handelSubmit} action="" method="get" >
                    <div className=" user-box">
                    <input type="text" name="teamID" required="" value={teamID } onKeyUp={handleEnter} onChange={(e)=>setTeamID(e.target.value)}/>
                    <label>TeamID</label>
                    </div>
                    <div className="user-box">
                    <input type="text" name="" required="" value={userName} onKeyUp={handleEnter} onChange={(e)=>setUserName(e.target.value)} />
                    <label>UserName</label>
                    </div><center>           
                    <button type="submit" onChange={()=>setSubmited(true)}>JOIN </button>     
                    </center>
                    <span>If your are the Team Lead , <a onClick={createNewTeam} href="" className='aInP'>Create Team ID</a></span>
                </form>
            </div>  
         </div>  


            </section>

            <section className='todos'>
                <h2> To-Do  <span className='highlite'>S </span> </h2>
                <p>We welcome collaboration and invite you to contribute your ideas and expertise to enhance our project. Your valuable input is highly appreciated as we work together to create something exceptional. Feel free to join us and make a meaningful impact with your contributions.</p>
                <ul>
                   <a href="https://github.com/Keerthivardhan1/CodeLive/issues/1"><li>Integrating Code Sync Feature: Streamline Collaboration with New Team Members</li></a>
                    <a href=""><li>Efficient Database Implementation for Storing Individual Team's Code</li></a>
                   <a href="https://github.com/Keerthivardhan1/CodeLive/issues/2"><li>Enhanced Code Editor: Customizable Theme Selection and UI</li></a> 
                   <a href="https://github.com/Keerthivardhan1/CodeLive/issues/3"><li>Advanced Speech Recognition Module: Hands-free Coding Experience</li></a> 
                   <a href="">
                    <li>Implement Encreption and Decreption Algorithem At Server and Client Side</li>
                   </a>
                   <a href="https://github.com/Keerthivardhan1/CodeLive"> <li>Contribute To Project</li></a>
                </ul>

            </section>


            <footer>
                <ul>
                    <a href="https://github.com/Keerthivardhan1">
                        <img src={git} alt=""  className="social-icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/keerthi-vardhan-tekulapelli-7064a6245/">
                        <img src={linkedin} alt="" className="social-icon"/>
                    </a>
                    <a href="https://hashnode.com/@keerthivardhan">
                        <img src={hashnode} alt="" className="social-icon"/>
                    </a>
                    <a href="https://twitter.com/vardhan132003">
                        <img src={twitter} alt="" className="social-icon"/>
                    </a>
                </ul>
                <center className='highlite'><h3>KEERTHI VARDHAN <br /></h3>keerthivardhantekulapelli@gmial.com</center>
                
            </footer>       
        </div>

    </>
  )
}

export default Login