import { Form } from "@remix-run/react";

import TextArea from "~/components/forms/fields/TextArea";
import DateTimePicker from "~/components/forms/fields/Datetime";
import Button from "~/components/Button";
import Radio from "~/components/forms/fields/Radio";
import MetaDataField from "~/components/forms/activity/MetaDataField";

interface ActivityFormProps {
  type: string;
}

const activityTypes = {
  DIAPER_CHANGE: "DIAPER_CHANGE",
  FEEDING: "FEEDING",
  SLEEP: "SLEEP",
  MEDICATION: "MEDICATION",
  BATH: "BATH",
  TUMMY_TIME: "TUMMY_TIME",
  OTHER: "OTHER",
};

const metadataFields = {
  [activityTypes.DIAPER_CHANGE]: [
    {
      type: "radio",
      label: "Wet or dirty?",
      name: "meta.type",
      options: ["wet", "dirty", "both"],
    },
  ],
};

function ActivityForm({ type }: ActivityFormProps) {
  const metaFields = metadataFields[type];

  return (
    <Form method="post">
      <DateTimePicker id="timestamp" required />

      {metaFields?.map((field) => {
        return <MetaDataField key={field.name} meta={field} />;
      })}

      <TextArea label="Notes" name="notes" />

      <Button type="submit">Add</Button>
    </Form>
  );
}

export default ActivityForm;
