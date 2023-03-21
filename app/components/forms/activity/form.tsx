import React from "react";
import { Form } from "@remix-run/react";
import TextArea from "~/components/forms/fields/TextArea";

interface ActivityFormProps {
  type: string;
}

function ActivityForm({ type }: ActivityFormProps) {
  const [datetime, setDatetime] = React.useState<string>(() => {
    const date = new Date();
    const mins = date.getMinutes().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");

    return `${hours}:${mins}`;
  });

  return (
    <Form method="post">
      <div className="flex flex-col">
        <label htmlFor="timestamp">Timestamp</label>
        <input
          type="time"
          id="timestamp"
          name="timestamp"
          required
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </div>

      <TextArea label="Notes" />

      <button type="submit">Add</button>
    </Form>
  );
}

export default ActivityForm;
