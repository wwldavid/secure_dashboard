import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "../../../../../lib/crypto";

const prisma = new PrismaClient();

// POST /api/auth/signup
export async function POST(req) {
  const { name, email, password } = await req.json();

  // 简单校验
  if (!name || !email || !password) {
    return NextResponse.json({ message: "所有字段都是必填" }, { status: 400 });
  }

  // 检查邮箱是否已被注册
  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) {
    return NextResponse.json({ message: "邮箱已被注册" }, { status: 400 });
  }

  // 密码哈希
  const hash = await bcrypt.hash(password, 10);
  const emailEncrypted = encrypt(email);
  const bioEncrypted = encrypt("");

  // 存入数据库
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
