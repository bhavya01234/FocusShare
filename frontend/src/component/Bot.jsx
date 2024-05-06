import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import smoky from '../images/aestheticsmoky.jpg'
const API_KEY = "";
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

const Bot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });
  }

  return (
    <div style={{ position: "fixed", top: 0, left:0 , height: "100vh", width: "100vw", backgroundColor: "grey", color: "#fff" }}>
      <MainContainer>
        <ChatContainer style={{ backgroundColor: "grey", borderRadius: "15px", boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            style={{ backgroundImage: `url(${smoky})`, backgroundSize: "cover",}}
          >
            {messages.map((message, i) => {
              console.log(message);
              return <Message key={i} model={message} />
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} style={{ backgroundColor: "#444", borderRadius: "10px", marginTop: "10px" }} />
        </ChatContainer>
      </MainContainer>
      <style>
        {`
          /* Custom CSS styles */
          .ChatContainer {
            padding: 20px;
            max-width: 600px;
            width: 100%;
            height: 500px;
            overflow-y: auto;
          }

          .MessageInput {
            width: calc(100% - 20px);
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  )
}

export default Bot;
