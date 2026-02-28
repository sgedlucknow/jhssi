// // src/app/register/page.tsx
// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, Mail, Lock, User, Briefcase, GraduationCap, Building } from "lucide-react";

// export default function RegisterPage() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     institution: "",
//     role: "",
//     acceptTerms: false,
//     newsletter: true
//   });
//   const router = useRouter();

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     // Handle registration logic here
//     console.log("Registration submitted:", formData);
//     // For demo purposes, redirect to verification
//     router.push("/verify-email");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const target = e.target as HTMLInputElement;
//       setFormData(prev => ({
//         ...prev,
//         [name]: target.checked
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   const roles = [
//     "Researcher",
//     "Professor",
//     "PhD Student",
//     "Master's Student",
//     "Academic Administrator",
//     "Librarian",
//     "Journal Editor",
//     "Peer Reviewer",
//     "Other Academic Professional"
//   ];

//   return (
//     <main className="min-h-screen bg-white">
//       {/* Split Layout */}
//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left Column - Image */}
//         <div className="lg:w-1/2 relative h-64 lg:h-auto">
//           <Image
//             src="/photos/img5.jpeg"
//             alt="Academic Library Background"
//             fill
//             className="object-cover object-left"
//             priority
//             style={{ objectPosition: "70% center" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#3F2A1D]/80 to-transparent lg:bg-gradient-to-r lg:from-[#3F2A1D]/80 lg:to-transparent"></div>
          
//           <motion.div 
//             className="absolute bottom-8 left-8 lg:left-12 lg:bottom-12 text-white"
//             initial={{ opacity: 0, y: 30 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             <h2 className="font-serif text-2xl lg:text-3xl mb-4">
//               Join Our Academic Community
//             </h2>
//             <p className="text-white/90 max-w-md">
//               Register to submit manuscripts, access premium content, and connect with researchers worldwide.
//             </p>
//           </motion.div>
//         </div>

//         {/* Right Column - Registration Form */}
//         <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
//           <motion.div 
//             className="w-full max-w-2xl"
//             initial={{ opacity: 0, y: 30 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             {/* Logo/Header */}
//             <motion.div 
//               className="text-center mb-8"
//               initial={{ opacity: 0 }}
//               animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F6F1E8] rounded-full border-4 border-[#E6DDCF] shadow-lg mb-6">
//                 <span className="text-2xl text-[#6B4A2E] font-bold">J</span>
//               </div>
              
//               <h1 className="font-serif text-3xl lg:text-4xl text-[#3F2A1D] mb-4">
//                 Create Account
//               </h1>
              
//               <motion.div 
//                 className="h-px w-20 bg-[#C8A45D] mx-auto mb-6"
//                 initial={{ width: 0 }}
//                 animate={isLoaded ? { width: "80px" } : { width: 0 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//               />
              
//               <p className="text-[#4A4036] mb-2">
//                 Join the Journal of Humanities and Social Sciences Invention
//               </p>
//               <p className="text-sm text-[#6B4A2E]/60">
//                 All fields are required unless marked optional
//               </p>
//             </motion.div>

//             {/* Registration Form */}
//             <motion.form 
//               className="space-y-6"
//               onSubmit={handleSubmit}
//               variants={containerVariants}
//               initial="hidden"
//               animate={isLoaded ? "visible" : "hidden"}
//             >
//               {/* Name Row */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     First Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
//                       placeholder="John"
//                       required
//                     />
//                   </div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     Last Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
//                       placeholder="Doe"
//                       required
//                     />
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Email */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-[#6B4A2E]/60" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
//                     placeholder="researcher@university.edu"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               {/* Password Row */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-12 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D]"
//                       placeholder="••••••••"
//                       required
//                       minLength={8}
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-[#6B4A2E]/60" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-[#6B4A2E]/60" />
//                       )}
//                     </button>
//                   </div>
//                   <p className="mt-2 text-xs text-[#6B4A2E]/60">
//                     Minimum 8 characters with letters and numbers
//                   </p>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-12 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D]"
//                       placeholder="••••••••"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="h-5 w-5 text-[#6B4A2E]/60" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-[#6B4A2E]/60" />
//                       )}
//                     </button>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Institution & Role Row */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     Institution
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <input
//                       type="text"
//                       name="institution"
//                       value={formData.institution}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
//                       placeholder="University or Organization"
//                       required
//                     />
//                   </div>
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
//                     Primary Role
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Briefcase className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] appearance-none"
//                       required
//                     >
//                       <option value="">Select your role</option>
//                       {roles.map((role) => (
//                         <option key={role} value={role}>{role}</option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <GraduationCap className="h-5 w-5 text-[#6B4A2E]/60" />
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Checkboxes */}
//               <motion.div className="space-y-4" variants={itemVariants}>
//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     id="acceptTerms"
//                     name="acceptTerms"
//                     checked={formData.acceptTerms}
//                     onChange={handleChange}
//                     className="h-4 w-4 mt-1 text-[#C8A45D] focus:ring-[#C8A45D] border-[#E6DDCF] rounded"
//                     required
//                   />
//                   <label htmlFor="acceptTerms" className="ml-2 text-sm text-[#4A4036]">
//                     I agree to the{" "}
//                     <Link href="/terms" className="text-[#C8A45D] hover:text-[#6B4A2E]">
//                       Terms of Service
//                     </Link>{" "}
//                     and{" "}
//                     <Link href="/privacy" className="text-[#C8A45D] hover:text-[#6B4A2E]">
//                       Privacy Policy
//                     </Link>
//                   </label>
//                 </div>

//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     id="newsletter"
//                     name="newsletter"
//                     checked={formData.newsletter}
//                     onChange={handleChange}
//                     className="h-4 w-4 mt-1 text-[#C8A45D] focus:ring-[#C8A45D] border-[#E6DDCF] rounded"
//                   />
//                   <label htmlFor="newsletter" className="ml-2 text-sm text-[#4A4036]">
//                     Subscribe to our academic newsletter for updates on publications, calls for papers, and events (optional)
//                   </label>
//                 </div>
//               </motion.div>

//               {/* Submit Button */}
//               <motion.div variants={itemVariants}>
//                 <button
//                   type="submit"
//                   className="w-full py-4 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white font-semibold rounded-lg hover:from-[#5A3D26] hover:to-[#2E1F15] transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
//                 >
//                   Create Account
//                 </button>
//               </motion.div>
//             </motion.form>

//             {/* Already have account */}
//             <motion.div 
//               className="mt-8 text-center"
//               initial={{ opacity: 0 }}
//               animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
//               transition={{ delay: 1.4 }}
//             >
//               <p className="text-[#4A4036]">
//                 Already have an account?{" "}
//                 <Link 
//                   href="/login" 
//                   className="text-[#C8A45D] font-semibold hover:text-[#6B4A2E] transition-colors"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </motion.div>

//             {/* Benefits Section */}
//             <motion.div 
//               className="mt-12 pt-8 border-t border-[#E6DDCF]"
//               initial={{ opacity: 0, y: 20 }}
//               animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//               transition={{ delay: 1.6 }}
//             >
//               <h3 className="font-serif text-xl text-[#3F2A1D] mb-6 text-center">
//                 Benefits of Joining
//               </h3>
              
//               <div className="grid md:grid-cols-3 gap-6">
//                 {[
//                   { icon: "📝", title: "Submit Manuscripts", desc: "Submit and track your research papers" },
//                   { icon: "👥", title: "Peer Network", desc: "Connect with researchers in your field" },
//                   { icon: "🔔", title: "Stay Updated", desc: "Get notifications for new publications" }
//                 ].map((benefit, index) => (
//                   <div key={index} className="text-center p-4 bg-[#F6F1E8]/50 rounded-lg">
//                     <div className="text-2xl mb-3">{benefit.icon}</div>
//                     <h4 className="font-semibold text-[#3F2A1D] mb-2">{benefit.title}</h4>
//                     <p className="text-sm text-[#4A4036]">{benefit.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import Link from 'next/link';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || 'Failed to create account');
//         setLoading(false);
//         return;
//       }

//       // Auto login after registration
//       const result = await signIn('credentials', {
//         email: formData.email,
//         password: formData.password,
//         redirect: false,
//       });

//       if (result?.error) {
//         // Registration succeeded but login failed - redirect to login
//         router.push('/login');
//       } else {
//         // Successfully logged in, redirect to student dashboard
//         router.refresh();
// window.location.href = '/student/dashboard';
// }
//     } catch (err) {
//       setError('An unexpected error occurred');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link
//               href="/login"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           )}

//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Full Name"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password (min 6 characters)"
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, confirmPassword: e.target.value })
//                 }
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Confirm Password"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Creating account...' : 'Create account'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Auto login after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Registration succeeded but login failed - redirect to login
        router.push('/login');
      } else {
        // Successfully logged in, redirect to student dashboard
        router.refresh();
        window.location.href = '/student/dashboard';
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Column - Image */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto">
          <Image
            src="/photos/img5.jpeg"
            alt="Academic Library Background"
            fill
            className="object-cover object-left"
            priority
            style={{ objectPosition: "70% center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3F2A1D]/80 to-transparent lg:bg-gradient-to-r lg:from-[#3F2A1D]/80 lg:to-transparent"></div>
          
          <motion.div 
            className="absolute bottom-8 left-8 lg:left-12 lg:bottom-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl lg:text-3xl mb-4">
              Journal of Humanities and<br />Social Sciences Invention
            </h2>
            <p className="text-white/90 max-w-md">
              Join our academic community and start your journey of discovery.
            </p>
          </motion.div>
        </div>

        {/* Right Column - Register Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Logo/Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F6F1E8] rounded-full border-4 border-[#E6DDCF] shadow-lg mb-6">
                <span className="text-2xl text-[#6B4A2E] font-bold">J</span>
              </div>
              
              <h1 className="font-serif text-3xl lg:text-4xl text-[#3F2A1D] mb-4">
                Create Account
              </h1>
              
              <motion.div 
                className="h-px w-20 bg-[#C8A45D] mx-auto mb-6"
                initial={{ width: 0 }}
                animate={isLoaded ? { width: "80px" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              <p className="text-[#4A4036]">
                Join our academic community today
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                className="mb-6 rounded-md bg-red-50 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}

            {/* Register Form */}
            <motion.form 
              className="space-y-5"
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Name Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#6B4A2E]/60" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#6B4A2E]/60" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
                    placeholder="researcher@university.edu"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#6B4A2E]/60" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
                    placeholder="•••••••• (min 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#6B4A2E]/60" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#6B4A2E]/60" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#3F2A1D] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#6B4A2E]/60" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-white border border-[#E6DDCF] rounded-lg focus:ring-2 focus:ring-[#C8A45D] focus:border-[#C8A45D] outline-none transition-colors text-[#3F2A1D] placeholder:text-[#6B4A2E]/40"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-[#6B4A2E]/60" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#6B4A2E]/60" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Password Requirements Hint */}
              <motion.div 
                variants={itemVariants}
                className="text-xs text-[#6B4A2E]/60 mt-1"
              >
                Password must be at least 6 characters long
              </motion.div>

              {/* Terms and Conditions Checkbox */}
              <motion.div 
                className="flex items-start mt-4"
                variants={itemVariants}
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-[#C8A45D] focus:ring-[#C8A45D] border-[#E6DDCF] rounded"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-sm text-[#4A4036]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#C8A45D] hover:text-[#6B4A2E] transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#C8A45D] hover:text-[#6B4A2E] transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#6B4A2E] to-[#3F2A1D] text-white font-semibold rounded-lg hover:from-[#5A3D26] hover:to-[#2E1F15] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </motion.div>
            </motion.form>

            
            {/* Sign In Link */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-[#4A4036]">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-[#C8A45D] font-semibold hover:text-[#6B4A2E] transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}