import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <form className="w-full max-w-md">
        <h1 className='text-2xl font-bold text-white'>
          login
        </h1>
        <AuthForm type='login' />
      </form>
    </div>
  )
}

export default page