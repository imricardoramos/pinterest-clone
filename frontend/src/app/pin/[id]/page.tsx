"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import FollowButton from "@/components/FollowButton";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import Feed from "@/components/Feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import RoundedButton from "@/components/RoundedButton";
import BoardSelector from "@/components/BoardSelector";
import UserSignature from "@/components/UserSignature";
import { useAuth } from "@/providers/Auth";
import { Board, Pin } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Home() {
  const [pinData, setPinData] = useState<Pin>();
  const [boardTarget, setBoardTarget] = useState<Board>();
  const [pinSaved, setPinSaved] = useState(false);
  const { id } = useParams();
  const { loggedUserData } = useAuth();

  useEffect(() => {
    async function fetchPinData() {
      if (id) {
        const response = await axios.get(`/pin/${id}`);
        setPinData(response.data);
      }
    }
    fetchPinData();
  }, [id]);

  function onSave(board: Board) {
    setBoardTarget(board);
    setPinSaved(true);
  }

  return (
    <>
      <div className="md:container mx-auto max-w-lg">
        <Card>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              {pinData && (
                <a href={pinData.link}>
                  <Image
                    width={100}
                    height={100}
                    className="w-full"
                    src={pinData.image}
                    alt=""
                    style={{ position: "static" }}
                  />
                </a>
              )}
            </div>
            <div className="p-5 pl-10 w-full md:w-1/2">
              <div className="flex items-center justify-between">
                <div>
                  <RoundedButton>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </RoundedButton>
                  <RoundedButton className="ml-2">
                    <FontAwesomeIcon icon={faShare} />
                  </RoundedButton>
                </div>
                {pinSaved && boardTarget ? (
                  <div className="rounded-xl bg-gray-300 px-4 py-2">
                    Saved to <b>{boardTarget.name}</b>
                  </div>
                ) : (
                  <BoardSelector pin={pinData} onSave={onSave} />
                )}
              </div>
              {pinData && loggedUserData && (
                <div className="pr-5">
                  <h1 className="text-4xl font-bold">{pinData.title}</h1>
                  <p>{pinData.description}</p>
                  <div className="flex justify-between my-2">
                    {pinData.author && (
                      <>
                        <UserSignature user={pinData.author} includeFollowers />
                        {pinData.author.username != loggedUserData.username && (
                          <>
                            <FollowButton user={pinData.author} />
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <Tabs />
                </div>
              )}
            </div>
          </div>
        </Card>
        <h2 className="font-bold text-center mt-10 text-xl">More like this</h2>
        <Feed filters={`ordering=-created_at`} />
      </div>
    </>
  );
}
