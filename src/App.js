import React, { useState, useEffect } from "react";
import moment from "moment";
import NewTask from "./components/AddTask/AddTask";
import ListTask from "./components/ListTask/ListTask";
import { Row } from "antd";
import localService from "./ultil/localService";
import "./App.scss";
const { getTodo } = localService;
function App() {
  const [listTodo, setListTodo] = useState([]);
  const [todoIndex, setTodoIndex] = useState({
    id: null,
    name: "",
    des: "",
    date: moment().format("DD-MM-YYYY"),
    prior: "Normal",
    isComplete: false,
  });
  const [searchTask, setSearchTask] = useState("");
  useEffect(() => {
    const newListTodo = getTodo().filter(
      (val) =>
        val.name
          .toLowerCase()
          .split(" ")
          .join("")
          .indexOf(searchTask.toLowerCase().split(" ").join("")) !== -1
    );
    setListTodo(newListTodo);
  }, [searchTask]);
  return (
    <Row justify="center" className="App">
      <NewTask
        listTodo={listTodo}
        setListTodo={setListTodo}
        todoIndex={todoIndex}
        setTodoIndex={setTodoIndex}
        isDetail={false}
      />
      <ListTask
        listTodo={listTodo}
        setListTodo={setListTodo}
        todoIndex={todoIndex}
        setTodoIndex={setTodoIndex}
        searchTask={searchTask}
        setSearchTask={setSearchTask}
      />
    </Row>
  );
}

export default App;
