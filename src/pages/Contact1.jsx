import React, { useState } from "react";
import ContactImg from "../assets/contact_3.avif"; // only one image needed

function Contact1() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-midnight text-gray-200 min-h-screen relative overflow-hidden">
      <div className="container mx-auto py-8 sm:py-12 px-4 md:px-6">
        {/* Grid – single column on mobile, 3 cols on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-stretch">
          {/* Left – Contact Form (spans 2 columns on lg) */}
          <div
            data-aos="fade-down"
            data-aos-delay="200"
            className="col-span-1 lg:col-span-2 flex items-center"
          >
            <div className="p-6 md:p-8 w-full">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-300 border text-black hover:bg-gray-100 border-gray-200 focus:ring-2 focus:border-gray-200 outline-none transition"
                    placeholder="John"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-300 border text-black hover:bg-gray-200 border-gray-300 focus:ring-2 focus:border-indigo-400 outline-none transition"
                    placeholder="hello@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-300 border text-black hover:bg-gray-100 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button – full width on mobile, fixed on sm+ */}
                <button
                  type="submit"
                  className="w-full sm:w-36 bg-yellow-400 hover:bg-gray-300 text-black font-light py-3 px-6 transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                >
                  {submitted ? "Message Sent! ✓" : "SUBMIT"}
                </button>

                {submitted && (
                  <p className="text-green-600 text-sm text-center mt-3 animate-pulse">
                    Thanks for reaching out! We'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right – Image (spans 1 column) */}
          <div className="col-span-1 flex flex-col items-center py-8 lg:py-16 justify-start relative">
            {/* Image container – on mobile: auto height, on lg: stretch to fill column */}
            <div className="w-full flex-1 min-h-0">
              <img
                data-aos="fade-down"
                data-aos-delay="200"
                src={ContactImg}
                alt="Creative workspace"
                className="w-full h-auto lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact1;
