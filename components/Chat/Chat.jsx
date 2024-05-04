"use client";

import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {fetchUserTokensById, generateChatResponse, subtractTokens} from "@/utils/actions";
import toast from "react-hot-toast";
import {useAuth} from "@clerk/nextjs";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const {userId} = useAuth();

  const {mutate: createMessage, isPending: isChatOpenAiRequestIsPending} = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 100) {
        toast.error("You don't have enough tokens to generate a tour...");
        return null;
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error("Failed to send message");
        return null;
      }

      setMessages((prev) => [...prev, response.message]);

      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`Message sent successfully! You have ${newTokens} tokens left...`);
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
        {messages.length === 0 ? <div className={`flex justify-center max-sm:mt-8 py-6 -mx-8
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
