const localService = {
  addToLocal: (data) => {
    localStorage.setItem("todoList", JSON.stringify(data));
  },
  getTodo: () => {
    const dataTodo = localStorage.getItem("todoList");
    try {
      if (typeof JSON.parse(dataTodo) === "object") {
        return JSON.parse(dataTodo);
      } else {
        return [];
      }
    } catch {
      return [];
    }
  },
};

export default localService;
