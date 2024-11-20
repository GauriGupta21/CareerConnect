// components/auth/ResetPassword.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@/redux/authSlice';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch();
  const { passwordResetStatus, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {passwordResetStatus && <p>{passwordResetStatus}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ResetPassword;
