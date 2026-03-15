import { useWorkflowStore } from "../store/useWorkflowStore";

export default function Console() {

  const logs = useWorkflowStore((s) => s.logs);

  return (
    <div className="console">

      {logs.length === 0 && (
        <div>[SYSTEM] Waiting for workflow...</div>
      )}

      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}

    </div>
  );
}