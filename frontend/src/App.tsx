import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
    };
    socket.onmessage = (message) => {
      console.log("Message", message.data);
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    socket?.send(message);
  };

  if (!socket) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h1>Send Message</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}

export default App;
