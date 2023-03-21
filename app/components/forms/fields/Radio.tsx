interface RadioOptonsProps {
  name: string;
  options: string[];
  label: string;
}

function RadioOptions(props: RadioOptonsProps) {
  return (
    <fieldset>
      <legend>{props.label}</legend>
      <div className="flex">
        {props.options.map((option) => {
          return (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name={props.name}
                value={option}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RadioOptions;
