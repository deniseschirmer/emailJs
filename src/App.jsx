import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import envioLogo from "./../assets/email.png";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const sendEmail = (event) => {
    event.preventDefault();

    if (name === "") {
      setErrorName(true);
      return;
    } else {
      setErrorName(false);
    }
    if (email === "") {
      setErrorEmail(true);
      return;
    } else {
      setErrorEmail(false);
    }
    if (message === "") {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };
    emailjs
      .send(
        "service_le5foa1",
        "template_9fwisnj",
        templateParams,
        "kZw17p1lmPyEjUfqJ"
      )
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          toast("EMAIL ENVIADO!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (err) => {
          console.log("ERRO: ", err);
        }
      );

  };

  return (
    <div className="container">
      <ToastContainer />
      <img src={envioLogo} alt="Logo de email" />
      <h1 className="title">Formulário de Contato</h1>

      <form className="form" onSubmit={sendEmail}>
        {errorName && <p className="error">Nome campo obrigatório</p>}
        <input
          className="input"
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errorEmail && <p className="error">Email campo obrigatório</p>}
        <input
          className="input"
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errorMessage && <p className="error">Messagem é campo obrigatório</p>}
        <textarea
          className="textarea"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <input type="submit" value="Enviar" className="button" />
      </form>
    </div>
  );
}

export default App;
