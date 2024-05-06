// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import smoky from '../images/aestheticsmoky.jpg'

// const systemMessage = {
//   "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
// }

// const Bot = () => {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT"
//     }
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant";
//       } else {
//         role = "user";
//       }
//       return { role: role, content: messageObject.message }
//     });

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,
//         ...apiMessages
//       ]
//     }

//     //await fetch("https://api.openai.com/v1/chat/completions",
//     await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBJX7f3bT4Za498oQiunPG-AY_Bdv83F_o",
//       {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer " + API_KEY,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(apiRequestBody)
//       }).then((data) => {
//         return data.json();
//       }).then((data) => {
//         console.log(data);
//         setMessages([...chatMessages, {
//           message: data.choices[0].message.content,
//           sender: "ChatGPT"
//         }]);
//         setIsTyping(false);
//       });
//   }

//   return (
//     <div style={{ position: "fixed", top: 0, left:0 , height: "100vh", width: "100vw", backgroundColor: "grey", color: "#fff" }}>
//       <MainContainer>
//         <ChatContainer style={{ backgroundColor: "grey", borderRadius: "15px", boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//             style={{ backgroundImage: `url(${smoky})`, backgroundSize: "cover",}}
//           >
//             {messages.map((message, i) => {
//               console.log(message);
//               return <Message key={i} model={message} />
//             })}
//           </MessageList>
//           <MessageInput placeholder="Type message here" onSend={handleSend} style={{ backgroundColor: "#444", borderRadius: "10px", marginTop: "10px" }} />
//         </ChatContainer>
//       </MainContainer>
//       <style>
//         {`
//           /* Custom CSS styles */
//           .ChatContainer {
//             padding: 20px;
//             max-width: 600px;
//             width: 100%;
//             height: 500px;
//             overflow-y: auto;
//           }

//           .MessageInput {
//             width: calc(100% - 20px);
//             margin-top: 20px;
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Bot;

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom"; // Import Link component
import { IoArrowBackOutline } from "react-icons/io5"; // Import back arrow icon
import smoky from '../images/aestheticsmoky.jpg';

const Bot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: ``,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div
        className="bg-white bg-opacity-70 h-screen p-3 flex flex-col justify-center items-center relative" 
        style={{ backgroundImage: `url(${smoky})`, backgroundSize: "cover" }}
      >
        <Link to="/room" className="absolute top-2 left-2 text-white text-2xl">
          <IoArrowBackOutline style={{ fontSize: "2rem" }} />
        </Link>
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 bg-opacity-70 py-2"
        >
          <h1 className="text-3xl text-center">Chat AI</h1>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 bg-opacity-50 my-1">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
        <div style={{ height: "200px" }}></div>
      </div>
    </>
  );
}

export default Bot;




// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import smoky from '../images/aestheticsmoky.jpg';

// const Bot = () => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [generatingAnswer, setGeneratingAnswer] = useState(false);

//   async function generateAnswer(e) {
//     setGeneratingAnswer(true);
//     e.preventDefault();
//     setAnswer("Loading your answer... \n It might take up to 10 seconds");
//     try {
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBJX7f3bT4Za498oQiunPG-AY_Bdv83F_o`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: question }] }],
//         },
//       });

//       setAnswer(
//         response["data"]["candidates"][0]["content"]["parts"][0]["text"]
//       );
//     } catch (error) {
//       console.log(error);
//       setAnswer("Sorry - Something went wrong. Please try again!");
//     }

//     setGeneratingAnswer(false);
//   }

//   return (
//     <>
//       <div
//         className="bg-white bg-opacity-70 h-screen p-3 flex flex-col justify-center items-center"
//         style={{ backgroundImage: `url(${smoky})`, backgroundSize: "cover" }}
//       >
//         <form
//           onSubmit={generateAnswer}
//           className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 bg-opacity-70 py-2"
//         >
//           <h1 className="text-3xl text-center">Chat AI</h1>
//           <textarea
//             required
//             className="border rounded w-11/12 my-2 min-h-fit p-3"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask anything"
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
//             disabled={generatingAnswer}
//           >
//             Generate answer
//           </button>
//         </form>
//         <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 bg-opacity-50 my-1">
//           <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
//         </div>
//      <div style={{ height: "200px" }}></div>
//       </div>
//     </>
//   );
// }

// export default Bot;
