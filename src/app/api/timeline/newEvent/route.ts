import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "GET endpoint success" })
}

export async function POST(req: NextRequest, res: NextResponse) {
    const jsonData = await req.json()
    console.log(jsonData)

    return NextResponse.json({ message: "POST endpoint success" })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "PUT endpoint success" })
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "DELETE endpoint success" })
}