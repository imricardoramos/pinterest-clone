import { useRef, useState } from 'react'
import Link from 'next/link'
import useOnClickOutside from '~/hooks/useOnClickOutside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function FloatingAddWidget(props){
  let ref = useRef()
  let [menuVisibility, setMenuVisibility] = useState("hidden")
  useOnClickOutside(ref, () => setMenuVisibility("hidden"))
  return (
    <div ref={ref} className="fixed right-0 bottom-0 mb-5 mr-5 flex z-10">
      <Link href="/pin-builder">
        <button className={`bg-white shadow rounded-2xl w-48 px-4 py-2 hover:bg-gray-300 text-left mr-3 ${menuVisibility}`}>
        <FontAwesomeIcon className="mr-3" icon={faPlus} />Create a Pin
        </button>
      </Link>
      <button onClick={() => setMenuVisibility("block")} className="block bg-white rounded-full p-3 grid place-items-center" style={{boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"}}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
