export default function Tabs(props){
  let items = [
    {
      title: "Photos",
      content: "photosContent"
    },
    {
      title: "1 comment",
      content: "CommentContent"
    }
  ]
  return (
    <div>
      <ul className="flex">
        { items.map(item => (
          <li className="px-4 py-4 bold border-b-2 border-black">{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
