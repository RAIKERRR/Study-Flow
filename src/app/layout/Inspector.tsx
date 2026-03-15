import { useWorkflowStore } from "../store/useWorkflowStore";

export default function Inspector() {

  const selectedNode = useWorkflowStore((s) => s.selectedNode);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  if (!selectedNode) {
    return (
      <div className="inspector">
        <h3>Inspector</h3>
        <p>Select a node to edit.</p>
      </div>
    );
  }

  const data = selectedNode.data || {};

  return (
    <div className="inspector">

      <h3>Inspector</h3>

      <p><b>Node Type:</b> {selectedNode.type}</p>

      {/* TRIGGER EDIT */}
      {selectedNode.type === "trigger" && (
        <div>

          <label>Trigger Label</label>

          <input
            value={data.label || ""}
            onChange={(e) =>
              updateNodeData(selectedNode.id, {
                label: e.target.value
              })
            }
          />

        </div>
      )}

      {/* CONDITION EDIT */}
      {selectedNode.type === "condition" && (
        <div>

          <label>Condition Rule</label>

          <input
            value={data.rule || ""}
            onChange={(e) =>
              updateNodeData(selectedNode.id, {
                rule: e.target.value
              })
            }
          />

        </div>
      )}

      {/* ACTION EDIT */}
      {selectedNode.type === "action" && (
        <div>

          <label>Action</label>

          <input
            value={data.action || ""}
            onChange={(e) =>
              updateNodeData(selectedNode.id, {
                action: e.target.value
              })
            }
          />

        </div>
      )}

    </div>
  );
}