import { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import BoardSelector from "./BoardSelector";
import OverlayRoundedButton from "./OverlayRoundedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import UserSignature from "./UserSignature";
import { Pin } from "@/types";
import Image from "next/image";

// Aux function
function truncate(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else return text;
}

type PinCardProps = {
  pin: Pin;
  includeFooter: boolean;
  className: string;
};
export default function PinCard({
  pin,
  includeFooter,
  className,
}: PinCardProps) {
  const [pinSaved, setPinSaved] = useState(false);
  return (
    <div className={`w-full group ${className}`}>
      <div className="relative">
        <div className="absolute px-3 mt-3 invisible group-hover:visible z-10 w-full">
          {pinSaved ? (
            <div className="ml-2 mt-2 text-white font-bold text-left">
              Saved!
            </div>
          ) : (
            <BoardSelector pin={pin} small onSave={() => setPinSaved(true)} />
          )}
        </div>
        {pinSaved && (
          <div className="absolute w-full h-full bg-black opacity-25 rounded-3xl"></div>
        )}
        <div className="w-full px-2 bottom-0 absolute mr-2 mb-2 invisible group-hover:visible flex justify-between">
          {pin.link && (
            <a href={pin.link}>
              <OverlayRoundedButton className="mr-2 font-bold text-sm">
                {truncate(pin.link, 18)}
              </OverlayRoundedButton>
            </a>
          )}
          <div>
            <OverlayRoundedButton className="mr-1">
              <FontAwesomeIcon icon={faShare} />
            </OverlayRoundedButton>
            <OverlayRoundedButton>
              <FontAwesomeIcon icon={faEllipsisH} />
            </OverlayRoundedButton>
          </div>
        </div>
        <Link href={`/pin/${pin.id}`}>
          <Card>
            {pin.image && (
              <Image
                width={100}
                height={100}
                src={pin.image}
                alt=""
                className="w-full"
                style={{ position: "static" }}
              />
            )}
          </Card>
        </Link>
      </div>
      {includeFooter && (
        <div className="mt-2">
          <div className="font-bold">{pin.title}</div>
          <UserSignature user={pin.author} />
        </div>
      )}
    </div>
  );
}
