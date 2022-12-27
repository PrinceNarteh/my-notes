import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import login from "../../assets/images/login.jpg";
import InputField from "../../components/InputField";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", { ...data, redirect: false });
    if (!res?.ok) {
      setError("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-full bg-white px-5 flex justify-center items-center">
      <div className="bg-gray-100 max-w-4xl mx-auto w-full min-h-96 grid grid-cols-1 md:grid-cols-3  shadow-lg rounded-md overflow-hidden p-5">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={login}
            alt="Taking notes image"
            className="w-full object-cover"
            fill={true}
          />
        </div>
        <div className="ml-5 col-span-2">
          <h3 className="text-3xl font-bold text-slate-700">Login</h3>
          <p className="my-2 text-slate-500">Enter your credentials to login</p>
          {error && <p className="text-red-500 text-center py-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <button className="w-full bg-slate-700 text-white py-2 rounded mt-2">
              Login
            </button>
          </form>
          <p className="mt-2 text-slate-600 text-center">
            Don't have an account?
            <Link href={"/auth/register"} className="text-blue-500">
              {" "}
              Register
            </Link>{" "}
            Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
