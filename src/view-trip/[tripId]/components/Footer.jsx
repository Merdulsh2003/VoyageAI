import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='back-home'>
      <Link to={'/create-trip'} >
        <button className='button'>Change Your Plan</button>
      </Link>
    </div>
  )
}

export default Footer
