import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      alert("User registered successfully");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Register failed");
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
