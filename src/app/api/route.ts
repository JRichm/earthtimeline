import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, test } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const inputData: test = req.body

        const result = await prisma.test.create({ data: inputData })

        await prisma.$disconnect()
        res.status(200).json({ message: 'Operation Successful' })
        console.log('success')
    } else {
        console.log('false')
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}