import { useState } from 'react'
import Link from 'next/link'
import Card from "./Card"
import BoardSelector from "./BoardSelector"
import OverlayRoundedButton from "./OverlayRoundedButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import UserSignature from './UserSignature'

// Aux function
function truncate(text, maxLength){
  if(text.length > maxLength){
    return text.slice(0, maxLength) + "..."
  }
  else return text
}

export default function PinCard({ pin, includeFooter, className }) {
  let [pinSaved, setPinSaved] = useState(false)
  return (
    <div className={`w-full group ${className}`}>
      <div className="relative">
        <div className="absolute px-3 mt-3 invisible group-hover:visible z-10 w-full">
          { pinSaved ? (
            <div className="ml-2 mt-2 text-white font-bold text-left">Saved!</div>
          ): (
            <BoardSelector pin={pin} small onSave={() => setPinSaved(true)}>Save</BoardSelector>
          )
          }
        </div>
        { pinSaved &&
          <div className="absolute w-full h-full bg-black opacity-25 rounded-3xl"></div>
        }
        <div className="w-full px-2 bottom-0 absolute mr-2 mb-2 invisible group-hover:visible flex justify-between">
          { pin.link &&
            <a href={pin.link}>
              <OverlayRoundedButton className="mr-2 font-bold text-sm">{truncate(pin.link, 18)}</OverlayRoundedButton>
            </a>
          }
          <div>
            <OverlayRoundedButton className="mr-1"><FontAwesomeIcon icon={faShare} /></OverlayRoundedButton>
            <OverlayRoundedButton><FontAwesomeIcon icon={faEllipsisH} /></OverlayRoundedButton>
          </div>
        </div>
        <Link href={`/pin/${pin.id}`}>
          <a>
            <Card>
              <img className="w-full" src={pin.image} />
            </Card>
          </a>
        </Link>
      </div>
      { includeFooter &&
      <div className="mt-2">
        <div className="font-bold">{pin.title}</div>
        <UserSignature user={pin.author} />
      </div>
      }
    </div>
  )
}
