import { useState } from 'react'
import axios from 'axios'
import MainLayout from '~/layouts/MainLayout'
import SecondaryButton from '~/components/SecondaryButton'
import { Input } from '~/components/BasicComponents'
import { useAuth } from '~/providers/Auth'
import ProfilePictureInput from '~/components/ProfilePictureInput'
import Cookies from 'js-cookie'
export default function Settings(props){
  let { loggedUserData, setLoggedUserData } = useAuth()
  let [name, setName] = useState(loggedUserData.name)
  let [avatar, setAvatar] = useState()

  async function updateProfile(e){
    e.preventDefault()
    let formData = new FormData()
    formData.append("name", name)
    if(avatar){
      formData.append("avatar", avatar)
    }
    try {
      const response = await axios.patch(`/user/${loggedUserData.username}/`, formData, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      setLoggedUserData(response.data)

    } catch(e){
      console.log(e)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-3xl font-bold">Edit profile</h1>
        <p>People on pinterest will get to know the info below</p>
        <form onSubmit={updateProfile}>
          <div className="flex">
            <SecondaryButton className="ml-auto">Done</SecondaryButton>
          </div>
          <div>
            <ProfilePictureInput user={loggedUserData} onChange={e => setAvatar(e.target.files[0])} />
            <div className="flex">
              <Input type="text" label="Name" placeholder="Ex. Jo Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
