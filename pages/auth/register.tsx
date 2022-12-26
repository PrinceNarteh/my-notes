import Image from "next/image";
import Link from "next/link";
import React from "react";
import register from "../../assets/images/register.jpg";
import InputField from "../../components/InputField";

const Register = () => {
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center px-5">
      <div className="bg-gray-100 max-w-4xl mx-auto w-full min-h-96 grid grid-cols-1 md:grid-cols-3 shadow-lg rounded-md overflow-hidden p-5">
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={register}
            alt="Taking notes image"
            className="w-full object-cover"
            fill={true}
          />
        </div>
        <div className="ml-5 col-span-2">
          <h3 className="text-3xl font-bold text-slate-700">Register</h3>
          <p className="my-2 text-slate-500">
            Provide your details for get registered.
          </p>
          <form>
            <div className="flex flex-col md:flex-row gap-2 ">
              <InputField label="First Name" />
              <InputField label="Last Name" />
            </div>
            <InputField label="Email" type="email" />
            <InputField label="Password" type="password" />
            <InputField label="Confirm Password" type="password" />
            <button className="w-full bg-slate-700 text-white py-2 rounded mt-2">
              Register
            </button>
          </form>
          <p className="mt-2 text-slate-600 text-center">
            Already have an account?
            <Link href={"/auth/login"} className="text-blue-500">
              {" "}
              Login
            </Link>{" "}
            Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
