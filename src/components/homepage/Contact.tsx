import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission (e.g., API call)
    console.log("Submitted data:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="">
        <h2 className="text-white font-extrabold font-courier text-center text-4xl mb-11">Report</h2>
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-[rgba(24,27,43,0.5)] backdrop:blur-lg shadow-md rounded text-white font-courier"
    >
        
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
        Reporter's name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full px-3 py-2 bg-gray-800 text-white border border-[rgb(121,4,3)] rounded focus:outline-none focus:border-[rgb(121,4,3)] placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-bold mb-2">
        Reporter's Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="w-full px-3 py-2 bg-gray-800 text-white border border-[rgb(121,4,3)] rounded focus:outline-none focus:border-[rgb(121,4,3)] placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block font-bold mb-2">
        Case Title:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full px-3 py-2 bg-gray-800 text-white border border-[rgb(121,4,3)] rounded focus:outline-none focus:border-[rgb(121,4,3)] placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block font-bold mb-2">
            Case Description:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={4}
          required
          className="w-full px-3 py-2 bg-gray-800 text-white border border-[rgb(121,4,3)] rounded focus:outline-none focus:border-[rgb(121,4,3)] placeholder-gray-400"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-[rgb(121,4,3)] text-white font-bold py-2 px-4 rounded hover:bg-[rgb(140,10,5)] transition duration-200"
      >
        Send Message
      </button>
    </form>
    </div>
    
  );
};

export default ContactForm;
