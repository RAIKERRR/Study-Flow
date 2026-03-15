**📚 StudyFlow**

A visual workflow builder for study routines.
StudyFlow allows users to create custom study automation flows using a drag-and-drop interface with triggers, conditions, and actions.
The project simulates how workflow automation tools like Zapier, Node-RED, and n8n execute tasks through connected nodes.

**🚀 Features**

**🔹 Visual Workflow Builder**

Create workflows using connected nodes:
Trigger Node – Start a study session
Condition Node – Evaluate study time
Action Node – Execute a study action (e.g., Take Break)

**🔹 Live Workflow Execution**

Simulates execution of the workflow step by step with a timer.

**🔹 Node Execution Animation**

During execution:
Nodes glow when they are active
Edges animate to show workflow progression
This mimics the behavior of modern workflow automation tools.

**🔹 Undo / Redo System**

Users can undo and redo workflow changes including:
Node creation
Node movement
Connections

**🔹 Import / Export Workflows**

Users can save workflows as JSON and import them later.

**🔹 Persistent Storage**

Workflows are automatically saved using Local Storage.
Reloading the page restores the previous workflow.

**🔹 Light / Dark Mode**

Switch between light and dark UI themes.

**🛠 Tech Stack**

Frontend:
   React
   TypeScript
   React Flow (workflow visualization)
State Management:
   Zustand
Build Tool:
  Vite
