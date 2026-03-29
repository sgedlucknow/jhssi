import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
    const { submissionId, status } = body;

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: 'Submission ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = [
      'PENDING',
      'UNDER_REVIEW',
      'REVISION_REQUESTED',
      'ACCEPTED',
      'REJECTED',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { status },
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
      message: 'Submission status updated successfully',
      submission,
    });
  } catch (error) {
    console.error('Error updating submission status:', error);
    return NextResponse.json(
      { error: 'Failed to update submission status' },
      { status: 500 }
    );
  }
}