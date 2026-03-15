import type { Node, Edge } from "reactflow";
import { useWorkflowStore } from "./useWorkflowStore";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function runStudyFlow(
  nodes: Node[],
  edges: Edge[],
  log: (msg: string) => void
) {

  const { setRunningNode } = useWorkflowStore.getState();

  log("[SYSTEM] Starting Study Workflow...");

  const trigger = nodes.find((n) => n.type === "trigger");

  if (!trigger) {
    log("[ERROR] No Study Trigger found.");
    return;
  }

  /* ---------- TRIGGER EXECUTION ---------- */

  setRunningNode(trigger.id);

  log("[TRIGGER] Study Session Started");

  await sleep(1000);

  const triggerEdge = edges.find((e) => e.source === trigger.id);

  if (!triggerEdge) {
    log("[ERROR] Trigger not connected.");
    setRunningNode(null);
    return;
  }

  const condition = nodes.find((n) => n.id === triggerEdge.target);

  if (!condition) {
    log("[ERROR] No condition found.");
    setRunningNode(null);
    return;
  }

  /* ---------- CONDITION EXECUTION ---------- */

  setRunningNode(condition.id);

  log("[TIMER] Starting Study Timer...");

  let studyTime = 0;

  for (let i = 0; i < 6; i++) {

    await sleep(700);

    studyTime += 10;

    log(`[TIMER] Study Time = ${studyTime} minutes`);

  }

  log(`[CONDITION] Checking Study Time`);

  const operator = condition.data.operator || ">";
  const minutes = condition.data.minutes || 30;

  let result = false;

  if (operator === ">") result = studyTime > minutes;
  if (operator === "<") result = studyTime < minutes;
  if (operator === "=") result = studyTime === minutes;

  log(`[CONDITION RESULT] ${studyTime} ${operator} ${minutes}`);

  if (!result) {

    log("[SYSTEM] Condition failed. Workflow stopped.");

    setRunningNode(null);

    return;

  }

  const actionEdge = edges.find((e) => e.source === condition.id);

  if (!actionEdge) {
    log("[ERROR] No action connected.");
    setRunningNode(null);
    return;
  }

  const action = nodes.find((n) => n.id === actionEdge.target);

  if (!action) {
    log("[ERROR] Action not found.");
    setRunningNode(null);
    return;
  }

  /* ---------- ACTION EXECUTION ---------- */

  setRunningNode(action.id);

  await sleep(900);

  log(`[ACTION] ${action.data.action}`);

  await sleep(600);

  setRunningNode(null);

  log("[SYSTEM] Study Workflow Completed.");
}