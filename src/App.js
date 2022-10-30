import React, { useState } from "react";
import "./App.css";
import { db } from "./Firebase";
import { useChat } from "./useChat";

function App() {
  const [message, setMessage] = useState("");
  const { loading, messages, error } = useChat();

  const sendMesage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      timestamp: Date.now(),
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <p>Escribe tu mensaje...</p>
        <form>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" onPress={sendMesage}>
            Enviar Mensaje
          </button>
        </form>
        <ul>
          {console.log("Mensahjes", message)}
          {message.map((m) => {
            <li key={m.id}>{m.message}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
