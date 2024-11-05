import { useNavigate, useParams } from "react-router-dom";
import useForm from "../hooks/useForm";
import { addEmployee, getEmployeeById } from "./services/localstorage";
import { useEffect, useState } from "react";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);

  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      const employee = getEmployeeById(id);
      setForm(employee);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValues.email)) {
      alert("Invalid email format.");
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(inputValues.phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }
    
    addEmployee(inputValues);
    setShowAlert(true);
    resetForm();
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div>
      <div className="d-flex my-5 justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          🡸
        </button>
        <h1>{id ? "Edit" : "Create"} Employee</h1>
        <div />
      </div>
      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              value={inputValues.name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="name"
              placeholder="Your name here!"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              type="email"
              className="form-control"
              id="email"
              placeholder="Your email here!"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="address">
              Address
            </label>
            <input
              name="address"
              value={inputValues.address}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="address"
              placeholder="Your Address here!"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              name="phone"
              value={inputValues.phone}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="phone"
              placeholder="Your Phone number here!"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-info">
              {id ? "Update" : "Add"} Employee
            </button>
          </div>
        </form>
      </div>
      {showAlert && (
        <div className="px-5">
          <div className="alert alert-info text-white" role="alert">
            Success! Employee {id ? "updated" : "added"} successfully!
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeForm;
