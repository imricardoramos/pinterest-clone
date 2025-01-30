import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

type ProfilePictureProps = {
  user: User;
  size: number;
};
export default function ProfilePicture({ user, size }: ProfilePictureProps) {
  if (user.avatar) {
    return (
      <Link href={`/${user.username}`}>
        {user.avatar && (
          <Image
            width={100}
            height={100}
            src={user.avatar}
            className="rounded-full"
            style={{ width: size * 1.8 + "em", height: size * 1.8 + "em" }}
            alt=""
          />
        )}
      </Link>
    );
  } else if (user.name) {
    const firstLetter = user.name[0];
    return (
      <Link href={`/${user.username}`}>
        <div
          className="rounded-full bg-gray-300 font-bold grid place-items-center"
          style={{
            width: size + "em",
            height: size + "em",
            fontSize: size + "em",
          }}
        >
          {firstLetter}
        </div>
      </Link>
    );
  } else if (user.username) {
    const firstLetter = user.username[0];
    return (
      <Link href={`/${user.username}`}>
        <div
          className="rounded-full bg-gray-300 font-bold grid place-items-center"
          style={{
            width: size + "em",
            height: size + "em",
            fontSize: size + "em",
          }}
        >
          {firstLetter}
        </div>
      </Link>
    );
  }
  return <></>;
}
