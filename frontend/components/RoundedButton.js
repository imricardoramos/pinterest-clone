export default function RoundedButton(props){
  return (
    <button onClick={props.onClick} className={`px-2 py-1 rounded-full hover:bg-gray-200 ${props.className}`}>{props.children}</button>
  )
}
