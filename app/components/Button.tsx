import React from "react";

type ButtonHTMLProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends ButtonHTMLProps {
  purpose?: "primary" | "secondary" | "tertiary";
  width?: "full" | "auto";
  size?: "small" | "medium" | "large";
}

const widths = {
  full: "w-full",
  auto: "w-auto",
};

const sizes = {
  small: "text-sm py-1 px-2",
  medium: "text-base py-2 px-4",
  large: "text-lg py-3 px-6",
};

const purposes = {
  primary: "bg-teal-500 hover:bg-teal-600 focus:bg-teal-400",
  secondary: "bg-teal-900 hover:bg-teal-600 focus:bg-teal-100",
  tertiary: "bg-transparent hover:bg-teal-200 focus:bg-teal-100",
};

function Button(props: ButtonProps) {
  const {
    children,
    purpose = "primary",
    width = "full",
    size = "medium",
    ...rest
  } = props;

  const widthStyle = widths[width];
  const sizeStyles = sizes[size];
  const purposeStyles = purposes[purpose];

  return (
    <button
      className={`rounded text-white ${widthStyle} ${sizeStyles} ${purposeStyles}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
