import { useAuth } from '~/providers/Auth'
import Link from 'next/link'
import SearchBar from "./SearchBar"

export default function Header(props) {
  let { loggedUserData } = useAuth()
  return <div className="fixed top-0 z-10 bg-white w-full">
    <ul className="py-3 container mx-auto flex items-center">
      <li><Link href="/"><a className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">Home</a></Link></li>
      <li><Link href="/following"><a className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">Following</a></Link></li>
      { <div className="hidden sm:block w-full">
      <SearchBar />
      </div>
      }
      <li><Link href={`/${loggedUserData.username}`}><a className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">Profile</a></Link></li>
      <li><Link href={`/settings`}><a className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">Settings</a></Link></li>
    </ul>
  </div>
}
