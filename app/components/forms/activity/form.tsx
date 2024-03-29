import { Form } from "@remix-run/react";

import { Select, Option } from "~/components/forms/fields/Select";
import TextArea from "~/components/forms/fields/TextArea";
import DateTimePicker from "~/components/forms/fields/Datetime";
import Button from "~/components/Button";
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
  BOOK: "BOOK",
};

const books = [
  {
    title: "The Very Hungry Caterpillar",
  },
  {
    title: "Goodnight Moon",
  },
  {
    title: "Llama Llama Red Pajama",
    coverImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeqlRJrIbZu48b-20pDe4vPh-kTmxUKi-GA&usqp=CAU",
  },
  {
    title: "Llama Llama Mad at Mama",
  },
  {
    title: "Llama Llama Time to Share",
  },
  {
    title: "Where's Spot?",
  },
  {
    title: "Animals Touch And Feel",
  },
  {
    title: "You Are My Goodnight Kiss",
  },
  {
    title: "Word's Book",
  },
  {
    title: "The Pout-Pout Kiss Fish",
  },
  {
    title: "The Little Mouse, the Red Ripe Strawberry, and the Big Hungry Bear",
  },
  {
    title: "Daddy Hugs",
  },
] as const;

function BookDropdown({ name }: { name: string }) {
  return (
    <Select name={name}>
      <Option value="" label="Select a book" />
      {books.map((book) => {
        return (
          <Option key={book.title} value={book.title} label={book.title} />
        );
      })}
    </Select>
  );
}

const metadataFields = {
  [activityTypes.BOOK]: [
    {
      type: "custom",
      component: BookDropdown,
      label: "Book",
      name: "meta.book",
    },
  ],
  [activityTypes.DIAPER_CHANGE]: [
    {
      type: "radio",
      label: "Wet or dirty?",
      name: "meta.type",
      options: ["wet", "dirty", "both"],
    },
  ],
  [activityTypes.FEEDING]: [
    {
      type: "radio",
      label: "Type of feeding",
      name: "meta.type",
      options: ["breast", "formula", "solid"],
    },
    {
      type: "duration",
      label: "Duration",
      name: "meta.duration",
    },
    {
      type: "number",
      label: "Amount",
      name: "meta.amount",
      unit: "oz",
      placeholder: "3",
    },
  ],
  [activityTypes.SLEEP]: [
    {
      type: "duration",
      label: "Duration",
      name: "meta.duration",
    },
  ],
  [activityTypes.TUMMY_TIME]: [
    {
      type: "duration",
      label: "Duration",
      name: "meta.duration",
    },
  ],
};

function ActivityForm({ type }: ActivityFormProps) {
  const metaFields = metadataFields[type];

  return (
    <Form method="post">
      <input type="hidden" name="type" value={type} readOnly />

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
