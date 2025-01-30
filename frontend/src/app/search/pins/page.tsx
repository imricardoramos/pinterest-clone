import Feed from "@/components/Feed";
import { Pin } from "@/types";
export default function Home() {
  const pinsData: Pin[] = new Array(20).fill([]).flat();

  return (
    <>
      <Feed pins={pinsData} />
    </>
  );
}
