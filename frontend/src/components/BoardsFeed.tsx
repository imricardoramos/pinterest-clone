import Link from "next/link";
import { Board } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

// Aux function
function getBoardDisplayImage(board: Board) {
  if (board.cover) {
    return board.cover;
  } else if (board.total_pins > 0) {
    return board.pins[0].image;
  }
  return "";
}

type BoardsFeedProps = {
  boards: Board[];
};

export default function BoardsFeed({ boards }: BoardsFeedProps) {
  const { username } = useParams();
  return (
    <div className="flex flex-wrap">
      {boards &&
        boards.map((board, index) => (
          <div key={index} className="mx-5">
            <Link href={`/${username}/${board.id}`}>
              <div className="rounded-xl overflow-hidden bg-gray-300 w-64 h-32">
                {getBoardDisplayImage(board) && (
                  <Image
                    width={100}
                    height={100}
                    className="w-full"
                    src={getBoardDisplayImage(board)}
                    alt=""
                  />
                )}
              </div>
            </Link>
            <Link href={`/${username}/${board.id}`}>
              <h3 className="text-xl font-bold">{board.name}</h3>
            </Link>
            <div>{board.total_pins} pins</div>
          </div>
        ))}
    </div>
  );
}
