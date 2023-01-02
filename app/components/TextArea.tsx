interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label: string;
}

function TextArea({ label, ...htmlProps }: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={htmlProps.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
          {...htmlProps}
        />
      </div>
    </div>
  );
}

export default TextArea;
