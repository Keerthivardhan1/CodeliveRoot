import React, { useState } from 'react'
import "./index.css"
import Client from './Components/Client'

const Home = () => {
  const [clients , setClients] = useState([{
    socketId : 1 , username : "keerthi"},
    {socketId : 2 , username : "frooti"} 
  ])
  return (
    <>
    <div className="Home">
        <div className="left">
          <div className="asideInner">
            <div className="logo">
              <img src="" alt="" />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {clients.map((client , index) => (
                      <Client 
                        key={client.socketId}
                        username = {client.username}
                      />
                  ))}
                  
            </div>
          </div>
        </div>
        <div className="right">Editor Goes Hear</div>
    </div>
    </>
  )
}

export default Home