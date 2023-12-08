import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Table from './components/Table.js'
import AddBooks from './components/InputForAdd.js'
import Edit from './Button/EditButton.js'
import "./Style.css"

function AppRouter() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Table />} />
        <Route path='/create' element={<AddBooks />} />
        <Route path='/update/:id' element={<Edit />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;



// import React, { useState } from "react";
// import Table from "./components/Table";
// import AddBooks from "./components/InputForAdd";

// function App() {
//   const [modalOpen, setModalOpen] = useState(false);

   
//   return (
//     <div className="App">
//       <Table />
//       <button className="btn" onClick={() => setModalOpen(true)}>
//         Add
//       </button>
//       {modalOpen && (
//         <AddBooks
//           closeModal={() => {
//             setModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }
// export default App;
