import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { encrypt } from "../../../../lib/crypto";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  let bodyData;
  try {
    bodyData = await req.json();
  } catch (e) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  const { name, email, bio } = bodyData;

  const errors = [];

  if (
    typeof name !== "string" ||
    name.trim().length < 3 ||
    name.trim().length > 30 ||
    !/^[A-Za-z ]+$/.test(name.trim())
  ) {
    errors.push({
      param: "name",
      msg: "Name must be 3-30 letters or spaces only",
    });
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.push({ param: "email", msg: "Invalid email format" });
  }

  if (typeof bio !== "string" || bio.length > 800 || /[<>]/.test(bio)) {
    errors.push({
      param: "bio",
      msg: "Introduction must be ≤800 characters and not include < or >",
    });
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const emailEncrypted = encrypt(email.trim());
  const bioEncrypted = encrypt(bio);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name.trim(),
      emailEncrypted,
      bioEncrypted,
    },
  });

  return NextResponse.json({ ok: true });
}
