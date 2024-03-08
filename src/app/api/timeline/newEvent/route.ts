import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const events = await prisma.datedEvents.findMany()
        return NextResponse.json({
            events
        })
    } catch (error) {
        console.error('Error fetching events: ', error)
        return NextResponse.json({
            message: "Internal server error"
        })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const jsonData = await req.json()
    console.log(jsonData)

    const newEvent = await prisma.datedEvents.create({
        data: {
            eventName: jsonData.eventName,
            eventDate: new Date(jsonData.eventDate),
            eventEndDate: new Date(jsonData.eventEndDate),
            eventDetails: jsonData.eventDetails
        }
    })

    console.log(newEvent)

    return NextResponse.json({ message: "POST endpoint success" })
}

export async function PUT(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "PUT endpoint success" })
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "DELETE endpoint success" })
}