export default function Card(props) {
  return (
    <div className="overflow-hidden shadow-lg rounded-3xl bg-white">
      {props.children}
    </div>
  )
}
