import { ProfileButton } from "~/components/Layout/ProfileButton";

interface HeaderProps {
  title?: string | React.ReactNode;
}

export function Header(props: HeaderProps) {
  const { title = "Ariana Guerra" } = props;

  return (
    <header className="flex h-16 justify-center rounded-md p-4">
      <h1 className="text-2xl text-white">{title}</h1>
      <div className="absolute right-2 top-4">
        <ProfileButton />
      </div>
    </header>
  );
}
