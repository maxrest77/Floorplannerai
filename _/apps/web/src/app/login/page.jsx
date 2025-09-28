import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or start-designing
      window.location.href = '/start-designing';
    }, 1500);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen flex">
        {/* Left Panel - Architectural Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Modern architectural interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C2B25]/70 to-[#C2A14A]/70"></div>
          
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#C2A14A] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FP</span>
                </div>
                <span 
                  className="text-white font-semibold text-xl"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  FloorPlan AI
                </span>
              </div>
            </div>
            
            <h2
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome back to the future of{" "}
              <em className="text-[#C2A14A]">architectural design</em>
            </h2>
            
            <p
              className="text-lg opacity-90 leading-relaxed max-w-[400px]"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Continue creating stunning floor plans with our AI-powered platform. 
              Your designs are waiting.
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8F6F1]">
          <div className="w-full max-w-[400px]">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-[#C2A14A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span 
                className="text-[#1C2B25] font-semibold text-lg"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                FloorPlan AI
              </span>
            </div>

            {/* Form header */}
            <div className="mb-8">
              <h1
                className="text-3xl md:text-4xl font-semibold text-[#1C2B25] mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Welcome Back
              </h1>
              <p
                className="text-[#2D2D2D] opacity-70"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Sign in to your account to continue designing
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1C2B25] mb-2"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E3DE] rounded-xl focus:ring-2 focus:ring-[#C2A14A] focus:border-[#C2A14A] outline-none transition-colors bg-white"
                  placeholder="your@email.com"
                  required
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1C2B25] mb-2"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-[#E5E3DE] rounded-xl focus:ring-2 focus:ring-[#C2A14A] focus:border-[#C2A14A] outline-none transition-colors bg-white"
                    placeholder="••••••••"
                    required
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2D2D2D] opacity-50 hover:opacity-80 transition-opacity"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-[#C2A14A] border-[#E5E3DE] rounded focus:ring-[#C2A14A]"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-[#2D2D2D] opacity-70"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-[#C2A14A] hover:text-[#B8975A] transition-colors"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full px-6 py-3 bg-[#1C2B25] hover:bg-[#0F1A13] disabled:bg-[#E5E3DE] disabled:text-[#2D2D2D] disabled:opacity-50 text-white font-medium text-base rounded-xl transition-all duration-150 flex items-center justify-center space-x-2"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-[#E5E3DE]"></div>
              <span
                className="px-4 text-sm text-[#2D2D2D] opacity-50"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                or
              </span>
              <div className="flex-1 border-t border-[#E5E3DE]"></div>
            </div>

            {/* Social Login */}
            <button className="w-full px-6 py-3 border-2 border-[#E5E3DE] text-[#2D2D2D] hover:bg-[#F0EDE7] font-medium text-base rounded-xl transition-all duration-150 flex items-center justify-center space-x-3">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Continue with Google</span>
            </button>

            {/* Sign up link */}
            <p
              className="mt-8 text-center text-[#2D2D2D] opacity-70"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#C2A14A] hover:text-[#B8975A] font-medium transition-colors"
              >
                Sign up
              </a>
            </p>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-[#2D2D2D] opacity-50 hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}