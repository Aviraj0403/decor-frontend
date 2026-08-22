import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "../../components/OtpInput";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Phone, ArrowRight, ShieldCheck, Lock } from "lucide-react";

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

  const { login, googleLogin, sendPhoneOTP, verifyPhoneOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || 
                     location.state?.from || 
                     new URLSearchParams(location.search).get('redirect') || 
                     "/";

  /* ---------------- EMAIL LOGIN ---------------- */
  const handleCustomSignIn = async (e) => {
    if(e) e.preventDefault();
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

  /* ---------------- PHONE OTP V2 ---------------- */
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

  /* ---------------- GOOGLE LOGIN ---------------- */
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

  /* ---------------- AUTO SUBMIT OTP ---------------- */
  useEffect(() => {
    if (otp.length === 4 && otpSent && sessionId && !isSubmitting) {
      handleVerifyOTP();
    }
  }, [otp, otpSent, sessionId]);

  /* ---------------- RESEND TIMER ---------------- */
  useEffect(() => {
    if (!otpSent || timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  return (
    <div
      className="flex items-center justify-center md:justify-end min-h-screen bg-cover bg-center p-6 md:pr-24 relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(/frontend-login-bg.png)`
      }}
    >
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_50px_rgba(255,165,0,0.15)] border border-white/10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 mb-3 hover:bg-primary-500/30 transition">
            <Sparkles className="w-7 h-7" />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-wide">Welcome to DivyaMantra</h2>
          <p className="text-sm text-gray-300 mt-1">Sign in to continue your spiritual journey</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex p-1 bg-black/30 rounded-xl mb-8 border border-white/5">
          <button
            onClick={() => {
              setLoginType("mobile");
              setOtpSent(false);
              setOtp("");
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              loginType === "mobile"
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Phone size={16} /> Phone
          </button>
          <button
            onClick={() => setLoginType("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              loginType === "email"
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Mail size={16} /> Email
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={loginType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* EMAIL LOGIN */}
            {loginType === "email" && (
              <form className="space-y-5" onSubmit={handleCustomSignIn}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email or Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-black/20 focus:bg-black/40 text-white placeholder-gray-500"
                      placeholder="you@example.com"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-black/20 focus:bg-black/40 text-white placeholder-gray-500"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 font-semibold shadow-lg shadow-primary-500/20 mt-2"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              </form>
            )}

            {/* PHONE OTP LOGIN */}
            {loginType === "mobile" && (
              <div className="space-y-5">
                {!otpSent ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Mobile Number</label>
                      <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all bg-black/20 focus-within:bg-black/40">
                        <span className="flex items-center justify-center px-4 border-r border-white/10 text-primary-400 font-medium bg-black/20">
                          +91
                        </span>
                        <input
                          autoFocus
                          maxLength="10"
                          className="flex-1 w-full px-4 py-3 outline-none bg-transparent text-white placeholder-gray-500"
                          placeholder="Enter 10 digit number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSendOTP}
                      disabled={isSubmitting || mobile.length !== 10}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 font-semibold shadow-lg shadow-primary-500/20"
                    >
                      {isSubmitting ? "Processing..." : "Sign In"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full mb-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        <ShieldCheck size={28} />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Verification Code</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Enter the 4-digit code sent to <br/><span className="font-medium text-primary-300">+91 {mobile}</span>
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <OtpInput value={otp} onChange={setOtp} />
                    </div>

                    <button
                      onClick={handleVerifyOTP}
                      disabled={isSubmitting || otp.length !== 4}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 font-semibold shadow-lg shadow-primary-500/20"
                    >
                      {isSubmitting ? "Verifying..." : "Verify & Sign In"}
                    </button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                          setSessionId(null);
                        }}
                        className="text-gray-400 hover:text-white font-medium transition-colors"
                      >
                        Change Number
                      </button>

                      {timer > 0 ? (
                        <span className="text-primary-400/70">Resend in {timer}s</span>
                      ) : (
                        <button
                          onClick={handleSendOTP}
                          disabled={isSubmitting}
                          className="text-primary-400 font-medium hover:text-primary-300 transition-colors"
                        >
                          Resend Code
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#14100E] text-gray-500 rounded-full border border-white/5">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-brand-bg/5 border border-white/10 text-white py-3.5 rounded-xl hover:bg-brand-bg/10 hover:border-white/20 transition-all active:scale-[0.98] font-medium shadow-sm"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
      <div id="sign-in-recaptcha-container"></div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default SignInPage;