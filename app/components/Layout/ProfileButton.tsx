import { Form } from "@remix-run/react";

export function ProfileButton() {
  return (
    <Form method="post" action="/logout">
      <button
        className="rounded bg-white py-1 px-2 text-sm text-teal-500 hover:bg-teal-100"
        type="submit"
      >
        Logout
      </button>
    </Form>
  );
}
