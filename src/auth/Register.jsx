import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Register = () => {
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const { handleRegister, setLoading, updateUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { password, confirmPassword, ...remainData } = data;

    const userSignUpData = { ...remainData };

    console.log(userSignUpData);

    handleRegister(data.email, password)
      .then((res) => {
        updateUser({
          displayName: data.name,
          photoURL: data.avatarUrl,
        })
          .then((res) => toast.success("Registration Successful"))
          .catch((err) => toast.error(err.code));
        setLoading(false);
        navigate("/");

        reset();
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };
  //console.log(isShow)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 py-8">
      <main className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-lg bg-white shadow-lg border border-gray-200 rounded-xl p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 underline">
            Register Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* User Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-medium">Your Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
                required
              />
            </div>

            {/* Avatar */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-medium">Avatar</label>
              <input
                {...register("avatarUrl", { required: true })}
                type="text"
                placeholder="Enter avatar URL"
                className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
              />
              {errors.avatarUrl && (
                <p className="text-red-500 text-sm">Photo is required</p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div className="flex flex-col space-y-1">
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border-gray-300 focus:ring-2 focus:ring-gray-800 rounded-lg px-3 py-2 text-gray-800 outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-800 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
