import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="lg:col-span-2">
      <h2 className="mb-2 text-xl font-semibold">Contact Information</h2>
      <p className="text-muted-foreground mb-8 text-sm">
        Have a question? Fill out the form and we'll get back to you.
      </p>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <h3 className="mb-0.5 text-sm font-medium">Phone</h3>
            <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h3 className="mb-0.5 text-sm font-medium">Email</h3>
            <p className="text-muted-foreground text-sm">contact@example.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h3 className="mb-0.5 text-sm font-medium">Office</h3>
            <p className="text-muted-foreground text-sm">123 Business Street</p>
            <p className="text-muted-foreground text-sm">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Google Map - Mobile: Below form, Desktop: Below contact info */}
      <div className="border-border mt-8 hidden overflow-hidden rounded-lg border lg:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71277537933029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1234567890123"
          width="100%"
          height="240"
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
