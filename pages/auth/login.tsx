import Image from "next/image";
import Link from "next/link";
import React from "react";
import note_taking from "../../assets/images/taking_notes.png";
import InputField from "../../components/InputField";

const Login = () => {
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <div className="bg-gray-100 max-w-3xl mx-auto w-full min-h-96 grid grid-cols-2 shadow-lg rounded-md overflow-hidden p-5">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={note_taking}
            alt="Taking notes image"
            className="w-full object-cover"
            fill={true}
          />
        </div>
        <div className="p-10">
          <h3 className="text-3xl font-bold text-slate-700">Login</h3>
          <p className="my-2 text-slate-500">Enter your credentials to login</p>
          <form>
            <InputField label="Email" type="email" />
            <InputField label="Password" type="password" />
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
