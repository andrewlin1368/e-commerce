import React from "react";
import { useSelector } from "react-redux";
import {
  useReadMessageMutation,
  useRemoveMessageMutation,
} from "../apis/messagesApi";
export default function Messages() {
  const { messages } = useSelector((state) => state.messages);
  const [readMessage] = useReadMessageMutation();
  const [removeMessage] = useRemoveMessageMutation();
  return (
    <div>
      messages{" "}
      {messages.length &&
        messages.map((message) => {
          return (
            <div key={message.m_id}>
              {message.m_date} {message.m_sender} {message.m_message}{" "}
              {message.m_title}
              {!message.m_seen && (
                <button
                  id={message.m_id}
                  onClick={(e) => {
                    readMessage(e.target.id);
                  }}
                >
                  read
                </button>
              )}
              <button
                id={message.m_id}
                onClick={(e) => {
                  removeMessage(e.target.id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
    </div>
  );
}
