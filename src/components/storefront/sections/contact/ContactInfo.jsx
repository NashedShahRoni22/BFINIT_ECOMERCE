import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Contact Information
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Have a question? Fill out the form and we'll get back to you.
      </p>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <Phone className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-0.5">
              Phone
            </h3>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <Mail className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-0.5">
              Email
            </h3>
            <p className="text-sm text-muted-foreground">contact@example.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <MapPin className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-0.5">
              Office
            </h3>
            <p className="text-sm text-muted-foreground">123 Business Street</p>
            <p className="text-sm text-muted-foreground">New York, NY 10001</p>
          </div>
        </div>
      </div>

      {/* Google Map - Mobile: Below form, Desktop: Below contact info */}
      <div className="hidden lg:block mt-8 rounded-lg border border-border overflow-hidden">
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
