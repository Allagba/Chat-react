import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null); // État pour stocker l'URL de l'image
  const fileInputRef = useRef(null); // Référence pour l'input de type file
  const endRef = useRef(null);

  // Fonction pour gérer le changement de l'image
  const handleTextImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  // Scroll to the bottom of the chat
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const triggerFileSelectPopup = () => fileInputRef.current.click(); // Déclencheur pour l'input de type file

  // Déclencheur pour ouvrir la caméra

  const handleCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.createElement("video");
        document.body.appendChild(video);
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {/* Affichage de l'image sélectionnée ici */}
        {image && (
          <div className="message own">
            <div className="texts">
              <img src={image} alt="Selected" />
            </div>
          </div>
        )}
        {/* Reste des messages */}
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" onClick={triggerFileSelectPopup} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleTextImage}
            accept="image/*"
          />
          <img src="./camera.png" alt="" onClick={handleCamera} />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          value={text}
          name=""
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
