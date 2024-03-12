import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, filename } = body;

    if (!email || !filename) {
      return new NextResponse("Missing data", { status: 500 });
    }

    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // if (userAlreadyExist?.id) {
    //   return new NextResponse("User already exist", { status: 500 });
    // }

    // const hashedPassword = await bcrypt.hash(password, 12);
    if (userAlreadyExist?.id) {
      const newUser = await prisma.userdata.findFirst({
        where: {
          email: email,
          filename: filename,
        },
      });

      return NextResponse.json(newUser);
    }
  } catch (err: any) {
    console.log("REGISTER_ERR: " + err);
    return new NextResponse(err, { status: 500 });
  }
}
