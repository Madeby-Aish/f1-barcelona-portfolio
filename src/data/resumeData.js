export const SATELLITE_CAMERA = {
  position: [0, 45, 95],
  target: [0, 5, 0],
}

export const TURNS_DATA = [
  {
    turnNumber: 1,
    name: "Curva Elf",
    title: "TECHNICAL ARSENAL & ACADEMICS",
    category: "SKILLS & EDUCATION",
    sector: 1,
    color: "#00ff87", // Electric emerald
    trackPosition: [-60, 1.8, 45],
    camera: {
      position: [-52, 6, 54],
      target: [-60, 1.8, 45],
    },
    telemetry: {
      entrySpeed: "338 km/h",
      apexSpeed: "142 km/h",
      gear: "GEAR 3",
      lateralG: "4.2 G",
      status: "OPTIMAL APEX"
    },
    tagline: "Strong foundational fluency in AI/ML, Swift native mobile development, and modern frontend systems.",
    items: [
      {
        id: "skills-languages",
        title: "Programming Languages",
        badge: "CORE STACK",
        icon: "Code2",
        description: "Robust programming foundations spanning interpreted, compiled, and query languages for algorithms, machine learning models, and system software.",
        tags: ["Python", "Swift", "SQL", "C", "Java"],
        metrics: [
          { label: "Python Mastery", value: "95%" },
          { label: "Swift & SwiftUI", value: "92%" },
          { label: "SQL & DBs", value: "90%" }
        ]
      },
      {
        id: "skills-ui-web",
        title: "UI/UX & Web Engineering",
        badge: "DESIGN SYSTEMS",
        icon: "Layers",
        description: "Transforming complex specifications into intuitive, responsive, and aesthetically stunning human-centered digital interfaces.",
        tags: ["Figma", "Frontend Architecture", "Responsive Design", "React", "Tailwind CSS", "Three.js / WebGL"],
        metrics: [
          { label: "UI Prototyping", value: "Figma" },
          { label: "Responsive Layouts", value: "100%" }
        ]
      },
      {
        id: "skills-aiml",
        title: "AI / ML & Computer Vision",
        badge: "INTELLIGENCE",
        icon: "Cpu",
        description: "Developing intelligent edge models, landmark tracking pipelines, natural language processors, and predictive analytics algorithms.",
        tags: ["Google MediaPipe", "Predictive Modelling", "NLP", "Computer Vision", "Scikit-Learn"],
        metrics: [
          { label: "Realtime Tracking", value: "60 FPS" },
          { label: "Model Evaluation", value: "High Precision" }
        ]
      },
      {
        id: "skills-education",
        title: "B.E. in Computer Science (AIML)",
        institution: "A.J. Institute of Engineering & Technology (AJIET), Mangaluru",
        badge: "CGPA: 8.02 / 10.0",
        period: "BE CSE - AIML",
        icon: "GraduationCap",
        description: "Pursuing Bachelor of Engineering with rigorous coursework in Artificial Intelligence, Machine Learning, Deep Neural Architectures, Data Structures & Algorithms, and Cloud Systems.",
        tags: ["BE CSE-AIML", "CGPA 8.02", "AJIET Mangaluru", "AI Specialization"],
        metrics: [
          { label: "Current CGPA", value: "8.02" },
          { label: "Specialization", value: "AI & ML" }
        ]
      }
    ]
  },
  {
    turnNumber: 4,
    name: "Curva de Repsol",
    title: "HONORS & LITERARY WORKS",
    category: "ACHIEVEMENTS & LITERATURE",
    sector: 1,
    color: "#ffaa00", // Race amber
    trackPosition: [45, 1.8, 55],
    camera: {
      position: [53, 6.5, 63],
      target: [45, 1.8, 55],
    },
    telemetry: {
      entrySpeed: "285 km/h",
      apexSpeed: "210 km/h",
      gear: "GEAR 4",
      lateralG: "3.9 G",
      status: "PODIUM SECTOR"
    },
    tagline: "World record milestones, published books, viral technical essays, and keynote stage hosting.",
    items: [
      {
        id: "achieve-world-record",
        title: "World Record Holder — 'The Mega Manuscript'",
        company: "True Dreamers Press",
        badge: "OFFICIAL WORLD RECORD",
        icon: "Trophy",
        description: "Officially documented World Record holder as a contributing co-author in 'The Mega Manuscript' — published by True Dreamers Press, honoring historic literary collaboration.",
        tags: ["World Record", "The Mega Manuscript", "True Dreamers Press", "International Honor"],
        highlight: "Official World Record citation for monumental literary collaboration."
      },
      {
        id: "achieve-published-book",
        title: "Published Author — 'Letters Never Sent'",
        company: "True Dreamers Press",
        badge: "PUBLISHED BOOK",
        icon: "BookOpen",
        description: "Authored and published the acclaimed solo literary work 'Letters Never Sent' (True Dreamers Press), exploring human relationships, introspection, unvoiced emotions, and psychological nuance.",
        tags: ["Published Author", "Letters Never Sent", "True Dreamers Press", "Creative Writing"],
        highlight: "Solo literary release distributed across readerships and literary circles."
      },
      {
        id: "achieve-medium-writer",
        title: "Medium Essayist & Thought Leader",
        badge: "ESSAYIST",
        icon: "PenTool",
        description: "Authoring analytical articles delving into creative writing mechanics, narrative pacing, character psychology, and bleeding-edge technology trends.",
        tags: ["Medium Writer", "Narrative Pacing", "Tech Essays", "Creative Writing"],
        link: {
          label: "Read on Medium",
          url: "https://medium.com/@rya.hc007"
        },
        highlight: "Curated analytical essays read and appreciated across writing and developer networks."
      },
      {
        id: "achieve-public-speaking",
        title: "Public Speaking & University Anchor",
        institution: "University Level",
        badge: "KEYNOTE PRESENTER",
        icon: "Mic",
        description: "Proven track record as lead university presenter and official Master of Ceremonies, anchoring academic symposiums, coding summits, and cultural galas before large live audiences.",
        tags: ["University Anchor", "Presenter", "Public Speaking", "Event Moderation"]
      }
    ]
  },
  {
    turnNumber: 10,
    name: "La Caixa Hairpin",
    title: "FLAGSHIP ENGINEERING BUILDS",
    category: "PROJECTS",
    sector: 2,
    color: "#00e5ff", // Neon Cyan
    trackPosition: [70, 1.8, -50],
    camera: {
      position: [78, 6, -42],
      target: [70, 1.8, -50],
    },
    telemetry: {
      entrySpeed: "305 km/h",
      apexSpeed: "75 km/h",
      gear: "GEAR 1",
      lateralG: "4.8 G",
      status: "HEAVY BRAKING"
    },
    tagline: "Production deployments solving real-world challenges in AI fitness coaching and native mobile travel.",
    items: [
      {
        id: "project-swasth-ai",
        title: "Swasth-AI: IoT & AI Smart Fitness Coach",
        badge: "FRONTEND LEAD & AI",
        icon: "Activity",
        description: "Next-gen intelligent fitness and rehabilitation coach delivering real-time posture feedback through Google MediaPipe 33-point skeletal landmark detection, Python pose tracking, automated rep counting, and hardware biometric synchronization with ESP32 microcontrollers.",
        tags: ["Frontend Lead", "Google MediaPipe", "Python", "Posture Tracking", "ESP32 IoT", "Real-Time Sync"],
        metrics: [
          { label: "Vision Latency", value: "<25ms" },
          { label: "Pose Keypoints", value: "33-3D" },
          { label: "IoT Controller", value: "ESP32" }
        ],
        link: {
          label: "View on GitHub",
          url: "https://github.com/Madeby-Aish"
        },
        highlight: "Real-time posture angle correction alerting users before injuries occur."
      },
      {
        id: "project-tour-buddy",
        title: "Tour Buddy Lite: Multi-Platform Travel Assistant",
        badge: "SOLO DEVELOPER",
        icon: "Compass",
        description: "Native, high-performance travel assistant architected natively for iOS and macOS using Swift. Crafted with end-to-end custom UI/UX, responsive gesture workflows, offline route caching, and native Apple Silicon platform optimizations.",
        tags: ["Solo Developer", "Swift", "iOS & macOS", "UI/UX Architecture", "Apple Native"],
        metrics: [
          { label: "Platform", value: "iOS + macOS" },
          { label: "Architecture", value: "SwiftUI" },
          { label: "Offline Mode", value: "100%" }
        ],
        link: {
          label: "View on GitHub",
          url: "https://github.com/Madeby-Aish"
        },
        highlight: "Seamless cross-platform macOS & iOS interface with responsive native UI."
      }
    ]
  },
  {
    turnNumber: 12,
    name: "Banc de Sabadell",
    title: "INDUSTRY EXPERIENCE & INITIATIVES",
    category: "EXPERIENCE & LEADERSHIP",
    sector: 3,
    color: "#ff0055", // Hot red
    trackPosition: [20, 1.8, -75],
    camera: {
      position: [28, 6, -67],
      target: [20, 1.8, -75],
    },
    telemetry: {
      entrySpeed: "230 km/h",
      apexSpeed: "135 km/h",
      gear: "GEAR 3",
      lateralG: "3.6 G",
      status: "HIGH DOWNFORCE"
    },
    tagline: "Leading startup web engineering, mentoring student developers, and hosting high-profile summits.",
    items: [
      {
        id: "exp-terrazoe",
        title: "Lead Web Developer",
        company: "Terrazoe (terrazoe.in)",
        badge: "LEAD ENGINEER",
        period: "Startup Web Deployment",
        icon: "Terminal",
        description: "Spearheaded the complete end-to-end architecture, development, responsive UI engineering, and production deployment of the official website for Terrazoe (terrazoe.in), an innovative bio-fertilizer startup.",
        tags: ["Lead Web Developer", "terrazoe.in", "Bio-Fertilizer Startup", "Deployment", "Frontend"],
        link: {
          label: "Visit terrazoe.in",
          url: "https://terrazoe.in"
        },
        achievements: [
          "Delivered responsive web presence optimizing brand conversion and client reach.",
          "Implemented clean modern styling with fast loading performance across mobile and desktop."
        ]
      },
      {
        id: "exp-ajiet-mc",
        title: "Master of Ceremonies & Host",
        company: "AJIET Campus Events",
        badge: "UNIVERSITY HOST",
        period: "Ongoing Campus Leadership",
        icon: "Mic",
        description: "Served as the primary Master of Ceremonies and host for flagship university events, technical workshops, inter-collegiate coding symposiums, and cultural fests.",
        tags: ["Master of Ceremonies", "Technical Workshops", "Coding Fests", "AJIET", "Leadership"],
        achievements: [
          "Anchored major campus events before faculty, industry guests, and 800+ attendees.",
          "Maintained engaging tempo, speaker introductions, and award ceremonies."
        ]
      },
      {
        id: "exp-gfg-ambassador",
        title: "Campus Ambassador",
        company: "GeeksforGeeks (GFG)",
        badge: "CAMPUS AMBASSADOR",
        period: "Developer Community",
        icon: "Users",
        description: "Represented GeeksforGeeks on campus, organizing competitive coding bootcamps, technical awareness drives, and DSA workshops to foster a vibrant developer culture.",
        tags: ["GeeksforGeeks", "Campus Ambassador", "Technical Awareness", "DSA Workshops"],
        achievements: [
          "Drove coding engagement, introducing fellow students to competitive programming and algorithmic problem solving."
        ]
      }
    ]
  },
  {
    turnNumber: 14,
    name: "Curva New Holland",
    title: "GET IN TOUCH & VERIFIED LINKS",
    category: "CONTACT & CREDENTIALS",
    sector: 3,
    color: "#b026ff", // Neon Purple
    trackPosition: [-40, 1.8, -55],
    camera: {
      position: [-33, 6, -48],
      target: [-40, 1.8, -55],
    },
    telemetry: {
      entrySpeed: "245 km/h",
      apexSpeed: "220 km/h",
      gear: "GEAR 5",
      lateralG: "3.4 G",
      status: "CHECKERED FLAG"
    },

    tagline: "Direct channels for collaboration, engineering roles, literary inquiries, and speaking invitations.",
    items: [
      {
        id: "contact-direct",
        title: "Direct Communication Channels",
        badge: "VERIFIED CONTACT",
        icon: "Mail",
        description: "Reach out directly for AI/ML engineering roles, frontend development collaborations, literary panels, or technical speaking engagements.",
        tags: ["Email Contact", "Phone", "Mangaluru, India", "Available for Roles"],
        metrics: [
          { label: "Email", value: "rya.hc007@gmail.com" },
          { label: "Phone", value: "+91 9743474334" }
        ],
        link: {
          label: "Send Direct Email",
          url: "mailto:rya.hc007@gmail.com"
        }
      },
      {
        id: "contact-profiles",
        title: "Developer & Professional Profiles",
        badge: "ONLINE PRESENCE",
        icon: "Sparkles",
        description: "Connect across official developer and writing profiles to explore code repositories, professional endorsements, and published articles.",
        tags: ["GitHub", "LinkedIn", "Medium"],
        achievements: [
          "GitHub: github.com/Madeby-Aish (Open-source repositories & builds)",
          "LinkedIn: linkedin.com/in/aishwaryahc5506 (Professional career network)",
          "Medium: medium.com/@rya.hc007 (Published literary and technical essays)"
        ],
        link: {
          label: "Open LinkedIn Profile",
          url: "https://linkedin.com/in/aishwaryahc5506"
        }
      },
      {
        id: "contact-languages",
        title: "Linguistic Fluency & Location",
        badge: "GLOBAL COMMUNICATOR",
        icon: "Award",
        description: "Trilingual communicator with native fluency across Indian and global contexts, based in Mangaluru, Karnataka.",
        tags: ["English (Fluent)", "Kannada (Native)", "Hindi (Fluent)", "Mangaluru"],
        metrics: [
          { label: "English", value: "Fluent" },
          { label: "Kannada", value: "Native" },
          { label: "Hindi", value: "Fluent" }
        ]
      }
    ]
  }
]

export const PLAYER_PROFILE = {
  name: "AISHWARYA H.C.",
  callsign: "APEX-07",
  location: "Mangaluru, India",
  nationality: "INDIA 🇮🇳",
  team: "ORACLE RED BULL DEV LAB",
  role: "BE CSE-AIML (CGPA 8.02) • World Record Author • AI Developer",
  bio: "Engineering real-time AI/ML pipelines, Swift multi-platform applications, and responsive web platforms. World Record-holding co-author of 'The Mega Manuscript', published author of 'Letters Never Sent', Medium essayist, and university anchor.",
  stats: [
    { label: "AI / ML & MediaPipe", value: 95, grade: "S+" },
    { label: "UI / UX & Frontend Craft", value: 96, grade: "S+" },
    { label: "Public Speaking & MC", value: 98, grade: "APEX" },
    { label: "Swift Mobile (iOS/macOS)", value: 92, grade: "S" },
    { label: "Technical Writing", value: 97, grade: "APEX" }
  ],
  carTelemetry: {
    engine: "HYBRID V6 TURBO 1.6L",
    topSpeed: "348 KM/H",
    acceleration: "0-100 IN 2.1s",
    aeroPackage: "MAX DOWNFORCE - MONZA SPEC"
  },
  socials: {
    github: "https://github.com/Madeby-Aish",
    linkedin: "https://linkedin.com/in/aishwaryahc5506",
    email: "mailto:rya.hc007@gmail.com",
    medium: "https://medium.com/@rya.hc007",
    phone: "tel:9743474334"
  }
}
