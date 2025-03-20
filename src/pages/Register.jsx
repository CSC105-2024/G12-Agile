import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Register = () => {
  
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
    Swal.fire({
      title: "Registration Successful!",
      text: "You have successfully registered.",
      icon: "success",
      confirmButtonText: "Continue",
      confirmButtonColor: '#6837DE',
    }).then(() => {
      navigate("/login"); 
    });
    console.log("✅ Registered Data:", data);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <div className="text-8xl font-bold font-monoton text-[#6837DE] text-center mb-3">
          A
        </div>
        <div className="text-2xl font-bold font-poppins text-gray-700 text-center mb-3">
          Create your Account
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Firstname
            </label>
            <input
              type="text"
              placeholder="Firstname"
              {...register("firstname", { required: "Firstname is required" })}
              className="placeholder-gray-300 font-poppins w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1  focus:ring-purple-500"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Lastname
            </label>
            <input
              type="text"
              placeholder="Lastname"
              {...register("lastname", { required: "Lastname is required" })}
              className="placeholder-gray-300 font-poppins w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1  focus:ring-purple-500"
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              E-mail
            </label>
            <input
              type="text"
              placeholder="Sorasit@mail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="placeholder-gray-300 font-poppins w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1  focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="placeholder-gray-300 font-poppins w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1  focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Confirm Password
            </label>
            <input 
              type="password"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
              })}
              className="placeholder-gray-300 font-poppins w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1  focus:ring-purple-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              Role
            </label>
            <div className="relative">
              <select {...register("role", { required: "Please select a role" })} className="w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500">
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="Dev">Developer</option>
                <option value="PM">Project Manager</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              <div className="text-gray-400 absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6837DE] text-white py-2 rounded-lg hover:bg-[#572BC0] transition"
          >
            <div className="font-bold font-poppins text-center ">Register</div>
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Do you already have an account?{"  "}
          <Link
            to="/login"
            className="text-[#6837DE] font-semibold hover:underline underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
