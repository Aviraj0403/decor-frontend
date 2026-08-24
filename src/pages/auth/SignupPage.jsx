import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, Phone, Sparkles, UserRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import Axios from "../../utils/Axios";
import authWallpaper from "../../image/category-customised-wallpapers.webp";

const logo = "/logo.png";

const fieldClass =
  "h-12 w-full rounded-md border border-[#D7D7D7] bg-white px-4 text-sm text-[#103438] outline-none transition placeholder:text-[#2D545E]/55 focus:border-[#C99665] focus:ring-2 focus:ring-[#E2B385]/35";

const SignupPage = () => {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password || !form.userName) {
      toast.error("Email, username and password are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await Axios.post("/auth/register", form, { withCredentials: true });
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      toast.success("Google signup successful");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "userName", type: "text", placeholder: "Username", icon: UserRound, required: true },
    { name: "firstName", type: "text", placeholder: "First name", icon: UserRound },
    { name: "lastName", type: "text", placeholder: "Last name", icon: UserRound },
    { name: "email", type: "email", placeholder: "Email address", icon: Mail, required: true },
    { name: "password", type: "password", placeholder: "Password", icon: Lock, required: true },
    { name: "phoneNumber", type: "text", placeholder: "Phone number", icon: Phone },
  ];

  return (
    <main className="min-h-screen bg-[#D7D7D7] px-4 py-8 text-[#103438] sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-md bg-white shadow-[0_24px_80px_rgba(16,52,56,0.14)] lg:grid-cols-[0.98fr_1.02fr]">
        <section className="flex items-center justify-center px-5 py-9 sm:px-10">
          <div className="w-full max-w-xl">
            <div className="mb-7 text-center lg:text-left">
              <Link to="/" className="mb-6 inline-flex lg:hidden">
                <img src={logo} alt="Life n Colors" className="h-12 w-auto" />
              </Link>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C99665]">Start your account</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-[#103438]">Create account</h2>
              <p className="mt-2 text-sm leading-6 text-[#2D545E]">
                Save favourites, track orders, and keep your decor projects together.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#D7D7D7] bg-white text-sm font-semibold text-[#103438] transition hover:border-[#C99665] hover:bg-[#E2B385]/15 disabled:opacity-60"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#D7D7D7]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2D545E]/70">or sign up with email</span>
              <span className="h-px flex-1 bg-[#D7D7D7]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {inputFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <label key={field.name} className="block">
                      <span className="sr-only">{field.placeholder}</span>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C99665]" />
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          disabled={isSubmitting}
                          className={`${fieldClass} pl-10`}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#2D545E] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#103438] disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create account"}
                {!isSubmitting && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#2D545E]">
              Already have an account?{" "}
              <Link to="/signin" className="font-bold text-[#C99665] hover:text-[#103438]">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="relative hidden min-h-full overflow-hidden lg:block">
          <img src={authWallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#103438]/10 via-[#103438]/20 to-[#103438]/80" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <Link to="/" className="inline-flex w-fit items-center gap-3 self-end">
              <img src={logo} alt="Life n Colors" className="h-12 w-auto rounded bg-white/90 px-2 py-1" />
            </Link>
            <div className="max-w-md">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E2B385]">
                <Sparkles size={15} /> Designed living
              </p>
              <h1 className="font-serif text-5xl font-semibold leading-tight text-white">
                Your home story starts with a single wall.
              </h1>
              <p className="mt-4 text-sm leading-6 text-white/85">
                Create an account to make shopping, support, and order tracking beautifully simple.
              </p>
            </div>
          </div>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </main>
  );
};

export default SignupPage;
