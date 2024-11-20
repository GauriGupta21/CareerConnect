// components/auth/RequestPasswordReset.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '@/redux/authSlice';


function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { passwordResetStatus, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email));
  };

  return (
    <div className="container">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {passwordResetStatus && <p>{passwordResetStatus}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default RequestPasswordReset;
