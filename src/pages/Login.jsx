import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import rectangleImg from "../image/Rectangle 9637.png"; 

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    console.log("✅ Logged in Data:", data);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/*image and form*/}
      <div className="flex w-[1000px] h-[700px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${rectangleImg})` }}
        ></div>

        {/*form*/}
        <div className="w-1/2 p-9 mt-8">
        <div className="text-8xl font-bold font-monoton text-[#6837DE] text-center mb-3">
          A
        </div>
        <div className="text-2xl font-bold font-poppins text-gray-700 text-center mb-3">
          Login to your Account
        </div>
        <div className=" text-sm font-poppins text-gray-600 text-center mb-3">
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
          <Link to="/register" className="text-[#572BC0] font-semibold hover:underline underline">
            Create an account
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
