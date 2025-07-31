import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { decrypt } from "../../../lib/crypto";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  const email = decrypt(user.emailEncrypted);
  const biography = user.bioEncrypted ? decrypt(user.bioEncrypted) : "";

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
      <p className="mt-4">
        <strong>Email:</strong>
        {email}
      </p>
      <p className="mt-4">
        <strong>Introduction:</strong>
        {biography}
      </p>

      <section className="mt-8">
        <h2 className="text-xl mb-4">Update Private Personal Material</h2>
        <ProfileForm privateData={{ name: user.name, email, bio: biography }} />
      </section>

      <form method="post" action="/api/auth/signout">
        <input type="hidden" name="callbackUrl" value="/login" />
        <button
          type="submit"
          className="mt-8 px-4 py-2 bg-red-400 text-white rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
