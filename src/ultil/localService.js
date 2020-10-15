const localService = {
  addToLocal: (data) => {
    localStorage.setItem("todoList", JSON.stringify(data));
  },
  getTodo: () => {
    const dataTodo = localStorage.getItem("todoList");
    if (dataTodo) {
      return JSON.parse(dataTodo);
    } else {
      return [];
    }
  },
};

export default localService;
