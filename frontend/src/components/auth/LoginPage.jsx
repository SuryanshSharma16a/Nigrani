import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginError } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5FA] p-4 font-sans transition-opacity duration-500 opacity-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="bg-[#635BFF] p-6 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Nigrani</h1>
          <p className="text-white/80 text-sm font-medium">Department of Social Justice & Empowerment</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#635BFF] hover:bg-[#5249e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#635BFF] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Demo Credentials</h3>
            <div className="bg-slate-50 rounded-lg p-4 text-xs font-medium text-slate-600 overflow-x-auto border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 font-semibold">Role</th>
                    <th className="pb-2 font-semibold">Email</th>
                    <th className="pb-2 font-semibold">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr 
                    className="cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={() => { setEmail('admin@dosje.gov.in'); setPassword('admin123'); }}
                    title="Click to auto-fill Admin credentials"
                  >
                    <td className="py-2 px-1 text-[#635BFF]">Admin</td>
                    <td className="py-2 px-1">admin@dosje.gov.in</td>
                    <td className="py-2 px-1 font-mono bg-white rounded">admin123</td>
                  </tr>
                  <tr 
                    className="cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={() => { setEmail('inspector@pmu.gov.in'); setPassword('insp123'); }}
                    title="Click to auto-fill Inspector credentials"
                  >
                    <td className="py-2 px-1 text-[#635BFF]">Inspector</td>
                    <td className="py-2 px-1">inspector@pmu.gov.in</td>
                    <td className="py-2 px-1 font-mono bg-white rounded">insp123</td>
                  </tr>
                  <tr 
                    className="cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={() => { setEmail('ngo@ashray.org'); setPassword('ngo123'); }}
                    title="Click to auto-fill NGO credentials"
                  >
                    <td className="py-2 px-1 text-[#635BFF]">NGO</td>
                    <td className="py-2 px-1">ngo@ashray.org</td>
                    <td className="py-2 px-1 font-mono bg-white rounded">ngo123</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 py-4 px-6 text-center border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400">Smart India Hackathon 2025</p>
        </div>
      </div>
    </div>
  );
};
