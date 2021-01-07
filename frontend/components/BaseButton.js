export default function BaseButton(props){
  return (
    <button
      onClick={props.onClick}
      className={`px-4 py-2 rounded-3xl ${props.className}`}
      style={{backgroundColor: props.color, color: props.textColor}}
      type={props.type}
    >
    {props.children}
    </button>
  )
}
