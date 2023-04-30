import { Link } from "@remix-run/react";

interface AgeSelectorProps {
  ages: string[];
}

function AgeSelector(props: AgeSelectorProps) {
  const { ages } = props;
  return (
    <div className="flex h-16 w-full gap-3 overflow-y-scroll">
      {ages.map((age) => {
        return (
          <Link key={age} to={`/milestones/${age.replace(" ", "_")}`}>
            {age}
          </Link>
        );
      })}
    </div>
  );
}

export default AgeSelector;
