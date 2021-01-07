import BaseButton from './BaseButton'
export default function PrimaryButton(props) {
  return (
    <BaseButton color="#E60023" textColor="#ffffff" className={`font-bold ${props.className}`} onClick={props.onClick}>
      {props.children}
     </BaseButton>
  )
}
