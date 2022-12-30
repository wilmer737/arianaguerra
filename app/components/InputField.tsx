type FieldProps = {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  errorMessage?: string;
};

function Field({
  label,
  id,
  type,
  required,
  autoFocus,
  placeholder,
  errorMessage,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          required={required}
          autoFocus={autoFocus}
          name={id}
          type={type}
          autoComplete={id}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
          placeholder={placeholder}
        />
        {errorMessage && (
          <div className="pt-1 text-red-700" id="email-error">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Field;
