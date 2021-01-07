import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import MainLayout from '~/layouts/MainLayout'
import Feed from '~/components/Feed'

export default function UserBoard(props){
  let [boardData, setBoardData] = useState({})
  let router = useRouter()
  useEffect( async () => {
    if(router.query.board_id){
      const response = await axios.get(`/board/${router.query.board_id}/`)
      setBoardData(response.data)
    }
  }, [router.query])
  return (
    <MainLayout>
      <h1 className="text-center text-3xl font-bold">{boardData.name}</h1>
      <Feed filters={`boards=${router.query.board_id}&ordering=-created_at`} />
    </MainLayout>
  );
}
