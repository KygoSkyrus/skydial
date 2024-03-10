import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='bg-gray-900 h-dvh text-white flex flex-col justify-center items-center'>
      Page Not Found

      <Link to="/" type="button" className="py-2 px-6 mt-7 font-semibold rounded  border border-gray-600 text-violet-400" >Home</Link>
    </div>
  )
}

export default PageNotFound