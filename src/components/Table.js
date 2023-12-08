import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Table() {
  const [column, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [isDeactivated, setIsDeactivated] = useState(false);
  
  const toggleDeactivation = () => {
    setIsDeactivated(!isDeactivated);
  };

  const navigate = useNavigate();

  function handleSubmit (id){
    const delet = window.confirm('Do you wanna to delete?');

    if(delet){
      axios.delete('http://localhost:3005/posts/' + id)
      .then(res => {
        setIdCounter(idCounter - 1);
        navigate('/');
        axios.get("http://localhost:3005/posts").then((res) => {
          setRecords(res.data.map(record => ({
            ...record,
            isLinkDisabled: false,
          })))
      }).catch(err => console.log(err))
    })
  }}

  useEffect(() => {

    axios.get("http://localhost:3005/posts").then((res) => {
      setColumns(Object.keys(res.data[0]).filter((column) => column !== "id"));
      setRecords(res.data.map(record => ({
        ...record,
        isLinkDisabled:false,
      })));
      const maxId = Math.max(...res.data.map((record) => record.id));
      setIdCounter(maxId + 1);
    });
  }, []);

  return (
    <div className="container mt-7">
      <div className="text-end">
        <Link to="create" className="btn btn-primary">
          Add +
        </Link>
      </div>
      <table className="table table-responsive-m">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Created At:</th>
            <th>Edited At:</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.author}</td>
              <td>{d.category}</td>
              <td>{d.isbn}</td>
              <td>{d.createdAt}</td>
              <td>{d.modifiedEditedAt}</td>
              <td className="buttonBox">
                 <Link to={`/update/${d.id}`} disabled={isDeactivated} className={`btn btn-primary`}>Edit</Link>
                 <button onClick={toggleDeactivation} className="btn btn-sm btn-success">Deactivate/Re-Activate</button>
                 <button onClick={() => handleSubmit(d.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
