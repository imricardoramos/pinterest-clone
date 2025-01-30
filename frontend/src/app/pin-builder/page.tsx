"use client";
import { useRef, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import RoundedButton from "@/components/RoundedButton";
import BoardSelector from "@/components/BoardSelector";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Board } from "@/types";
import Image from "next/image";

export default function PinBuilder() {
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [link, setLink] = useState<string>();
  const [image, setImage] = useState<File>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!selectedBoard || !title || !description || !link || !image) return;
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("image", image);
    const response = await axios.post("/pin/", formData, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "multipart/form-data",
      },
    });
    const pin = response.data;
    await axios.post(
      `/board/${selectedBoard.id}/add_pin`,
      {
        id: pin.id,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      },
    );
    router.push(`/pin/${pin.id}`);
  }

  function previewImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length == 0) return;
    setImage(e.target.files[0]);
  }

  return (
    <>
      <div className="bg-gray-200">
        <div className="max-w-screen-md py-10 mx-auto">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="p-10">
                <div className="flex items-center justify-between">
                  <RoundedButton>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </RoundedButton>
                  <BoardSelector
                    create
                    onChange={(board: Board) => setSelectedBoard(board)}
                  />
                </div>
                <div className="flex flex-wrap mt-5">
                  <div className="flex flex-col w-full sm:w-1/2">
                    {!image && (
                      <div
                        className="bg-gray-300 rounded-lg p-2 flex-grow w-full cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="rounded-lg border-2 border-gray-400 border-dashed h-full relative">
                          <div
                            className="text-center mx-auto"
                            style={{ marginTop: "50%", minHeight: "15rem" }}
                          >
                            <FontAwesomeIcon icon={faArrowCircleUp} />
                            <div className="my-2">
                              Drag and drop or click to upload
                            </div>
                          </div>
                          <div className="absolute text-sm bottom-0 text-center">
                            Recommendation: Use high-quality .jpg files less
                            than 20MB
                          </div>
                        </div>
                      </div>
                    )}
                    {image && (
                      <Image
                        width={100}
                        height={100}
                        className="w-full"
                        src={URL.createObjectURL(image)}
                        alt=""
                        style={{ position: "static" }}
                      />
                    )}
                  </div>
                  <div
                    className="sm:px-10 py-5 w-full sm:w-1/2"
                    style={{ minHeight: "510px" }}
                  >
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2 text-3xl font-bold"
                      placeholder="Add your title"
                    />
                    <div className="font-bold">Ricardo Ramos</div>
                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2"
                      placeholder="Tell everyone what your pin is about"
                    />
                    <input
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2"
                      placeholder="Add destination link"
                    />
                    <input
                      ref={fileInputRef}
                      className="hidden"
                      type="file"
                      onChange={previewImage}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
