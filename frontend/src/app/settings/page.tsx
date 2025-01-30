"use client";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import SecondaryButton from "@/components/SecondaryButton";
import { Input } from "@/components/BasicComponents";
import { useAuth } from "@/providers/Auth";
import ProfilePictureInput from "@/components/ProfilePictureInput";
import Cookies from "js-cookie";
import { User } from "@/types";

export default function Settings() {
  const { loggedUserData, setLoggedUserData } = useAuth();
  const [name, setName] = useState<string>();
  const [avatar, setAvatar] = useState<File>();

  useEffect(() => {
    if (loggedUserData) {
      setName(loggedUserData.name);
    }
  }, [loggedUserData]);

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loggedUserData || !name) return;
    const formData = new FormData();
    formData.append("name", name);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    try {
      const response = await axios.patch<User>(
        `/user/${loggedUserData.username}/`,
        formData,
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        },
      );
      setLoggedUserData(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleProfilePictureInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length < 0) return;
    setAvatar(e.target.files[0]);
  }

  function handleNameInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-3xl font-bold">Edit profile</h1>
        <p>People on AltPins will get to know the info below</p>
        <form onSubmit={updateProfile}>
          <div className="flex">
            <SecondaryButton className="ml-auto">Done</SecondaryButton>
          </div>
          <div>
            {loggedUserData && (
              <ProfilePictureInput
                user={loggedUserData}
                onChange={handleProfilePictureInputOnChange}
              />
            )}
            <div className="flex">
              <Input
                type="text"
                label="Name"
                placeholder="Ex. Jo Smith"
                value={name}
                onChange={handleNameInputOnChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
