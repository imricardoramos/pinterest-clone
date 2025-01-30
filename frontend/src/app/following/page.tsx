"use client";

import { useAuth } from "@/providers/Auth";
import Feed from "@/components/Feed";
import PrimaryButton from "@/components/PrimaryButton";
import StackedAvatars from "@/components/StackedAvatars";
export default function Following() {
  const { loggedUserData, isLoading } = useAuth();

  if (isLoading) return <></>;
  if (loggedUserData)
    return (
      <>
        <div className="max-w-screen-md mx-auto my-10">
          <h1 className="text-2xl font-bold">From people you follow</h1>
          <StackedAvatars users={loggedUserData.following} />
          <PrimaryButton className="block ml-auto">
            Find people to follow
          </PrimaryButton>
        </div>
        {loggedUserData.username && (
          <Feed
            filters={`author__followers__username=${loggedUserData.username}`}
            includeFooter
          />
        )}
      </>
    );
}
