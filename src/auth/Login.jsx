import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";

const Login = () => {
  const { handleLogin, setLoading } = useContext(AuthContext);

  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  //console.log(location)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    handleLogin(data.email, data.password)
      .then((res) => {
        setLoading(false);
        reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    handleLogin(email, password)
      .then((res) => {
        setLoading(false);
        e.target.reset();
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 py-8">
      <main className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-lg bg-white shadow-lg border border-gray-200 rounded-xl p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 underline">
            Login Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="relative flex flex-col space-y-1">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                {...register("password", {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                })}
                type={isShow ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  Must have an uppercase and lowercase letter, and be at least 6
                  characters long.
                </p>
              )}
              <div
                onClick={handleShowPassword}
                className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-gray-800 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
