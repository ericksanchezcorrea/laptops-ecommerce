import React from 'react'
import './spinner.css'

const Spinner = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'20px', height:'400px'}}>
        <div className='spinner'></div>
    </div>
  )
}

export default Spinner