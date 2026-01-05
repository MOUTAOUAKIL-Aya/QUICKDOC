 
 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const result = await signIn(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  } catch (err) {
    console.error('SignIn error:', err);
    setError('An error occurred. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-8 rounded-2xl shadow-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <Button type="submit" variant="default" fullWidth>
          Sign In
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
