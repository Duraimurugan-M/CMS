import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

export default function AddStudent() {

  const [form,setForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    course:"",
    parentName:"",
    parentPhone:"",
    address:"",
    dob:""
  });

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    try{

      await API.post("/students", form, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      alert("Student Added");

    }catch(err){
      alert(err.response?.data?.message);
    }

  };

  return (

    <DashboardLayout>

      <h2 className="text-xl font-bold mb-4">
        Add Student
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 shadow rounded"
      >

        <input name="firstName" placeholder="First Name" className="border p-2" onChange={handleChange}/>
        <input name="lastName" placeholder="Last Name" className="border p-2" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="border p-2" onChange={handleChange}/>
        <input name="phone" placeholder="Phone" className="border p-2" onChange={handleChange}/>
        <input name="course" placeholder="Course" className="border p-2" onChange={handleChange}/>
        <input name="dob" type="date" className="border p-2" onChange={handleChange}/>
        <input name="parentName" placeholder="Parent Name" className="border p-2" onChange={handleChange}/>
        <input name="parentPhone" placeholder="Parent Phone" className="border p-2" onChange={handleChange}/>
        <input name="address" placeholder="Address" className="border p-2 col-span-2" onChange={handleChange}/>

        <button className="bg-blue-600 text-white py-2 rounded col-span-2">
          Save Student
        </button>

      </form>

    </DashboardLayout>

  );
}