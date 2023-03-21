import React from "react";
import { Form } from "@remix-run/react";

import MetaDataField from "~/components/forms/old_activity/MetaDataField";
import TextArea from "~/components/TextArea";
import type { MetaData } from "~/components/forms/old_activity/activityform.types";

interface ActivityFormProps {
  label: string;
  metadata?: MetaData[];
  value: string;
}

function ActivityForm({ label, metadata, value }: ActivityFormProps) {
  const [datetime, setDatetime] = React.useState<string>(() => {
    const date = new Date();
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  });

  return (
    <Form className="space-y-6" method="post">
      <div className="mt-8 w-full rounded py-1 text-lg">{label}</div>

      <input hidden name="type" value={value} readOnly />

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

      {metadata?.map((meta) => {
        return <MetaDataField key={meta.name} meta={meta} />;
      })}

      <TextArea label="Notes" id="notes" name="notes" rows={5} cols={33} />

      <button
        type="submit"
        className="bg-$ w-full rounded  bg-emerald-500 py-2 px-4 text-white hover:bg-emerald-600 focus:bg-emerald-400"
      >
        Add
      </button>
    </Form>
  );
}

export default ActivityForm;
