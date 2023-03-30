import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonComponentProps extends ButtonProps {
  /* Your additional props can be defined here */
}

function ButtonComponent(props: ButtonComponentProps) {
  const { children, ...rest } = props;
  return (
    <button
      className="w-full rounded bg-teal-500 py-2 px-4 text-white hover:bg-teal-600 focus:bg-teal-400"
      {...rest}
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
