import { FormEvent, useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type CreateBoardModalProps = {
  className: string;
  onClickOutside: (e: MouseEvent | TouchEvent) => void;
};
export default function CreateBoardModal({
  className,
  onClickOutside,
}: CreateBoardModalProps) {
  const router = useRouter();
  const [boardName, setBoardName] = useState("");
  async function createBoardSubmitHandler(e: FormEvent) {
    e.preventDefault();
    try {
      await axios.post(
        "/board",
        {
          name: boardName,
        },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        },
      );
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Modal className={className} onClickOutside={onClickOutside}>
      <form onSubmit={createBoardSubmitHandler} className="p-4">
        <h1 className="text-xl font-bold text-center">Create Board</h1>
        <label className="text-sm">Name</label>
        <input
          onChange={(e) => setBoardName(e.target.value)}
          value={boardName}
          className="block w-full px-4 py-2 rounded-2xl border-2 border-gray-300"
          placeholder='Like "Places to Go" or "Recipes to Make"'
        />
        <PrimaryButton className="block ml-auto mt-4">Create</PrimaryButton>
      </form>
    </Modal>
  );
}
