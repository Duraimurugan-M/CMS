import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";

function App(){

 const token = localStorage.getItem("token");

 return(

 <BrowserRouter>

  <Routes>

   <Route path="/" element={<Login/>} />

   <Route path="/dashboard" element={token ? <Dashboard/> : <Login/>} />

   <Route path="/students" element={token ? <StudentList/> : <Login/>} />

   <Route path="/students/add" element={token ? <AddStudent/> : <Login/>} />

  </Routes>

 </BrowserRouter>

 );

}

export default App;