import { useWorkflowStore } from "../store/useWorkflowStore";

export default function Sidebar() {

  const addTrigger = useWorkflowStore((s) => s.addTrigger);
  const addCondition = useWorkflowStore((s) => s.addCondition);
  const addAction = useWorkflowStore((s) => s.addAction);

  return (
    <div className="sidebar">

      <h3>STUDYFLOW</h3>

      <button onClick={addTrigger}>
        + Start Study
      </button>

      <button onClick={addCondition}>
        + Condition
      </button>

      <button onClick={addAction}>
        + Study Action
      </button>

    </div>
  );
}