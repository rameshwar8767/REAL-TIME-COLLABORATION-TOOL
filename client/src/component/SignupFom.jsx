/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from './../Redux/Slices/Auth.slice';

const SignupForm = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
const dispatch = useDispatch()
  const handleSignup = async (e) => {
    e.preventDefault();
    const resp = await dispatch(createAccount({name,username,email,password}));
    if (resp.payload.success) {
      onSwitch()
  };
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-white mb-6">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
            username
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="text"
            id="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-blue-400 hover:underline">
          Log in here
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
