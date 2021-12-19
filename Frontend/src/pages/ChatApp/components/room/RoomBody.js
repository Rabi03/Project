/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import MessageFormatter from "../../globals/MessageFormatter";
import RoomMessage from "./RoomMessage";

const RoomBody = ({ messages, showDate, user, roomId }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  let messageKeys = messages && Object.keys(messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='room__body' style={{ }}>
      <MessageFormatter>
        {messageKeys &&
          messageKeys.length > 0 &&
          messageKeys.map((message) => (
            <RoomMessage
              message={messages[message]}
              showDate={showDate}
              user={user}
            />
          ))}
      </MessageFormatter>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default RoomBody;
