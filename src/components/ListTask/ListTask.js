import React, { useState } from "react";
import localService from "../../ultil/localService";
import NewTask from "../AddTask/AddTask";
import { Row, Col, Input, Checkbox } from "antd";
import "./style.scss";
const { addToLocal } = localService;
function ListTask(props) {
  const { listTodo, setListTodo, setSearchTask, searchTask } = props;
  const [todoIndex, setTodoIndex] = useState({
    arrTaskCheck: [],
  });
  const [isShowDetail, setShowDetail] = useState(null);
  const { arrTaskCheck } = todoIndex;
  const handleCheckTask = (e, taskIndex) => {
    const isChecked = e.target.checked;
    let newListTodo = [...listTodo];
    let newTasksCheck = [...arrTaskCheck];
    newListTodo[taskIndex].isComplete = isChecked;
    if (isChecked) {
      newTasksCheck = [...arrTaskCheck, taskIndex];
    } else {
      newTasksCheck = newTasksCheck.filter((val) => val !== taskIndex);
      addToLocal(newListTodo);
    }
    setListTodo(newListTodo);
    setTodoIndex({
      ...todoIndex,
      arrTaskCheck: newTasksCheck,
    });
    // addTodo(newListTodo);
  };
  const saveCheckTodo = () => {
    addToLocal(listTodo);
    setTodoIndex({
      ...todoIndex,
      arrTaskCheck: [],
    });
  };
  const removeTaskCheck = () => {
    let newListTodo = [];
    arrTaskCheck.map((valCheck) => {
      newListTodo = [...listTodo].filter(
        (valTodo, index) => valCheck !== index
      );
    });
    setTodoIndex({
      ...todoIndex,
      arrTaskCheck: [],
    });
    setListTodo(newListTodo);
    addToLocal(newListTodo);
  };
  const removeTask = (taskIndex) => {
    let newListTodo = [...listTodo].filter((val, index) => index !== taskIndex);
    setListTodo(newListTodo);
    addToLocal(newListTodo);
  };
  const getSearchTask = (e) => {
    setSearchTask(e.target.value);
    setShowDetail(null);
  };
  const printListTodo = listTodo.map((val, index) => (
    <div className="task" key={val.id}>
      <Row className="controls-task" justify="space-between">
        <Col sm={{ span: 14 }} span={24}>
          <Checkbox
            onChange={(e) => handleCheckTask(e, index)}
            checked={val.isComplete}
          >
            <span className="name-task">{val.name}</span>
          </Checkbox>
        </Col>
        <Col sm={{ span: 10 }} span={24}>
          <button
            size="small"
            className="btn-task btn-detail"
            onClick={() => setShowDetail(val.id)}
          >
            Detail
          </button>
          <button
            size="small"
            className="btn-task btn-rm"
            onClick={() => removeTask(index)}
          >
            Remove
          </button>
        </Col>
      </Row>
      <div
        className={isShowDetail === val.id ? "detail-task" : "hide-detail-task"}
      >
        <NewTask
          isDetail={true}
          todoIndex={val}
          taskIndex={index}
          listTodo={listTodo}
          setListTodo={setListTodo}
          setShowDetail={setShowDetail}
        />
      </div>
    </div>
  ));
  return (
    <Col md={{ span: 12 }} span={24} className="list-task">
      <Row justify="space-between" className="search-task">
        <h2>To Do List</h2>
        <Input
          placeholder="Search task..."
          value={searchTask}
          onChange={getSearchTask}
        />
      </Row>
      {listTodo.length > 0 ? printListTodo : <i>Tasks is emtry</i>}
      {arrTaskCheck.length > 0 && (
        <Row className="task-action" justify="space-between">
          <p>Bulk Action:</p>
          <div>
            <button
              className="btn-action btn-action-done"
              onClick={saveCheckTodo}
            >
              Done
            </button>
            <button
              className="btn-action btn-action-rm"
              onClick={removeTaskCheck}
            >
              Remove
            </button>
          </div>
        </Row>
      )}
    </Col>
  );
}

export default ListTask;
