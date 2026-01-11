import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PM");

  const register = async () => {
    const res = await fetch("http://127.0.0.1:3000/auth/register", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <select onChange={e => setRole(e.target.value)}>
        <option value="PM">PM</option>
        <option value="TST">TST</option>
      </select>
      <button onClick={register}>Register</button>
    </div>
  );
}
