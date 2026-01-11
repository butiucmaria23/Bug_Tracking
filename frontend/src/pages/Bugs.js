import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Bugs({ project }) {
  const [bugs, setBugs] = useState([]);
  const [severity, setSeverity] = useState("LOW");
  const [description, setDescription] = useState("");
  const [commitLink, setCommitLink] = useState("");

  const load = useCallback(async () => {
    const res = await api.get(`/bugs/${project.id}`);
    setBugs(res.data);
  }, [project.id]);

  useEffect(() => {
    load();
  }, [load]);

  const report = async () => {
    await api.post("/bugs", {
      severity,
      description,
      commitLink,
      projectId: project.id
    });

    setDescription("");
    setCommitLink("");
    load();
  };

  const assign = async (id) => {
    await api.put(`/bugs/assign/${id}`);
    load();
  };

  const resolve = async (id) => {
    const link = prompt("Commit link:");
    await api.put(`/bugs/resolve/${id}`, { commitLink: link });
    load();
  };

  return (
    <div>
      <h2>{project.name}</h2>

      <h3>Report bug</h3>
      <select value={severity} onChange={e => setSeverity(e.target.value)}>
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select>

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        placeholder="Commit link"
        value={commitLink}
        onChange={e => setCommitLink(e.target.value)}
      />

      <button onClick={report}>Report</button>

      <hr />

      {bugs.map(b => (
        <div key={b.id} style={{ border: "1px solid black", margin: 5, padding: 5 }}>
          <b>{b.severity}</b> – {b.description} – {b.status}
          <br />
          {b.assignedTo
            ? <button onClick={() => resolve(b.id)}>Resolve</button>
            : <button onClick={() => assign(b.id)}>Assign to me</button>}
        </div>
      ))}
    </div>
  );
}
