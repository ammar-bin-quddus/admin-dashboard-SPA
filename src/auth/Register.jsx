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

    const userSignUpData = {
      ...remainData,
      avatarUrl,
    };

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

  //console.log(registerData);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };
  //console.log(isShow)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <main className="flex-grow flex justify-center items-center">
        <div className="card w-full max-w-lg bg-white shadow-xl border border-gray-200 rounded-xl p-8">
          <h2 className="text-center text-2xl font-extrabold text-gray-800 underline">
            Register Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* User Name */}
            <div className="form-control space-y-1">
              <label className="label font-medium text-gray-700">
                Your Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            {/* Avatar */}
            <div className="form-control space-y-1">
              <label className="block font-medium mb-1">Avatar</label>
              <input
                {...register("avatarUrl", {
                    required: true,
                  })}
                type="text"
                className="file-input text-sm text-gray-500"
              />
              {errors.avatarUrl && (
                <p className="text-red-500 text-sm">"Photo is required"</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control space-y-1">
              <label className="label font-medium text-gray-700">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring focus:ring-indigo-200"
                required
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            {/* Password */}
            <div className="form-control relative space-y-1">
              <label className="label font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password", {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                })}
                type={isShow ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:ring focus:ring-indigo-200"
                required
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Must have an Uppercase letter and Lowercase letter in the
                  password also length must be at least 6 character
                </span>
              )}
              <div
                onClick={handleShowPassword}
                className="absolute text-xl text-gray-600 cursor-pointer right-3 top-10"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control space-y-1">
              <label className="block font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value={"Register"}
                className="btn btn-neutral w-full bg-indigo-600 text-white hover:bg-indigo-700"
              />
            </div>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already Have An Account?{" "}
            <Link to="/login" className="text-indigo-500 font-medium">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
