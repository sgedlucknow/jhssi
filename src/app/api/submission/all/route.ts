import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET handler - Fetch all submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const submissions = await prisma.submission.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedAuthor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviews: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// PATCH handler - Assign author to submission (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { submissionId, authorId } = body;

    if (!submissionId || !authorId) {
      return NextResponse.json(
        { error: 'Submission ID and Author ID are required' },
        { status: 400 }
      );
    }

    // Verify author has AUTHOR role
    const author = await prisma.user.findFirst({
      where: {
        id: authorId,
        role: 'AUTHOR',
      },
    });

    if (!author) {
      return NextResponse.json(
        { error: 'Invalid author ID or user is not an author' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        assignedAuthorId: authorId,
        status: 'UNDER_REVIEW',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignedAuthor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Submission assigned successfully',
      submission,
    });
  } catch (error) {
    console.error('Error assigning submission:', error);
    return NextResponse.json(
      { error: 'Failed to assign submission' },
      { status: 500 }
    );
  }
}