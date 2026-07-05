import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Download,
  BookOpen,
  Briefcase,
  Layers,
  Heart,
  Globe,
  Check,
  Copy,
  Printer,
  ChevronRight,
  Sparkles,
  Award,
  Maximize2,
  FileText,
  User,
  ExternalLink,
  MessageSquare,
  Send,
  ThumbsUp,
  Brain,
  Video,
  Camera,
  Music,
  Laptop,
  Flame,
  Info
} from "lucide-react";
// @ts-ignore
import profileImg from "./assets/images/Ritok pic.jpg";

interface SkillItem {
  name: string;
  description: string;
  icon: string;
}

interface EducationItem {
  period: string;
  school: string;
  degree: string;
  details: string;
}

interface HobbyItem {
  name: string;
  description: string;
  icon: string;
}

interface GuestbookMessage {
  id: string;
  name: string;
  company: string;
  message: string;
  timestamp: string;
}

const cvData = {
  name: "Heng Sayritok",
  title: "University Student",
  summary: "First-year Digital Economy student at the National University of Management with foundational knowledge of Microsoft Office and strong communication and teamwork skills. Interested in applying academic knowledge while continuing to develop professional and technical skills.",
  contact: {
    phone: "+855 010 937 131",
    email: "rena61353@gmail.com",
    address: "Phnom Penh, Cambodia"
  },
  skills: [
    {
      name: "Critical Thinking",
      description: "Evaluating complex economic trends, logical problem solving, and analyzing digital strategies with a structured, data-first mindset.",
      icon: "Brain"
    },
    {
      name: "Presentations",
      description: "Structuring professional slideshows and presenting case studies on platform business models clearly and confidently.",
      icon: "Award"
    },
    {
      name: "Communication",
      description: "Facilitating positive exchanges, ensuring clarity in project requirements, and building relationships with peers and mentors.",
      icon: "MessageSquare"
    },
    {
      name: "Creativity",
      description: "Applying fresh, out-of-the-box approaches to digital economy assignments, blending theory with innovative media ideas.",
      icon: "Sparkles"
    },
    {
      name: "Teamwork",
      description: "Active, collaborative partner in group assignments. Driven to align team strengths and ensure outstanding deliverables.",
      icon: "User"
    },
    {
      name: "Basic computer skills",
      description: "Highly proficient in Microsoft Office (Word, PowerPoint, Excel), cloud workspace collaborations, and modern digital platforms.",
      icon: "Laptop"
    }
  ] as SkillItem[],
  languages: ["English", "Khmer"],
  education: [
    {
      period: "2023 - 2025",
      school: "Hun Sen Mittapheap High School, Preah Sihanouk",
      degree: "Graduated BACII (2024-2025)",
      details: "Completed high school curriculum with premium focus on analytical subjects, mathematics, and communication skills, successfully securing the national BACII certification."
    },
    {
      period: "2025 - Current",
      school: "National University of Management (NUM)",
      degree: "Bachelor's Degree in Digital Economy",
      details: "Diving deep into digital transformations, global platform business structures, quantitative economic analysis, and future-forward financial modules."
    }
  ] as EducationItem[],
  hobbies: [
    {
      name: "Photography",
      description: "Capturing perspective, light, and visual rhythm. Builds patient observation, design details, and visual aesthetics.",
      icon: "Camera"
    },
    {
      name: "Video editing",
      description: "Sequencing, timing, and visual storytelling to produce crisp, high-impact videos for academic presentations and content creation.",
      icon: "Video"
    },
    {
      name: "Music",
      description: "Fostering daily inspiration, rhythm, and structural appreciation. Promotes analytical focus during heavy analytical tasks.",
      icon: "Music"
    }
  ] as HobbyItem[]
};

export default function App() {
  const [viewMode, setViewMode] = useState<"classic" | "interactive">("classic");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  
  // Recruiter Match Game state
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number>(0);

  // Recruiter Contact Board state (locally persistent)
  const [guestbook, setGuestbook] = useState<GuestbookMessage[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [guestMsg, setGuestMsg] = useState("");
  const [msgSuccess, setMsgSuccess] = useState(false);

  // Load guestbook messages on mount
  useEffect(() => {
    const saved = localStorage.getItem("sayritok_guestbook");
    if (saved) {
      try {
        setGuestbook(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading guestbook storage", e);
      }
    } else {
      // Seed initial greeting message
      const seed: GuestbookMessage[] = [
        {
          id: "seed-1",
          name: "National University of Management Academic Advisor",
          company: "NUM Department of Digital Economy",
          message: "Welcome, Sayritok! An excellent representation of our Digital Economy cohort. Let's continue building the future of Cambodian technology and business systems!",
          timestamp: new Date().toLocaleDateString()
        }
      ];
      setGuestbook(seed);
      localStorage.setItem("sayritok_guestbook", JSON.stringify(seed));
    }
  }, []);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Recruiter Score Calculator
  const handleToggleSkillRequirement = (skillName: string) => {
    setRequiredSkills(prev => {
      const updated = prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName];
      
      // Calculate score based on selection
      // Any combination with "Digital Economy" or high-value soft skill gives high affinity!
      const scoreBase = updated.length * 15;
      const finalScore = Math.min(updated.length > 0 ? 60 + scoreBase : 0, 100);
      setMatchScore(finalScore);
      
      return updated;
    });
  };

  // Save guestbook message
  const handleAddMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMsg.trim()) return;

    const newMessage: GuestbookMessage = {
      id: `msg-${Date.now()}`,
      name: guestName.trim(),
      company: guestCompany.trim() || "Independent Professional",
      message: guestMsg.trim(),
      timestamp: new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem("sayritok_guestbook", JSON.stringify(updated));

    setGuestName("");
    setGuestCompany("");
    setGuestMsg("");
    setMsgSuccess(true);
    setTimeout(() => setMsgSuccess(false), 3000);
  };

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Brain": return <Brain className={className} />;
      case "Award": return <Award className={className} />;
      case "MessageSquare": return <MessageSquare className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "User": return <User className={className} />;
      case "Laptop": return <Laptop className={className} />;
      case "Camera": return <Camera className={className} />;
      case "Video": return <Video className={className} />;
      case "Music": return <Music className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#2C3545]/20 selection:text-[#2C3545]">
      
      {/* Non-printing Control Bar */}
      <header className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Header Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2C3545] flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
              HS
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                Heng Sayritok
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                Digital Economy Portfolio
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200">
            <button
              onClick={() => setViewMode("classic")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                viewMode === "classic"
                  ? "bg-white text-[#2C3545] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Classic Document
            </button>
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                viewMode === "interactive"
                  ? "bg-white text-[#2C3545] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Portfolio
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 bg-[#2C3545] hover:bg-[#1E293B] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm hover:shadow active:scale-95"
              title="Print CV or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="py-6 px-4 md:py-12">
        <div className="max-w-5xl mx-auto">
          
          <AnimatePresence mode="wait">
            {viewMode === "classic" ? (
              
              /* =======================================
                 1. CLASSIC RESUME DOCUMENT VIEW (A4 SIMULATED)
                 ======================================= */
              <motion.div
                key="classic"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="print-container bg-white w-full max-w-[820px] mx-auto min-h-[1140px] shadow-xl border border-slate-200 rounded-lg overflow-hidden flex flex-col md:flex-row"
                id="cv-classic-view"
              >
                
                {/* Left Side (Dark column) */}
                <div className="w-full md:w-[35%] bg-[#2C3545] text-white p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Portrait Frame */}
                    <div className="relative w-44 h-44 rounded-full border-[3px] border-white/95 shadow-lg mx-auto mb-10 overflow-hidden bg-slate-700">
                      <img
                        src={profileImg}
                        alt="Heng Sayritok portrait"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Contact Section */}
                    <div className="mb-10">
                      <h3 className="text-xl font-bold tracking-wide text-white uppercase text-left">
                        Contact
                      </h3>
                      <div className="w-full h-[1px] bg-white/20 mt-2 mb-5" />
                      
                      <div className="space-y-4">
                        {/* Phone */}
                        <div>
                          <p className="text-[11px] font-bold tracking-wider text-slate-300 uppercase mb-0.5">
                            Phone
                          </p>
                          <a
                            href={`tel:${cvData.contact.phone}`}
                            className="text-[13px] hover:text-sky-300 transition-colors inline-flex items-center gap-1.5"
                          >
                            {cvData.contact.phone}
                          </a>
                        </div>

                        {/* Email */}
                        <div>
                          <p className="text-[11px] font-bold tracking-wider text-slate-300 uppercase mb-0.5">
                            Email
                          </p>
                          <a
                            href={`mailto:${cvData.contact.email}`}
                            className="text-[13px] hover:text-sky-300 break-all transition-colors inline-flex items-center gap-1.5"
                          >
                            {cvData.contact.email}
                          </a>
                        </div>

                        {/* Address */}
                        <div>
                          <p className="text-[11px] font-bold tracking-wider text-slate-300 uppercase mb-0.5">
                            Address
                          </p>
                          <p className="text-[13px] text-slate-100">
                            {cvData.contact.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skills/Soft Skills Section */}
                    <div className="mb-10">
                      <h3 className="text-xl font-bold tracking-wide text-white uppercase text-left">
                        Skills/Soft Skills
                      </h3>
                      <div className="w-full h-[1px] bg-white/20 mt-2 mb-5" />
                      
                      <ul className="space-y-3.5">
                        {cvData.skills.map((skill, index) => (
                          <li
                            key={index}
                            className="text-[13px] text-slate-100 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                            <span>{skill.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Language Section */}
                    <div>
                      <h3 className="text-xl font-bold tracking-wide text-white uppercase text-left">
                        Language
                      </h3>
                      <div className="w-full h-[1px] bg-white/20 mt-2 mb-5" />
                      
                      <div className="space-y-2 text-[13px] text-slate-100 font-medium">
                        {cvData.languages.map((lang, index) => (
                          <p key={index}>{lang}</p>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Aesthetic Footer Line aligning with right column */}
                  <div className="hidden md:block w-full h-[1px] bg-white/10 mt-12" />

                </div>

                {/* Right Side (Light column) */}
                <div className="w-full md:w-[65%] bg-white p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    {/* Header Identity */}
                    <div className="mb-8">
                      <h2 className="text-[40px] md:text-[46px] font-bold text-[#2C3545] tracking-tight leading-none mb-2">
                        Heng Sayritok
                      </h2>
                      <h4 className="text-[17px] font-bold text-slate-500 uppercase tracking-widest">
                        University Student
                      </h4>
                    </div>

                    {/* Summary Statement */}
                    <p className="text-slate-600 text-[14px] leading-relaxed font-normal mb-10 text-justify">
                      {cvData.summary}
                    </p>

                    {/* Experience Section */}
                    <div className="mb-10">
                      <h3 className="text-xl font-extrabold tracking-wide text-[#2C3545] uppercase text-left">
                        Experience
                      </h3>
                      <div className="w-full h-[1.5px] bg-[#2C3545]/20 mt-2 mb-5" />
                      <p className="text-slate-500 text-[14px] italic">
                        No work experience
                      </p>
                    </div>

                    {/* Education Section */}
                    <div className="mb-10">
                      <h3 className="text-xl font-extrabold tracking-wide text-[#2C3545] uppercase text-left">
                        Education
                      </h3>
                      <div className="w-full h-[1.5px] bg-[#2C3545]/20 mt-2 mb-5" />
                      
                      <div className="space-y-8">
                        {cvData.education.map((edu, index) => (
                          <div key={index} className="group">
                            <span className="inline-block text-[13px] font-bold text-slate-400 mb-1 tracking-wider uppercase">
                              {edu.period}
                            </span>
                            <h4 className="text-[16px] font-bold text-[#2C3545] mb-1">
                              {edu.school}
                            </h4>
                            <p className="text-[14px] font-semibold text-slate-600">
                              {edu.degree}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hobbies and Interests Section */}
                    <div className="mb-6">
                      <h3 className="text-xl font-extrabold tracking-wide text-[#2C3545] uppercase text-left">
                        Hobbies and Interests
                      </h3>
                      <div className="w-full h-[1.5px] bg-[#2C3545]/20 mt-2 mb-5" />
                      
                      <div className="space-y-2 text-[14px] text-slate-600 font-medium">
                        {cvData.hobbies.map((hobby, index) => (
                          <p key={index}>{hobby.name}</p>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Bottom align line */}
                  <div className="hidden md:block w-full h-[1px] bg-slate-100 mt-12" />

                </div>

              </motion.div>
            ) : (
              
              /* =======================================
                 2. INTERACTIVE PORTFOLIO WEB VIEW
                 ======================================= */
              <motion.div
                key="interactive"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                
                {/* Hero Card */}
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-md border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                  
                  {/* Decorative background shapes */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-100/50 rounded-full blur-3xl -z-10" />

                  {/* Profile Picture with animated border */}
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2C3545] to-slate-400 blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img
                        src={profileImg}
                        alt="Heng Sayritok"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Hero Information */}
                  <div className="text-center md:text-left space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 text-[#2C3545] px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                      <Award className="w-3.5 h-3.5" />
                      Future Digital Economist
                    </div>
                    
                    <div>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C3545] tracking-tight">
                        Heng Sayritok
                      </h2>
                      <p className="text-lg font-bold text-slate-500 mt-1">
                        National University of Management Student
                      </p>
                    </div>

                    <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
                      First-year Digital Economy student with a passion for platform technologies, business structures, and economic growth in Cambodia. Combining foundational skills with creative hobbies like video composition and photography.
                    </p>

                    {/* Meta Badges */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 border border-slate-100">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Phnom Penh, Cambodia
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 border border-slate-100">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        B.S. in Digital Economy
                      </span>
                    </div>
                  </div>

                </div>

                {/* Grid Layout: Left Main Column & Right Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Main (Col-span 2) */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Interactive Skills Showcase */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#2C3545]">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              Skills & Capabilities
                            </h3>
                            <p className="text-xs text-slate-500">
                              Click a skill to view academic insights
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Skill Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cvData.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSkill(skill)}
                            className="bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-100 cursor-pointer transition-all duration-200 text-left group flex gap-3.5 items-start"
                          >
                            <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#2C3545] shrink-0 border border-slate-100">
                              {renderIcon(skill.icon, "w-4 h-4")}
                            </div>
                            <div>
                              <h4 className="text-[14px] font-bold text-[#2C3545] group-hover:text-blue-900 transition-colors flex items-center gap-1">
                                {skill.name}
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                {skill.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Expanded Skill Modal Overlay */}
                      <AnimatePresence>
                        {selectedSkill && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                          >
                            <motion.div
                              initial={{ scale: 0.9, y: 20 }}
                              animate={{ scale: 1, y: 0 }}
                              exit={{ scale: 0.9, y: 20 }}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-slate-100 space-y-4 relative"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#2C3545]">
                                  {renderIcon(selectedSkill.icon, "w-5 h-5")}
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-[#2C3545]">
                                    {selectedSkill.name}
                                  </h4>
                                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                    Strategic Capability
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                                {selectedSkill.description}
                              </p>

                              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1.5">
                                <p className="font-bold text-slate-700 flex items-center gap-1">
                                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                                  Application in Digital Economy:
                                </p>
                                <p className="leading-relaxed">
                                  Crucial for translating traditional economic indicators into digitized environments, presenting projects in group assignments, and collaborating on academic platform case studies.
                                </p>
                              </div>

                              <div className="flex justify-end pt-2">
                                <button
                                  onClick={() => setSelectedSkill(null)}
                                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                                >
                                  Close Details
                                </button>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </section>

                    {/* Timeline Education */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-2.5 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#2C3545]">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Education Timeline
                          </h3>
                          <p className="text-xs text-slate-500">
                            Academic background & degrees
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 ml-3">
                        {cvData.education.map((edu, index) => (
                          <div key={index} className="relative group">
                            
                            {/* Dot Indicator */}
                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#2C3545] flex items-center justify-center group-hover:scale-125 transition-transform">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2C3545]" />
                            </div>

                            <div className="space-y-1">
                              <span className="inline-block bg-slate-100 text-[#2C3545] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                {edu.period}
                              </span>
                              <h4 className="text-base font-bold text-slate-900">
                                {edu.school}
                              </h4>
                              <p className="text-sm font-semibold text-slate-600">
                                {edu.degree}
                              </p>
                              <p className="text-xs text-slate-500 leading-relaxed pt-1.5">
                                {edu.details}
                              </p>
                            </div>

                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Recruiter Skill Match Calculator Game */}
                    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#2C3545]/10 bg-gradient-to-br from-white to-slate-50/40 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#2C3545]">
                          <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Recruiter Match Calculator
                          </h3>
                          <p className="text-xs text-slate-500">
                            Select desired qualities to calculate candidate compatibility
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Are you looking for specific academic strengths and core behaviors? Toggle the traits you require below and watch the real-time match rate update based on Heng's records:
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {[
                            "Digital Economy focus",
                            "Team Collaboration",
                            "Public Presentations",
                            "Microsoft Office Suite",
                            "Creative Media editing",
                            "Analytical mindset"
                          ].map((trait, index) => {
                            const isSelected = requiredSkills.includes(trait);
                            return (
                              <button
                                key={index}
                                onClick={() => handleToggleSkillRequirement(trait)}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5 ${
                                  isSelected
                                    ? "bg-[#2C3545] border-[#2C3545] text-white shadow-sm"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                {isSelected ? (
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                                )}
                                {trait}
                              </button>
                            );
                          })}
                        </div>

                        {/* Match Indicator */}
                        {requiredSkills.length > 0 ? (
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between">
                            <div className="space-y-1 text-center sm:text-left">
                              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Real-Time Compatibility
                              </p>
                              <p className="text-xs font-medium text-slate-700">
                                {matchScore === 100
                                  ? "🎯 Flawless alignment! Ready to start immediate internship!"
                                  : "✨ High capability alignment. High capability for group integration!"}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <span className="text-2xl font-black text-[#2C3545]">
                                  {matchScore}%
                                </span>
                                <span className="text-xs text-slate-400 font-semibold block">
                                  Match Rate
                                </span>
                              </div>
                              <div className="w-1.5 h-10 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="bg-emerald-500 rounded-full transition-all duration-500"
                                  style={{ height: `${matchScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-4 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                            Select one or more requirements to start compatibility calculations.
                          </div>
                        )}
                      </div>
                    </section>

                  </div>

                  {/* Right Column Panels */}
                  <div className="space-y-8">
                    
                    {/* Instant Contact Hub */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
                      <div>
                        <h3 className="text-md font-bold text-slate-900">
                          Instant Contact Hub
                        </h3>
                        <p className="text-xs text-slate-500">
                          Connect immediately with Heng
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Interactive Call */}
                        <a
                          href={`tel:${cvData.contact.phone}`}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-[#2C3545]/5 hover:border-[#2C3545]/20 border border-slate-100 transition-all text-slate-700 hover:text-slate-950 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#2C3545]">
                              <Phone className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs font-bold text-slate-500 uppercase block leading-none mb-1">
                                Phone
                              </span>
                              <span className="text-xs font-semibold text-slate-800">
                                {cvData.contact.phone}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        {/* Interactive Email */}
                        <a
                          href={`mailto:${cvData.contact.email}`}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-[#2C3545]/5 hover:border-[#2C3545]/20 border border-slate-100 transition-all text-slate-700 hover:text-slate-950 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#2C3545]">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs font-bold text-slate-500 uppercase block leading-none mb-1">
                                Email
                              </span>
                              <span className="text-xs font-semibold text-slate-800 break-all">
                                {cvData.contact.email}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        {/* Copy Tools */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleCopyText(cvData.contact.email, "email")}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                          >
                            {copiedText === "email" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy Email
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyText(cvData.contact.phone, "phone")}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                          >
                            {copiedText === "phone" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy Phone
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </section>

                    {/* Creative Hobbies & Interests */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                      <div>
                        <h3 className="text-md font-bold text-slate-900">
                          Creative Outlets
                        </h3>
                        <p className="text-xs text-slate-500">
                          How hobbies refine digital skillsets
                        </p>
                      </div>

                      <div className="space-y-3">
                        {cvData.hobbies.map((hobby, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-100/50 space-y-1.5"
                          >
                            <div className="flex items-center gap-2 text-[#2C3545]">
                              {renderIcon(hobby.icon, "w-4 h-4")}
                              <h4 className="text-xs font-bold uppercase tracking-wider">
                                {hobby.name}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {hobby.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Recruiters Board / Guestbook */}
                    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                      <div>
                        <h3 className="text-md font-bold text-slate-900">
                          Recruiter Guestbook
                        </h3>
                        <p className="text-xs text-slate-500">
                          Leave a public message or inquiry
                        </p>
                      </div>

                      {/* Guestbook Form */}
                      <form onSubmit={handleAddMessage} className="space-y-3">
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Your Name *"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#2C3545] focus:border-[#2C3545]"
                          />
                          <input
                            type="text"
                            placeholder="Company (optional)"
                            value={guestCompany}
                            onChange={(e) => setGuestCompany(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#2C3545] focus:border-[#2C3545]"
                          />
                          <textarea
                            placeholder="Your message/feedback here... *"
                            required
                            rows={3}
                            value={guestMsg}
                            onChange={(e) => setGuestMsg(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#2C3545] focus:border-[#2C3545] resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#2C3545] hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Message
                        </button>

                        {msgSuccess && (
                          <p className="text-[10px] text-emerald-600 font-bold text-center flex items-center justify-center gap-1">
                            <Check className="w-3 h-3" />
                            Message posted successfully!
                          </p>
                        )}
                      </form>

                      {/* Message Feed list */}
                      <div className="pt-2 border-t border-slate-100 max-h-48 overflow-y-auto space-y-2.5 pr-1">
                        {guestbook.map((msg) => (
                          <div key={msg.id} className="text-left bg-slate-50 p-2.5 rounded-lg border border-slate-100/50 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <span className="text-xs font-bold text-slate-800 block leading-tight">
                                  {msg.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold block leading-tight">
                                  {msg.company}
                                </span>
                              </div>
                              <span className="text-[9px] text-slate-400 font-medium shrink-0">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal italic">
                              "{msg.message}"
                            </p>
                          </div>
                        ))}
                      </div>

                    </section>

                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Website Footer */}
      <footer className="no-print mt-12 py-8 bg-white border-t border-slate-200 text-slate-400 text-xs font-medium text-center space-y-2">
        <p>Heng Sayritok — Professional Portfolio © 2026</p>
        <p className="text-slate-300">
          Designed with geometric precision matching the physical print standards.
        </p>
      </footer>

    </div>
  );
}
