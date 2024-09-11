import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { localUpdate } from '../redux/authSlice';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);

      axios.get(`${import.meta.env.VITE_API_URL}/api/auth/protected-route`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
        const { username, email, profilePic, bio, _id } = response.data;
        dispatch(localUpdate({ id:_id, username, email, profilePic, bio }));

        navigate('/');
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        navigate('/signup');
      });
    } else {
      navigate('/login');
    }
  }, [navigate,dispatch]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
