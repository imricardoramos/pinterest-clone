import {useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import MainLayout from '~/layouts/MainLayout'
import Feed from '~/components/Feed'
import LoginForm from '~/components/LoginForm'
import SignupForm from '~/components/SignupForm'
import { useIsAuthenticated } from '~/providers/Auth'

function LoggedIndex(){
  return (
    <MainLayout>
      <Feed filters={`ordering=-created_at`} />
    </MainLayout>
  )
}

export default function Home() {
  let isAuthenticated = useIsAuthenticated()
  let [loginFormVisibility, setLoginFormVisibility] = useState("block")
  let [signupFormVisibility, setSignupFormVisibility] = useState("hidden")

  if(isAuthenticated){
    return <LoggedIndex />
  }
  return (
    <>
      <LoginForm 
        className={loginFormVisibility}
        onClickOutside={() => {}}
        onSignupClick={() => {setLoginFormVisibility("hidden"); setSignupFormVisibility("visible") }}
      />
      <SignupForm
        className={signupFormVisibility}
        onClickOutside={() => {}}
        onLoginClick={() => {setLoginFormVisibility("visible"); setSignupFormVisibility("hidden") }}
      />
    </>
  )
}
