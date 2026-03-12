import { useEffect,useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

export default function StudentList(){

 const [students,setStudents] = useState([]);

 const fetchStudents = async () => {

  const token = localStorage.getItem("token");

  const res = await API.get("/students",{
   headers:{
    Authorization:`Bearer ${token}`
   }
  });

  setStudents(res.data);

 };

 useEffect(()=>{
  fetchStudents();
 },[]);

 return(

 <DashboardLayout>

 <h2 className="text-2xl font-bold mb-4">
  Students
 </h2>

 <table className="w-full bg-white shadow">

  <thead className="bg-gray-200">

   <tr>

    <th className="p-2">Reg No</th>
    <th>Name</th>
    <th>Course</th>
    <th>Phone</th>

   </tr>

  </thead>

  <tbody>

   {students.map(student=>(
    <tr key={student._id} className="border">

     <td className="p-2">{student.regNumber}</td>
     <td>{student.firstName} {student.lastName}</td>
     <td>{student.course}</td>
     <td>{student.phone}</td>

    </tr>
   ))}

  </tbody>

 </table>

 </DashboardLayout>

 );

}