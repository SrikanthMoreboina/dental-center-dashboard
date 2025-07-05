import { useState, type FormEvent, useContext } from 'react';
import { AuthContext } from '../../data/AuthProvider';
import TextInput from '../shared/TextInput';
import CustomButton from '../shared/CustomButton';

// Login form with manual validation
const LoginComponent = () => {
  const { loginUser } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  // Handle form submission with custom validation
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim() || !userPass.trim()) {
      alert('Please enter both email and password');
      return;
    }
    loginUser(userEmail, userPass);
  };

  return (
    <form onSubmit={handleLoginSubmit} className="clinic-card max-w-md mx-auto">
      <h2 className="text-2xl mb-6">Clinic Login</h2>
      <TextInput
        label="Email Address"
        type="email"
        value={userEmail}
        onChange={e => setUserEmail(e.target.value)}
        required
      />
      <TextInput
        label="Password"
        type="password"
        value={userPass}
        onChange={e => setUserPass(e.target.value)}
        required
      />
      <CustomButton type="submit" className="clinic-btn mt-5">
        Sign In
      </CustomButton>
    </form>
  );
};

export default LoginComponent;