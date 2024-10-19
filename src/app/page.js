import { initialTasks } from "./data";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main className="container">
      <h1>Task Management</h1>
      <TaskList initialTasks={initialTasks} />
    </main>
  );
}
