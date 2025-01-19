import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <Layout title="Signup">
      <div 
        className="min-h-screen flex bg-primary"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      >
        {/* Left Half - Blue Background */}
        <div className="w-1/2 relative flex flex-col">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <img src="../assets/primary_logo_light.svg" alt="Omni" className="h-8 w-auto" />
          </div>

          {/* Centered Content */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <h2 className="text-5xl font-bold text-white mb-6">
              Intelligent Home Automation That Anticipates Your Needs
            </h2>
            <p className="text-xl text-white/80">
              Experience the perfect harmony of comfort and technology, where every room responds to your desires.
            </p>
          </div>

          {/* Customer Review */}
          <div className="px-8 pb-8">
            <div className="flex flex-col p-4 bg-white/20 rounded-3xl">
              <p className="text-white text-md italic mb-2">
                "After trying multiple smart home apps, omni is in a league of its own. Setup took minutes, and now my entire home runs like clockwork."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://api.dicebear.com/8.x/avataaars/svg?seed=Whiskers"
                  alt="Customer avatar"
                  className="w-12 h-12 rounded-xl bg-white/10"
                />
                <div>
                  <p className="text-white font-medium">Michael K.</p>
                  <p className="text-white/60 text-sm">Busy Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Signup Form */}
        <div className="w-1/2 flex items-center justify-center m-4 rounded-3xl bg-white">
          <div className="max-w-md w-full space-y-8 p-8">
            <div>
              <h1 className="text-2xl font-semibold text-center text-gray-900">Create Account</h1>
              <p className="mt-2 text-center text-gray-600">Sign up for a new account</p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              <div className="rounded-md space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Create Account
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
