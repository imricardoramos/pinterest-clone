import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useOnClickOutside from '~/hooks/useOnClickOutside'
import MainLayout from '~/layouts/MainLayout'
import RoundedButton from '~/components/RoundedButton'
import CreateBoardModal from '~/components/CreateBoardModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ProfilePicture from '~/components/ProfilePicture'
import FollowButton from '~/components/FollowButton'
import { useAuth } from '~/providers/Auth'
import Feed from '~/components/Feed'
import BoardsFeed from '~/components/BoardsFeed'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function UserProfile(props){
  let [addMenuVisibility, setAddMenuVisibility] = useState("hidden")
  let [userData, setUserData] = useState({})
  let [boardsData, setBoardsData] = useState([])
  let { loggedUserData } = useAuth()
  let router = useRouter()

  useEffect( async () => {
    if(router.query.username && loggedUserData.username){
      try{
        const response = await axios.get(`/user/${router.query.username}/`)
        setUserData(response.data)

        if(router.query.username == loggedUserData.username){
          const response2 = await axios.get(`/board/?author__username=${router.query.username}&ordering=-created_at`)
          setBoardsData(response2.data.results)
        }
      }
      catch(e){
        console.log(e)
      }
    }
  }, [router.query.username, loggedUserData.username])

  function AddWidget(props){
    let [createBoardModalVisibility, setCreateBoardModalVisibility] = useState("hidden")
    let ref = useRef()
    useOnClickOutside(ref, () => setAddMenuVisibility("hidden"))
    function handleAddButtonClick(e){
      if(addMenuVisibility == "block"){
        setAddMenuVisibility("hidden")
      }
      else{
        setAddMenuVisibility("block")
      }
    }
    function AddMenu(props){
      return (
        <div className={`rounded-xl px-4 py-2 w-40 bg-white shadow-xl ${props.className}`}>
          <div className="my-2 text-sm">Create</div>
          <Link href="/pin-builder"><button className="text-left w-full block my-2 font-bold p-2 rounded-xl hover:bg-gray-300">Pin</button></Link>
          <button className="text-left w-full block my-2 font-bold p-2 rounded-xl hover:bg-gray-300" onClick={() => setCreateBoardModalVisibility("block")}>Board</button>
        </div>
      )
    }
    return (
      <div ref={ref} >
        <RoundedButton onClick={handleAddButtonClick} className="block ml-auto"><FontAwesomeIcon icon={faPlus} /></RoundedButton>
        <div className="relative">
          <AddMenu className={`absolute right-0 ${addMenuVisibility}`}/>
        </div>
        <CreateBoardModal className={createBoardModalVisibility} onClickOutside={() => setCreateBoardModalVisibility("hidden")} />
      </div>
    )
  }
  return (
    <MainLayout>
      <div className="text-center">
        <div className="flex justify-center">
          <ProfilePicture user={userData} size="3" />
        </div>
        <h1 className="text-3xl font-bold">{userData.name}</h1>
        <div>@{userData.username}</div>
        <div>{userData.total_followers} followers · {userData.total_following} following</div>
        { userData.username != loggedUserData.username &&
          <div className="mt-5"><FollowButton user={userData} /></div>
        }
      </div>
      <div className="container mx-auto mt-10">
        { userData.username && loggedUserData.username && (
          <>
          { (userData.username == loggedUserData.username) ? (
            <>
              <AddWidget />
              <BoardsFeed boards={boardsData} />
            </>
            ) : (
              <Feed filters={`author__username=${router.query.username}&ordering=-created_at`} />
          ) }
          </>
        )}
      </div>
    </MainLayout>
  )
}
