import { useState, useRef } from 'react'
import ProfilePicture from '~/components/ProfilePicture'
import SecondaryButton from '~/components/SecondaryButton'
export default function ProfilePictureInput({ user, onChange }){
  let [loadedImage, setLoadedImage] = useState()
  let realInput = useRef()
  function handleOnChange(e){
    setLoadedImage(e.target.files[0])
    onChange(e)
  }

  return (
    <div>
      <label htmlFor="">Photo</label>
      <div className="flex items-center">
        { loadedImage ? (
          <img className="rounded-full w-20 h-20" src={URL.createObjectURL(loadedImage)} />
        ) : (
        <ProfilePicture user={user} size="3"/>
        ) }
        <SecondaryButton type="button" className="ml-4" onClick={() => realInput.current.click() }>Change</SecondaryButton>
        <input ref={realInput} onChange={handleOnChange} type="file" className="hidden" />
      </div>
    </div>
  );
}
