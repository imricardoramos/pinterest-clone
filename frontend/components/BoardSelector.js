import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import useOnClickOutside from '~/hooks/useOnClickOutside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '~/providers/Auth'
import PrimaryButton from '~/components/PrimaryButton'
import CreateBoardModal from '~/components/CreateBoardModal'
import Cookies from 'js-cookie'

export default function BoardSelector({pin, small, onChange, onSave, create}){
  let { loggedUserData } = useAuth()
  let [dropdownVisibility, setDropdownVisibility] = useState("hidden")
  let [selectedBoard, setSelectedBoard] = useState({})
  let [boardCreationModalVisibility, setBoardCreationModalVisibility] = useState('hidden')
  let ref = useRef()

  useOnClickOutside(ref, () => setDropdownVisibility("hidden"))
  useEffect( () => {
    if(loggedUserData.boards && loggedUserData.boards.length > 0){
      let board = loggedUserData.boards[0]
      selectionHandler(board)
    }
  }, [loggedUserData])

  useEffect( () => {
    if(loggedUserData.boards && loggedUserData.boards.length > 0){
      setSelectedBoard(loggedUserData.boards[0])
    }
  }, [loggedUserData])

  function selectionHandler(board){
    setSelectedBoard(board);
    setDropdownVisibility("hidden")
    if(onChange){
      onChange(board)
    }
  }

  async function savePin(){
    if(!create){
      let pin_id = pin.id
      try{
        await axios.post(`/board/${selectedBoard.id}/add_pin/`, {
          id: pin_id
        }, {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
          }
        })
        if(onSave){
          onSave(selectedBoard)
        }
      } catch(e){
        console.log(e)
      }
    }
  }

  if(loggedUserData.boards && loggedUserData.boards.length > 0){
    if(small){
      return (
        <div ref={ref}>
          <div className="flex">
            <button type="button" onClick={() => setDropdownVisibility("block")} className="text-sm bg-gray-100 px-4 py-2 rounded-l-xl flex items-center justify-between w-full"><div className="">{selectedBoard.name || ""}</div><FontAwesomeIcon icon={faChevronDown} /></button>
            <button className="font-bold text-white px-4 py-2 rounded-r-xl text-sm" style={{backgroundColor: '#E60023'}} onClick={savePin} >Save</button>
          </div>
          <div className={`bg-white border-2 border-gray-300 rounded-xl p-2 mt-2 overflow-y-scroll absolute w-48 ${dropdownVisibility}`} style={{maxHeight: "20em"}}>
            {loggedUserData.boards.map((board,index) => (
              <div onClick={() => selectionHandler(board)} className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg my-1" key={index}>
                <img src={board.cover} />{board.name}
              </div>
            ))}
          </div>
        </div>
      )
    }
    else{
      return (
        <div ref={ref}>
          <div className="flex">
            <button type="button" onClick={() => setDropdownVisibility("block")} className="bg-gray-200 px-4 py-2 rounded-l-lg flex items-center justify-between w-48"><div className="">{selectedBoard.name || ""}</div><FontAwesomeIcon icon={faChevronDown} /></button>
            <button className="font-bold text-white px-4 py-2 rounded-r-lg" style={{backgroundColor: '#E60023'}} onClick={savePin} >Save</button>
          </div>
          <div className={`bg-white border-2 border-gray-300 rounded-xl p-2 mt-2 overflow-y-scroll absolute w-48 ${dropdownVisibility}`} style={{maxHeight: "20em"}}>
            {loggedUserData.boards.map((board,index) => (
              <div onClick={() => selectionHandler(board)} className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg my-1" key={index}>
                <img src={board.cover} />{board.name}
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
  return (
    <div className="text-right">
      <PrimaryButton onClick={() => setBoardCreationModalVisibility('block')}>Save</PrimaryButton>
      <CreateBoardModal className={boardCreationModalVisibility} onClickOutside={() => setBoardCreationModalVisibility("hidden")} />
    </div>
  )
}
