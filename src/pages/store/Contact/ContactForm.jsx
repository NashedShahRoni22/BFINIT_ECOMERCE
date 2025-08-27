import { useEffect, useState } from "react";
import Captcha from "./Captcha";
import useGetQuery from "../../../hooks/queries/useGetQuery";

export default function ContactForm() {
  const { data: countries } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    skypeId: "",
    subject: "",
    message: "",
    captchaInput: "",
  });

  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [invalidCaptcha, setInvalidCaptcha] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [invalidKey, setInvalidKey] = useState(false);
  const [forbiddenWords, setForbiddenWords] = useState([]);

  useEffect(() => {
    fetchForbiddenWords();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchForbiddenWords = async () => {
    const apiUrl = "https://bitts.fr/api.php";

    try {
      const credential = await fetch("/credential.json");
      const credentialsData = await credential.json();
      if (
        !credentialsData ||
        !credentialsData.username ||
        !credentialsData.password
      ) {
        return;
      }

      const servername = window.location.hostname;
      const data = { ...credentialsData, servername };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setForbiddenWords(result ?? []);
      } else {
        setInvalidKey(true);
      }
    } catch (error) {
      console.error("Error fetching forbidden words:", error);
      setInvalidKey(true);
    }
  };

  const checkForbiddenWords = (message) => {
    for (const word of forbiddenWords) {
      if (message.toLowerCase().includes(word.toLowerCase())) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoader(true);
    // if (parseInt(formData.captchaInput, 10) !== captchaAnswer) {
    //   setInvalidCaptcha(true);
    //   setLoader(false);
    //   return;
    // } else {
    //   setInvalidCaptcha(false);
    // }

    // if (!checkForbiddenWords(formData.message)) {
    //   setInvalidMessage(true);
    //   setLoader(false);
    //   return;
    // } else {
    //   setInvalidMessage(false);
    // }
    // try {
    //   // Create a formatted message to send
    //   const formattedMessage = `
    //       Name: ${formData.name}
    //       <br />
    //       Email: ${formData.email}
    //       <br />
    //       Subject: ${formData.subject}
    //       <br />
    //       Phone: ${formData.phone}
    //       <br />
    //       Country: ${formData.country}
    //       <br />
    //       Skype ID: ${formData.skypeId}
    //       <br />
    //       Message: ${formData.message}
    //   `;
    //   // Sending an email using SMTP
    //   await smtpexpressClient.sendApi.sendMail({
    //     // Subject of the email
    //     subject: `BFINIT Contact Form Submission from ${formData.name}`,
    //     // Body of the email
    //     message: `${formattedMessage}`,
    //     // Sender's details
    //     sender: {
    //       // Sender's name
    //       name: "BFINIT",
    //       // Sender's email address
    //       email: "bfinit-9b2b98@projects.smtpexpress.com",
    //     },
    //     // Recipient's details
    //     recipients: {
    //       // Recipient's email address (obtained from the form)
    //       // email: `${formData.email}`,
    //       email: `support@bobosohomail.com`,
    //     },
    //   });

    //   // Notify user of successful submission
    //   alert("Contact message sent. Our support team will reach you soon.");
    //   navigate("/");
    //   setLoader(false);
    // } catch (error) {
    //   // Notify user if an error occurs during submission
    //   alert("Oops! Something went wrong. Please try again later.");
    //   // You can console.log the error to know what went wrong
    //   setLoader(false);
    //   console.log(error);
    // }
  };

  return (
    <div className="mt-16 grid grid-cols-1 gap-12 md:mt-32 lg:grid-cols-3">
      {/* Left Info Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-8">
          {/* Contact Form Header */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="leading-relaxed text-gray-600">
              Have questions or need assistance? We&apos;re here to help. Fill
              out the form and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Response Time */}
          <div className="border-primary border-l-4 pl-4">
            <p className="text-sm text-gray-600">
              <span className="text-primary font-semibold">
                Quick Response:{" "}
              </span>
              We typically respond to inquiries within 24 hours during business
              days.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 lg:p-8">
          <div className="mb-8">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Send us a Message
            </h3>
            <p className="text-gray-600">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>
          </div>

          <form className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:border-accent focus:ring-accent/20 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:border-accent focus:ring-accent/20 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Phone Row */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="focus:border-accent focus:ring-accent/20 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="focus:border-accent focus:ring-accent/20 resize-vertical w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
                placeholder="Enter your message here..."
              />
            </div>

            {/* Captcha Section */}
            <div className="rounded-lg bg-gray-50 p-4">
              <Captcha onCaptchaGenerated={setCaptchaAnswer} />
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Enter Captcha *
                </label>
                <input
                  type="text"
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  className="focus:border-accent focus:ring-accent/20 w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 outline-none focus:ring-2"
                  placeholder="Enter the captcha above"
                />
              </div>
            </div>

            {/* Error Messages */}
            {invalidCaptcha && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  Invalid Captcha! Please try again.
                </p>
              </div>
            )}
            {invalidMessage && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  Your message contains forbidden words.
                </p>
              </div>
            )}
            {invalidKey && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">Invalid API Key.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-primary text-on-primary hover:bg-accent group flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg px-8 py-4 font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              Send Message
              <svg
                className="h-5 w-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
