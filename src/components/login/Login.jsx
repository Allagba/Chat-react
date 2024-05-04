import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import uploadImage from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, confirmpassword } =
      Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await uploadImage(avatar.file);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blockedList: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Hello");
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} />
            Upload an image
          </label>

          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
