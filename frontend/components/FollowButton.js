import { useState, useEffect } from 'react'
import { useAuth } from '~/providers/Auth'
import axios from 'axios'
import SecondaryButton from '~/components/SecondaryButton'
import Cookies from 'js-cookie'

export default function FollowButton({ user }){
  let [isFollowing, setIsFollowing] = useState(false)
  let { setLoggedUserData } = useAuth()

  useEffect( () => {
    if(user){
      setIsFollowing(user.is_following)
    }
  }, [user])

  async function follow(){
    try{
      await axios.post(`/user/${user.username}/follow/`, {}, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      setIsFollowing(true)
      const response = await axios.get("/user/me/")
      setLoggedUserData(response.data)
    } catch(e){
      console.log(e)
    }
  }
  async function unfollow(){
    try{
      await axios.post(`/user/${user.username}/unfollow/`, {}, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      setIsFollowing(false)
    } catch(e){
      console.log(e)
    }
  }
  if(isFollowing){
    return <SecondaryButton onClick={unfollow}>Following</SecondaryButton>
  }
  else {
    return <SecondaryButton onClick={follow}>Follow</SecondaryButton>
  }
}
