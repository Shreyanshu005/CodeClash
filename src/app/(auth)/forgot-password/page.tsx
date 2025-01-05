import React from 'react'
import Image from 'next/image'
import { BackButton } from '@/components/ui/BackButton'
import AuthForm from '@/components/AuthForm'

const page = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 sm:gap-6  sm:p-8 min-w-[320px]">

      <Image
        src='/logo.svg'
        alt="logo"
        width={160}
        height={32}
        className="mx-auto lg:hidden absolute top-[60px] left-1/2 transform -translate-x-1/2"
        priority
      />

      <div className="w-full max-w-md sm:max-w-none">
        <BackButton href="/get-started" />

        <div className='space-y-2 mt-4'>
          <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white text-left'>
          Reset Your Password
          </h1>

          <p className='text-sm sm:text-base text-white w-96 text-left'>
          Enter the email associated with your account, and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      <AuthForm type='forgot-password' />
    </div>
  )
}

export default page
