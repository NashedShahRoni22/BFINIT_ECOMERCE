import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { LuCopyright, LuHouse, LuMail, LuPhone } from "react-icons/lu";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import fbIcon from "../../../assets/icons/facebook.png";
import ytIcon from "../../../assets/icons/youtube.png";
import xIcon from "../../../assets/icons/x.png";
import igIcon from "../../../assets/icons/instagram.png";
import Captcha from "./Captcha";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import bitssLogo from "../../../assets/logo/bitss.png";

export default function Contact() {
  const { storeId } = useParams();
  const { data: storePreferenceData } = useGetStorePreference(storeId);

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
  const currentYear = new Date().getFullYear();

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
    <section className="grid min-h-[calc(100vh-124px)] grid-cols-1 gap-8 px-5 py-10 md:container md:mx-auto md:grid-cols-2 md:py-16">
      {/* contact info side */}
      <div>
        <h5 className="font-bold md:text-2xl">Contact Us</h5>
        <p className="mt-4">
          To make requests for further information, contact us via our social
          channels or reach out directly using the information below.
        </p>

        <div className="mt-6 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <LuHouse className="text-xl md:text-2xl" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Address</h5>
            <p className="w-full max-w-72">
              {storePreferenceData?.storeAddress},{" "}
              {storePreferenceData?.country}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <LuPhone className="text-xl md:text-2xl" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Phone</h5>
            <p>{storePreferenceData?.storePhone}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <LuMail className="text-xl md:text-2xl" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold">Email</h5>
            <p>{storePreferenceData?.storeEmail}</p>
          </div>
        </div>

        {/* social links */}
        <h2 className="mt-8 text-lg font-semibold">
          Follow us on social media:
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Link to={storePreferenceData?.storeFacebookLink} target="_blank">
            <img src={fbIcon} alt="social links" className="size-8" />
          </Link>

          <Link to={storePreferenceData?.storeFacebookLink} target="_blank">
            <img src={igIcon} alt="social links" className="size-8" />
          </Link>

          <Link to={storePreferenceData?.storeFacebookLink} target="_blank">
            <img src={xIcon} alt="social links" className="size-8" />
          </Link>

          <Link to={storePreferenceData?.storeFacebookLink} target="_blank">
            <img src={ytIcon} alt="social links" className="size-8" />
          </Link>
        </div>
      </div>

      {/* contact form */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 md:p-8">
        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
              placeholder="Enter your email address"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Country Select */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(value) => setFormData({ ...formData, country: value })}
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
            >
              <option value="">Select your country</option>
              {countries?.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Skype ID Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Skype ID (Optional)
            </label>
            <input
              type="text"
              name="skypeId"
              value={formData.skypeId}
              onChange={handleChange}
              className="focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none"
              placeholder="Enter your Skype ID"
            />
          </div>

          {/* Subject Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
              placeholder="Enter the subject of your inquiry"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none`}
              placeholder="Enter your message here..."
            />
          </div>

          {/* Captcha */}
          <Captcha onCaptchaGenerated={setCaptchaAnswer} />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Enter Captcha
            </label>
            <input
              type="text"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              className="focus:border-accent w-full rounded-lg border px-4 py-3 transition-colors outline-none"
              placeholder="Enter captcha"
            />
          </div>

          {invalidCaptcha && (
            <p className="text-red-500">Invalid Captcha! Please try again.</p>
          )}
          {invalidMessage && (
            <p className="text-red-500">
              Your message contains forbidden words.
            </p>
          )}
          {invalidKey && <p className="text-red-500">Invalid API Key.</p>}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-primary text-on-primary hover:bg-accent flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors duration-200 ease-linear"
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

          {/* Status Messages */}
          {/* {submitStatus === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-3 text-sm text-green-800">
                  Message sent successfully! We&apos;ll get back to you soon.
                </p>
              </div>
            </div>
          )} */}

          {/* {submitStatus === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-3 text-sm text-red-800">
                  Error sending message. Please try again.
                </p>
              </div>
            </div>
          )} */}
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="flex items-center justify-center gap-1 text-xs">
            <LuCopyright /> {currentYear} BFIN. BITSS by BFIN. All rights
            reserved.
          </p>
          <div className="mt-2.5 flex flex-col items-center justify-center gap-2.5">
            <img src={bitssLogo} alt="" loading="lazy" />
            <p className="text-xs">
              This form is powered by bitss cyber security
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
