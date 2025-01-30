"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/providers/Auth";
import PrimaryButton from "@/components/PrimaryButton";
import CreateBoardModal from "@/components/CreateBoardModal";
import Cookies from "js-cookie";
import { Board, Pin } from "@/types";
import Image from "next/image";

type BoardSelectorProps = {
  pin?: Pin;
  small?: boolean;
  onChange?: (board: Board) => void;
  onSave?: (board: Board) => void;
  create?: boolean;
};
export default function BoardSelector({
  pin,
  small = false,
  onChange,
  onSave,
  create = false,
}: BoardSelectorProps) {
  const { loggedUserData, isLoading } = useAuth();
  const [dropdownVisibility, setDropdownVisibility] = useState("hidden");
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [boardCreationModalVisibility, setBoardCreationModalVisibility] =
    useState("hidden");
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setDropdownVisibility("hidden"));

  const selectionHandler = useCallback(
    (board: Board) => {
      setSelectedBoard(board);
      setDropdownVisibility("hidden");
      if (onChange) {
        onChange(board);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (loggedUserData && loggedUserData.boards.length > 0) {
      const board = loggedUserData.boards[0];
      selectionHandler(board);
    }
  }, [loggedUserData, selectionHandler]);

  async function savePin() {
    const board = selectedBoard;
    if (!create && pin && board) {
      const pin_id = pin.id;
      try {
        await axios.post(
          `/board/${board.id}/add_pin`,
          {
            id: pin_id,
          },
          {
            headers: {
              "X-CSRFToken": Cookies.get("csrftoken"),
            },
          },
        );
        if (onSave) {
          onSave(board);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  if (isLoading) return <></>;
  if (loggedUserData && loggedUserData.boards.length > 0) {
    return (
      <div ref={ref}>
        <div className="flex">
          <button
            type="button"
            onClick={() => setDropdownVisibility("block")}
            className={
              small
                ? "text-sm bg-gray-100 px-4 py-2 rounded-l-xl flex items-center justify-between w-full"
                : "bg-gray-200 px-4 py-2 rounded-l-lg flex items-center justify-between w-48"
            }
          >
            <div className="">{selectedBoard?.name || ""}</div>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <button
            className={
              small
                ? "font-bold text-white px-4 py-2 rounded-r-xl text-sm"
                : "font-bold text-white px-4 py-2 rounded-r-lg"
            }
            style={{ backgroundColor: "#E60023" }}
            onClick={() => savePin}
          >
            Save
          </button>
        </div>
        <div
          className={`bg-white border-2 border-gray-300 rounded-xl p-2 mt-2 overflow-y-scroll absolute w-48 ${dropdownVisibility}`}
          style={{ maxHeight: "20em" }}
        >
          {loggedUserData.boards.map((board, index) => (
            <div
              onClick={() => selectionHandler(board)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg my-1"
              key={index}
            >
              {board.cover && <Image fill={true} src={board.cover} alt="" />}
              {board.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="text-right">
      <PrimaryButton onClick={() => setBoardCreationModalVisibility("block")}>
        Save
      </PrimaryButton>
      <CreateBoardModal
        className={boardCreationModalVisibility}
        onClickOutside={() => setBoardCreationModalVisibility("hidden")}
      />
    </div>
  );
}
