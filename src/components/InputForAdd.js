import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import isValidISBN from "./validation";


export default function AddBooks() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "",
    isbn: "",
    createdAt: "",
    modifiedEditedAt: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    author: "",
    category: "",
    isbn: "",
    createdAt: "",
    modifiedEditedAt: "",
  });

  const categories = ["Poetry", "Fiction", "Romance", "Mystery"];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(isValidISBN(formData))

    formData.createdAt = format(new Date(), "d MMMM yyyy, h:mma");
    formData.modifiedEditedAt = formData.createdAt;

    axios
      .post("http://localhost:3005/posts", formData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="container w-100 border bg-light p-5">
        <form noValidate className="form-for-book" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p>{formErrors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="author">Author name</label>
            <input
              className="form-control"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
            {formErrors.author && <p>{formErrors.author}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              defaultValue="Select Category"
              onChange={handleChange}
            >
              <option disabled hidden>
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {formErrors.category && <p>{formErrors.category}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              className="form-control"
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
           {formErrors.isbn && <p>{formErrors.isbn}</p>}
          </div>
          <button
            type="submit"
            id="add-book"
            className="btn btn-success button- add"
          >
            Add book
          </button>
        </form>
      </div>
    </div>
  );
}
