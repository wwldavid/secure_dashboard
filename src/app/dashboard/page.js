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
    <div className="p-8 w-4/5 mx-auto">
      <div className="flex items-center gap-20">
        <h1 className="text-3xl font-bold text-[#165e83]">
          Welcome, {session.user.name}
        </h1>
        <form method="post" action="/api/auth/signout">
          <input type="hidden" name="callbackUrl" value="/login" />
          <button
            type="submit"
            className="px-4 py-1 bg-[#a69425] text-white rounded"
          >
            Logout
          </button>
        </form>
      </div>
      <div className="border-1 border-[#3b7960] rounded-xl p-4 mt-2">
        <div className="mt-4">
          <strong>Email:</strong>
          <p className="text-[#69821b]">{email}</p>
        </div>
        <div className="mt-4">
          <strong>Introduction:</strong> <br />
          <p className="text-[#69821b]">{biography}</p>
        </div>
      </div>

      <section className="mt-16 w-2/5">
        <h2 className="text-xl mb-4">Update Private Personal Material</h2>
        <ProfileForm privateData={{ name: user.name, email, bio: biography }} />
      </section>
    </div>
  );
}
