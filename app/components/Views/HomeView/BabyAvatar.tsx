import * as React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { Form } from "@remix-run/react";

import Button from "~/components/Button";

interface BabyAvatarProps {
  imgUrl?: string | null;
  firstName: string;
  lastName: string;
}

export function BabyAvatar({ imgUrl, firstName, lastName }: BabyAvatarProps) {
  const [editPhoto, setEditPhoto] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<
    string | ArrayBuffer | null
  >(imgUrl ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="relative">
        <img
          src={imgUrl || "default.png"}
          className="h-52 w-52 rounded-full border-4 object-cover"
          alt={`${firstName} ${lastName}`}
        />
        <button
          type="button"
          className="absolute right-6 bottom-1 rounded-full border-2 border-teal-500 bg-white p-2"
          onClick={() => setEditPhoto(true)}
        >
          <BsFillPencilFill />
        </button>
      </div>

      {editPhoto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 flex w-full flex-col items-center justify-center rounded-md bg-white p-4">
            <h2 className="text-lg font-bold">Update {firstName}'s Photo</h2>
            {previewUrl && (
              <img
                src={previewUrl.toString()}
                alt="Preview"
                className="h-52 w-52 rounded-full border-4 object-cover"
              />
            )}

            <Form method="post" reloadDocument encType="multipart/form-data">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
              />

              <div className="flex">
                <Button
                  purpose="tertiary"
                  type="button"
                  onClick={() => {
                    setEditPhoto(false);
                    setPreviewUrl(imgUrl ?? null);
                  }}
                  size="small"
                >
                  Close
                </Button>

                <Button purpose="primary" type="submit" size="small">
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
