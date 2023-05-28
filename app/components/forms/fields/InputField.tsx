interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

function Field({ label, id, errorMessage, ...htmlProps }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1 bg-white">
        <input
          id={id}
          name={htmlProps.name || id}
          className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...htmlProps}
        />
        {errorMessage && (
          <div className="pt-1 text-red-400" id={`${id}-error`}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Field;
