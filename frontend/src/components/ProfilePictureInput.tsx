import { useState, ChangeEventHandler, ChangeEvent, useRef } from "react";
import ProfilePicture from "@/components/ProfilePicture";
import SecondaryButton from "@/components/SecondaryButton";
import { User } from "@/types";
import Image from "next/image";

type ProfilePictureInputProps = {
  user: User;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
export default function ProfilePictureInput({
  user,
  onChange,
}: ProfilePictureInputProps) {
  const [loadedImage, setLoadedImage] = useState<File>();
  const realInput = useRef<HTMLInputElement>(null);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length < 0) return;
    setLoadedImage(e.target.files[0]);
    onChange(e);
  }

  return (
    <div>
      <label htmlFor="">Photo</label>
      <div className="flex items-center">
        {loadedImage ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image
              fill
              src={URL.createObjectURL(loadedImage)}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
        ) : (
          <ProfilePicture user={user} size={3} />
        )}
        <SecondaryButton
          type="button"
          className="ml-4"
          onClick={() => realInput.current?.click()}
        >
          Change
        </SecondaryButton>
        <input
          ref={realInput}
          onChange={handleOnChange}
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
}
