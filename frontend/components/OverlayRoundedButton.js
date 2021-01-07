import RoundedButton from '~/components/RoundedButton'
export default function OverlayRoundedButton(props){
  return <RoundedButton className={`bg-gray-100 opacity-75 ${props.className}`}>{props.children}</RoundedButton>
}
