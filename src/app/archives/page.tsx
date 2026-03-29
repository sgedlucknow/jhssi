// src/app/archives/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ArchivesHeader from "@/components/archives/ArchivesHeader";
import SearchFilters from "@/components/archives/SearchFilters";
import ArchiveItem from "@/components/archives/ArchiveItem";
import PreviewModal from "@/components/archives/PreviewModal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, TrendingUp, Star } from "lucide-react";

// Mock data for archives
// const archivesData = [
//   {
//     id: "1",
//     title: "Global Perspectives on Sustainable Development",
//     volume: "15",
//     issue: "3",
//     year: 2024,
//     month: "September",
//     description: "This issue explores innovative approaches to sustainable development across various sectors, featuring groundbreaking research from international scholars.",
//     coverImage: "/photos/img5.jpeg",
//     pdfUrl: "#",
//     pages: 120,
//     articles: 8,
//     categories: ["Social Sciences", "Sustainable Development", "Interdisciplinary"],
//     featured: true
//   },
//   {
//     id: "2",
//     title: "Digital Humanities in the Modern Era",
//     volume: "15",
//     issue: "2",
//     year: 2024,
//     month: "June",
//     description: "Examining the intersection of technology and humanities, this issue presents cutting-edge research on digital methodologies in humanistic studies.",
//     coverImage: "/photos/img1.jpeg",
//     pdfUrl: "#",
//     pages: 98,
//     articles: 7,
//     categories: ["Humanities", "Technology", "Research Methods"]
//   },
//   {
//     id: "3",
//     title: "Cross-Cultural Communication Studies",
//     volume: "15",
//     issue: "1",
//     year: 2024,
//     month: "March",
//     description: "Focusing on communication across cultural boundaries, this issue offers insights into linguistic, social, and psychological aspects of intercultural exchange.",
//     coverImage: "/photos/img3.jpeg",
//     pdfUrl: "#",
//     pages: 115,
//     articles: 9,
//     categories: ["Social Sciences", "Communication", "Cultural Studies"]
//   },
//   {
//     id: "4",
//     title: "Historical Analysis of Urban Development",
//     volume: "14",
//     issue: "4",
//     year: 2023,
//     month: "December",
//     description: "A comprehensive examination of urban evolution through historical lenses, featuring case studies from different continents and time periods.",
//     coverImage: "/photos/img4.jpeg",
//     pdfUrl: "#",
//     pages: 142,
//     articles: 10,
//     categories: ["History", "Urban Studies", "Social Sciences"],
//     featured: true
//   },
//   {
//     id: "5",
//     title: "Psychological Impacts of Digital Transformation",
//     volume: "14",
//     issue: "3",
//     year: 2023,
//     month: "September",
//     description: "Investigating the psychological effects of rapid digitalization on individuals and societies in the 21st century.",
//     coverImage: "/photos/img2.jpeg",
//     pdfUrl: "#",
//     pages: 108,
//     articles: 7,
//     categories: ["Psychology", "Technology", "Social Sciences"]
//   },
//   {
//     id: "6",
//     title: "Philosophical Approaches to Artificial Intelligence",
//     volume: "14",
//     issue: "2",
//     year: 2023,
//     month: "June",
//     description: "Exploring ethical and philosophical implications of AI development and implementation in contemporary society.",
//     coverImage: "/photos/img2.jpeg",
//     pdfUrl: "#",
//     pages: 95,
//     articles: 6,
//     categories: ["Philosophy", "Artificial Intelligence", "Ethics"]
//   },
//   {
//     id: "7",
//     title: "Economic Resilience in Post-Pandemic World",
//     volume: "14",
//     issue: "1",
//     year: 2023,
//     month: "March",
//     description: "Analyzing economic recovery strategies and resilience building in the aftermath of global health crises.",
//     coverImage: "/photos/img5.jpeg",
//     pdfUrl: "#",
//     pages: 125,
//     articles: 8,
//     categories: ["Economics", "Public Health", "Policy Studies"]
//   },
//   {
//     id: "8",
//     title: "Literary Criticism in the 21st Century",
//     volume: "13",
//     issue: "4",
//     year: 2022,
//     month: "December",
//     description: "New perspectives and methodologies in literary analysis, featuring contemporary critical approaches to modern literature.",
//     coverImage: "/photos/img1.jpeg",
//     pdfUrl: "#",
//     pages: 110,
//     articles: 7,
//     categories: ["Literature", "Literary Criticism", "Humanities"]
//   },
// ];

 export default function ArchivesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     year: "all",
//     type: "all",
//     category: "all"
//   });
//   const [selectedIssue, setSelectedIssue] = useState<typeof archivesData[0] | null>(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Filter and search logic
//   const filteredArchives = useMemo(() => {
//     return archivesData.filter((item) => {
//       // Search filter
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase();
//         if (
//           !item.title.toLowerCase().includes(query) &&
//           !item.description.toLowerCase().includes(query) &&
//           !item.categories.some(cat => cat.toLowerCase().includes(query))
//         ) {
//           return false;
//         }
//       }

//       // Year filter
//       if (filters.year !== "all" && item.year.toString() !== filters.year) {
//         return false;
//       }

//       // Category filter
//       if (filters.category !== "all" && !item.categories.includes(filters.category)) {
//         return false;
//       }

//       return true;
//     });
//   }, [searchQuery, filters]);

//   const handlePreview = (issue: typeof archivesData[0]) => {
//     setSelectedIssue(issue);
//     setIsPreviewOpen(true);
//   };

//   // Get featured issues
//   const featuredIssues = archivesData.filter(item => item.featured);
//   const recentIssues = archivesData.slice(0, 3);

  return (
    <main>
      <Navigation/>
      {/* <ArchivesHeader />
     */}
      
      <div className="max-w-7xl mx-auto px-6 py-12">
      <iframe
        src="https://journal.jhssi.com/archive/"
        className="flex-1 w-full h-200 border-none"
      />
           </div>
      <Footer/>
    </main>
  );
}
