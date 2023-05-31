import { Link } from "@remix-run/react";

import type { User } from "~/models/user.server";
import Layout from "~/components/Layout";
import Button from "~/components/Button";
import { ProfileForm } from "~/components/forms/profile/form";

interface ProfileViewProps {
  user: User;
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <Layout>
      <div className="w-full bg-white p-8">
        <h2 className="text-lg font-bold">Profile</h2>
        <ProfileForm user={user} />
        <hr className="my-8" />

        <h2 className="text-lg font-bold">Password</h2>
        <Link to="/update-password">
          <Button type="button">Update Password</Button>
        </Link>

        <hr />

        <h2 className="text-lg font-bold">Invite User</h2>
        <Link to="/invite">
          <Button type="button">Invite User</Button>
        </Link>
      </div>
    </Layout>
  );
}
