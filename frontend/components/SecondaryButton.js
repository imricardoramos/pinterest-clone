import BaseButton from './BaseButton'
export default function PrimaryButton(props) {
  return (
    <BaseButton type={props.type} color="#EFEFEF" textColor="#000000" className={`font-bold ${props.className}`} onClick={props.onClick}>
      {props.children}
     </BaseButton>
  )
}
