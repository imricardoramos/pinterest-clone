type Item = {
  title: string;
  content: string;
};
export default function Tabs() {
  const items: Item[] = [
    {
      title: "Photos",
      content: "photosContent",
    },
    {
      title: "1 comment",
      content: "CommentContent",
    },
  ];
  return (
    <div>
      <ul className="flex">
        {items.map((item) => (
          <li
            key={item.title}
            className="px-4 py-4 bold border-b-2 border-black"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
