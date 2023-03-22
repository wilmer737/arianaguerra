import Radio from "~/components/forms/fields/Radio";

interface MetaDataFieldProps {
  meta: {
    type: string;
    name: string;
    label?: string;
    options?: string[];
  };
}

function MetaDataField(props: MetaDataFieldProps) {
  const { meta } = props;

  if (meta.type === "duration") {
    return (
      <div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="hours">Hours</label>
              <input
                placeholder="hours"
                type="number"
                id="hours"
                name="meta[hours]"
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="minutes">Minutes</label>
            <input
              placeholder="minutes"
              type="number"
              id="minutes"
              name="meta[minutes]"
              min="0"
              max="59"
            />
          </div>
        </div>
      </div>
    );
  }

  if (meta.type === "radio" && Array.isArray(meta.options)) {
    return (
      <Radio
        name={meta.name}
        options={meta.options}
        label={meta.label ?? "Please select an option"}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor={meta.name}>{meta.label || meta.name}</label>
        <input
          placeholder={meta.name}
          type={meta.type}
          id={meta.name}
          name={`meta[${meta.name}]`}
        />
      </div>
    </div>
  );
}

export default MetaDataField;
