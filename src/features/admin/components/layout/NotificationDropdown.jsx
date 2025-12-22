import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotificationDropdown() {
  const notifications = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: "New Order!",
    message: "Macbook m2 air 8/256 gb have ordered by User name",
    time: "2m ago",
    unread: i < 2, // First 2 are unread
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative cursor-pointer">
          <Bell />
          {/* Unread badge */}
          <span className="absolute top-1 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[320px] p-0" sideOffset={8}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-3 py-2.5">
          <h3 className="text-sm font-semibold">Notifications</h3>
          <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
            {notifications.filter((n) => n.unread).length} new
          </Badge>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[380px]">
          <div className="p-1.5">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex cursor-pointer gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-neutral-50 ${
                    notification.unread ? "bg-blue-50/50" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-neutral-900">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="mb-2 h-10 w-10 text-neutral-300" />
                <p className="text-xs font-medium text-neutral-900">
                  No notifications
                </p>
                <p className="text-[10px] text-neutral-500">
                  We&apos;ll notify you when something arrives
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-neutral-100 p-1.5">
          <button className="w-full rounded-md px-3 py-2 text-center text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            View all notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
