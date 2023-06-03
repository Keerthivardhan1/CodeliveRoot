import './App.css'
import {Routes , Route} from "react-router-dom"
import Login from './Login'
import Home from './Home'
import { Toaster } from 'react-hot-toast'

function App() {
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
