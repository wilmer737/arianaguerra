import { LoginForm } from "~/components/forms/login/form";

export function LoginView() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 items-center justify-center px-8">
        <div className="w-full rounded-md bg-white p-4">
          <h1 className="mb-4 text-xl">Please Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
