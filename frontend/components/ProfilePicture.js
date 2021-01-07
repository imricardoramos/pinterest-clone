import Link from 'next/link'
export default function ProfilePicture({ user, size }) {

    if(user.avatar){
      return (
        <Link href={`/${user.username}`}><a>
          <img src={user.avatar}
                className="rounded-full"
                style={{width: size*1.8+"em", height: size*1.8+"em"}} />
        </a></Link>
      )
    }
    else if (user.name){
      let firstLetter = user.name[0]
      return (
        <Link href={`/${user.username}`}><a>
        <div
          className="rounded-full bg-gray-300 font-bold grid place-items-center"
          style={{width: size+"em", height: size+"em", fontSize: size+"em"}}
        >
          {firstLetter}
        </div>
        </a></Link>
      )
    }
    else if (user.username){
      let firstLetter = user.username[0]
      return (
        <Link href={`/${user.username}`}><a>
        <div
          className="rounded-full bg-gray-300 font-bold grid place-items-center"
          style={{width: size+"em", height: size+"em", fontSize: size+"em"}}
        >
          {firstLetter}
        </div>
        </a></Link>
      )
    }
    return <></>
}
