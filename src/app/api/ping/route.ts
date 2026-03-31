import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Tiny harmless query similar to your Supabase example
    await prisma.user.findFirst({
      select: { id: true },
    });

    return NextResponse.json({
      ok: true,
      database: true,
      time: Date.now(),
    });
  } catch (error) {
    console.error("[PING ERROR]", error);

    return NextResponse.json(
      {
        ok: false,
        database: false,
        time: Date.now(),
      },
      { status: 500 },
    );
  }
}
