import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "../../../../../lib/crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields must be filled out." },
      { status: 400 }
    );
  }

  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) {
    return NextResponse.json(
      { message: "This email has already been registered." },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);
  const emailEncrypted = encrypt(email);
  const bioEncrypted = encrypt("");

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hash,
      emailEncrypted,
      bioEncrypted,
    },
  });

  return NextResponse.json({ ok: true });
}
