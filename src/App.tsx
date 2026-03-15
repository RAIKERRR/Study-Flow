import FlowCanvas from "./app/canvas/FlowCanvas";
import Sidebar from "./app/layout/Sidebar";
import Inspector from "./app/layout/Inspector";
import Console from "./app/layout/Console";
import Taskbar from "./app/layout/Taskbar";

import { useWorkflowStore } from "./app/store/useWorkflowStore";

export default function App() {

  const theme = useWorkflowStore((state) => state.theme);

  return (
    <div className={`app-container ${theme}`}>
      
      <div className="workspace">

        <Sidebar />

        <div className="canvas-area">
          <FlowCanvas />
        </div>

        <Inspector />

      </div>

      <Console />

      <Taskbar />

    </div>
  );
}