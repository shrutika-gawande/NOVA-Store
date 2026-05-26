import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;
      if (mode === 'login') {
        user = await login(form.email, form.password);
      } else {
        if (!form.name.trim()) { toast.error('Name is required'); setLoading(false); return; }
        user = await register(form.name, form.email, form.password);
      }
      toast.success(`Welcome${user.role === 'admin' ? ' back, Admin' : `, ${user.name}`}! 🎉`);
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>NO<span>VA</span></div>
        <h1 className={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p className={styles.sub}>{mode === 'login' ? 'Sign in to your account' : 'Join the NOVA Store community'}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'register' && (
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" placeholder="Your name" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
            </div>
          )}
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={6} />
          </div>
          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}><span>or</span></div>

        <div className={styles.demoBox}>
          <p className={styles.demoTitle}>Demo Credentials</p>
          <div className={styles.demoCreds}>
            <div>
              <span className={styles.demoTag}>Admin</span>
              <code>admin@nova.com / admin123</code>
            </div>
            <div>
              <span className={styles.demoTag}>Customer</span>
              <code>user@nova.com / user1234</code>
            </div>
          </div>
        </div>

        <p className={styles.toggle}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
