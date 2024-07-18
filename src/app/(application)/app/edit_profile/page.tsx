"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

const UserProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState({
    Name: 'John Doe',
    LinkedinProfile: 'https://www.linkedin.com/in/johnnydoe',
    GithubProfile: 'https://github.com/johnnydoe',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., call an API to update user profile
    console.log(formData); // For demonstration, logging the form data
  };

  return (
    <div className='justify-center items-center'>
      <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700"> Name</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"> LinkedIn Profile URL</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="LinkedinProfile"
              value={formData.LinkedinProfile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">GitHub Profile URL</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="GithubProfile"
              value={formData.GithubProfile}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEdit;
