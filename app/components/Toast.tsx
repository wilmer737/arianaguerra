import * as React from "react";

interface ToastProps {
  message?: string;
}

export function Toast({ message }: ToastProps) {
  const [show, setShow] = React.useState(!!message);

  React.useEffect(() => {
    if (message) {
      setShow(true);

      const timeout = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-4 right-2 left-2 flex h-14 items-center justify-center rounded-md bg-white px-8 shadow-lg">
      {message}
    </div>
  );
}
