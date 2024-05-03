"use client";

import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {generateChatResponse} from "@/utils/actions";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const {mutate: createMessage, isPending: isChatOpenAiRequestIsPending} = useMutation({
    mutationFn: (query) => {
      return generateChatResponse([...messages, query]);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("Failed to send message");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSend = (e) => {
    e.preventDefault();
    const query = {role: "user", content: text};
    createMessage(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        {
          messages.map(({role, content}, index) => {
            const avatar = role === "user" ? "👤" : "🤖";
            const bgColor = role === "user" ? "bg-base-200" : "bg-base-100";

            return (
              <div key={index} className={`flex py-6 -mx-8 
              px-8 text-xl leading-loose border-b border-base-300 ${bgColor}`}>
                <span className="mr-4">{avatar}</span>
                <p className="max-w-5xl">{content}</p>
              </div>
            );
          })
        }
        {isChatOpenAiRequestIsPending ? <span className="loading"/> : null}
        {messages.length === 0 ? <div className={`flex justify-center py-6 -mx-8
              px-8 text-xl leading-loose border-b border-base-300 bg-base-300/60`}>How can I help you today?</div> : null}
      </div>
      <form onSubmit={handleSend} className="max-w-5xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered join-item w-full max-w-5xl"
            required
          />
          <button className="btn btn-primary join-item" type="submit" disabled={isChatOpenAiRequestIsPending}>
            {isChatOpenAiRequestIsPending ? <span className="loading loading-dots loading-xs"/> : null} Ask Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
