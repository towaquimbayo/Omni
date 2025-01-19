import Layout from "../components/Layout";

export default function Login() {
  return (
    <Layout title="Login">
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
        <div className="w-1/2">
          {/* Optional: Add decorative content here */}
        </div>

        {/* Right Half - Login Form */}
        <div className="w-1/2 flex items-center justify-center m-4 rounded-3xl bg-white">
          <div className="max-w-md w-full space-y-8 p-8">
            <div>
              <h1 className="text-2xl font-semibold text-center text-gray-900">Login</h1>
              <p className="mt-2 text-center text-gray-600">Please sign in to your account</p>
            </div>
            
            <form className="mt-8 space-y-6">
              <div className="rounded-md space-y-4">
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
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Sign in
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/sign-up" className="font-semibold text-primary hover:text-primary/80">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
