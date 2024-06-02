import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const index = ({children}) => {
  return (
    <div>
        <NavBar/>
       {children}
      
    </div>
  )
}

export default index