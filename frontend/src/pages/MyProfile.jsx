


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { token, backendUrl, navigate, setToken } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // For image upload
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch the current user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user`, {
          headers: { token },
        });

        if (response.data.success) {
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          setPhoneNumber(response.data.user.phoneNumber || '');
          setAddress(response.data.user.address || {});
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching user data.');
      } finally {
        setLoading(false); // Once the data is loaded
      }
    };

    fetchUserData();
  }, [backendUrl, token]);

  // Handle profile picture upload change
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]); // Set selected file
  };

  // Submit updated profile data
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password); // Only append if password is changed
    formData.append('phoneNumber', phoneNumber);
    if (profilePicture) formData.append('profilePicture', profilePicture); // Append file if selected
    formData.append('address', JSON.stringify(address)); // Append address as a JSON string

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/update`,
        formData, // Use formData to send files and text data
        {
          headers: { token, 'Content-Type': 'multipart/form-data' }, // Set headers for file uploads
        }
      );

      if (response.data.success) {
        toast.success('Profile updated successfully');
        if (response.data.token) {
          setToken(response.data.token); // Update token if changed
          localStorage.setItem('token', response.data.token);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating profile.');
    }
  };

  // Log out the user
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Loading your profile...</div>;

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">My Profile</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
      />

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Phone Number"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="New Password (optional)"
      />

      {/* Profile Picture */}
      <input
        type="file"
        onChange={handleProfilePictureChange}
        className="w-full px-3 py-2 border border-gray-800"
      />

      {/* Address Fields */}
      <div className="w-full grid grid-cols-2 gap-4">
        <input
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          value={address.street}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Street"
        />
        <input
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          value={address.city}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="City"
        />
        <input
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          value={address.state}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="State"
        />
        <input
          onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          value={address.postalCode}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Postal Code"
        />
        <input
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          value={address.country}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Country"
        />
      </div>

      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        Save Changes
      </button>

      <button onClick={handleLogout} type="button" className="bg-red-500 text-white font-light px-8 py-2 mt-4">
        Logout
      </button>
    </form>
  );
};

export default MyProfile;

