import React from "react";
import moment from "moment";
import localService from "../../ultil/localService";
import { Row, Col, Input, DatePicker, Select, Button } from "antd";
import "./style.scss";
const { addToLocal } = localService;
const { TextArea } = Input;
const { Option } = Select;
const dateFormat = "DD-MM-YYYY";
const listPrior = ["High", "Normal", "Low"];
function NewTask(props) {
  const {
    listTodo,
    setListTodo,
    todoIndex,
    setTodoIndex,
    isDetail,
    taskIndex,
    setShowDetail,
  } = props;
  const { name, des, date, prior } = todoIndex;
  const getNameAndDes = (e) => {
    const { name, value } = e.target;
    if (isDetail) {
      const newListTodo = [...listTodo];
      newListTodo[taskIndex][name] = value;
      setListTodo(newListTodo);
    } else {
      setTodoIndex({ ...todoIndex, [name]: value });
    }
  };
  const getDate = (valDate, dateString) => {
    if (isDetail) {
      const newListTodo = [...listTodo];
      newListTodo[taskIndex].date = dateString;
      setListTodo(newListTodo);
    } else {
      setTodoIndex({ ...todoIndex, date: dateString });
    }
  };
  const getPrior = (val) => {
    if (isDetail) {
      const newListTodo = [...listTodo];
      newListTodo[taskIndex].prior = val;
      setListTodo(newListTodo);
    } else {
      setTodoIndex({ ...todoIndex, prior: val });
    }
  };
  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };
  const addTodo = async () => {
    if (isDetail) {
      setListTodo(listTodo);
      addToLocal(listTodo);
      setShowDetail(null);
    } else {
      if (name !== "") {
        addToLocal([{ ...todoIndex, id: Date.now() }, ...listTodo]);
        setListTodo([{ ...todoIndex, id: Date.now() }, ...listTodo]);
        setTodoIndex({ ...todoIndex, name: "", des: "" });
      } else {
        window.alert("Check task name again!");
      }
    }
  };
  const printPrior = listPrior.map((val, index) => (
    <Option value={val} key={index}>
      {val}
    </Option>
  ));
  return (
    <Col
      span={isDetail ? 24 : 24}
      md={{ span: isDetail ? 24 : 8 }}
      className={isDetail ? "new-task edit-task" : "new-task"}
    >
      {!isDetail && <h2>New Task</h2>}
      <Input
        placeholder="Add new task..."
        value={name}
        name="name"
        onChange={getNameAndDes}
      ></Input>
      <TextArea value={des} name="des" onChange={getNameAndDes} />
      <Row justify="space-between">
        <Col span={11}>
          <DatePicker
            value={moment(date, dateFormat)}
            format={dateFormat}
            style={{ width: "100%" }}
            onChange={getDate}
            disabledDate={disabledDate}
          />
        </Col>
        <Col span={11}>
          <Select style={{ width: "100%" }} value={prior} onChange={getPrior}>
            {printPrior}
          </Select>
        </Col>
      </Row>
      <Button onClick={addTodo} className="btn-add-todo">
        {isDetail ? "UPDATE" : "ADD"}
      </Button>
    </Col>
  );
}

export default NewTask;
