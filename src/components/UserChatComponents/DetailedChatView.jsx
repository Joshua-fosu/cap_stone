import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  collectionGroup,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { useUserData } from "../../contexts/UserDataContext";

export default function DetailedChatView({ friendToChat, setFriendToChat }) {
  const [typedMessage, setTypedMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { userDetails } = useUserData();
  let { chat_id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      const unsub = onSnapshot(
        doc(database, "messages", friendToChat?.id),
        (doc) => {
          if (doc.data().messages.length !== 0) {
            setChatHistory(doc.data().messages);
          } else {
            setChatHistory([]);
          }
        }
      );
    };
    fetchMessages();
  }, [friendToChat]);

  const sendMessage = async () => {
    let toSendMessage = typedMessage;
    setChatHistory([
      ...chatHistory,
      {
        message: toSendMessage,
        userName: userDetails?.userName,
        createdAt: new Date().toISOString(),
      },
    ]);
    setTypedMessage("");
    const messagesRef = doc(database, "messages", friendToChat?.id);

    await updateDoc(messagesRef, {
      messages: arrayUnion({
        message: toSendMessage,
        userName: userDetails?.userName,
        createdAt: new Date().toISOString(),
      }),
    });
  };

  return (
    <>
      <div class="chat" style={{ minHeight: "70vh" }}>
        <div class="chat-header clearfix">
          <div class="row">
            <div class="col-lg-6">
              <a
                href="javascript:void(0);"
                data-toggle="modal"
                data-target="#view_info"
              >
                <img
                  src={`https://api.multiavatar.com/${friendToChat?.data[0]}.svg`}
                  alt="avatar"
                />
              </a>
              <div class="chat-about">
                <h6 class="m-b-0">{friendToChat?.data[0]}</h6>
                <small>Last seen: 2 hours ago</small>
              </div>
            </div>
            <div class="col-lg-6 hidden-sm text-right"></div>
          </div>
        </div>
        <div
          class="chat-history"
          style={{ maxHeight: "55vh", minHeight: "55vh", overflowY: "scroll" }}
        >
          <ul class="m-b-0">
            {chatHistory?.length !== 0 ? (
              chatHistory?.map((chat) => (
                <li class="clearfix">
                  <div
                    class={
                      chat?.userName === userDetails?.userName
                        ? "message-data text-left"
                        : "message-data text-right"
                    }
                  >
                    <span class="message-data-time">{chat?.createdAt}</span>
                  </div>
                  <div
                    class={
                      chat?.userName === userDetails?.userName
                        ? "message my-message"
                        : "message other-message float-right"
                    }
                  >
                    {chat?.message}
                  </div>
                </li>
              ))
            ) : (
              <>
                <p>Type to appear</p>
              </>
            )}
          </ul>
        </div>
        <div class="chat-message clearfix">
          <div class="input-group mb-0">
            <div class="input-group-prepend">
              <span class="input-group-text" onClick={sendMessage}>
                <i class="fa fa-send"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Enter text here..."
              value={typedMessage}
              onChange={(e) => {
                setTypedMessage(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
