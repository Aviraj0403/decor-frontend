import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "../../components/OtpInput";
import { useAuth } from "../../context/AuthContext";
import authWallpaper from "../../image/category-customised-wallpapers.webp";
import Axios from "../../utils/Axios";

const logo = "/logo.png";

const inputClass =
  "h-12 w-full rounded-md border border-[#D7D7D7] bg-white px-4 text-sm text-[#103438] outline-none transition placeholder:text-[#2D545E]/55 focus:border-[#C99665] focus:ring-2 focus:ring-[#E2B385]/35";

const SignInPage = () => {
  const [loginType, setLoginType] = useState("mobile");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpEnabled, setOtpEnabled] = useState(true);

  const { login, googleLogin, sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from?.pathname ||
    location.state?.from ||
    new URLSearchParams(location.search).get("redirect") ||
    "/";

  const handleCustomSignIn = async (event) => {
    event?.preventDefault();
    if (!emailOrUsername || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        userName: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
        password,
      });
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter valid 10 digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendPhoneOTP(`+91${mobile}`, sessionId);

      if (response.bypassOtp) {
        toast.success(response.message || "Login successful");
        navigate(redirectTo, { replace: true });
        return;
      }

      setSessionId(response.sessionId);
      setOtpSent(true);
      setTimer(30);
      toast.success(response.message || "OTP sent successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!sessionId || otp.length !== 4) {
      toast.error("Please enter 4 digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyPhoneOTP(sessionId, otp);
      toast.success("Login successful");
      setOtp("");
      setOtpSent(false);
      setSessionId(null);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
      if (err?.message?.includes("expired")) {
        setOtpSent(false);
        setSessionId(null);
        setOtp("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (otp.length === 4 && otpSent && sessionId && !isSubmitting) {
      handleVerifyOTP();
    }
  }, [otp, otpSent, sessionId]);

  useEffect(() => {
    if (!otpSent || timer === 0) return undefined;
    const interval = setInterval(() => setTimer((value) => value - 1), 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  useEffect(() => {
    const fetchOtpStatus = async () => {
      try {
        const { data } = await Axios.get("/auth/otp-status");
        if (data && data.success) {
          setOtpEnabled(data.otpEnabled);
        }
      } catch (err) {
        console.error("Failed to fetch OTP status:", err);
      }
    };
    fetchOtpStatus();
  }, []);

  return (
    <main className="min-h-screen bg-[#D7D7D7] px-4 py-8 text-[#103438] sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-md bg-white shadow-[0_24px_80px_rgba(16,52,56,0.14)] lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden min-h-full overflow-hidden lg:block">
          <img src={authWallpaper} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#103438]/15 via-[#103438]/20 to-[#103438]/80" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <Link to="/" className="inline-flex w-fit items-center gap-3">
              <img src={logo} alt="Life n Colors" className="h-12 w-auto rounded bg-white/90 px-2 py-1" />
            </Link>
            <div className="max-w-md">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E2B385]">
                <Sparkles size={15} /> Curated homes
              </p>
              <h1 className="font-serif text-5xl font-semibold leading-tight text-white">
                Bring every wall closer to home.
              </h1>
              <p className="mt-4 text-sm leading-6 text-white/85">
                Sign in to view orders, save favourites, and continue designing with Life n Colors.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-9 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <Link to="/" className="mb-6 inline-flex lg:hidden">
                <img src={logo} alt="Life n Colors" className="h-12 w-auto" />
              </Link>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C99665]">Welcome back</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-[#103438]">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-[#2D545E]">
                Access your account using mobile OTP or email password.
              </p>
            </div>

            <div className="mb-7 grid grid-cols-2 rounded-md border border-[#D7D7D7] bg-[#D7D7D7]/45 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginType("mobile");
                  setOtpSent(false);
                  setOtp("");
                }}
                className={`flex h-10 items-center justify-center gap-2 rounded text-sm font-semibold transition ${
                  loginType === "mobile" ? "bg-[#103438] text-white shadow-sm" : "text-[#2D545E] hover:text-[#103438]"
                }`}
              >
                <Phone size={16} /> Phone
              </button>
              <button
                type="button"
                onClick={() => setLoginType("email")}
                className={`flex h-10 items-center justify-center gap-2 rounded text-sm font-semibold transition ${
                  loginType === "email" ? "bg-[#103438] text-white shadow-sm" : "text-[#2D545E] hover:text-[#103438]"
                }`}
              >
                <Mail size={16} /> Email
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={loginType}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {loginType === "email" && (
                  <form className="space-y-4" onSubmit={handleCustomSignIn}>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#2D545E]">
                        Email or username
                      </span>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C99665]" />
                        <input
                          type="text"
                          className={`${inputClass} pl-10`}
                          placeholder="you@example.com"
                          value={emailOrUsername}
                          onChange={(event) => setEmailOrUsername(event.target.value)}
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#2D545E]">
                        Password
                      </span>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C99665]" />
                        <input
                          type="password"
                          className={`${inputClass} pl-10`}
                          placeholder="Enter password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#2D545E] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#103438] disabled:opacity-60"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                      {!isSubmitting && <ArrowRight size={17} />}
                    </button>
                  </form>
                )}

                {loginType === "mobile" && (
                  <div className="space-y-4">
                    {!otpSent ? (
                      <>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-[#2D545E]">
                            Mobile number
                          </span>
                          <div className="flex overflow-hidden rounded-md border border-[#D7D7D7] bg-white focus-within:border-[#C99665] focus-within:ring-2 focus-within:ring-[#E2B385]/35">
                            <span className="grid h-12 w-16 place-items-center border-r border-[#D7D7D7] bg-[#E2B385]/35 text-sm font-bold text-[#103438]">
                              +91
                            </span>
                            <input
                              autoFocus
                              maxLength="10"
                              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-[#103438] outline-none placeholder:text-[#2D545E]/55"
                              placeholder="Enter 10 digit number"
                              value={mobile}
                              onChange={(event) => setMobile(event.target.value.replace(/\D/g, ""))}
                              onKeyDown={(event) => event.key === "Enter" && handleSendOTP()}
                            />
                          </div>
                        </label>

                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={isSubmitting || mobile.length !== 10}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#2D545E] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#103438] disabled:opacity-60"
                        >
                          {isSubmitting ? "Processing..." : (otpEnabled ? "Send OTP" : "Login")}
                          {!isSubmitting && <ArrowRight size={17} />}
                        </button>
                      </>
                    ) : (
                      <div className="space-y-5">
                        <div className="rounded-md border border-[#D7D7D7] bg-[#E2B385]/20 p-5 text-center">
                          <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#2D545E] text-white">
                            <ShieldCheck size={22} />
                          </div>
                          <h3 className="font-serif text-2xl font-semibold text-[#103438]">Verify OTP</h3>
                          <p className="mt-1 text-sm text-[#2D545E]">Code sent to +91 {mobile}</p>
                        </div>

                        <div className="flex justify-center">
                          <OtpInput value={otp} onChange={setOtp} />
                        </div>

                        <button
                          type="button"
                          onClick={handleVerifyOTP}
                          disabled={isSubmitting || otp.length !== 4}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#2D545E] text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#103438] disabled:opacity-60"
                        >
                          {isSubmitting ? "Verifying..." : "Verify & Sign In"}
                        </button>

                        <div className="flex items-center justify-between text-sm">
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtp("");
                              setSessionId(null);
                            }}
                            className="font-semibold text-[#2D545E] hover:text-[#103438]"
                          >
                            Change number
                          </button>
                          {timer > 0 ? (
                            <span className="text-[#2D545E]/75">Resend in {timer}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={isSubmitting}
                              className="font-semibold text-[#C99665] hover:text-[#103438]"
                            >
                              Resend code
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#D7D7D7]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2D545E]/70">or</span>
              <span className="h-px flex-1 bg-[#D7D7D7]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[#D7D7D7] bg-white text-sm font-semibold text-[#103438] transition hover:border-[#C99665] hover:bg-[#E2B385]/15 disabled:opacity-60"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-[#2D545E]">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-[#C99665] hover:text-[#103438]">
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
      <div id="sign-in-recaptcha-container"></div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </main>
  );
};

export default SignInPage;
