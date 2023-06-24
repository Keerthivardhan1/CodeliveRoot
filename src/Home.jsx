import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import Client from './Components/Client'
import Editor from './Components/Editor.jsx'
import { initSocket } from './socket'
import ACTIONS from './Actions'
import { Navigate, useLocation  , useNavigate , useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import logo from './assets/logo.svg'

const Home = () => {

  /*

    useState == if state changes whole components get rerender 

    useRef == if the state of the object changes components will not get rerender again 

  */
 
    const socketRef = useRef(null); 
    const location = useLocation();
    const reactNavigator = useNavigate();
    const {teamID} = useParams();  
    const codeRef = useRef(null); 

  const [clients , setClients] = useState([])
    useEffect(()=>{
      const init = async ()=>{
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error' , (err) => handleErrors(err))
        socketRef.current.on('connect_failed' , (err) => handleErrors(err))

        function handleErrors(err) {
            toast.error("Socket Connection Faild , try again later" );
            reactNavigator('/')
        }


        // Notifying server with specified username and teamID

        socketRef.current.emit(ACTIONS.JOIN , {
          teamID,
          userName : location.state?.userName,
        })


        // Server call this after perticular user joined the team to let all the team members known who is joined 


        socketRef.current.on(ACTIONS.JOINED , 

          ({clients , userName , socketID}) =>{
            if(userName !== location.state?.userName){
              toast.success(`${userName} joined team`)
              console.log(`${userName} joined team`)
            }
            setClients(clients)
        }
          
        )

        socketRef.current.on(ACTIONS.DISCONNECTED , ({socketID , userName})=>{
          if(userName !== location.state?.userName){
            toast.success(`${userName} had left the team`)
            setClients((prev) => {
              return prev.filter(client => client.socketID !== socketID)
            })
          }
        })


      
      }
      init()

    } , [])

    function handleLeave(){
      console.log("leave clicked");
      reactNavigator('/')
    }

    async function CopyTeamID(){
      try {
        await navigator.clipboard.writeText(teamID);
        toast.success("Team ID copied to clipboard");
      } catch (e) {
        toast.error("Failed to copy Team ID");
      }
    }

    function handlecodechange(code){
      codeRef.current = code
    }

  if(!location.state){
    return <Navigate to='/'/>
  }

  return (
    <>
    <div className="Home">
        <div className="left">
          <div className="asideInner">
            <div className='left-heading lh' >
              <img className="logo3 " src={logo} alt="" />
              <h3 className=''>Collaborative Code</h3>
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client , index) => (
                      <Client 
                        key={index}
                        username = {client.username}
                      />
                  ))}
                  
            </div>

            <div className='btn' > 
              <button className=" copyBtn" onClick={CopyTeamID}>Copy Team ID</button>
              <button className="leave" onClick={handleLeave} >Leave</button>
            </div>
          </div>
        </div>

        <div className="right">
            <Editor 
            socketRef = {socketRef} 
            teamID = {teamID}  
            onCodeChange = { handlecodechange
            }
            />
        </div>
    </div>
    </>
  )
}

export default Home