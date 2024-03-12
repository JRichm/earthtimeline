import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
      try {
        const jsonData = await req.json()
        const testEntry = await prisma.test.create({
            data: {
                input: jsonData.input
            }
        })

        return NextResponse.json({
            message: 'POST request successful' 
        })
      } catch (error) {
        console.error('Error handling form data:', error);
        return NextResponse.json({
            message: 'Internal server error' 
        })
      }
    } else {
        return NextResponse.json({
            message: 'Internal server error' 
        })
    }
  }
  
  export async function PUT(req: NextRequest, res: NextResponse) {
    console.log('PUT');
    // Implement your PUT logic here
  
    return NextResponse.json({
        message: 'PUT request successful' 
    })
  }
  
  export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method === 'GET') {
        try {
            const testEntries = await prisma.test.findMany();
            return NextResponse.json({
                testEntries,
            });
        } catch (error) {
            console.error('Error fetching test entries:', error);
            return NextResponse.json({
                message: 'Internal server error',
            });
        }
    } else {
        return NextResponse.json({
            message: 'Internal server error',
        });
    }
  }
  
  export async function DELETE(req: NextRequest, res: NextResponse) {
    console.log('DELETE');
    // Implement your DELETE logic here
  
    return NextResponse.json({
        message: 'DELETE request successful' 
    })
  }