import React, { useState } from "react";
import { storage } from "../firebase/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useUserData } from "../contexts/UserDataContext";
import "./CreatePostPage.css";

export default function CreatePostPage() {
  const { useState } = React;
  const [selectedFile, setSelectedFile] = useState([]);
  const [checkFile, setCheckFile] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [displayProgessBar, setDisplayProgressBar] = useState(false);

  const [allUrls, setUrls] = useState([]);
  const { uploadImageObject } = useUserData();
  var interArrr = [];

  const imageHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setCheckFile(true);
      const newImage = e.target.files[i];

      newImage["id"] = Math.random();
      setSelectedFile((prevState) => [...prevState, newImage]);
    }
  };

  const imagesubmission = () => {
    if (checkFile) {
      setDisplayProgressBar(true);
      const promises = [];
      selectedFile.map((image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {},
          async () => {
            await storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((urls) => {
                interArrr.push(urls);
                setUrls((prevState) => [...prevState, urls]);
              })
              .then(() => {
                if (selectedFile.length === interArrr.length) {
                  uploadImageObject(interArrr, eventName, eventDescription);

                  setSelectedFile([]);
                  setEventName("");
                  setEventDescription("");
                  setDisplayProgressBar(false);
                  setUrls([]);
                  setCheckFile(false);
                  alert("All images uploaded");
                }
              });
          }
        );
      });

      Promise.all(promises)
        .then(() => {})
        .catch((err) => {});
    } else {
      alert("select a file");
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-300 flex justify-center items-center px-2">
        <div className="w-[320px] grid gap-2">
          <div className="h-24 cursor-pointer relative flex justify-center items-center border-2 rounded-md bg-gray-200">
            <input
              type="file"
              name="file"
              onChange={imageHandler}
              className="z-20 opacity-0 cursor-pointer h-full w-full"
            />
            <div className="absolute flex justify-center items-center gap-2">
              {selectedFile.map((eachFile) => (
                <img
                  className={`h-10 w-10 rounded-full rounded-circle ${
                    checkFile ? "opacity-1" : "opacity-0"
                  }`}
                  src={eachFile ? URL.createObjectURL(eachFile) : null}
                />
              ))}

              {/* <span className="text-[18px] w-56 truncate">
                {checkFile ? "" : "choose a file"}
              </span> */}
            </div>
          </div>
          <input
            class="input is-small"
            type="text"
            placeholder="#event name"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          ></input>
          <input
            class="input is-small"
            type="text"
            placeholder="#description"
            value={eventDescription}
            onChange={(e) => {
              setEventDescription(e.target.value);
            }}
          ></input>
          <button
            onClick={imagesubmission}
            className="w-full h-14 bg-green-600 text-white rounded-md"
          >
            Upload
          </button>
          <progress
            className={
              displayProgessBar ? "progress is-small is-primary" : "d-none"
            }
            max="100"
          >
            10%
          </progress>
        </div>
      </div>
    </>
  );
}
