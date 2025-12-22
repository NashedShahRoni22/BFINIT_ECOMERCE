import Hero from "../components/sections/contact/Hero";
import ContactInfo from "../components/sections/contact/ContactInfo";
import ContactForm from "../components/sections/contact/ContactForm";

export default function Contact() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information Sidebar */}
          <ContactInfo />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
