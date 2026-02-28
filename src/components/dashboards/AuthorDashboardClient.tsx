// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { FileText, MessageSquare, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
//   reviews: Array<{
//     id: string;
//     comments: string;
//     recommendation: string;
//     createdAt: string;
//   }>;
// }

// export default function AuthorDashboardClient() {
//   const { data: session } = useSession();
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
//   const [reviewForm, setReviewForm] = useState({
//     comments: '',
//     recommendation: 'REVISE',
//   });
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const fetchSubmissions = async () => {
//     try {
//       const response = await fetch('/api/submission/assigned');
//       const data = await response.json();
//       setSubmissions(data.submissions || []);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitReview = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedSubmission) return;

//     setSubmitting(true);

//     try {
//       const response = await fetch('/api/review/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           submissionId: selectedSubmission,
//           comments: reviewForm.comments,
//           recommendation: reviewForm.recommendation,
//         }),
//       });

//       if (response.ok) {
//         setReviewForm({ comments: '', recommendation: 'REVISE' });
//         setSelectedSubmission(null);
//         fetchSubmissions();
//         alert('Review submitted successfully!');
//       } else {
//         alert('Failed to submit review');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       UNDER_REVIEW: 'bg-blue-100 text-blue-800',
//       REVISION_REQUESTED: 'bg-orange-100 text-orange-800',
//       ACCEPTED: 'bg-green-100 text-green-800',
//       REJECTED: 'bg-red-100 text-red-800',
//     };
//     return badges[status as keyof typeof badges] || badges.PENDING;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
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

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Assigned</p>
//                 <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Reviewed</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.reviews.length > 0).length}
//                 </p>
//               </div>
//               <MessageSquare className="w-8 h-8 text-green-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Pending Review</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.reviews.length === 0).length}
//                 </p>
//               </div>
//               <AlertCircle className="w-8 h-8 text-orange-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Accepted Recs</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.reviews.some(r => r.recommendation === 'ACCEPT')).length}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-600" />
//             </div>
//           </div>
//         </div>

//         {/* Submissions List */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">Assigned Submissions</h2>
//           </div>

//           {loading ? (
//             <div className="p-12 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading submissions...</p>
//             </div>
//           ) : submissions.length === 0 ? (
//             <div className="p-12 text-center">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600">No submissions assigned yet</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {submissions.map((submission) => (
//                 <div key={submission.id} className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                         {submission.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
//                       <p className="text-sm text-gray-500">
//                         By: {submission.student.name} ({submission.student.email})
//                       </p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(submission.status)}`}>
//                       {submission.status.replace('_', ' ')}
//                     </span>
//                   </div>

//                   <div className="flex gap-3 mb-4">
//                     <a
//                       href={submission.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                     >
//                       View Manuscript →
//                     </a>
//                   </div>

//                   {/* Existing Reviews */}
//                   {submission.reviews.length > 0 && (
//                     <div className="bg-green-50 rounded-lg p-4 mb-4">
//                       <h4 className="font-semibold text-gray-900 mb-2">Your Review</h4>
//                       {submission.reviews.map((review) => (
//                         <div key={review.id}>
//                           <div className="flex justify-between items-start mb-2">
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
//                               review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
//                               'bg-orange-100 text-orange-800'
//                             }`}>
//                               {review.recommendation}
//                             </span>
//                             <span className="text-xs text-gray-500">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-700">{review.comments}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Review Form */}
//                   {submission.reviews.length === 0 && (
//                     <div>
//                       {selectedSubmission === submission.id ? (
//                         <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-lg p-4">
//                           <h4 className="font-semibold text-gray-900 mb-3">Submit Review</h4>
                          
//                           <div className="mb-3">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Comments
//                             </label>
//                             <textarea
//                               required
//                               rows={4}
//                               value={reviewForm.comments}
//                               onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                               placeholder="Enter your review comments..."
//                             />
//                           </div>

//                           <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Recommendation
//                             </label>
//                             <select
//                               value={reviewForm.recommendation}
//                               onChange={(e) => setReviewForm({ ...reviewForm, recommendation: e.target.value })}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             >
//                               <option value="ACCEPT">Accept</option>
//                               <option value="REVISE">Revise</option>
//                               <option value="REJECT">Reject</option>
//                             </select>
//                           </div>

//                           <div className="flex gap-3">
//                             <button
//                               type="submit"
//                               disabled={submitting}
//                               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                             >
//                               {submitting ? 'Submitting...' : 'Submit Review'}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => setSelectedSubmission(null)}
//                               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </form>
//                       ) : (
//                         <button
//                           onClick={() => setSelectedSubmission(submission.id)}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                         >
//                           Write Review
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  PenTool,
  BookOpen,
  Award,
  TrendingUp,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Save,
  FileCheck,
  Users,
  Calendar,
  Mail,
  HelpCircle,
  Settings,
  Home,
  BookMarked,
  Briefcase,
  GraduationCap,
  Shield,
  UserCheck,
  UserX,
  Info,
  AlertTriangle,
  Download,
  Share2,
  Bookmark,
  Copy,
  Printer,
  Maximize2,
  Minimize2,
} from 'lucide-react';

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
    avatar?: string;
  };
  reviews: Array<{
    id: string;
    comments: string;
    recommendation: string;
    createdAt: string;
    author?: {
      name: string;
    };
  }>;
  keywords?: string[];
  category?: string;
  views?: number;
  downloads?: number;
}

export default function AuthorDashboardClient() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({
    comments: '',
    recommendation: 'REVISE',
  });
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [fullscreen, setFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/submission/assigned');
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/review/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSubmission,
          comments: reviewForm.comments,
          recommendation: reviewForm.recommendation,
        }),
      });

      if (response.ok) {
        setReviewForm({ comments: '', recommendation: 'REVISE' });
        setSelectedSubmission(null);
        fetchSubmissions();
        showNotification('success', 'Review submitted successfully!');
      } else {
        showNotification('error', 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showNotification('error', 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    // Simple alert for now - you can enhance with toast notifications later
    alert(message);
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

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any; label: string }> = {
      PENDING: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: Clock,
        label: 'Pending'
      },
      UNDER_REVIEW: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: Eye,
        label: 'Under Review'
      },
      REVISION_REQUESTED: { 
        color: 'bg-orange-100 text-orange-800 border-orange-200', 
        icon: AlertCircle,
        label: 'Revision Requested'
      },
      ACCEPTED: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: CheckCircle,
        label: 'Accepted'
      },
      REJECTED: { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: XCircle,
        label: 'Rejected'
      },
    };
    return badges[status] || badges.PENDING;
  };

  const getRecommendationBadge = (recommendation: string) => {
    const badges: Record<string, { color: string; icon: any }> = {
      ACCEPT: { color: 'bg-green-100 text-green-800', icon: ThumbsUp },
      REVISE: { color: 'bg-orange-100 text-orange-800', icon: Edit },
      REJECT: { color: 'bg-red-100 text-red-800', icon: ThumbsDown },
    };
    return badges[recommendation] || badges.REVISE;
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    assigned: submissions.length,
    reviewed: submissions.filter(s => s.reviews.length > 0).length,
    pending: submissions.filter(s => s.reviews.length === 0).length,
    accepted: submissions.filter(s => s.reviews.some(r => r.recommendation === 'ACCEPT')).length,
    revised: submissions.filter(s => s.reviews.some(r => r.recommendation === 'REVISE')).length,
    rejected: submissions.filter(s => s.reviews.some(r => r.recommendation === 'REJECT')).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F1E8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A45D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B4A2E]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1E8]">
      {/* Header */}
      <header className="bg-white border-b border-[#E6DDCF] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-[#6B4A2E] hover:bg-[#F6F1E8] transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="w-10 h-10 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg font-semibold text-[#3F2A1D]">Author Dashboard</h1>
                  <p className="text-xs text-[#6B4A2E]/60">Review Management</p>
                </div>
              </div>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B4A2E]/60 hover:text-[#3F2A1D]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-3">
              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="hidden md:block px-3 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent bg-white text-[#6B4A2E] text-sm"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="REVISION_REQUESTED">Revision</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </select>

              {/* Refresh button */}
              <button
                onClick={fetchSubmissions}
                disabled={refreshing}
                className="p-2 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors"
                title="Refresh"
              >
                <svg
                  className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="hidden md:block p-2 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors"
                title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-[#F6F1E8] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {session?.user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-[#3F2A1D]">
                    {session?.user?.name?.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowUserMenu(false)}
                        className="fixed inset-0 z-40"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E6DDCF] z-50"
                      >
                        <div className="p-3 border-b border-[#E6DDCF]">
                          <p className="text-sm font-medium text-[#3F2A1D]">{session?.user?.name}</p>
                          <p className="text-xs text-[#6B4A2E]/60">{session?.user?.email}</p>
                        </div>
                        <div className="p-2">
                          <button className="w-full text-left px-3 py-2 text-sm text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors">
                            Profile Settings
                          </button>
                          <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
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
              <div className="p-4 border-b border-[#E6DDCF]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">J</span>
                    </div>
                    <span className="ml-2 font-semibold text-[#3F2A1D]">Author Panel</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5 text-[#6B4A2E]" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <button className="w-full flex items-center px-4 py-3 mb-1 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors">
                  <Home className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 mb-1 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors">
                  <FileText className="w-5 h-5 mr-3" />
                  <span>My Reviews</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 mb-1 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 mr-3" />
                  <span>Guidelines</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 mb-1 text-[#6B4A2E] hover:bg-[#F6F1E8] rounded-lg transition-colors">
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Settings</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#3F2A1D] mb-2">
                Welcome back, {session?.user?.name?.split(' ')[0]}!
              </h2>
              <div className="h-px w-20 bg-[#C8A45D] mb-4"></div>
              <p className="text-[#4A4036]">
                You have {stats.pending} submissions pending review
              </p>
            </div>
            <div className="hidden md:block p-4 bg-white rounded-xl border border-[#E6DDCF]">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#C8A45D]" />
                <div>
                  <p className="text-sm text-[#6B4A2E]">Author Score</p>
                  <p className="text-2xl font-bold text-[#3F2A1D]">4.8</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.assigned}</p>
            <p className="text-xs text-[#6B4A2E]/60">Assigned</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.reviewed}</p>
            <p className="text-xs text-[#6B4A2E]/60">Reviewed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.pending}</p>
            <p className="text-xs text-[#6B4A2E]/60">Pending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <ThumbsUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.accepted}</p>
            <p className="text-xs text-[#6B4A2E]/60">Accepted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.revised}</p>
            <p className="text-xs text-[#6B4A2E]/60">Revised</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <ThumbsDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.rejected}</p>
            <p className="text-xs text-[#6B4A2E]/60">Rejected</p>
          </motion.div>
        </div>

        {/* Submissions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg border border-[#E6DDCF] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#E6DDCF] bg-[#F6F1E8] flex justify-between items-center">
            <h2 className="font-serif text-xl text-[#3F2A1D]">Assigned Submissions</h2>
            <span className="text-sm text-[#6B4A2E]">
              {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-[#F6F1E8] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-[#C8A45D]" />
              </div>
              <p className="text-[#4A4036] text-lg mb-2">No submissions found</p>
              <p className="text-[#6B4A2E]/60">
                {searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'New submissions will appear here'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E6DDCF]">
              {filteredSubmissions.map((submission, index) => {
                const StatusIcon = getStatusBadge(submission.status).icon;
                const hasReview = submission.reviews.length > 0;
                
                return (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-[#F6F1E8]/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-2 bg-[#F6F1E8] rounded-lg hidden sm:block">
                            <FileText className="w-5 h-5 text-[#6B4A2E]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[#3F2A1D] mb-1">
                              {submission.title}
                            </h3>
                            <p className="text-sm text-[#4A4036] mb-2 line-clamp-2">
                              {submission.abstract}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="text-[#6B4A2E] flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" />
                                {submission.student.name}
                              </span>
                              <span className="text-[#6B4A2E]/60">•</span>
                              <span className="text-[#6B4A2E] flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(submission.createdAt).toLocaleDateString()}
                              </span>
                              {submission.category && (
                                <>
                                  <span className="text-[#6B4A2E]/60">•</span>
                                  <span className="text-[#6B4A2E] flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {submission.category}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Keywords */}
                        {submission.keywords && submission.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {submission.keywords.map((keyword, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-[#F6F1E8] text-[#6B4A2E] text-xs rounded-full border border-[#E6DDCF]"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3 lg:min-w-[200px]">
                        <span className={`px-3 py-1 inline-flex items-center gap-1 text-sm font-medium rounded-full border ${getStatusBadge(submission.status).color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {getStatusBadge(submission.status).label}
                        </span>

                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-[#F6F1E8] text-[#6B4A2E] rounded-lg hover:bg-[#E6DDCF] transition-colors text-sm w-full sm:w-auto"
                        >
                          <Eye className="w-4 h-4" />
                          View Manuscript
                        </a>
                      </div>
                    </div>

                    {/* Existing Review */}
                    {hasReview && (
                      <div className="mt-4 p-4 bg-[#F6F1E8] rounded-lg border border-[#E6DDCF]">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-[#C8A45D]" />
                          <h4 className="font-medium text-[#3F2A1D]">Your Review</h4>
                        </div>
                        {submission.reviews.map((review) => {
                          const RecIcon = getRecommendationBadge(review.recommendation).icon;
                          return (
                            <div key={review.id}>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRecommendationBadge(review.recommendation).color}`}>
                                  <RecIcon className="w-3 h-3" />
                                  {review.recommendation}
                                </span>
                                <span className="text-xs text-[#6B4A2E]/60">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-[#4A4036]">{review.comments}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Review Form */}
                    {!hasReview && (
                      <div className="mt-4">
                        {selectedSubmission === submission.id ? (
                          <form onSubmit={handleSubmitReview} className="bg-[#F6F1E8] rounded-lg p-4 border border-[#E6DDCF]">
                            <h4 className="font-medium text-[#3F2A1D] mb-3">Submit Review</h4>
                            
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                                Comments
                              </label>
                              <textarea
                                required
                                rows={4}
                                value={reviewForm.comments}
                                onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                                className="w-full px-3 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent bg-white"
                                placeholder="Enter your review comments..."
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                                Recommendation
                              </label>
                              <select
                                value={reviewForm.recommendation}
                                onChange={(e) => setReviewForm({ ...reviewForm, recommendation: e.target.value })}
                                className="w-full px-3 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent bg-white"
                              >
                                <option value="ACCEPT">Accept</option>
                                <option value="REVISE">Revise</option>
                                <option value="REJECT">Reject</option>
                              </select>
                            </div>

                            <div className="flex gap-3">
                              <button
                                type="submit"
                                disabled={submitting}
                                className="px-4 py-2 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 text-sm"
                              >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedSubmission(null)}
                                className="px-4 py-2 border border-[#E6DDCF] text-[#6B4A2E] rounded-lg hover:bg-white transition-colors text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => setSelectedSubmission(submission.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white rounded-lg hover:shadow-lg transition-all text-sm"
                          >
                            <PenTool className="w-4 h-4" />
                            Write Review
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Guidelines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg mb-2">Review Guidelines</h3>
              <p className="text-white/80 text-sm mb-3">
                Please ensure your reviews are constructive and provide actionable feedback to help authors improve their work.
              </p>
              <button className="text-sm text-[#C8A45D] hover:text-white transition-colors flex items-center gap-1">
                Read full guidelines
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

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
                <h3 className="font-serif text-xl text-[#3F2A1D]">Help & Support</h3>
                <button onClick={() => setShowHelp(false)}>
                  <X className="w-5 h-5 text-[#6B4A2E]" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#F6F1E8] rounded-lg">
                  <h4 className="font-semibold text-[#6B4A2E] mb-2">Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-[#4A4036]">
                    <li>• Click "Write Review" to provide feedback on submissions</li>
                    <li>• Your reviews help authors improve their work</li>
                    <li>• You can view manuscripts before writing reviews</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#3F2A1D] mb-2">Contact Support</h4>
                  <div className="space-y-2 text-sm text-[#6B4A2E]">
                    <p>Email: author.support@journal.com</p>
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