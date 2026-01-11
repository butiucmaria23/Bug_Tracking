import { useEffect, useState } from "react";
import api from "../services/api";

export default function Projects({ user, onSelect }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [repo, setRepo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (e) {
      alert("You are not allowed to see projects");
    }
  };

  const create = async () => {
    try {
      await api.post("/projects", {
        name,
        repository: repo,
        description
      });
      setName("");
      setRepo("");
      setDescription("");
      load();
    } catch {
      alert("Only PM can create projects");
    }
  };

  return (
    <div>
      <h2>Projects</h2>

      {user.role === "PM" && (
        <>
          <h3>Create project</h3>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Repository" value={repo} onChange={e => setRepo(e.target.value)} />
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={create}>Add</button>
          <hr />
        </>
      )}

      {projects.map(p => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => onSelect(p)}>Open</button>
        </div>
      ))}
    </div>
  );
}
