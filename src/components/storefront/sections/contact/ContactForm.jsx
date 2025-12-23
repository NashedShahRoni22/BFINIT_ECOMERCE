import { useState } from "react";
import { Send, CheckCircle2, RefreshCw } from "lucide-react";
import { Link } from "react-router";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(generateCaptcha());

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const refreshCaptcha = () => {
    setCaptchaValue(generateCaptcha());
    setFormData({ ...formData, captcha: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.captcha) !== captchaValue.answer) {
      alert("Incorrect captcha. Please try again.");
      refreshCaptcha();
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captcha: "",
      });
      setCaptchaValue(generateCaptcha());
    }, 3000);
  };

  return (
    <div className="lg:col-span-3">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Message Sent!
            </h3>
            <p className="text-sm text-muted-foreground">
              Thank you for contacting us. We'll get back to you soon.
            </p>
          </div>
        ) : (
          <div onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Subject <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Captcha */}
            <div>
              <label
                htmlFor="captcha"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Enter Captcha <span className="text-destructive">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex h-10 items-center justify-center bg-primary px-4 rounded-md select-none min-w-[80px]">
                  <span className="text-base font-bold text-primary-foreground">
                    {captchaValue.num1} + {captchaValue.num2}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent transition-colors"
                  title="Refresh Captcha"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  className="h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  placeholder="Answer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </button>

              {/* BITSS Branding - Inline on desktop */}
              <Link
                to="https://bitss.one"
                target="_blank"
                className="hidden sm:flex items-center gap-2"
              >
                <div className="size-8 rounded flex items-center justify-center">
                  <img src="/images/logo/bitss.png" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">
                    BITSS
                  </p>
                  <p className="text-xs text-muted-foreground leading-none mt-0.5">
                    Cyber security
                  </p>
                </div>
              </Link>
            </div>

            {/* BITSS Branding - Below button on mobile */}
            <div className="sm:hidden flex items-center justify-center gap-2 pt-4 border-t border-border">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-red-600 rounded flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none">
                  BITSS
                </p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">
                  Powered by BITSS cyber security
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Map - Mobile only */}
      <div className="lg:hidden mt-8 rounded-lg border border-border overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71277537933029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1234567890123"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
      </div>
    </div>
  );
}
