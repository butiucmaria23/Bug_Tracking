import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Bugs from "./pages/Bugs";

function App() {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProject(null);
  };

  if (!user) {
    return (
      <>
        <Login onLogin={setUser} />
        <Register />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Bug Tracker</h1>
          <button onClick={logout}>Logout</button>
        </div>

       <Projects user={user} onSelect={setProject} />

      </>
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Bug Tracker</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <Bugs project={project} />
    </>
  );
}

export default App;
