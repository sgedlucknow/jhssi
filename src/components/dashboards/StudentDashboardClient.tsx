// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { FileText, Upload, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// interface Submission {
//   id: string;
//   title: string;
//   abstract: string;
//   fileUrl: string;
//   status: string;
//   createdAt: string;
//   assignedAuthor?: {
//     id: string;
//     name: string;
//   };
//   reviews: Array<{
//     id: string;
//     comments: string;
//     recommendation: string;
//     createdAt: string;
//     author: {
//       name: string;
//     };
//   }>;
// }

// export default function StudentDashboardClient() {
//   const { data: session } = useSession();
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [creating, setCreating] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     abstract: '',
//     fileUrl: '',
//   });

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const fetchSubmissions = async () => {
//     try {
//       const response = await fetch('/api/submission/my');
//       const data = await response.json();
//       setSubmissions(data.submissions || []);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateSubmission = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCreating(true);

//     try {
//       const response = await fetch('/api/submission/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setFormData({ title: '', abstract: '', fileUrl: '' });
//         setShowCreateForm(false);
//         fetchSubmissions();
//       } else {
//         alert('Failed to create submission');
//       }
//     } catch (error) {
//       console.error('Error creating submission:', error);
//       alert('Failed to create submission');
//     } finally {
//       setCreating(false);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
//       UNDER_REVIEW: { color: 'bg-blue-100 text-blue-800', icon: Eye, label: 'Under Review' },
//       REVISION_REQUESTED: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle, label: 'Revision Requested' },
//       ACCEPTED: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Accepted' },
//       REJECTED: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
//     };

//     const badge = badges[status as keyof typeof badges] || badges.PENDING;
//     const Icon = badge.icon;

//     return (
//       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
//         <Icon className="w-4 h-4" />
//         {badge.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
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
//                 <p className="text-sm text-gray-600">Total Submissions</p>
//                 <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Under Review</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'UNDER_REVIEW').length}
//                 </p>
//               </div>
//               <Eye className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Accepted</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'ACCEPTED').length}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'PENDING').length}
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         {/* Create Submission Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowCreateForm(!showCreateForm)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <Upload className="w-5 h-5" />
//             New Submission
//           </button>
//         </div>

//         {/* Create Submission Form */}
//         {showCreateForm && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Create New Submission</h2>
//             <form onSubmit={handleCreateSubmission} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter manuscript title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Abstract
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={formData.abstract}
//                   onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter abstract"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   File URL
//                 </label>
//                 <input
//                   type="url"
//                   required
//                   value={formData.fileUrl}
//                   onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="https://example.com/manuscript.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Upload your file to cloud storage and paste the URL here
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   disabled={creating}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {creating ? 'Submitting...' : 'Submit'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateForm(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Submissions List */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">My Submissions</h2>
//           </div>

//           {loading ? (
//             <div className="p-12 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading submissions...</p>
//             </div>
//           ) : submissions.length === 0 ? (
//             <div className="p-12 text-center">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600">No submissions yet</p>
//               <p className="text-sm text-gray-500">Create your first submission to get started</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {submissions.map((submission) => (
//                 <div key={submission.id} className="p-6 hover:bg-gray-50">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                         {submission.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
//                     </div>
//                     {getStatusBadge(submission.status)}
//                   </div>

//                   <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       Submitted: {new Date(submission.createdAt).toLocaleDateString()}
//                     </div>
//                     {submission.assignedAuthor && (
//                       <div className="flex items-center gap-1">
//                         <Eye className="w-4 h-4" />
//                         Reviewer: {submission.assignedAuthor.name}
//                       </div>
//                     )}
//                   </div>

//                   <a
//                     href={submission.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                   >
//                     View Manuscript →
//                   </a>

//                   {/* Reviews */}
//                   {submission.reviews.length > 0 && (
//                     <div className="mt-4 pt-4 border-t border-gray-200">
//                       <h4 className="font-semibold text-gray-900 mb-2">Reviews</h4>
//                       {submission.reviews.map((review) => (
//                         <div key={review.id} className="bg-gray-50 rounded-lg p-4 mb-2">
//                           <div className="flex justify-between items-start mb-2">
//                             <span className="text-sm font-medium text-gray-900">
//                               {review.author.name}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
//                               review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
//                               'bg-orange-100 text-orange-800'
//                             }`}>
//                               {review.recommendation}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-700">{review.comments}</p>
//                           <p className="text-xs text-gray-500 mt-2">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       ))}
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
  Upload,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
  Calendar,
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
  Mail,
  HelpCircle,
  Settings,
  Home,
  BookMarked,
  Briefcase,
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
  Plus,
  Send,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface Submission {
  id: string;
  title: string;
  abstract: string;
  fileUrl: string;
  status: string;
  createdAt: string;
  assignedAuthor?: {
    id: string;
    name: string;
  };
  reviews: Array<{
    id: string;
    comments: string;
    recommendation: string;
    createdAt: string;
    author: {
      name: string;
    };
  }>;
  keywords?: string[];
  category?: string;
  views?: number;
  downloads?: number;
}

export default function StudentDashboardClient() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [fullscreen, setFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    fileUrl: '',
    category: 'research',
    keywords: '',
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/submission/my');
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCreateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const response = await fetch('/api/submission/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords: keywordsArray,
        }),
      });

      if (response.ok) {
        setFormData({ 
          title: '', 
          abstract: '', 
          fileUrl: '',
          category: 'research',
          keywords: '',
        });
        setShowCreateForm(false);
        fetchSubmissions();
        showNotification('success', 'Submission created successfully!');
      } else {
        showNotification('error', 'Failed to create submission');
      }
    } catch (error) {
      console.error('Error creating submission:', error);
      showNotification('error', 'Failed to create submission');
    } finally {
      setCreating(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
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
                         s.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: submissions.length,
    underReview: submissions.filter(s => s.status === 'UNDER_REVIEW').length,
    accepted: submissions.filter(s => s.status === 'ACCEPTED').length,
    pending: submissions.filter(s => s.status === 'PENDING').length,
    revision: submissions.filter(s => s.status === 'REVISION_REQUESTED').length,
    rejected: submissions.filter(s => s.status === 'REJECTED').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F1E8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8A45D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B4A2E]">Loading your submissions...</p>
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
                  <h1 className="text-lg font-semibold text-[#3F2A1D]">Student Dashboard</h1>
                  <p className="text-xs text-[#6B4A2E]/60">Submission Management</p>
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
                      {session?.user?.name?.charAt(0) || 'S'}
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
                    <span className="ml-2 font-semibold text-[#3F2A1D]">Student Panel</span>
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
                  <span>My Submissions</span>
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
                You have {stats.pending} submission{stats.pending !== 1 ? 's' : ''} pending review
              </p>
            </div>
            <div className="hidden md:block p-4 bg-white rounded-xl border border-[#E6DDCF]">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#C8A45D]" />
                <div>
                  <p className="text-sm text-[#6B4A2E]">Submission Score</p>
                  <p className="text-2xl font-bold text-[#3F2A1D]">{stats.accepted}/{stats.total}</p>
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
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.total}</p>
            <p className="text-xs text-[#6B4A2E]/60">Total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.pending}</p>
            <p className="text-xs text-[#6B4A2E]/60">Pending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.underReview}</p>
            <p className="text-xs text-[#6B4A2E]/60">Under Review</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.revision}</p>
            <p className="text-xs text-[#6B4A2E]/60">Revision</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.accepted}</p>
            <p className="text-xs text-[#6B4A2E]/60">Accepted</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-4 border border-[#E6DDCF] hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#3F2A1D]">{stats.rejected}</p>
            <p className="text-xs text-[#6B4A2E]/60">Rejected</p>
          </motion.div>
        </div>

        {/* Create Submission Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            New Submission
          </button>
        </motion.div>

        {/* Create Submission Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E6DDCF]">
                <h2 className="font-serif text-xl text-[#3F2A1D] mb-4">Create New Submission</h2>
                <form onSubmit={handleCreateSubmission} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent"
                        placeholder="Enter manuscript title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent"
                      >
                        <option value="research">Research Paper</option>
                        <option value="review">Literature Review</option>
                        <option value="case-study">Case Study</option>
                        <option value="methodology">Methodology</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        className="w-full px-4 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent"
                        placeholder="e.g., AI, Machine Learning, Education"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                        Abstract
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.abstract}
                        onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                        className="w-full px-4 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent"
                        placeholder="Enter abstract"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#6B4A2E] mb-2">
                        File URL
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.fileUrl}
                        onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent"
                        placeholder="https://example.com/manuscript.pdf"
                      />
                      <p className="text-xs text-[#6B4A2E]/60 mt-1">
                        Upload your file to cloud storage and paste the URL here
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-[#E6DDCF]">
                    <button
                      type="submit"
                      disabled={creating}
                      className="px-6 py-2 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {creating ? 'Submitting...' : 'Submit Manuscript'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-2 border border-[#E6DDCF] text-[#6B4A2E] rounded-lg hover:bg-[#F6F1E8] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submissions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg border border-[#E6DDCF] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#E6DDCF] bg-[#F6F1E8] flex justify-between items-center">
            <h2 className="font-serif text-xl text-[#3F2A1D]">My Submissions</h2>
            <span className="text-sm text-[#6B4A2E]">
              {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'submission' : 'submissions'}
            </span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-[#F6F1E8] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-[#C8A45D]" />
              </div>
              <p className="text-[#4A4036] text-lg mb-2">No submissions yet</p>
              <p className="text-[#6B4A2E]/60">
                {searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first submission to get started'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E6DDCF]">
              {filteredSubmissions.map((submission, index) => {
                const StatusIcon = getStatusBadge(submission.status).icon;
                
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
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Assigned Author */}
                    {submission.assignedAuthor && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-[#6B4A2E] bg-[#F6F1E8] p-2 rounded-lg w-fit">
                        <Users className="w-4 h-4" />
                        <span>Assigned to reviewer: <span className="font-medium">{submission.assignedAuthor.name}</span></span>
                      </div>
                    )}

                    {/* Reviews */}
                    {submission.reviews.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#E6DDCF]">
                        <h4 className="font-medium text-[#3F2A1D] mb-3 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#C8A45D]" />
                          Reviews ({submission.reviews.length})
                        </h4>
                        <div className="space-y-3">
                          {submission.reviews.map((review) => {
                            const RecIcon = getRecommendationBadge(review.recommendation).icon;
                            return (
                              <div key={review.id} className="bg-[#F6F1E8] rounded-lg p-4 border border-[#E6DDCF]">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <span className="text-sm font-medium text-[#3F2A1D]">
                                      {review.author.name}
                                    </span>
                                    <span className="text-xs text-[#6B4A2E]/60 ml-2">
                                      {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRecommendationBadge(review.recommendation).color}`}>
                                    <RecIcon className="w-3 h-3" />
                                    {review.recommendation}
                                  </span>
                                </div>
                                <p className="text-sm text-[#4A4036]">{review.comments}</p>
                              </div>
                            );
                          })}
                        </div>
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
          transition={{ delay: 0.9 }}
          className="mt-6 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg mb-2">Submission Guidelines</h3>
              <p className="text-white/80 text-sm mb-3">
                Please ensure your manuscripts follow our formatting guidelines and include all required sections.
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
                    <li>• Click "New Submission" to upload your manuscript</li>
                    <li>• Track your submission status in real-time</li>
                    <li>• Review feedback from authors to improve your work</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#3F2A1D] mb-2">Contact Support</h4>
                  <div className="space-y-2 text-sm text-[#6B4A2E]">
                    <p>Email: student.support@journal.com</p>
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

//iske upar ke upar wala code is working if this doesnt

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { FileText, Upload, Eye, Clock, CheckCircle, XCircle, AlertCircle, Link as LinkIcon, File, X } from 'lucide-react';

// interface Submission {
//   id: string;
//   title: string;
//   abstract: string;
//   fileUrl: string;
//   status: string;
//   createdAt: string;
//   assignedAuthor?: {
//     id: string;
//     name: string;
//   };
//   reviews: Array<{
//     id: string;
//     comments: string;
//     recommendation: string;
//     createdAt: string;
//     author: {
//       name: string;
//     };
//   }>;
// }

// export default function StudentDashboardClient() {
//   const { data: session } = useSession();
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [creating, setCreating] = useState(false);
//   const [submissionType, setSubmissionType] = useState<'link' | 'file'>('link');
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     abstract: '',
//     fileUrl: '',
//   });

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const fetchSubmissions = async () => {
//     try {
//       const response = await fetch('/api/submission/my');
//       const data = await response.json();
//       setSubmissions(data.submissions || []);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadFile = async (file: File): Promise<string> => {
//     // Create form data for file upload
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Upload failed');
//       }

//       const data = await response.json();
//       return data.fileUrl; // Assuming the API returns the file URL
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       throw error;
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
      
//       // Validate file type
//       if (selectedFile.type !== 'application/pdf') {
//         alert('Please upload a PDF file');
//         return;
//       }

//       // Validate file size (e.g., max 10MB)
//       if (selectedFile.size > 10 * 1024 * 1024) {
//         alert('File size must be less than 10MB');
//         return;
//       }

//       setFile(selectedFile);
//     }
//   };

//   const clearFile = () => {
//     setFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleCreateSubmission = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCreating(true);
//     setUploadProgress(0);

//     try {
//       let fileUrl = formData.fileUrl;

//       // If file upload is selected, upload the file first
//       if (submissionType === 'file' && file) {
//         setUploadProgress(30);
//         fileUrl = await uploadFile(file);
//         setUploadProgress(70);
//       }

//       // Validate that we have a URL (either from link input or file upload)
//       if (!fileUrl) {
//         alert('Please provide either a file or a URL');
//         return;
//       }

//       const submissionData = {
//         title: formData.title,
//         abstract: formData.abstract,
//         fileUrl: fileUrl,
//       };

//       setUploadProgress(90);

//       const response = await fetch('/api/submission/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(submissionData),
//       });

//       if (response.ok) {
//         setUploadProgress(100);
//         setFormData({ title: '', abstract: '', fileUrl: '' });
//         setFile(null);
//         setSubmissionType('link');
//         setShowCreateForm(false);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//         fetchSubmissions();
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to create submission');
//       }
//     } catch (error) {
//       console.error('Error creating submission:', error);
//       alert('Failed to create submission. Please try again.');
//     } finally {
//       setCreating(false);
//       setUploadProgress(0);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
//       UNDER_REVIEW: { color: 'bg-blue-100 text-blue-800', icon: Eye, label: 'Under Review' },
//       REVISION_REQUESTED: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle, label: 'Revision Requested' },
//       ACCEPTED: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Accepted' },
//       REJECTED: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
//     };

//     const badge = badges[status as keyof typeof badges] || badges.PENDING;
//     const Icon = badge.icon;

//     return (
//       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
//         <Icon className="w-4 h-4" />
//         {badge.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
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
//                 <p className="text-sm text-gray-600">Total Submissions</p>
//                 <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
//               </div>
//               <FileText className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Under Review</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'UNDER_REVIEW').length}
//                 </p>
//               </div>
//               <Eye className="w-8 h-8 text-blue-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Accepted</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'ACCEPTED').length}
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {submissions.filter(s => s.status === 'PENDING').length}
//                 </p>
//               </div>
//               <Clock className="w-8 h-8 text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         {/* Create Submission Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowCreateForm(!showCreateForm)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <Upload className="w-5 h-5" />
//             New Submission
//           </button>
//         </div>

//         {/* Create Submission Form */}
//         {showCreateForm && (
//           <div className="bg-white rounded-lg shadow p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Create New Submission</h2>
            
//             {/* Submission Type Toggle */}
//             <div className="flex gap-4 mb-6">
//               <button
//                 type="button"
//                 onClick={() => setSubmissionType('link')}
//                 className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
//                   submissionType === 'link'
//                     ? 'border-blue-600 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <LinkIcon className="w-5 h-5" />
//                 <span className="font-medium">Submit via Link</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setSubmissionType('file')}
//                 className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
//                   submissionType === 'file'
//                     ? 'border-blue-600 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <File className="w-5 h-5" />
//                 <span className="font-medium">Upload PDF</span>
//               </button>
//             </div>

//             <form onSubmit={handleCreateSubmission} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter manuscript title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Abstract
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={formData.abstract}
//                   onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter abstract"
//                 />
//               </div>

//               {submissionType === 'link' ? (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Manuscript URL
//                   </label>
//                   <input
//                     type="url"
//                     required
//                     value={formData.fileUrl}
//                     onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="https://example.com/manuscript.pdf"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Enter the URL where your manuscript is hosted
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Upload PDF
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
//                     {!file ? (
//                       <div className="text-center">
//                         <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-sm text-gray-600 mb-2">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           PDF files only (max 10MB)
//                         </p>
//                         <input
//                           ref={fileInputRef}
//                           type="file"
//                           accept=".pdf,application/pdf"
//                           onChange={handleFileChange}
//                           className="hidden"
//                           id="file-upload"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => fileInputRef.current?.click()}
//                           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                         >
//                           Select File
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <File className="w-8 h-8 text-blue-600" />
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                             <p className="text-xs text-gray-500">
//                               {(file.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={clearFile}
//                           className="p-1 hover:bg-blue-100 rounded-full"
//                         >
//                           <X className="w-5 h-5 text-gray-500" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Upload Progress */}
//               {creating && uploadProgress > 0 && (
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Uploading...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                       style={{ width: `${uploadProgress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   disabled={creating || (submissionType === 'file' && !file)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {creating ? 'Submitting...' : 'Submit'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowCreateForm(false);
//                     setFile(null);
//                     setSubmissionType('link');
//                     setFormData({ title: '', abstract: '', fileUrl: '' });
//                   }}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Submissions List */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">My Submissions</h2>
//           </div>

//           {loading ? (
//             <div className="p-12 text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading submissions...</p>
//             </div>
//           ) : submissions.length === 0 ? (
//             <div className="p-12 text-center">
//               <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600">No submissions yet</p>
//               <p className="text-sm text-gray-500">Create your first submission to get started</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {submissions.map((submission) => (
//                 <div key={submission.id} className="p-6 hover:bg-gray-50">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                         {submission.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">{submission.abstract}</p>
//                     </div>
//                     {getStatusBadge(submission.status)}
//                   </div>

//                   <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       Submitted: {new Date(submission.createdAt).toLocaleDateString()}
//                     </div>
//                     {submission.assignedAuthor && (
//                       <div className="flex items-center gap-1">
//                         <Eye className="w-4 h-4" />
//                         Reviewer: {submission.assignedAuthor.name}
//                       </div>
//                     )}
//                   </div>

//                   <a
//                     href={submission.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     {submission.fileUrl.toLowerCase().includes('.pdf') ? (
//                       <>
//                         <File className="w-4 h-4" />
//                         View PDF →
//                       </>
//                     ) : (
//                       <>
//                         <LinkIcon className="w-4 h-4" />
//                         View Manuscript →
//                       </>
//                     )}
//                   </a>

//                   {/* Reviews */}
//                   {submission.reviews.length > 0 && (
//                     <div className="mt-4 pt-4 border-t border-gray-200">
//                       <h4 className="font-semibold text-gray-900 mb-2">Reviews</h4>
//                       {submission.reviews.map((review) => (
//                         <div key={review.id} className="bg-gray-50 rounded-lg p-4 mb-2">
//                           <div className="flex justify-between items-start mb-2">
//                             <span className="text-sm font-medium text-gray-900">
//                               {review.author.name}
//                             </span>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               review.recommendation === 'ACCEPT' ? 'bg-green-100 text-green-800' :
//                               review.recommendation === 'REJECT' ? 'bg-red-100 text-red-800' :
//                               'bg-orange-100 text-orange-800'
//                             }`}>
//                               {review.recommendation}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-700">{review.comments}</p>
//                           <p className="text-xs text-gray-500 mt-2">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       ))}
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