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

function listTodos(): void {
  const todos = getTodos();
  todos.forEach((todo) => {
    console.log(`${todo.id}: ${todo.task}`);
  });
}

function addTodo(task: string): void {
  const todos = getTodos();
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  todos.push({ id, task });
  saveTodos(todos);
  console.log("added item: ", task);
}

function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(todosPath, JSON.stringify(todos));
}

function removeTodo(id: number): void {
  const todos = getTodos();
  const filteredTodos = todos.filter((x) => x.id !== id);
  saveTodos(filteredTodos);
  console.log(`Removed item with id: `, id);
}

function cliError(): void {
  console.log("CLI command failed");
}

function cli(): void {
  const command = process.argv[2];
  const options = process.argv.slice(3);

  switch (command) {
    case "--help":
      if (!options.length) {
        cliError();
      } else {
        console.log("to add a todo item run: add item");
        console.log("to remove a todo item with id run: done id");
        console.log("to list all todo item run: list");
      }
      break;
    case "add":
      if (options.length === 1) {
        addTodo(options[0]);
      } else {
        cliError();
      }
      break;
    case "remove":
      if (options.length === 1) {
        removeTodo(parseInt(options[0]));
      } else {
        cliError();
      }
      break;
    case "list":
      listTodos();
      break;
  }
}

cli();
