import React, { useState } from "react";
import form1 from "../../assets/form1.avif";
import form2 from "../../assets/form2.avif";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    <div className="bg-gray-100 text-midnight flex items-center justify-center min-h-screen relative overflow-hidden">
  <div className="container mx-auto py-8 sm:py-12 px-4 md:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">

      {/* Left side – “Impressed?” + two images */}
      <div className="col-span-1 flex flex-col items-center justify-start relative mt-4 lg:-mt-8">

        {/* Text block – responsive padding / margins */}
        <div
          data-aos="fade-down"
          data-aos-delay="200"
          className="text-center mx-4 sm:mx-8 lg:mx-20 py-8 lg:py-32 px-0 lg:px-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-midnight leading-tight">
            Impressed?
          </h1>
          <p className="text-midnight py-4 lg:py-6 text-base md:text-lg max-w-md mx-auto">
            Let us cross paths - reach out and we'll work on your next
            project together.
          </p>
        </div>

        {/* Two images – responsive widths, stacked on very small screens */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-4 w-full px-4">
          <img
            data-aos="fade-down"
            data-aos-delay="200"
            src={form1}
            alt="Creative workspace"
            className="w-full max-w-[144px] sm:max-w-[176px] h-auto aspect-[9/7] object-cover"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="200"
            src={form2}
            alt="Collaborative meeting"
            className="w-full max-w-[144px] sm:max-w-[176px] h-auto aspect-[9/7] object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Right side – Contact Form */}
      <div
        data-aos="fade-down"
        data-aos-delay="200"
        className="col-span-1 lg:col-span-2 py-8 px-4 sm:px-8 lg:py-32 lg:px-32"
      >
        <div className="bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Let's get in touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="gap-4">
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
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                placeholder="hello@example.com"
              />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-midnight hover:bg-indigo-700 text-white font-semibold py-3 px-6 transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {submitted ? "Message Sent! ✓" : "Send Message"}
            </button>

            {submitted && (
              <p className="text-green-600 text-sm text-center mt-3 animate-pulse">
                Thanks for reaching out! We'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ContactSection;
