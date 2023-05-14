import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes , Route} from "react-router-dom"
import Login from './Login'
import Home from './Home'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Toaster
        position='top-right'
        toastOptions={{
          success:{
            theme:{
              primary:'#4aed88'
            }
          }
        }}
        >
        </Toaster>
      </div>
      <Routes>
        <Route path='/' element = {<Login/>}  />
        <Route path='/Home/:teamID' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App

     //   {/* <a href="https://react.dev" target="_blank">
     //     <img src={reactLogo} className="logo react" alt="React logo" />
    //    </a> */}