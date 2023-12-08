import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const categories = ["Poetry", "Fiction", "Romance", "Mystery"];

  useEffect(() => {
    axios
      .get("http://localhost:3005/posts/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    // if (!data.name || !data.author || !data.category || !data.isbn) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }
    const formattedDate = format(new Date(), "d MMMM yyyy, h:mma");
    const updatedData = { ...data, modifiedEditedAt: formattedDate };

    
    axios.put("http://localhost:3005/posts/" + id, updatedData).then((res) => {
      alert("Data Edit Successfully!");
      navigate("/");
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form className="form-for-book" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ID:</label>
            <input
              disabled
              className="form-control"
              type="text"
              name="id"
              value={data.id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author name</label>
            <input
              className="form-control"
              type="text"
              name="author"
              value={data.author}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              value={data.category}
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
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              className="form-control"
              type="text"
              name="isbn"
              value={data.isbn}
              onChange={handleChange}
            />
          </div>
           

          <button type="submit" id="add-book" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
