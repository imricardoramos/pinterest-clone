import { useRouter } from 'next/router'
import Link from 'next/link'
  
// Aux function
function getBoardDisplayImage(board){
  if(board.cover){
    return board.cover
  }
  else if (board.total_pins > 0){
    return board.pins[0].image
  }
  return ""
}

export default function BoardsFeed({ boards }){
  let router = useRouter()
  return (
    <div className="flex flex-wrap">

      {boards && boards.map((board, index) => (
        <div key={index} className="mx-5">
          <Link href={`/${router.query.username}/${board.id}` }>
            <a>
              <div className="rounded-xl overflow-hidden bg-gray-300 w-64 h-32" >
                <img className="w-full" src={getBoardDisplayImage(board)} />
              </div>
            </a>
          </Link>
          <Link href={`/${router.query.username}/${board.id}`}><a><h3 className="text-xl font-bold">{board.name}</h3></a></Link>
            <div>{board.total_pins} pins</div>
        </div>
      ))}
    </div>
  );
}
