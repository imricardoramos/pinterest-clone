import { useState } from 'react'
import Modal from './Modal'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'
import { useAuth } from '~/providers/Auth'
import BounceLoader from 'react-spinners/BounceLoader'

export default function LoginForm(props){
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let { setAuthenticated } = useAuth()

  async function loginUser(e){
    e.preventDefault()
    setIsLoading(true)
    try{
      await axios.post("/rest-auth/login/", {
        email: email,
        password, password,
      })
      setAuthenticated(true)
    }
    catch(e){
      console.log(e)
    }
    setIsLoading(false)
  }
  return (
    <Modal className={props.className} onClickOutside={props.onClickOutside}>
      { isLoading ? (
        <div className="p-10">
          <h1 className="text-3xl font-bold text-center">Logging in...</h1>
          <BounceLoader
            css={{margin: "2rem auto", display: "block"}}
            size={100}
            color={"#E60023"}
            loading={isLoading}
          />
        </div>
      ) : (
        <form onSubmit={loginUser} className="p-10">
          <h1 className="text-3xl font-bold text-center">Welcome to Pinterest (Clone)</h1>
          <input onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="text" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" placeholder="Password" />
          <PrimaryButton className="block w-64 mx-auto">Log in</PrimaryButton>
        </form>
      )}
      <div className="text-xs text-center">(You may use the example user1@example.com:12345 if you don't wish to signup)</div>
      <hr className="mx-auto w-4/5" />
      <div onClick={props.onSignupClick} className="cursor-pointer py-5 text-center">Not on Pinterest yet? Sign-up</div>
    </Modal>
  )
}
