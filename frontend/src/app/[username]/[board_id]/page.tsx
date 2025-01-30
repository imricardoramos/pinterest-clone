"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Feed from "@/components/Feed";
import { Board } from "@/types";

export default function UserBoard() {
  const [boardData, setBoardData] = useState<Board>();
  const { board_id } = useParams();
  useEffect(() => {
    const fetchBoardData = async () => {
      if (board_id) {
        const response = await axios.get(`/board/${board_id}/`);
        setBoardData(response.data);
      }
    };

    fetchBoardData();
  }, [board_id]);
  return (
    <>
      {boardData && (
        <h1 className="text-center text-3xl font-bold">{boardData.name}</h1>
      )}
      <Feed filters={`boards=${board_id}&ordering=-created_at`} />
    </>
  );
}
