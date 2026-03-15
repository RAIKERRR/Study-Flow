import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

export default function ActionNode({ id, data }: any) {

  const runningNode = useWorkflowStore((s) => s.runningNode);

  const isRunning = runningNode === id;

  return (
    <div
      style={{
        padding: 14,
        background: "#065f46",
        border: "2px solid #10b981",
        borderRadius: 10,
        color: "white",
        minWidth: 170,
        fontSize: 13,

        /* glow effect */
        boxShadow: isRunning
          ? "0px 0px 15px #10b981"
          : "none",

        transform: isRunning
          ? "scale(1.05)"
          : "scale(1)",

        transition: "all 0.2s ease"
      }}
    >
      <strong>⚡ STUDY ACTION</strong>

      <div style={{ marginTop: 8 }}>
        {data.action}
      </div>

      <Handle type="target" position={Position.Left} />
    </div>
  );
}