import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { API_URL } from '../config/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.msg || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <Helmet>
        <title>Admin Login | True North</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-md glass p-10 rounded-3xl border border-border-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-border-subtle shadow-sm">
            <Lock className="text-brand-red" size={28} />
          </div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight">Admin Port</h1>
          <p className="text-text-secondary text-sm mt-2 font-medium uppercase tracking-widest">Identify Yourself</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-brand-red text-xs font-bold flex items-center gap-3 animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-text-secondary ml-1">Username</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-red transition-colors" />
              <input
                type="text"
                required
                className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl py-4 pl-12 pr-4 text-text-primary outline-none focus:border-brand-red/50 transition-all font-medium"
                placeholder="Access ID"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-text-secondary ml-1">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-red transition-colors" />
              <input
                type="password"
                required
                className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl py-4 pl-12 pr-4 text-text-primary outline-none focus:border-brand-red/50 transition-all font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red text-white py-4 rounded-xl font-black text-lg hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(229,9,20,0.3)] disabled:opacity-50 disabled:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Initiate Session <ArrowRight size={20} /></>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border-subtle text-center">
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest">
                Authenticated Access Only. <br />
                All attempts are logged.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
