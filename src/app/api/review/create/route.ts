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

    if (session.user.role !== 'AUTHOR') {
      return NextResponse.json(
        { error: 'Only authors can submit reviews' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { submissionId, comments, recommendation } = body;

    if (!submissionId || !comments || !recommendation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify submission is assigned to this author
    const submission = await prisma.submission.findFirst({
      where: {
        id: submissionId,
        assignedAuthorId: session.user.id,
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found or not assigned to you' },
        { status: 404 }
      );
    }

    const review = await prisma.review.create({
      data: {
        submissionId,
        authorId: session.user.id,
        comments,
        recommendation,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        submission: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Update submission status to UNDER_REVIEW if it was PENDING
    if (submission.status === 'PENDING') {
      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'UNDER_REVIEW' },
      });
    }

    return NextResponse.json({
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}