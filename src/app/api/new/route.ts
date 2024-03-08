// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest, res: NextResponse) {
//     console.log('POST');
//     try {
//         const { title, description, date } = req.body.json()

//         const newevent = await prisma.datedEvents.create({
//             data: {
//                 eventName: title, 
//                 description,
//                 date: new Date(date)
//             }
//         })

//         console.log('event created: ', newEvent)

//         return NextResponse.json({
//             message: 'POST request successful',
//             event: newEvent,
//         });
//     } catch (error) {
//         console.error('Error creating event:', error);
//         return NextResponse.json({
//             error: 'Error creating event',
//         }, { status: 500 });
//     } finally {
//         await prisma.$disconnect(); // Close the Prisma client connection
//     }
// }

// export async function PUT(req: NextRequest, res: NextResponse) {
//     console.log('PUT');
//     // Implement your PUT logic here

//     return NextResponse.json({
//         message: 'PUT request successful' 
//     })
// }

// export async function GET(req: NextRequest, res: NextResponse) {
//     console.log('GET');
//     // Implement your GET logic here

//     return NextResponse.json({
//         message: 'GET request successful' 
//     })
// }

// export async function DELETE(req: NextRequest, res: NextResponse) {
//     console.log('DELETE');
//     // Implement your DELETE logic here

//     return NextResponse.json({
//         message: 'DELETE request successful' 
//     })
// }


// // export async function POST(req: NextRequest, res: NextResponse) {
// //     if (req.method === 'POST') {
// //       try {
// //         const jsonData = await req.json()

// //         console.log("jsonData")
// //         console.log(jsonData)

// //         const testEntry = await prisma.test.create({
// //             data: {
// //                 input: jsonData.input
// //             }
// //         })

// //         console.log(testEntry)

// //         return NextResponse.json({
// //             message: 'POST request successful' 
// //         })
// //       } catch (error) {
// //         console.error('Error handling form data:', error);
// //         return NextResponse.json({
// //             message: 'Internal server error' 
// //         })
// //       }
// //     } else {
// //         return NextResponse.json({
// //             message: 'Internal server error' 
// //         })
// //     }
// //   }
  
// //   export async function PUT(req: NextRequest, res: NextResponse) {
// //     console.log('PUT');
// //     // Implement your PUT logic here
  
// //     return NextResponse.json({
// //         message: 'PUT request successful' 
// //     })
// //   }
  
// //   export async function GET(req: NextRequest, res: NextResponse) {
// //     if (req.method === 'GET') {
// //         try {
// //             const testEntries = await prisma.test.findMany();
// //             return NextResponse.json({
// //                 testEntries,
// //             });
// //         } catch (error) {
// //             console.error('Error fetching test entries:', error);
// //             return NextResponse.json({
// //                 message: 'Internal server error',
// //             });
// //         }
// //     } else {
// //         return NextResponse.json({
// //             message: 'Internal server error',
// //         });
// //     }
// //   }
  
// //   export async function DELETE(req: NextRequest, res: NextResponse) {
// //     console.log('DELETE');
// //     // Implement your DELETE logic here
  
// //     return NextResponse.json({
// //         message: 'DELETE request successful' 
// //     })
// //   }