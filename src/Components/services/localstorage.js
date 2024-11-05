import uuid from "react-uuid";

export const getListOfEmployees = () => {
  if (!localStorage["@employees"]) {
    localStorage["@employees"] = JSON.stringify([]);
  }
  return JSON.parse(localStorage["@employees"]);
};

export const getEmployeeById = (id) => {
  const employees = getListOfEmployees();
  return employees.find((employee) => employee.id === id);
};

export const addEmployee = (employee) => {
  const employees = getListOfEmployees();
  const employeeWithId = { ...employee, id: uuid() };
  employees.push(employeeWithId);
  localStorage["@employees"] = JSON.stringify(employees);
};

export const deleteEmployee = (id) => {
  const employees = getListOfEmployees();
  const updatedEmployees = employees.filter((employee) => employee.id !== id);
  localStorage["@employees"] = JSON.stringify(updatedEmployees);
};
