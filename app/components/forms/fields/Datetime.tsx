import React from "react";

interface DateTimePickerProps {
  id: string;
  required?: boolean;
}

function DateTimePicker({ id, required }: DateTimePickerProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>Datetime</label>
      <input id={id} name={id} type="datetime-local" required={required} />
    </div>
  );
}

export default DateTimePicker;
