import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

export default function TriggerNode({ id, data }: any) {

  const runningNode = useWorkflowStore((s) => s.runningNode);

  const isRunning = runningNode === id;

  return (
    <div
      style={{
        padding: 14,
        background: "#1e3a8a",
        border: "2px solid #60a5fa",
        borderRadius: 10,
        color: "white",
        minWidth: 170,
        fontSize: 13,

        /* glow effect */
        boxShadow: isRunning
          ? "0px 0px 15px #60a5fa"
          : "none",

        transform: isRunning
          ? "scale(1.05)"
          : "scale(1)",

        transition: "all 0.2s ease"
      }}
    >
      <strong>📚 STUDY START</strong>

      <div style={{ marginTop: 8 }}>
        {data.label}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}