import MainLayout from '~/layouts/MainLayout';
import Feed from '~/components/Feed'
export default function Home() {
  let pinsData = new Array(20).fill([
    {
      imgSrc: "https://i.pinimg.com/564x/1f/d3/63/1fd36337c53a1ffab5080a3e1f2711d7.jpg",
      detailLink: "/pin/1"
    },
    {
      imgSrc: "https://i.pinimg.com/236x/66/e9/bd/66e9bd4a5b62051ba232b1446f888f4d.jpg",
      detailLink: "/pin/2"
    },
    {
      imgSrc: "https://i.pinimg.com/564x/ad/21/81/ad218164a733eec869cd68738aeea611.jpg",
      detailLink: "/pin/3"
    }
  ]).flat();

  return (
    <MainLayout>
      <Feed pins={pinsData} />
    </MainLayout>
  )
}
