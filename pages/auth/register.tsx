import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import register from "../../assets/images/register.jpg";
import InputField from "../../components/InputField";
import { httpClient } from "../../services/httpClient";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      return setErrors(["Passwords do not match"]);
    }

    try {
      await httpClient.post("/auth/register", state);
      toast.success("Registration successful");
      router.push("/auth/login");
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };

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
          <ToastContainer />
          <h3 className="text-3xl font-bold text-slate-700">Register</h3>
          <p className="my-2 text-slate-500">
            Provide your details for get registered.
          </p>

          {errors.length > 0 && (
            <ul className="my-2 list-disc ml-10">
              {errors.map((error, idx) => (
                <li key={idx} className="text-red-500">
                  {error}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-2 ">
              <InputField
                label="First Name"
                name="firstName"
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <InputField
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
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
