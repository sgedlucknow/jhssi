// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useSession, signOut } from 'next-auth/react';
// // import { Users, FileText, TrendingUp, Settings } from 'lucide-react';

// // // Import existing ad admin components
// // import DashboardLayout from '@/components/admin/DashboardLayout';
// // import { GET } from '@/app/api/ads/route';

// // type View = 'submissions' | 'users' | 'ads';

// // interface User {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: string;
// //   createdAt: string;
// //   _count: {
// //     submissions: number;
// //     assignedSubmissions: number;
// //     reviews: number;
// //   };
// // }

// // interface Submission {
// //   id: string;
// //   title: string;
// //   abstract: string;
// //   fileUrl: string;
// //   status: string;
// //   createdAt: string;
// //   student: {
// //     id: string;
// //     name: string;
// //     email: string;
// //   };
// //   assignedAuthor?: {
// //     id: string;
// //     name: string;
// //     email: string;
// //   };
// //   reviews: Array<{
// //     id: string;
// //     comments: string;
// //     recommendation: string;
// //     author: {
// //       name: string;
// //     };
// //   }>;
// // }

// // export default function AdminDashboardClient() {
// //   const { data: session } = useSession();
// //   const [currentView, setCurrentView] = useState<'users'|'submissions'|'ads'>('submissions');
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [submissions, setSubmissions] = useState<Submission[]>([]);
// //   const [authors, setAuthors] = useState<User[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const [usersRes, submissionsRes] = await Promise.all([
// //         fetch('/api/users'),
// //         fetch('/api/submission/all'),
// //       ]);

// //       if (!usersRes.ok) {
// //       throw new Error(`Users API error: ${usersRes.status}`);
// //     }

// //       if (!submissionsRes.ok) {
// //       throw new Error(`Submissions API error: ${submissionsRes.status}`);
// //     }

// //       const usersData = await usersRes.json();
// //       const submissionsData = await submissionsRes.json();

// //       setUsers(usersData.users || []);
// //       setSubmissions(submissionsData.submissions || []);
// //       setAuthors(usersData.users?.filter((u: User) => u.role === 'AUTHOR') || []);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRoleChange = async (userId: string, newRole: string) => {
// //     try {
// //       const response = await fetch('/api/users/role', {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ userId, role: newRole }),
// //       });

// //       if (response.ok) {
// //         fetchData();
// //         alert('Role updated successfully!');
// //       } else {
// //         alert('Failed to update role');
// //       }
// //     } catch (error) {
// //       console.error('Error updating role:', error);
// //       alert('Failed to update role');
// //     }
// //   };

// //   const handleAssignAuthor = async (submissionId: string, authorId: string) => {
// //     try {
// //       const response = await fetch('/api/submission/all', {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ submissionId, authorId }),
// //       });

// //       if (response.ok) {
// //         fetchData();
// //         alert('Submission assigned successfully!');
// //       } else {
// //         alert('Failed to assign submission');
// //       }
// //     } catch (error) {
// //       console.error('Error assigning submission:', error);
// //       alert('Failed to assign submission');
// //     }
// //   };

// //   const handleStatusChange = async (submissionId: string, status: string) => {
// //     try {
// //       const response = await fetch('/api/submission/status', {
// //         method: 'PATCH',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ submissionId, status }),
// //       });

// //       if (response.ok) {
// //         fetchData();
// //         alert('Status updated successfully!');
// //       } else {
// //         alert('Failed to update status');
// //       }
// //     } catch (error) {
// //       console.error('Error updating status:', error);
// //       alert('Failed to update status');
// //     }
// //   };

// //   const getStatusBadge = (status: string) => {
// //     const badges: Record<string, string> = {
// //       PENDING: 'bg-yellow-100 text-yellow-800',
// //       UNDER_REVIEW: 'bg-blue-100 text-blue-800',
// //       REVISION_REQUESTED: 'bg-orange-100 text-orange-800',
// //       ACCEPTED: 'bg-green-100 text-green-800',
// //       REJECTED: 'bg-red-100 text-red-800',
// //     };
// //     return badges[status] || badges.PENDING;
// //   };

// //   const getRoleBadge = (role: string) => {
// //     const badges: Record<string, string> = {
// //       STUDENT: 'bg-blue-100 text-blue-800',
// //       AUTHOR: 'bg-purple-100 text-purple-800',
// //       ADMIN: 'bg-red-100 text-red-800',
// //     };
// //     return badges[role] || badges.STUDENT;
// //   };

// //   // If viewing ads, show existing ad dashboard
// //   if (currentView === 'ads') {
// //     return <DashboardLayout />;
// //   }

  

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow">
// //         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
// //             <p className="text-sm text-gray-600">Welcome, {session?.user?.name}</p>
// //           </div>
// //           <button
// //             onClick={() => signOut({ callbackUrl: '/login' })}
// //             className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
// //           >
// //             Sign Out
// //           </button>
// //         </div>
// //       </header>

// //       {/* Navigation Tabs */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <nav className="flex space-x-8">
// //             <button
// //               onClick={() => setCurrentView('submissions')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 currentView === 'submissions'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               <FileText className="inline w-5 h-5 mr-2" />
// //               Submissions
// //             </button>
// //             <button
// //               onClick={() => setCurrentView('users')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 currentView === 'users'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               <Users className="inline w-5 h-5 mr-2" />
// //               Users
// //             </button>
// //             <button
// //               onClick={() => setCurrentView('ads')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 currentView === 'ads'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               <TrendingUp className="inline w-5 h-5 mr-2" />
// //               Ad Analytics
// //             </button>
// //           </nav>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
// //         {loading ? (
// //           <div className="flex items-center justify-center h-64">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Submissions View */}
// //             {currentView === 'submissions' && (
// //               <div>
// //                 <div className="mb-6">
// //                   <h2 className="text-2xl font-bold text-gray-900">Manage Submissions</h2>
// //                   <p className="text-gray-600">Assign reviewers and update submission status</p>
// //                 </div>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Total</p>
// //                     <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
// //                   </div>
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Pending</p>
// //                     <p className="text-2xl font-bold text-yellow-600">
// //                       {submissions.filter(s => s.status === 'PENDING').length}
// //                     </p>
// //                   </div>
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Under Review</p>
// //                     <p className="text-2xl font-bold text-blue-600">
// //                       {submissions.filter(s => s.status === 'UNDER_REVIEW').length}
// //                     </p>
// //                   </div>
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Accepted</p>
// //                     <p className="text-2xl font-bold text-green-600">
// //                       {submissions.filter(s => s.status === 'ACCEPTED').length}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Submissions List */}
// //                 <div className="bg-white rounded-lg shadow overflow-hidden">
// //                   {submissions.length === 0 ? (
// //                     <div className="p-12 text-center">
// //                       <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                       <p className="text-gray-600">No submissions yet</p>
// //                     </div>
// //                   ) : (
// //                     <div className="divide-y divide-gray-200">
// //                       {submissions.map((submission) => (
// //                         <div key={submission.id} className="p-6">
// //                           <div className="flex justify-between items-start mb-4">
// //                             <div className="flex-1">
// //                               <h3 className="text-lg font-semibold text-gray-900 mb-1">
// //                                 {submission.title}
// //                               </h3>
// //                               <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
// //                               <p className="text-sm text-gray-500">
// //                                 Submitted by: {submission.student.name} ({submission.student.email})
// //                               </p>
// //                               {submission.assignedAuthor && (
// //                                 <p className="text-sm text-gray-500">
// //                                   Assigned to: {submission.assignedAuthor.name}
// //                                 </p>
// //                               )}
// //                             </div>
// //                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(submission.status)}`}>
// //                               {submission.status.replace('_', ' ')}
// //                             </span>
// //                           </div>

// //                           <div className="flex gap-3 mb-4">
// //                             <a
// //                               href={submission.fileUrl}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
// //                             >
// //                               View Manuscript →
// //                             </a>
// //                           </div>

// //                           {/* Admin Actions */}
// //                           <div className="flex flex-wrap gap-3">
// //                             <div className="flex items-center gap-2">
// //                               <label className="text-sm font-medium text-gray-700">Assign to:</label>
// //                               <select
// //                                 value={submission.assignedAuthor?.id || ''}
// //                                 onChange={(e) => handleAssignAuthor(submission.id, e.target.value)}
// //                                 className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
// //                               >
// //                                 <option value="">Select Author</option>
// //                                 {authors.map((author) => (
// //                                   <option key={author.id} value={author.id}>
// //                                     {author.name}
// //                                   </option>
// //                                 ))}
// //                               </select>
// //                             </div>

// //                             <div className="flex items-center gap-2">
// //                               <label className="text-sm font-medium text-gray-700">Status:</label>
// //                               <select
// //                                 value={submission.status}
// //                                 onChange={(e) => handleStatusChange(submission.id, e.target.value)}
// //                                 className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
// //                               >
// //                                 <option value="PENDING">Pending</option>
// //                                 <option value="UNDER_REVIEW">Under Review</option>
// //                                 <option value="REVISION_REQUESTED">Revision Requested</option>
// //                                 <option value="ACCEPTED">Accepted</option>
// //                                 <option value="REJECTED">Rejected</option>
// //                               </select>
// //                             </div>
// //                           </div>

// //                           {/* Reviews */}
// //                           {submission.reviews.length > 0 && (
// //                             <div className="mt-4 pt-4 border-t border-gray-200">
// //                               <h4 className="font-semibold text-gray-900 mb-2">Reviews</h4>
// //                               {submission.reviews.map((review) => (
// //                                 <div key={review.id} className="bg-gray-50 rounded-lg p-3 mb-2">
// //                                   <div className="flex justify-between items-start mb-1">
// //                                     <span className="text-sm font-medium">{review.author.name}</span>
// //                                     <span className={`text-xs px-2 py-1 rounded-full ${
// //                                       review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
// //                                       review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
// //                                       'bg-orange-100 text-orange-800'
// //                                     }`}>
// //                                       {review.recommendation}
// //                                     </span>
// //                                   </div>
// //                                   <p className="text-sm text-gray-700">{review.comments}</p>
// //                                 </div>
// //                               ))}
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Users View */}
// //             {currentView === 'users' && (
// //               <div>
// //                 <div className="mb-6">
// //                   <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
// //                   <p className="text-gray-600">Update user roles and permissions</p>
// //                 </div>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Students</p>
// //                     <p className="text-2xl font-bold text-blue-600">
// //                       {users.filter(u => u.role === 'STUDENT').length}
// //                     </p>
// //                   </div>
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Authors</p>
// //                     <p className="text-2xl font-bold text-purple-600">
// //                       {users.filter(u => u.role === 'AUTHOR').length}
// //                     </p>
// //                   </div>
// //                   <div className="bg-white rounded-lg shadow p-6">
// //                     <p className="text-sm text-gray-600">Admins</p>
// //                     <p className="text-2xl font-bold text-red-600">
// //                       {users.filter(u => u.role === 'ADMIN').length}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Users Table */}
// //                 <div className="bg-white rounded-lg shadow overflow-hidden">
// //                   <table className="min-w-full divide-y divide-gray-200">
// //                     <thead className="bg-gray-50">
// //                       <tr>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           User
// //                         </th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Role
// //                         </th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Stats
// //                         </th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Joined
// //                         </th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                           Actions
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {users.map((user) => (
// //                         <tr key={user.id} className="hover:bg-gray-50">
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div>
// //                               <div className="text-sm font-medium text-gray-900">{user.name}</div>
// //                               <div className="text-sm text-gray-500">{user.email}</div>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
// //                               {user.role}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                             {user.role === 'STUDENT' && `${user._count.submissions} submissions`}
// //                             {user.role === 'AUTHOR' && `${user._count.reviews} reviews`}
// //                             {user.role === 'ADMIN' && 'Full access'}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                             {new Date(user.createdAt).toLocaleDateString()}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                             <select
// //                               value={user.role}
// //                               onChange={(e) => handleRoleChange(user.id, e.target.value)}
// //                               className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
// //                             >
// //                               <option value="STUDENT">Student</option>
// //                               <option value="AUTHOR">Author</option>
// //                               <option value="ADMIN">Admin</option>
// //                             </select>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { Users, FileText, TrendingUp } from 'lucide-react';
// import DashboardLayout from '@/components/admin/DashboardLayout';

// type View = 'submissions' | 'users' | 'ads';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   _count: {
//     submissions: number;
//     assignedSubmissions: number;
//     reviews: number;
//   };
// }

// interface Review {
//   id: string;
//   comments: string;
//   recommendation: string;
//   author: {
//     name: string;
//   };
// }

// interface Submission {
//   id: string;
//   title: string;
//   abstract: string;
//   fileUrl: string;
//   status: string;
//   createdAt: string;
//   student: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   assignedAuthor?: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   reviews: Review[];
// }

// export default function AdminDashboardClient() {
//   const { data: session } = useSession();
//   const [currentView, setCurrentView] = useState<View>('submissions');
//   const [users, setUsers] = useState<User[]>([]);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [authors, setAuthors] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const [usersRes, submissionsRes] = await Promise.all([
//         fetch('/api/users'),
//         fetch('/api/submission/all'),
//       ]);

//       if (!usersRes.ok) {
//         throw new Error(`Users API error: ${usersRes.status}`);
//       }

//       if (!submissionsRes.ok) {
//         throw new Error(`Submissions API error: ${submissionsRes.status}`);
//       }

//       const usersData = await usersRes.json();
//       const submissionsData = await submissionsRes.json();

//       setUsers(usersData.users || []);
//       setSubmissions(submissionsData.submissions || []);
//       setAuthors(usersData.users?.filter((u: User) => u.role === 'AUTHOR') || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error instanceof Error ? error.message : 'Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleChange = async (userId: string, newRole: string) => {
//     try {
//       const response = await fetch('/api/users/role', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, role: newRole }),
//       });

//       if (response.ok) {
//         await fetchData();
//         alert('Role updated successfully!');
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to update role');
//       }
//     } catch (error) {
//       console.error('Error updating role:', error);
//       alert('Failed to update role');
//     }
//   };

//   const handleAssignAuthor = async (submissionId: string, authorId: string) => {
//     if (!authorId) return;
    
//     try {
//       const response = await fetch('/api/submission/all', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ submissionId, authorId }),
//       });

//       if (response.ok) {
//         await fetchData();
//         alert('Submission assigned successfully!');
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to assign submission');
//       }
//     } catch (error) {
//       console.error('Error assigning submission:', error);
//       alert('Failed to assign submission');
//     }
//   };

//   const handleStatusChange = async (submissionId: string, status: string) => {
//     try {
//       const response = await fetch('/api/submission/status', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ submissionId, status }),
//       });

//       if (response.ok) {
//         await fetchData();
//         alert('Status updated successfully!');
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert('Failed to update status');
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const badges: Record<string, string> = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       UNDER_REVIEW: 'bg-blue-100 text-blue-800',
//       REVISION_REQUESTED: 'bg-orange-100 text-orange-800',
//       ACCEPTED: 'bg-green-100 text-green-800',
//       REJECTED: 'bg-red-100 text-red-800',
//     };
//     return badges[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getRoleBadge = (role: string) => {
//     const badges: Record<string, string> = {
//       STUDENT: 'bg-blue-100 text-blue-800',
//       AUTHOR: 'bg-purple-100 text-purple-800',
//       ADMIN: 'bg-red-100 text-red-800',
//     };
//     return badges[role] || 'bg-gray-100 text-gray-800';
//   };

//   if (currentView === 'ads') {
//     return <DashboardLayout />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//             <p className="text-sm text-gray-600">Welcome, {session?.user?.name}</p>
//           </div>
//           <button
//             onClick={() => signOut({ callbackUrl: '/login' })}
//             className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//           >
//             Sign Out
//           </button>
//         </div>
//       </header>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex space-x-8">
//             <button
//               onClick={() => setCurrentView('submissions')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 currentView === 'submissions'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <FileText className="inline w-5 h-5 mr-2" />
//               Submissions
//             </button>
//             <button
//               onClick={() => setCurrentView('users')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 currentView === 'users'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <Users className="inline w-5 h-5 mr-2" />
//               Users
//             </button>
//             <button
//               onClick={() => setCurrentView('ads')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 currentView === 'ads'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               <TrendingUp className="inline w-5 h-5 mr-2" />
//               Ad Analytics
//             </button>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={fetchData}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Submissions View */}
//             {currentView === 'submissions' && (
//               <div>
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Manage Submissions</h2>
//                   <p className="text-gray-600">Assign reviewers and update submission status</p>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Total</p>
//                     <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
//                   </div>
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Pending</p>
//                     <p className="text-2xl font-bold text-yellow-600">
//                       {submissions.filter(s => s.status === 'PENDING').length}
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Under Review</p>
//                     <p className="text-2xl font-bold text-blue-600">
//                       {submissions.filter(s => s.status === 'UNDER_REVIEW').length}
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Accepted</p>
//                     <p className="text-2xl font-bold text-green-600">
//                       {submissions.filter(s => s.status === 'ACCEPTED').length}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Submissions List */}
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                   {submissions.length === 0 ? (
//                     <div className="p-12 text-center">
//                       <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-600">No submissions yet</p>
//                     </div>
//                   ) : (
//                     <div className="divide-y divide-gray-200">
//                       {submissions.map((submission) => (
//                         <div key={submission.id} className="p-6">
//                           <div className="flex justify-between items-start mb-4">
//                             <div className="flex-1">
//                               <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                                 {submission.title}
//                               </h3>
//                               <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
//                               <p className="text-sm text-gray-500">
//                                 Submitted by: {submission.student.name} ({submission.student.email})
//                               </p>
//                               {submission.assignedAuthor && (
//                                 <p className="text-sm text-gray-500">
//                                   Assigned to: {submission.assignedAuthor.name}
//                                 </p>
//                               )}
//                             </div>
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(submission.status)}`}>
//                               {submission.status.replace('_', ' ')}
//                             </span>
//                           </div>

//                           <div className="flex gap-3 mb-4">
//                             <a
//                               href={submission.fileUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                             >
//                               View Manuscript →
//                             </a>
//                           </div>

//                           {/* Admin Actions */}
//                           <div className="flex flex-wrap gap-3">
//                             <div className="flex items-center gap-2">
//                               <label className="text-sm font-medium text-gray-700">Assign to:</label>
//                               <select
//                                 value={submission.assignedAuthor?.id || ''}
//                                 onChange={(e) => handleAssignAuthor(submission.id, e.target.value)}
//                                 className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                               >
//                                 <option value="">Select Author</option>
//                                 {authors.map((author) => (
//                                   <option key={author.id} value={author.id}>
//                                     {author.name}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>

//                             <div className="flex items-center gap-2">
//                               <label className="text-sm font-medium text-gray-700">Status:</label>
//                               <select
//                                 value={submission.status}
//                                 onChange={(e) => handleStatusChange(submission.id, e.target.value)}
//                                 className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                               >
//                                 <option value="PENDING">Pending</option>
//                                 <option value="UNDER_REVIEW">Under Review</option>
//                                 <option value="REVISION_REQUESTED">Revision Requested</option>
//                                 <option value="ACCEPTED">Accepted</option>
//                                 <option value="REJECTED">Rejected</option>
//                               </select>
//                             </div>
//                           </div>

//                           {/* Reviews */}
//                           {submission.reviews && submission.reviews.length > 0 && (
//                             <div className="mt-4 pt-4 border-t border-gray-200">
//                               <h4 className="font-semibold text-gray-900 mb-2">Reviews</h4>
//                               {submission.reviews.map((review) => (
//                                 <div key={review.id} className="bg-gray-50 rounded-lg p-3 mb-2">
//                                   <div className="flex justify-between items-start mb-1">
//                                     <span className="text-sm font-medium">{review.author.name}</span>
//                                     <span className={`text-xs px-2 py-1 rounded-full ${
//                                       review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
//                                       review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
//                                       'bg-orange-100 text-orange-800'
//                                     }`}>
//                                       {review.recommendation}
//                                     </span>
//                                   </div>
//                                   <p className="text-sm text-gray-700">{review.comments}</p>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Users View */}
//             {currentView === 'users' && (
//               <div>
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
//                   <p className="text-gray-600">Update user roles and permissions</p>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Students</p>
//                     <p className="text-2xl font-bold text-blue-600">
//                       {users.filter(u => u.role === 'STUDENT').length}
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Authors</p>
//                     <p className="text-2xl font-bold text-purple-600">
//                       {users.filter(u => u.role === 'AUTHOR').length}
//                     </p>
//                   </div>
//                   <div className="bg-white rounded-lg shadow p-6">
//                     <p className="text-sm text-gray-600">Admins</p>
//                     <p className="text-2xl font-bold text-red-600">
//                       {users.filter(u => u.role === 'ADMIN').length}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Users Table */}
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           User
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Role
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Stats
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Joined
//                         </th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {users.map((user) => (
//                         <tr key={user.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                               <div className="text-sm text-gray-500">{user.email}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
//                               {user.role}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {user.role === 'STUDENT' && `${user._count?.submissions || 0} submissions`}
//                             {user.role === 'AUTHOR' && `${user._count?.reviews || 0} reviews`}
//                             {user.role === 'ADMIN' && 'Full access'}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(user.createdAt).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             <select
//                               value={user.role}
//                               onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                               className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="STUDENT">Student</option>
//                               <option value="AUTHOR">Author</option>
//                               <option value="ADMIN">Admin</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FileText,
  TrendingUp,
  LogOut,
  Bell,
  Search,
  Filter,
  ChevronDown,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  UserX,
  BookOpen,
  Award,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Mail,
  Calendar,
  MessageSquare,
  Share2,
  Bookmark,
  MoreVertical,
  Activity,
  Target,
  Zap,
  Globe,
  Shield,
  Briefcase,
  GraduationCap,
  PenTool,
  FileCheck,
  AlertTriangle,
  Info,
  Home,
  Users2,
  BookOpen as BookOpenIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  Printer,
  Copy,
  Edit,
  Trash2,
  Archive,
  Upload,
  Download as DownloadIcon,
  EyeOff,
  Lock,
  Unlock,
  Shield as ShieldIcon,
  Flag,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Columns,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import DashboardLayout from '@/components/admin/DashboardLayout';

type View = 'submissions' | 'users' | 'ads' | 'analytics' | 'settings';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'pending' | 'under_review' | 'accepted' | 'rejected';
type UserRole = 'all' | 'STUDENT' | 'AUTHOR' | 'ADMIN';
type ViewMode = 'list' | 'grid' | 'table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastActive?: string;
  department?: string;
  institution?: string;
  _count: {
    submissions: number;
    assignedSubmissions: number;
    reviews: number;
  };
}

interface Review {
  id: string;
  comments: string;
  recommendation: string;
  author: {
    name: string;
    id: string;
  };
  createdAt: string;
}

interface Submission {
  id: string;
  title: string;
  abstract: string;
  fileUrl: string;
  status: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  assignedAuthor?: {
    id: string;
    name: string;
    email: string;
  };
  reviews: Review[];
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  icon: any;
}

export default function AdminDashboardClient() {
  const { data: session } = useSession();
  const [currentView, setCurrentView] = useState<View>('submissions');
  const [users, setUsers] = useState<User[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI States
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('all');
  const [userRoleFilter, setUserRoleFilter] = useState<UserRole>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(true);
  
  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      message: 'New submission received',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'success',
      message: 'Submission #1234 was accepted',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      message: '3 submissions pending review',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ]);

  // Activities
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      user: 'John Doe',
      action: 'submitted',
      target: 'Research Paper on AI',
      timestamp: new Date().toISOString(),
      icon: FileText,
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'reviewed',
      target: 'Machine Learning Study',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      icon: CheckCircle,
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'updated role',
      target: 'to AUTHOR',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      icon: UserCheck,
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setRefreshing(true);
    
    try {
      const [usersRes, submissionsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/submission/all'),
      ]);

      if (!usersRes.ok) {
        throw new Error(`Users API error: ${usersRes.status}`);
      }

      if (!submissionsRes.ok) {
        throw new Error(`Submissions API error: ${submissionsRes.status}`);
      }

      const usersData = await usersRes.json();
      const submissionsData = await submissionsRes.json();

      setUsers(usersData.users || []);
      setSubmissions(submissionsData.submissions || []);
      setAuthors(usersData.users?.filter((u: User) => u.role === 'AUTHOR') || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/users/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        await fetchData();
        showNotification('success', 'Role updated successfully!');
      } else {
        const data = await response.json();
        showNotification('error', data.error || 'Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      showNotification('error', 'Failed to update role');
    }
  };

  const handleAssignAuthor = async (submissionId: string, authorId: string) => {
    if (!authorId) return;
    
    try {
      const response = await fetch('/api/submission/all', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, authorId }),
      });

      if (response.ok) {
        await fetchData();
        showNotification('success', 'Submission assigned successfully!');
      } else {
        const data = await response.json();
        showNotification('error', data.error || 'Failed to assign submission');
      }
    } catch (error) {
      console.error('Error assigning submission:', error);
      showNotification('error', 'Failed to assign submission');
    }
  };

  const showNotification = (type: Notification['type'], message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  const handleSelectAll = () => {
    if (currentView === 'submissions') {
      if (selectedItems.length === filteredSubmissions.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(filteredSubmissions.map(s => s.id));
      }
    } else if (currentView === 'users') {
      if (selectedItems.length === filteredUsers.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(filteredUsers.map(u => u.id));
      }
    }
  };

  const handleExport = (type: 'csv' | 'pdf' | 'excel') => {
    showNotification('info', `Exporting as ${type.toUpperCase()}...`);
    setTimeout(() => {
      showNotification('success', `Export completed successfully!`);
    }, 2000);
  };

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      showNotification('warning', 'Please select items first');
      return;
    }
    showNotification('info', `Bulk action: ${action} on ${selectedItems.length} items`);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any }> = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      UNDER_REVIEW: { color: 'bg-blue-100 text-blue-800', icon: Eye },
      REVISION_REQUESTED: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
      ACCEPTED: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      REJECTED: { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    return badges[status] || { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle };
  };

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { color: string; icon: any; description: string }> = {
      STUDENT: { 
        color: 'bg-blue-100 text-blue-800', 
        icon: GraduationCap,
        description: 'Can submit manuscripts'
      },
      AUTHOR: { 
        color: 'bg-purple-100 text-purple-800', 
        icon: PenTool,
        description: 'Can review and provide feedback'
      },
      ADMIN: { 
        color: 'bg-red-100 text-red-800', 
        icon: Shield,
        description: 'Full system access'
      },
    };
    return badges[role] || { color: 'bg-gray-100 text-gray-800', icon: Users, description: 'Standard user' };
  };

  // Filtering and sorting
  const filteredSubmissions = submissions
    .filter(s => {
      const matchesSearch = 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' || 
        s.status.toLowerCase() === selectedFilter.replace('_', '');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const filteredUsers = users
    .filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  // Statistics
  const stats = {
    totalSubmissions: submissions.length,
    pendingSubmissions: submissions.filter(s => s.status === 'PENDING').length,
    underReview: submissions.filter(s => s.status === 'UNDER_REVIEW').length,
    acceptedSubmissions: submissions.filter(s => s.status === 'ACCEPTED').length,
    rejectedSubmissions: submissions.filter(s => s.status === 'REJECTED').length,
    totalUsers: users.length,
    totalStudents: users.filter(u => u.role === 'STUDENT').length,
    totalAuthors: users.filter(u => u.role === 'AUTHOR').length,
    totalAdmins: users.filter(u => u.role === 'ADMIN').length,
    activeToday: users.filter(u => {
      const lastActive = u.lastActive ? new Date(u.lastActive) : null;
      return lastActive && (new Date().getTime() - lastActive.getTime()) < 86400000;
    }).length,
  };

  // Navigation items
  const navItems = [
    { id: 'submissions', label: 'Submissions', icon: FileText, count: stats.pendingSubmissions },
    { id: 'users', label: 'Users', icon: Users, count: stats.totalUsers },
    { id: 'ads', label: 'Ad Analytics', icon: TrendingUp },
  ];

  if (currentView === 'ads') {
    return <DashboardLayout />;
  }

  // if (currentView === 'ads') {
  //   return (
  //     <DashboardLayout>
  //       <div className="p-6">
  //         <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  //           {[
  //             { label: 'Total Views', value: '45.2K', icon: Eye, change: '+12%' },
  //             { label: 'Total Downloads', value: '12.8K', icon: Download, change: '+8%' },
  //             { label: 'Citations', value: '3,456', icon: Award, change: '+23%' },
  //             { label: 'Active Users', value: stats.activeToday, icon: Users, change: '+5%' },
  //           ].map((stat, i) => (
  //             <motion.div
  //               key={i}
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ delay: i * 0.1 }}
  //               className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
  //             >
  //               <div className="flex items-center justify-between mb-2">
  //                 <div className="p-2 bg-blue-100 rounded-lg">
  //                   <stat.icon className="w-5 h-5 text-blue-600" />
  //                 </div>
  //                 <span className="text-sm text-green-600">{stat.change}</span>
  //               </div>
  //               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
  //               <p className="text-sm text-gray-600">{stat.label}</p>
  //             </motion.div>
  //           ))}
  //         </div>
          
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
  //             <h3 className="text-lg font-semibold mb-4">Submission Trends</h3>
  //             <div className="h-64 flex items-center justify-center text-gray-500">
  //               <BarChart3 className="w-12 h-12 opacity-50" />
  //               <span className="ml-2">Chart would render here</span>
  //             </div>
  //           </div>
            
  //           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
  //             <h3 className="text-lg font-semibold mb-4">User Activity</h3>
  //             <div className="h-64 flex items-center justify-center text-gray-500">
  //               <Activity className="w-12 h-12 opacity-50" />
  //               <span className="ml-2">Chart would render here</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </DashboardLayout>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Journal Management System</p>
                </div>
              </div>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search submissions, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-3">
              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => markNotificationAsRead(notification.id)}
                              className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-start">
                                <div className={`p-1 rounded-full ${
                                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                  notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                  notification.type === 'error' ? 'bg-red-100 text-red-600' :
                                  'bg-blue-100 text-blue-600'
                                }`}>
                                  {notification.type === 'success' ? <CheckCircle className="w-3 h-3" /> :
                                   notification.type === 'warning' ? <AlertTriangle className="w-3 h-3" /> :
                                   notification.type === 'error' ? <XCircle className="w-3 h-3" /> :
                                   <Info className="w-3 h-3" />}
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm text-gray-900">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {session?.user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                      </div>
                      <div className="p-2">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          Profile Settings
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          Account Security
                        </button>
                        <button
                          onClick={() => signOut({ callbackUrl: '/login' })}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 lg:hidden shadow-xl"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">J</span>
                    </div>
                    <span className="ml-2 font-semibold text-gray-900">Journal Admin</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as View);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 mb-1 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - with adjusted margin for activity sidebar */}
      <div className={`transition-all duration-300 ${isActivityOpen ? 'mr-80' : 'mr-0'}`}>
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
              />
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-8 text-center"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchData}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <>
              {/* Navigation Tabs - Desktop */}
              <div className="hidden lg:block mb-8">
                <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as View)}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-all ${
                        currentView === item.id
                          ? 'bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.count !== undefined && item.count > 0 && currentView !== item.id && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile view indicator */}
              <div className="lg:hidden mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {navItems.find(i => i.id === currentView)?.label}
                </h2>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-500">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                  <p className="text-sm text-gray-600">Total Submissions</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-xs text-gray-500">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
                  <p className="text-sm text-gray-600">Pending Review</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-500">Accepted</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.acceptedSubmissions}</p>
                  <p className="text-sm text-gray-600">Accepted Papers</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeToday}</p>
                  <p className="text-sm text-gray-600">Active Today</p>
                </motion.div>
              </div>

              {/* Action Bar */}
              <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={fetchData}
                      disabled={refreshing}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Refresh data"
                    >
                      <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                    
                    <div className="h-6 w-px bg-gray-300"></div>
                    
                    <button
                      onClick={() => handleExport('csv')}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Export as CSV"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`p-2 rounded-lg transition-colors ${
                        showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Toggle filters"
                    >
                      <Filter className="w-5 h-5" />
                    </button>
                    
                    <div className="h-6 w-px bg-gray-300"></div>
                    
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${
                          viewMode === 'list'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${
                          viewMode === 'grid'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 ${
                          viewMode === 'table'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Columns className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSelectAll}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {selectedItems.length === (currentView === 'submissions' ? filteredSubmissions.length : filteredUsers.length)
                        ? 'Deselect All'
                        : 'Select All'}
                    </button>
                    
                    {selectedItems.length > 0 && (
                      <>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Delete ({selectedItems.length})
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Sort Order
                            </label>
                            <select
                              value={sortOrder}
                              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="desc">Newest First</option>
                              <option value="asc">Oldest First</option>
                            </select>
                          </div>

                          {currentView === 'submissions' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                              </label>
                              <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value as FilterStatus)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>
                          )}

                          {currentView === 'users' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                User Role
                              </label>
                              <select
                                value={userRoleFilter}
                                onChange={(e) => setUserRoleFilter(e.target.value as UserRole)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="all">All Roles</option>
                                <option value="STUDENT">Students</option>
                                <option value="AUTHOR">Authors</option>
                                <option value="ADMIN">Admins</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submissions View */}
              {currentView === 'submissions' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Manage Submissions</h2>
                      <p className="text-gray-600">Assign reviewers to submissions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {filteredSubmissions.length} of {submissions.length} submissions
                      </span>
                    </div>
                  </div>

                  {/* Submissions List */}
                  <div className="space-y-4">
                    {filteredSubmissions.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100"
                      >
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">No submissions found</p>
                        <p className="text-sm text-gray-500">
                          Try adjusting your filters or search query
                        </p>
                      </motion.div>
                    ) : viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredSubmissions.map((submission, index) => (
                          <SubmissionCard
                            key={submission.id}
                            submission={submission}
                            authors={authors}
                            getStatusBadge={getStatusBadge}
                            onAssign={handleAssignAuthor}
                            onSelect={() => {
                              setSelectedItems(prev =>
                                prev.includes(submission.id)
                                  ? prev.filter(id => id !== submission.id)
                                  : [...prev, submission.id]
                              );
                            }}
                            isSelected={selectedItems.includes(submission.id)}
                            index={index}
                          />
                        ))}
                      </div>
                    ) : viewMode === 'table' ? (
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left">
                                <input
                                  type="checkbox"
                                  checked={selectedItems.length === filteredSubmissions.length}
                                  onChange={handleSelectAll}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assigned To
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubmissions.map((submission) => {
                              const StatusIcon = getStatusBadge(submission.status).icon;
                              return (
                                <tr key={submission.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <input
                                      type="checkbox"
                                      checked={selectedItems.includes(submission.id)}
                                      onChange={() => {
                                        setSelectedItems(prev =>
                                          prev.includes(submission.id)
                                            ? prev.filter(id => id !== submission.id)
                                            : [...prev, submission.id]
                                        );
                                      }}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                  </td>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {submission.title}
                                      </div>
                                      <div className="text-sm text-gray-500 line-clamp-1">
                                        {submission.abstract}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                      {submission.student.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {submission.student.email}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusBadge(submission.status).color}`}>
                                      <StatusIcon className="w-3 h-3 mr-1" />
                                      {submission.status.replace('_', ' ')}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500">
                                    <select
                                      value={submission.assignedAuthor?.id || ''}
                                      onChange={(e) => handleAssignAuthor(submission.id, e.target.value)}
                                      className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                      <option value="">Unassigned</option>
                                      {authors.map((author) => (
                                        <option key={author.id} value={author.id}>
                                          {author.name}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 text-sm">
                                    <a
                                      href={submission.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 mr-2 inline-flex items-center"
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredSubmissions.map((submission, index) => {
                          const StatusIcon = getStatusBadge(submission.status).icon;
                          return (
                            <motion.div
                              key={submission.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`bg-white rounded-xl shadow-lg p-6 border ${
                                selectedItems.includes(submission.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
                              } hover:shadow-xl transition-all`}
                            >
                              <div className="flex items-start">
                                <div className="mr-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.includes(submission.id)}
                                    onChange={() => {
                                      setSelectedItems(prev =>
                                        prev.includes(submission.id)
                                          ? prev.filter(id => id !== submission.id)
                                          : [...prev, submission.id]
                                      );
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {submission.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
                                      <div className="flex items-center space-x-4 text-sm">
                                        <span className="text-gray-700">
                                          <GraduationCap className="inline w-4 h-4 mr-1" />
                                          {submission.student.name}
                                        </span>
                                        <span className="text-gray-500">
                                          <Calendar className="inline w-4 h-4 mr-1" />
                                          {new Date(submission.createdAt).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <span className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full ${getStatusBadge(submission.status).color}`}>
                                      <StatusIcon className="w-4 h-4 mr-1" />
                                      {submission.status.replace('_', ' ')}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <label className="text-sm font-medium text-gray-700">Assign to:</label>
                                      <select
                                        value={submission.assignedAuthor?.id || ''}
                                        onChange={(e) => handleAssignAuthor(submission.id, e.target.value)}
                                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                                      >
                                        <option value="">Select Author</option>
                                        {authors.map((author) => (
                                          <option key={author.id} value={author.id}>
                                            {author.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <a
                                      href={submission.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View Manuscript
                                    </a>
                                  </div>

                                  {/* Reviews */}
                                  {submission.reviews && submission.reviews.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                        <MessageSquare className="w-4 h-4 mr-1" />
                                        Reviews ({submission.reviews.length})
                                      </h4>
                                      <div className="space-y-2">
                                        {submission.reviews.map((review) => (
                                          <div key={review.id} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-1">
                                              <span className="text-sm font-medium text-gray-900">
                                                {review.author.name}
                                              </span>
                                              <span className={`text-xs px-2 py-1 rounded-full ${
                                                review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
                                                review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
                                                'bg-orange-100 text-orange-800'
                                              }`}>
                                                {review.recommendation}
                                              </span>
                                            </div>
                                            <p className="text-sm text-gray-700">{review.comments}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Users View */}
              {currentView === 'users' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
                      <p className="text-gray-600">Update user roles and permissions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {filteredUsers.length} of {users.length} users
                      </span>
                    </div>
                  </div>

                  {/* Users Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user, index) => {
                      const roleInfo = getRoleBadge(user.role);
                      const RoleIcon = roleInfo.icon;
                      
                      return (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`bg-white rounded-xl shadow-lg p-6 border ${
                            selectedItems.includes(user.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
                          } hover:shadow-xl transition-all`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(user.id)}
                                onChange={() => {
                                  setSelectedItems(prev =>
                                    prev.includes(user.id)
                                      ? prev.filter(id => id !== user.id)
                                      : [...prev, user.id]
                                  );
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full ${roleInfo.color}`}>
                              <RoleIcon className="w-3 h-3 mr-1" />
                              {user.role}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{user.email}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-700">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            {user.department && (
                              <div className="flex items-center text-sm">
                                <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">{user.department}</span>
                              </div>
                            )}
                            
                            {user.institution && (
                              <div className="flex items-center text-sm">
                                <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">{user.institution}</span>
                              </div>
                            )}
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                              <div>
                                <p className="text-xs text-gray-500">Submissions</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {user._count?.submissions || 0}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Reviews</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {user._count?.reviews || 0}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Assigned</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {user._count?.assignedSubmissions || 0}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium text-gray-700">Role:</label>
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="STUDENT">Student</option>
                                <option value="AUTHOR">Author</option>
                                <option value="ADMIN">Admin</option>
                              </select>
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" title="Send message">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" title="View profile">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Activity Sidebar - Fixed to the right with minimize button */}
      <div className={`fixed top-16 bottom-0 right-0 bg-white shadow-xl border-l border-gray-200 transition-all duration-300 z-40 ${
        isActivityOpen ? 'w-80' : 'w-0'
      }`}>
        <button
          onClick={() => setIsActivityOpen(!isActivityOpen)}
          className="absolute -left-3 top-4 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
          title={isActivityOpen ? 'Minimize' : 'Expand'}
        >
          {isActivityOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        
        {isActivityOpen && (
          <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <activity.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        title="Help & Support"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 z-50 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Help & Support</h3>
                <button onClick={() => setShowHelp(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Use filters to narrow down submissions</li>
                    <li>• Click on user names to view detailed profiles</li>
                    <li>• Export data in CSV format for analysis</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Email: support@journal.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Hours: Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Submission Card Component (for grid view)
const SubmissionCard = ({ submission, authors, getStatusBadge, onAssign, onSelect, isSelected, index }: {
  submission: Submission;
  authors: User[];
  getStatusBadge: (status: string) => { color: string; icon: any };
  onAssign: (submissionId: string, authorId: string) => void;
  onSelect: () => void;
  isSelected: boolean;
  index: number;
}) => {
  const StatusIcon = getStatusBadge(submission.status).icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-xl shadow-lg p-6 border ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
      } hover:shadow-xl transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full ${getStatusBadge(submission.status).color}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {submission.status.replace('_', ' ')}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {submission.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {submission.abstract}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-700">{submission.student.name}</span>
        </div>
        
        {submission.assignedAuthor && (
          <div className="flex items-center text-sm">
            <PenTool className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-700">Assigned to: {submission.assignedAuthor.name}</span>
          </div>
        )}

        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-500">
            {new Date(submission.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-700">Assign:</label>
          <select
            value={submission.assignedAuthor?.id || ''}
            onChange={(e) => onAssign(submission.id, e.target.value)}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center pt-2">
          <a
            href={submission.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <Eye className="w-3 h-3 mr-1" />
            View Manuscript
          </a>
        </div>
      </div>

      {/* Reviews */}
      {submission.reviews && submission.reviews.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
            <MessageSquare className="w-3 h-3 mr-1" />
            Reviews ({submission.reviews.length})
          </h4>
          {submission.reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-2 mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-900">
                  {review.author.name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
                  review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {review.recommendation}
                </span>
              </div>
              <p className="text-xs text-gray-700 line-clamp-2">{review.comments}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};