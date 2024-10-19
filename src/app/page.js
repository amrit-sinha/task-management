import { initialTasks } from "./data";
import TaskList from "./components/TaskList";

/**
 * Initial task is loaded here using SSR
 */
export default function Home() {
  return (
    <main className="container">
      <h1>Task Management</h1>
      <TaskList initialTasks={initialTasks} />
    </main>
  );
}
