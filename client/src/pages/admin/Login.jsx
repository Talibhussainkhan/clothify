import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../store/AuthSlice/adminAuth";

const Login = () => {
     

    const [email, setEmail] = useState('clothify@admin.com');
    const [password, setPassword] = useState('admin@1234');
    const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(signInStart());
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if(data.success === false){
            toast.error(data.message);
            dispatch(signInFailure());
            return
        }
        dispatch(signInSuccess());
        toast.success(data.message);
    } catch (error) {
        dispatch(signInFailure());
        toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white flex flex-col gap-4"
      >
        <h1 className="text-3xl text-center text-slate-700">Admin Login</h1>
        <div className="flex flex-col gap-1">
          <p className="text-xl">Admin Email :</p>
          <input
            type="email"
            className="p-3 rounded border border-gray-400 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl">Admin Password :</p>
          <input
            type="password"
            className="p-3 rounded border border-gray-400 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-slate-700 text-white p-3 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
