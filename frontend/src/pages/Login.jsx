import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import rectangleImg from "../image/Rectangle 9637.png";
import { userApi } from "../api/userApi";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) return;

    try {
      setLoginError(""); 
      await userApi.login(data); 
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    
      if (!err.response) {
        setLoginError("Cannot connect to server. Please try again later.");
        return;
      }
    
      const status = err.response.status;
    
      if (status === 401 || status === 404) {
        setLoginError("Email or password is incorrect");
      } else {
        const errorMsg = err.response.data?.error || "An unexpected error occurred";
        setLoginError(errorMsg);
      }
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8 shadow-lg rounded-lg border border-gray-300">
      {/* image and form */}
      <div className="flex flex-col md:flex-row w-[1000px] h-full md:h-[700px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">

        {/* image */}
        <div
          className="hidden md:block w-full md:w-1/2 h-[250px] md:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${rectangleImg})` }}
        ></div>

        {/* form */}
        <div className="w-full md:w-1/2 p-9 flex flex-col justify-center">
          <div className="text-8xl font-bold font-monoton text-[#6837DE] text-center mb-3">
            A
          </div>
          <div className="text-2xl font-bold font-poppins text-gray-700 text-center mb-3">
            Login to your Account
          </div>
          <div className="text-sm font-poppins text-gray-600 text-center mb-3">
            See what is going on your project
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm">
                Email
              </label>
              <input
                type="text"
                placeholder="Sorasit@mail.com"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {loginError && (
                <p className="text-red-500 text-sm mt-1">{loginError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input type="checkbox" {...register("rememberMe")} className="mr-2" />
              <label className="font-poppins text-gray-600 text-sm">Remember Me</label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#6837DE] text-white py-2 rounded-lg hover:bg-[#572BC0] transition mb-1 mt-1"
            >
              <div className="font-bold font-poppins text-center">Login</div>
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-4 text-gray-600">
            Not Registered Yet?{" "}
            <Link
              to="/register"
              className="text-[#572BC0] font-semibold underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
