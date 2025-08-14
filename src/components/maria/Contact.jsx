import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";

export default function Contact() {
  return (
    <div className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <div className="mb-16 text-center">
        <div className="text-primary ring-primary/20 inline-flex items-center gap-1 rounded-full bg-[#FFF8F5] px-3 py-0.5 text-xs font-semibold tracking-wide uppercase ring-1">
          Let’s Connect
        </div>
        <h2 className="text-primary font-playfair mt-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-balance text-gray-600">
          No form. Just pick the method that works for you - call or email.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex items-center gap-4 md:justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <LuPhone className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-primary font-semibold">Phone</p>
            <p className="text-gray-600">
              <a href="tel:+15551234567" className="hover:underline">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <LuMail className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-left">
            <p className="text-primary font-semibold">Email</p>
            <p className="text-gray-600">
              <a
                href="mailto:maria@bookkeepersatwork.com"
                className="hover:underline"
              >
                maria@bookkeepersatwork.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <LuMapPin className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-primary font-semibold">Location</p>
            <p className="text-gray-600">New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
