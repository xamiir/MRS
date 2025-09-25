import { Card, CardContent, CardTitle } from "../ui/card";

export function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>

            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
