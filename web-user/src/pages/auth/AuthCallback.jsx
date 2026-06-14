import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../api/auth';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      localStorage.setItem('token', token);
      // Fetch user profile and then role-redirect
      getMe()
        .then(res => {
          login(res.user, token);
        })
        .catch(() => {
          navigate('/login?error=failed_profile', { replace: true });
        });
    } else if (error) {
      navigate(`/login?error=${error}`, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, login]);

  return null;
}