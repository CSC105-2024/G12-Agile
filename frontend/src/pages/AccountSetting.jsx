import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";

const AccountSetting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getCurrentUser();
        const user = res.data;

        setValue("firstname", user.firstname);
        setValue("lastname", user.lastname);
        setValue("email", user.email);

        setLoading(false);
      } catch (err) {
        console.error("Failed to load user:", err);
        Swal.fire("Error", "Failed to load user data", "error");
      }
    };

    fetchUser();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await userApi.getCurrentUser();
      const userId = res.data.id;

      const updatePayload = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      };

      if (data.password) {
        updatePayload.password = data.password;
      }

      await userApi.update(userId, updatePayload);

      Swal.fire("Account Updated!", "Your account details have been updated successfully.", "success").then(() => {
        navigate("/dashboard");
      });
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (loading) return <div className="text-center mt-32">Loading...</div>;

  return (
    <div className="flex items-center justify-center rounded-b-lg ">
      <div className="w-full max-w-6xl bg-white p-10 shadow-lg rounded-lg border border-gray-300 mt-28">
        <div className="w-full text-center mb-5">
          <span className="font-poppins inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
            Account Setting
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Firstname </label>
              <input
                type="text"
                {...register("firstname", { required: "Firstname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {errors.firstname && <p className="text-red-500 text-sm font-poppins">{errors.firstname.message}</p>}
            </div>
            <div>
              <label className="font-poppins font-semibold text-gray-400 text-sm"> Lastname </label>
              <input
                type="text"
                {...register("lastname", { required: "Lastname is required" })}
                className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {errors.lastname && <p className="text-red-500 text-sm font-poppins">{errors.lastname.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> E-mail </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm">
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              {...register("password", {
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-poppins font-semibold text-gray-400 text-sm"> Confirm Password </label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) => {
                  const pw = getValues("password");
                  if (pw && value !== pw) return "Passwords don't match";
                },
              })}
              className="placeholder-gray-400 font-poppins w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm font-poppins">{errors.confirmPassword.message}</p>}
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
              className="w-full max-w-sm border border-gray-400 bg-white text-[#6837DE] py-3 rounded-lg hover:bg-gray-100 transition font-bold font-poppins"
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
