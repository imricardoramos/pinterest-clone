import {useContext} from 'react'
import AppContext from '~/providers/App'
export default function FloatingMessage(){
  let {floatingMessageDismissed, setFloatingMessageDismissed} = useContext(AppContext)
  if(floatingMessageDismissed){
    return <></>
  }
  else{
    return (
      <div className="text-xs max-w-md fixed bottom-0 left-0 ml-5 mb-5 z-10 rounded-xl bg-white shadow-lg pl-2 pr-8 py-2">
        <div className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer" onClick={() => setFloatingMessageDismissed(true)}>X</div>
        <p>
          Hi 👋, I made this Pinterest clone using React and Django Rest Framework.
        </p>
        <p>
          If interested, I'm currently looking for an <b>remote job 🌎</b>
        </p>
        <p>
          You can contact me on twitter <a className="font-bold text-blue-800" href="https://twitter.com/imricardoramos">@imricardoramos</a>
        </p>
      </div>
    )
  }
}
