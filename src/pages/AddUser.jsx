import React, { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock,Type, Hash } from "lucide-react";
import { Helmet } from "react-helmet-async";
import API from "../lib/api";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    emp_code: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await API.post("/api/auth/create-user", formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 201) {
        console.log("User added successfully", response.data);
        alert("User added successfully");
        navigate("/dashboard");
      }

      setFormData({
        name: "",
        emp_code: "",
        title: "",
      });
    } catch (error) {
      console.error(
        "Error while submitting user:",
        error.response?.data || error.message
      );
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Celagenex | Add User</title>
        <meta name="User Add" content="Eco Stay Add User!" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Add New User
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter name"
            required
          />
        </div>

        {/* Employee ID */}
        <div className="flex flex-col">
          <label htmlFor="emp_code" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-400" />
            Employee Id
          </label>
          <input
            type="number"
            name="emp_code"
            id="emp_code"
            value={formData.emp_code}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter Employee Id"
            required
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Type className="h-4 w-4 text-gray-400" />
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter Title"
            required
          />
        </div>

        {/* Role */}
        {/* <div className="flex flex-col">
          <label htmlFor="role" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Home className="h-4 w-4 text-gray-400" />
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            {Roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 w-full bg-black hover:bg-gray-900 text-white rounded-lg cursor-pointer"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
