import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AccountSetting = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "Sorasit",
      lastname: "Laiget",
      email: "SorasitLaiget@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Account Updated!",
      text: "Your account details have been updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#6837DE",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard"); 
      }
    });
    console.log("✅ Updated Data:", data);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-b-lg">
      <div className="w-full max-w-6xl bg-white p-10 shadow-lg rounded-lg border border-gray-300 mt-10.5">
        <div className="w-full text-center mb-5">
          <span className="font-poppins inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
            Account Setting
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Firstname </label>
              <input
                type="text"
                {...register("firstname", { required: "Firstname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Lastname </label>
              <input
                type="text"
                {...register("lastname", { required: "Lastname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> E-mail </label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> Password </label>
            <input
              type="password"
              {...register("password", {
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> Confirm Password </label>
            <input 
              type="password"
              {...register("confirmPassword", {
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords don't match",
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-center">
          <button
            type="submit"
            className="w-full max-w-sm bg-[#6837DE] text-white py-3 rounded-lg hover:bg-[#572BC0] transition font-bold font-poppins mt-4"
          >
            Save
          </button>
          </div>
          <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className=" w-full max-w-sm border border-gray-400 bg-white text-[#6837DE] py-3 rounded-lg hover:bg-gray-100 transition font-bold font-poppins"
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
