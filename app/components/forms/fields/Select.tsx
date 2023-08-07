export function Select({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>Book</label>
      <select name={name} id={name}>
        {children}
      </select>
    </div>
  );
}

export function Option({ value, label }: { value: string; label?: string }) {
  return <option value={value}>{label || value}</option>;
}
