import type { ActivityWithStringDates } from "~/components/ActivityList";

export function Summary({
  activities,
}: {
  activities: ActivityWithStringDates[];
}) {
  const getOunces = () => {
    return activities
      .filter((a) => a.type === "FEEDING")
      .reduce((acc, curr) => {
        if (!curr.metadata) return acc;
        const meta = JSON.parse(curr.metadata);

        const amount = Number(meta.amount);
        if (Number.isNaN(amount)) return acc;

        return acc + amount;
      }, 0);
  };

  return (
    <div className="w-full rounded-md bg-white p-4">
      <h2 className="text-lg">Today's Activity</h2>
      <p>Feeding: {getOunces()} ounces</p>
    </div>
  );
}
