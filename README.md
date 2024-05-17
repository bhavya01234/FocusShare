# FocusShare
FocusShare is a collaborative online platform designed to help students study together effectively. Users can create or join rooms, chat with members, ask questions to an AI chatbot, and manage tasks with a shared to-do list. The platform also features a Pomodoro timer to enhance productivity.

Deployment Link - 

# Features
Room Creation/Joining: Users can create or join study rooms to collaborate with peers.
Chatroom: Engage in real-time conversations with room members using Socket.io.
AI Chatbot: Ask questions and get instant answers from an integrated AI chatbot.
Shared To-Do List: Add, update, delete, and track tasks within the room. View progress as tasks are marked done/pending by different members.
Pomodoro Timer: Utilize focus, short break, and long break timers to manage study sessions efficiently.
User Authentication: Secure login and logout with JSON Web Tokens (JWT).

# Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Real-time Communication: Socket.io
Authentication: JSON Web Tokens (JWT)
AI Chatbot: Integrated via an external API
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/FocuShare.git
cd FocuShare
Install dependencies:

bash
Copy code
npm install
cd client
npm install
cd ..
Set up environment variables: Create a .env file in the root directory and add the following variables:

env
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AI_CHATBOT_API_KEY=your_ai_chatbot_api_key
Run the application:

bash
Copy code
npm run dev
Usage
Sign Up/Login: Create a new account or log in with your existing credentials.
Create/Join Room: Start a new study room or join an existing one using the room code.
Chat: Use the chat feature to communicate with other members in real-time.
AI Chatbot: Ask questions to the AI chatbot within the room for instant assistance.
Manage Tasks: Add new tasks to the shared to-do list, update their status, and track the progress of all members.
Pomodoro Timer: Utilize the integrated Pomodoro timer to manage your study sessions and breaks.
Contributing
We welcome contributions to enhance FocuShare. To contribute, follow these steps:

Thank you for using FocuShare! We hope it enhances your study sessions and productivity.
