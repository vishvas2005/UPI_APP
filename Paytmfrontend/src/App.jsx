import {Route, Routes , BrowserRouter} from 'react-router-dom'
import React from 'react'
import Signup from './routingpages/Signup'
import Signin from './routingpages/Signin'
import Dashboard from './routingpages/Dashboard'
import Sendmoney from './routingpages/Sendmoney'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/send" element={<Sendmoney/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
