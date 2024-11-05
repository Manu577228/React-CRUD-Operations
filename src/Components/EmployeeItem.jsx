import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "./services/localstorage";

function EmployeeItem({ employee }) {
  const { id, name, email, address, phone } = employee;
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteEmployee(id);
    window.location.reload(); 
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>
        <div className="d-flex gap-3">
          <span
            role="button"
            className="badge bg-info"
            onClick={() => navigate(`/edit-employee/${id}`)}
          >
            Edit
          </span>
          <span role="button" className="badge bg-danger" onClick={handleDelete}>
            Delete
          </span>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeItem;
