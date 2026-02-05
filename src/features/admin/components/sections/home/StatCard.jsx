export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
}) {
  return (
    <div className="bg-card group rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <div className={`${iconBgColor} ${iconColor} rounded-lg p-2`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-xs font-medium">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {trendValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
