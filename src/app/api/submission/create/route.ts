import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only students can create submissions
    if (session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { error: 'Only students can create submissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, abstract, fileUrl } = body;

    if (!title || !abstract || !fileUrl) {
      return NextResponse.json(
        { error: 'Title, abstract, and file are required' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        title,
        abstract,
        fileUrl,
        studentId: session.user.id,
        status: 'PENDING',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Submission created successfully',
      submission,
    });
  } catch (error) {
    console.error('Submission creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}