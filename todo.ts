import fs from "fs";
const todosPath = "todos.json";

type Todo = {
  id: number;
  task: string;
};

function getTodos(): Todo[] {
  if (!fs.existsSync(todosPath)) {
    return [];
  }
  const data = fs.readFileSync(todosPath);
  return JSON.parse(data.toString()) as Todo[];
}
