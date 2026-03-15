import { useWorkflowStore } from "../store/useWorkflowStore";

export default function Taskbar() {

  const runWorkflow = useWorkflowStore((s) => s.runWorkflow);

  /* -------- NEW -------- */
  const undo = useWorkflowStore((s) => s.undo);
  const redo = useWorkflowStore((s) => s.redo);
  const exportWorkflow = useWorkflowStore((s) => s.exportWorkflow);
  const importWorkflow = useWorkflowStore((s) => s.importWorkflow);
  const clearCanvas = useWorkflowStore((s) => s.clearCanvas);

  /* -------- THEME -------- */

  const theme = useWorkflowStore((s) => s.theme);
  const toggleTheme = useWorkflowStore((s) => s.toggleTheme);

  /* -------- IMPORT HANDLER -------- */

  const handleImport = (event: any) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {

      const data = JSON.parse(e.target.result);

      importWorkflow(data);

    };

    reader.readAsText(file);
  };

  return (
    <div className="taskbar">

      <button onClick={undo}>
        Undo
      </button>

      <button onClick={redo}>
        Redo
      </button>

      <button onClick={runWorkflow}>
        Run Study Routine
      </button>

      <button onClick={exportWorkflow}>
        Export
      </button>

      <label>
        Import
        <input
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleImport}
        />
      </label>

      <button onClick={clearCanvas}>
        Clear
      </button>

      {/* -------- THEME TOGGLE -------- */}

      <button onClick={toggleTheme}>
        {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

    </div>
  );
}