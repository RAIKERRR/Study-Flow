import ReactFlow, { Background, Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../store/useWorkflowStore";

import TriggerNode from "../nodes/TriggerNode";
import ConditionNode from "../nodes/ConditionNode";
import ActionNode from "../nodes/ActionNode";

const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
};

export default function FlowCanvas() {

  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);

  const runningNode = useWorkflowStore((s) => s.runningNode);

  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const onConnect = useWorkflowStore((s) => s.onConnect);

  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);

  /* ---------- EDGE ANIMATION ---------- */

  const animatedEdges = edges.map((edge) => ({
    ...edge,
    animated: runningNode !== null
  }));

  return (
    <div className="canvas">

      <ReactFlowProvider>

        <ReactFlow
          nodes={nodes}
          edges={animatedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView

          onNodeClick={(event, node) => {
            setSelectedNode(node);
          }}
        >

          <Background gap={30} color="#444" />
          <Controls />

        </ReactFlow>

      </ReactFlowProvider>

    </div>
  );
}