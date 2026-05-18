import { Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function CustomerCard({ orderDetails }) {
  const user = orderDetails?.package_order?.user;
  if (!user) return null;

  const { name, email, phone } = user;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase">
          <User size={16} /> Customer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium select-none">
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="text-muted-foreground truncate text-xs">{email}</p>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs">Email</span>
            </div>
            <span className="truncate text-xs font-medium">{email}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs">Phone</span>
            </div>
            <span className="text-xs font-medium">{phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
