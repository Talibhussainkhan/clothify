import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
