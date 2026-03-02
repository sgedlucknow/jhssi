// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// export default function Navigation() {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const navLinks = [
//     { 
//       href: "/about", 
//       label: "About",
//       submenu: [
//         { href: "/about/about-the-journal", label: "About the Journal" },
//         { href: "/about/disclaimer", label: "Disclaimer" },
//         { href: "/about/submission", label: "Submission" },
//        ]
//     },
//     { 
//       href: "/editorial", 
//       label: "Editorial Board",
//       submenu: null
//     },
//     { 
//       href: "/current", 
//       label: "Current Issue",
//       submenu: null
//     },
//     { 
//       href: "/archives", 
//       label: "Archives",
//       submenu: null
//     },
//     { 
//       href: "/authors", 
//       label: "For Authors",
//       submenu: [
//         { href: "/authors/author-guidelines", label: "Author Guidelines" },
//         { href: "/authors/publication-ethics", label: "Publication Ethics" },
//         { href: "/authors/copyright", label: "Copyright Form" }
//       ]
//     },
//     { 
//       href: "/policies", 
//       label: "Policies",
//       submenu: [
//         { href: "/policies/anti-plagiarism-policy", label: "Anti-Plagiarism Policy" },
//         { href: "/policies/advertisements-policy", label: "Advertisements Policy" },
//         { href: "/policies/open-access-policy", label: "Open Access Policy" },
//       ]
//     },
//     { 
//       href: "/reviewers", 
//       label: "For Reviewers",
//       submenu: [
//         { href: "/reviewers/editorial-peer-review-process", label: "Editorial Peer Review Process" },
//               ]
//     },
//     { 
//       href: "/contact", 
//       label: "Contact",
//       submenu: null
//     },
//   ];

//   const handleDropdownEnter = (href: string) => {
//     if (navLinks.find(l => l.href === href)?.submenu) {
//       setIsAnimating(true);
//       setActiveDropdown(href);
//       setTimeout(() => setIsAnimating(false), 300);
//     }
//   };

//   return (
//     <nav className="w-full bg-white border-b border-[#E6DDCF] px-4 md:px-8 py-4">

//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* Logo Section - Larger */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           <div className="w-12 h-12 relative">
//             <Image
//               src="/photos/logo1.png"
//               alt="JHSSI Journal Logo"
//               width={48}
//               height={48}
//               className="object-contain"
//             />
//           </div>
//           <div className="flex flex-col leading-tight">
//             <span className="font-serif text-base font-bold text-[#3F2A1D] tracking-wider">
//               JHSSI
//             </span>
//             <span className="font-serif text-sm text-[#6B4A2E]">
//               Journal
//             </span>
//           </div>
//         </div>

//         {/* Navigation Links with Dropdowns */}
//         <div className="flex items-center mx-auto">
//           {navLinks.map((link, index) => (
//             <div 
//               key={link.href}
//               className="relative"
//               onMouseEnter={() => handleDropdownEnter(link.href)}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <div className="flex items-center">
//                 <Link
//                   href={link.href}
//                   className="px-5 py-2.5 text-[#4A4036] text-sm font-medium hover:text-[#6B4A2E] transition-colors whitespace-nowrap flex items-center gap-1.5 group"
//                 >
//                   {link.label}
//                   {link.submenu && (
//                     <svg 
//                       className={`w-2 h-3 transition-transform duration-300 ${activeDropdown === link.href ? 'rotate-180' : ''}`} 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   )}
//                 </Link>
                
//                 {index < navLinks.length - 1 && (
//                   <div className="h-5 w-px bg-[#E6DDCF]"></div>
//                 )}
//               </div>

//               {/* Scroll-like Dropdown */}
//               {link.submenu && activeDropdown === link.href && (
//                 <div className="absolute top-full left-0 z-50 pt-2">
//                   <div className="overflow-hidden">
//                     {/* Scroll opening animation container */}
//                     <div 
//                       className={`
//                         bg-white rounded-lg border border-[#E6DDCF] shadow-xl
//                         ${isAnimating ? 'animate-[scrollOpen_0.4s_ease-out]' : ''}
//                       `}
//                       style={{
//                         animationFillMode: 'forwards'
//                       }}
//                     >
//                       {/* Top scroll gradient */}
//                       <div className="h-3 bg-gradient-to-b from-[#F6F1E8] via-[#F6F1E8] to-transparent"></div>
                      
//                       {/* Dropdown items */}
//                       <div className="py-1">
//                         {link.submenu.map((subItem, idx) => (
//                           <Link
//                             key={subItem.href}
//                             href={subItem.href}
//                             className="block px-6 py-3 text-sm text-[#4A4036] hover:text-[#6B4A2E] hover:bg-[#F6F1E8] transition-all duration-200 border-l-2 border-transparent hover:border-[#C8A45D] group/item"
//                             style={{
//                               animationDelay: `${idx * 0.05}s`,
//                               animationFillMode: 'backwards'
//                             }}
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className="w-1.5 h-1.5 bg-[#C8A45D] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
//                               <span>{subItem.label}</span>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
                      
//                       {/* Bottom scroll gradient */}
//                       <div className="h-3 bg-gradient-to-t from-[#F6F1E8] via-[#F6F1E8] to-transparent"></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Login/Register Buttons */}
//         <div className="flex items-center gap-4 flex-shrink-0">
//           <div className="h-6 w-px bg-[#E6DDCF]"></div>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/login"
//               className="px-6 py-2.5 bg-[#6B4A2E] text-white text-sm font-medium rounded-full hover:bg-[#5A3D26] transition-colors whitespace-nowrap shadow-sm hover:shadow-md"
//             >
//               Login
//             </Link>
            
//           </div>
//         </div>

//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({});

  // Close mobile menu on resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileDropdowns({});
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { 
      href: "/about", 
      label: "About",
      submenu: [
        { href: "/about/about-the-journal", label: "About the Journal" },
        { href: "/about/disclaimer", label: "Disclaimer" },
        { href: "/about/submission", label: "Submission" },
      ]
    },
    { 
      href: "/editorial", 
      label: "Editorial Board",
      submenu: null
    },
    { 
      href: "/current", 
      label: "Current Issue",
      submenu: null
    },
    { 
      href: "/archives", 
      label: "Archives",
      submenu: null
    },
    { 
      href: "/authors", 
      label: "For Authors",
      submenu: [
        { href: "/authors/author-guidelines", label: "Author Guidelines" },
        { href: "/authors/publication-ethics", label: "Publication Ethics" },
        { href: "/authors/copyright", label: "Copyright Form" }
      ]
    },
    { 
      href: "/policies", 
      label: "Policies",
      submenu: [
        { href: "/policies/anti-plagiarism-policy", label: "Anti-Plagiarism Policy" },
        { href: "/policies/advertisements-policy", label: "Advertisements Policy" },
        { href: "/policies/open-access-policy", label: "Open Access Policy" },
      ]
    },
    { 
      href: "/reviewers", 
      label: "For Reviewers",
      submenu: [
        { href: "/reviewers/editorial-peer-review-process", label: "Editorial Peer Review Process" },
      ]
    },
    { 
      href: "/contact", 
      label: "Contact",
      submenu: null
    },
  ];

  const handleDropdownEnter = (href: string) => {
    if (navLinks.find(l => l.href === href)?.submenu) {
      setIsAnimating(true);
      setActiveDropdown(href);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const toggleMobileDropdown = (href: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdowns({});
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-[#E6DDCF] px-4 md:px-8 py-3 md:py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src="/photos/logo1.png"
                alt="JHSSI Journal Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm md:text-base font-bold text-[#3F2A1D] tracking-wider">
                JHSSI
              </span>
              <span className="font-serif text-xs md:text-sm text-[#6B4A2E] hidden xs:block">
                Journal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center mx-auto">
            {navLinks.map((link, index) => (
              <div 
                key={link.href}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    className="px-5 py-2.5 text-[#4A4036] text-sm font-medium hover:text-[#6B4A2E] transition-colors whitespace-nowrap flex items-center gap-1.5 group"
                  >
                    {link.label}
                    {link.submenu && (
                      <svg 
                        className={`w-2 h-3 transition-transform duration-300 ${activeDropdown === link.href ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {index < navLinks.length - 1 && (
                    <div className="h-5 w-px bg-[#E6DDCF]"></div>
                  )}
                </div>

                {/* Desktop Dropdown */}
                {link.submenu && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 z-50 pt-2">
                    <div className="overflow-hidden">
                      <div 
                        className={`
                          bg-white rounded-lg border border-[#E6DDCF] shadow-xl min-w-[220px]
                          ${isAnimating ? 'animate-[scrollOpen_0.4s_ease-out]' : ''}
                        `}
                        style={{ animationFillMode: 'forwards' }}
                      >
                        <div className="h-3 bg-gradient-to-b from-[#F6F1E8] via-[#F6F1E8] to-transparent"></div>
                        <div className="py-1">
                          {link.submenu.map((subItem, idx) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-6 py-3 text-sm text-[#4A4036] hover:text-[#6B4A2E] hover:bg-[#F6F1E8] transition-all duration-200 border-l-2 border-transparent hover:border-[#C8A45D] group/item"
                              style={{
                                animationDelay: `${idx * 0.05}s`,
                                animationFillMode: 'backwards'
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-[#C8A45D] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                <span>{subItem.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="h-3 bg-gradient-to-t from-[#F6F1E8] via-[#F6F1E8] to-transparent"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="h-6 w-px bg-[#E6DDCF]"></div>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-[#6B4A2E] text-white text-sm font-medium rounded-full hover:bg-[#5A3D26] transition-colors whitespace-nowrap shadow-sm hover:shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#F6F1E8] transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#3F2A1D] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#3F2A1D] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#3F2A1D] transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden
          ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl 
          transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6DDCF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/photos/logo1.png"
                alt="JHSSI"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-serif font-bold text-[#3F2A1D]">JHSSI</span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 hover:bg-[#F6F1E8] rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] py-4">
          {navLinks.map((link) => (
            <div key={link.href} className="border-b border-[#E6DDCF]/50 last:border-b-0">
              {link.submenu ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(link.href)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[#4A4036] hover:bg-[#F6F1E8] transition-colors"
                  >
                    <span className="font-medium">{link.label}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${mobileDropdowns[link.href] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Mobile Submenu */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 bg-[#F6F1E8]/30
                      ${mobileDropdowns[link.href] ? 'max-h-96' : 'max-h-0'}
                    `}
                  >
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={closeMobileMenu}
                        className="block px-8 py-3 text-sm text-[#4A4036] hover:text-[#6B4A2E] hover:bg-[#F6F1E8] transition-colors border-l-2 border-transparent hover:border-[#C8A45D]"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-[#4A4036] font-medium hover:bg-[#F6F1E8] transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Login Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E6DDCF] bg-white">
          <Link
            href="/login"
            onClick={closeMobileMenu}
            className="block w-full px-6 py-3 bg-[#6B4A2E] text-white text-sm font-medium rounded-full hover:bg-[#5A3D26] transition-colors text-center shadow-sm"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Add custom scroll animation if not already in your global CSS */}
      <style jsx global>{`
        @keyframes scrollOpen {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}