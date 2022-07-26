import React, { useState } from "react";
import "./UserChatPage.css";
import UserChatList from "../components/UserChatComponents/UserChatList";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../routes/routes";
import DetailedChatView from "../components/UserChatComponents/DetailedChatView";

export default function UserChatPage() {
  const [friendToChat, setFriendToChat] = useState([]);

  return (
    <>
      <div class="" style={{ minHeight: "70vh" }}>
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class="card chat-app" style={{ height: "70vh" }}>
              <UserChatList setFriendToChat={setFriendToChat} />
              <Routes>
                <Route
                  path={ROUTES.CHAT_VIEW}
                  element={
                    <DetailedChatView
                      friendToChat={friendToChat}
                      setFriendToChat={setFriendToChat}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
