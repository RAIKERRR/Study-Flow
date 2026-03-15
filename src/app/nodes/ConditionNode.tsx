import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

export default function ConditionNode({ id, data }: any) {

  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const runningNode = useWorkflowStore((s) => s.runningNode);
  const isRunning = runningNode === id;

  const operator = data.operator || ">";
  const minutes = data.minutes || 30;

  const updateOperator = (value: string) => {
    updateNodeData(id, { operator: value });
  };

  const updateMinutes = (value: number) => {
    updateNodeData(id, { minutes: value });
  };

  return (
    <div
      style={{
        padding: 14,
        background: "#312e81",
        border: "2px solid #6366f1",
        borderRadius: 10,
        color: "white",
        minWidth: 190,
        fontSize: 13,

        /* glow effect */
        boxShadow: isRunning
          ? "0px 0px 15px #6366f1"
          : "none",

        transform: isRunning
          ? "scale(1.05)"
          : "scale(1)",

        transition: "all 0.2s ease"
      }}
    >
      <strong>⏱ STUDY CONDITION</strong>

      <div style={{ marginTop: 8 }}>
        Study Time
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 6
        }}
      >

        <select
          value={operator}
          onChange={(e) => updateOperator(e.target.value)}
        >
          <option value=">">Greater Than</option>
          <option value="<">Less Than</option>
          <option value="=">Equals</option>
        </select>

        <select
          value={minutes}
          onChange={(e) => updateMinutes(Number(e.target.value))}
        >
          <option value={10}>10 min</option>
          <option value={20}>20 min</option>
          <option value={30}>30 min</option>
          <option value={45}>45 min</option>
          <option value={60}>60 min</option>
        </select>

      </div>

      <Handle type="target" position={Position.Left} />

      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        style={{ top: 20 }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="no"
        style={{ top: 55 }}
      />

    </div>
  );
}