import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({ scroll }) => {
  //AES
  const cifrar = (text) => {
    var textoCifrado = CryptoJS.AES.encrypt(
      text,
      "@chatprivadollaveprivada"
    ).toString();
    return textoCifrado;
  };

  //Personalizado
  const cifrarPropio = (text) => {
    var textoCifrado = text
      .replace(/e/gi, "enter")
      .replace(/i/gi, "imes")
      .replace(/a/gi, "ai")
      .replace(/o/gi, "ober")
      .replace(/u/gi, "ufat");
    return textoCifrado;
  };

  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Por favor introducir un mensaje válido.");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    console.log("Texto Sin Cifrar: ", input);
    console.log("Texto con Cifrado Personalizado: ", cifrarPropio(input));
    console.log("Texto Cifrado AES: ", cifrar(cifrarPropio(input)));

    await addDoc(collection(db, "messages"), {
      text: cifrar(cifrarPropio(input)),
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Mensaje"
      />
      <button className={style.button} type="submit">
        Enviar
      </button>
    </form>
  );
};

export default SendMessage;
