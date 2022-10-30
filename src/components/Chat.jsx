import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import CryptoJS from "crypto-js";
import SendMessage from "./SendMessage";
import { db } from "../services/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

const style = {
  main: `flex flex-col p-[10px]`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const decifrar = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, "@chatprivadollaveprivada");
    var textoDecifrado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDecifrado;
  };

  const decifradoPropio = (text) => {
    var textoDecifrado = text
      .replace(/enter/gi, "e")
      .replace(/imes/gi, "i")
      .replace(/ai/gi, "a")
      .replace(/ober/gi, "o")
      .replace(/ufat/gi, "u");
    return textoDecifrado;
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      //Decifrar
      messages.map((e) => {
        e.text = decifradoPropio(decifrar(e.text));
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      {/* Send Message Compoenent */}
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;
