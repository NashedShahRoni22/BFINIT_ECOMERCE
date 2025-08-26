import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Vito Cortesiano",
    company: "Salvatore's Restaurant",
    location: "Elmont, NY",
    text: "Maria has worked with us for over 15 years. She has consistently demonstrated exceptional skills and professionalism in various key roles, including payroll, sales tax management, accounting, and monitoring our financial books.",
  },
  {
    name: "Gladys Rosario",
    company: "P Zaccaro Property Management",
    location: "New York, NY",
    text: "Maria makes bookkeeping stress-free and seamless! She’s reliable, detail-oriented, and always keeps finances in perfect order. Highly recommend her services.",
  },
  {
    name: "Carolina Rodriguez",
    company: "CRC Marketing",
    location: "Las Vegas, NV",
    text: "Working with Maria has been a game-changer for our business. She brings clarity to our finances, offers valuable insights, and handles every detail with precision and care.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="md:container md:mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-primary font-playfair text-center text-4xl font-bold">
            Stories Of Success
          </h2>
          <p className="mx-auto mt-4 w-full max-w-2xl text-center text-pretty text-[#4B5563]">
            Real feedback from businesses we&apos;ve helped succeed
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-custom-blue/10 flex flex-col rounded-2xl p-8"
            >
              <div className="flex-1">
                <p className="flex flex-wrap gap-1 text-gray-700 italic">
                  <Quote className="size-4 rotate-180" />
                  {testimonial.text}
                  <Quote className="size-4" />
                </p>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
