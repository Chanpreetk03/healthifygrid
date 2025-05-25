import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Fetch the existing profile by userId
        let profile = await prisma.profile.findUnique({
            where: { userId: body.userId },
        });

        if (profile) {
            // If the profile exists, append the cost to the existing array
            profile = await prisma.profile.update({
                where: { userId: body.userId },
                data: {
                    cost: {
                        push: body.cost, // Append the new cost to the existing array
                    },
                },
            });
        } else {
            // If no profile exists, create a new one
            profile = await prisma.profile.create({
                data: {
                    userId: body.userId,
                    cost: [body.cost], // Initialize the cost array with the new cost
                },
            });
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}