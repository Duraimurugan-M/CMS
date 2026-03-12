import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e)=>{
    e.preventDefault();

    try{
      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      alert("Login Successful");

    }catch(err){
      alert("Login Failed");
      console.error(err);
    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          CMS Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  )
}