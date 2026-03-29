import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import StudentDashboardClient from '@/components/dashboards/StudentDashboardClient';

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'STUDENT') {
    redirect('/');
  }

  return <StudentDashboardClient />;
}