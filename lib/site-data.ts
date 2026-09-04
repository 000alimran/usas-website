export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type ContentSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type PageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: ContentSection[];
  cta?: { label: string; href: string };
};

export const site = {
  name: "University Students' Association of Shyamnagar",
  shortName: "USAS",
  domain: "usasbd.org",
  tagline: "Connecting Shyamnagar's Brightest Minds",
  description:
    "A growing community of students, alumni and professionals building connections, opportunities and impact together.",
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About USAS", href: "/about" },
      { label: "Our Story & History", href: "/about/history" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Core Values", href: "/about/core-values" },
      { label: "Governance & Structure", href: "/about/governance" },
      { label: "Transparency", href: "/transparency" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Members", href: "/community/members" },
      { label: "Alumni Network", href: "/community/alumni" },
      { label: "University Network", href: "/community/universities" },
      { label: "Member Stories", href: "/community/stories" },
      { label: "Mentors & Experts", href: "/community/mentors" },
      { label: "Community Directory", href: "/community/directory" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Mentorship", href: "/programs/mentorship" },
      { label: "Career & Skills", href: "/programs/career-skills" },
      { label: "Scholarships", href: "/programs/scholarships" },
      { label: "Webinars & Workshops", href: "/programs/webinars-workshops" },
      { label: "Student Support", href: "/programs/student-support" },
      { label: "Networking", href: "/programs/networking" },
      { label: "Civic Dialogue", href: "/programs/civic-dialogue" },
      { label: "Ask Your MP", href: "/programs/civic-dialogue/ask-your-mp" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Past Events", href: "/events/past" },
      { label: "USAS Reunion", href: "/events/reunion" },
      { label: "Reunion 2026", href: "/events/reunion/2026" },
      { label: "Reunion 2025", href: "/events/reunion/2025" },
      { label: "Event Gallery", href: "/events/gallery" },
      { label: "Event Registration", href: "/events/registration" },
    ],
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    children: [
      { label: "Blog & Articles", href: "/knowledge/articles" },
      { label: "Career", href: "/knowledge/career" },
      { label: "Scholarships", href: "/knowledge/scholarships" },
      { label: "Higher Education", href: "/knowledge/higher-education" },
      { label: "Member Insights", href: "/knowledge/member-insights" },
      { label: "Community Stories", href: "/knowledge/community-stories" },
      { label: "Resources", href: "/knowledge/resources" },
    ],
  },
  {
    label: "Impact",
    href: "/impact",
    children: [
      { label: "Our Impact", href: "/impact" },
      { label: "Impact Stories", href: "/impact/stories" },
      { label: "Annual Reports", href: "/impact/annual-reports" },
      { label: "Financial Transparency", href: "/transparency" },
      { label: "Partners & Sponsors", href: "/impact/partners" },
    ],
  },
];

export const footerGroups = [
  {
    title: "Explore",
    links: [
      ["About", "/about"],
      ["History", "/about/history"],
      ["Programs", "/programs"],
      ["Events", "/events"],
      ["Knowledge", "/knowledge"],
    ],
  },
  {
    title: "Community",
    links: [
      ["Membership", "/get-involved/member"],
      ["Alumni", "/community/alumni"],
      ["Volunteer", "/get-involved/volunteer"],
      ["University Ambassador", "/get-involved/ambassador"],
    ],
  },
  {
    title: "Organisation",
    links: [
      ["Governance", "/about/governance"],
      ["Transparency", "/transparency"],
      ["Partners", "/impact/partners"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export const homeStats = [
  { value: "Growing", label: "member network" },
  { value: "Across", label: "universities" },
  { value: "Annual", label: "community reunions" },
  { value: "Shared", label: "roots and ambition" },
];

export const pillars = [
  {
    title: "Community",
    text: "Build meaningful relationships across campuses, professions and generations.",
  },
  {
    title: "Opportunity",
    text: "Create access to mentorship, scholarships, careers, skills and collaboration.",
  },
  {
    title: "Knowledge",
    text: "Make useful experience, guidance and learning easier to discover and share.",
  },
  {
    title: "Impact",
    text: "Turn collective strength into support, civic participation and measurable contribution.",
  },
];

export const whatWeDo = [
  ["Networking", "Meaningful connections across universities and professions."],
  ["Mentorship", "Learn directly from seniors, alumni and experienced professionals."],
  ["Career & Skills", "Sessions, workshops and practical career resources."],
  ["Scholarships", "Connecting deserving students with relevant opportunities."],
  ["Community Support", "Helping one another when it matters most."],
  ["Civic Dialogue", "Creating non-partisan spaces for informed, responsible conversations."],
] as const;

const pageOverrides: Record<string, PageCopy> = {
  about: {
    eyebrow: "About USAS",
    title: "Different campuses. Shared roots. One community.",
    intro:
      "USAS connects students, alumni and professionals from Shyamnagar so knowledge, opportunity and support can move more freely across generations.",
    sections: [
      {
        heading: "Who we are",
        body: "We are a community built around a simple belief: where you study or work may change, but shared roots can remain a powerful source of trust, learning and contribution.",
      },
      {
        heading: "Why USAS exists",
        body: "Students from Shyamnagar are spread across universities, cities, sectors and countries. USAS creates the common ground that helps those disconnected networks become useful to one another.",
      },
      {
        heading: "What we are building",
        items: ["Stronger connections", "Better access to opportunity", "Mentorship across generations", "A culture of giving back"],
      },
    ],
    cta: { label: "Read our story", href: "/about/history" },
  },
  "about/history": {
    eyebrow: "Our Story",
    title: "A community that kept finding its way back together.",
    intro:
      "The USAS story is shaped by gatherings, handovers, reunions and new generations choosing to continue what earlier students started.",
    sections: [
      { heading: "2009", body: "The first conversations begin among university students from Shyamnagar." },
      { heading: "SAS era", body: "Early gatherings create the first shared identity and community habits." },
      { heading: "2015", body: "The community revives and evolves into USAS." },
      { heading: "Post-COVID", body: "A new generation steps forward and reconnects the network." },
      { heading: "2025", body: "The reunion becomes a major milestone for the wider community." },
      { heading: "2026", body: "USAS enters a more structured phase of community building." },
    ],
  },
  "about/vision-mission": {
    eyebrow: "Direction",
    title: "Build the most connected, resourceful and impactful Shyamnagar student and alumni network.",
    intro: "Our vision is long-term. Our mission is practical: connect, support, mentor, create opportunities and give back.",
    sections: [
      { heading: "Vision", body: "To build the most connected, resourceful and impactful student and alumni community originating from Shyamnagar." },
      { heading: "Mission", items: ["Connect", "Support", "Mentor", "Create opportunities", "Give back"] },
    ],
  },
  "about/core-values": {
    eyebrow: "Core Values",
    title: "Trust is the infrastructure.",
    intro: "USAS works best when people know the community is inclusive, respectful, transparent and bigger than any individual group or affiliation.",
    sections: [
      { heading: "Non-political", body: "People before political affiliation." },
      { heading: "Inclusive", body: "Every student deserves a place." },
      { heading: "Respectful", body: "Generations learn from one another." },
      { heading: "Educational", body: "Knowledge should circulate." },
      { heading: "Transparent", body: "Trust requires openness." },
      { heading: "Community-driven", body: "Built by the community, for the community." },
    ],
  },
  "about/governance": {
    eyebrow: "Governance",
    title: "A structure designed to outlast individuals.",
    intro: "Clear roles, terms, responsibilities and decision-making make a community more credible and easier for the next generation to inherit.",
    sections: [
      { heading: "Structure", items: ["Advisory Council", "Executive / Core Team", "Functional Teams", "University Ambassadors", "Members"] },
      { heading: "Functional teams", items: ["Membership", "Programs", "Education & Career", "Events", "Communications", "Partnerships", "Finance", "Technology"] },
      { heading: "Governance documents", items: ["Current committee", "Responsibilities", "Term", "Selection process", "Code of conduct"] },
    ],
    cta: { label: "View transparency", href: "/transparency" },
  },
  community: {
    eyebrow: "Community",
    title: "Find the people who can make the next step easier.",
    intro: "The long-term value of USAS is not a list of names. It is a trusted network that becomes easier to navigate when someone needs advice, a connection or a way to contribute.",
    sections: [
      { heading: "Community directory", body: "Discover members by university, profession, graduation year, location and industry, with privacy controls built in." },
      { heading: "Alumni network", body: "Turn experience into mentorship, introductions and practical guidance for younger members." },
      { heading: "University network", body: "Connect students and ambassadors campus by campus." },
    ],
    cta: { label: "Become a member", href: "/get-involved/member" },
  },
  programs: {
    eyebrow: "Programs",
    title: "A community becomes an institution when it creates repeatable value.",
    intro: "USAS programs are designed around the moments where students and alumni can help one another most: decisions, transitions, opportunities and emergencies.",
    sections: [
      { heading: "Mentorship", body: "Senior-to-junior guidance for admission, career, higher study, entrepreneurship, government jobs and corporate careers." },
      { heading: "Career & skills", body: "Career talks, CV reviews, interview preparation, communication, technology and entrepreneurship." },
      { heading: "Scholarships", body: "Curated opportunities today, with the potential for a USAS scholarship fund in the future." },
      { heading: "Student support", body: "Academic support, emergency help, blood network, referrals, educational funding and resource sharing." },
    ],
  },
  "programs/civic-dialogue": {
    eyebrow: "Civic Dialogue",
    title: "Questions strengthen democracy.",
    intro: "USAS creates non-partisan spaces where citizens can engage with public representatives on issues that matter to Shyamnagar.",
    sections: [
      { heading: "What belongs here", items: ["Previous sessions", "Candidate invitations", "Question archive", "Community issues", "Video recordings", "Statements and updates"] },
      { heading: "What does not", body: "This is not a political campaign platform or a party identity. The goal is informed, respectful civic participation." },
    ],
  },
  events: {
    eyebrow: "Events",
    title: "Where the network becomes real.",
    intro: "From small webinars to major reunions, USAS events create the moments where relationships, learning and shared identity become tangible.",
    sections: [
      { heading: "Upcoming", body: "Webinars, meetups, workshops, reunions and networking sessions will be published here." },
      { heading: "Past events", body: "A searchable archive of sessions, speakers, recordings, resources and galleries." },
      { heading: "Reunion hub", body: "Each reunion can live as its own rich archive with story, highlights, gallery, team, sponsors and financial report." },
    ],
    cta: { label: "Explore the reunion", href: "/events/reunion" },
  },
  "events/reunion": {
    eyebrow: "USAS Reunion",
    title: "More than a gathering. A living archive of the community.",
    intro: "The reunion hub brings each year's identity, stories, people, photos, sponsors and transparent reporting into one place.",
    sections: [
      { heading: "Reunion 2026", body: "The next chapter of the USAS community." },
      { heading: "Reunion 2025", body: "A milestone gathering that helped reconnect generations." },
      { heading: "What every reunion page includes", items: ["The story", "By the numbers", "Highlights", "Guests", "Gallery", "Sponsors", "Team", "Financial report", "Downloads", "Video"] },
    ],
  },
  knowledge: {
    eyebrow: "Knowledge",
    title: "Useful knowledge should not disappear inside private chats.",
    intro: "USAS can become a durable knowledge layer for students by turning experience into searchable articles, guides, resources and member insights.",
    sections: [
      { heading: "Articles", items: ["Career", "Scholarships", "Higher education", "Alumni stories", "Community", "Opinion", "Events", "Shyamnagar"] },
      { heading: "Resource library", items: ["Scholarship guide", "University admission guide", "CV template", "SOP guide", "IELTS resources", "Research guide", "Career roadmap"] },
      { heading: "SEO engine", body: "A well-maintained resource library can help future students discover USAS through genuinely useful search content." },
    ],
  },
  impact: {
    eyebrow: "Impact",
    title: "What happens when a community connects?",
    intro: "Impact should be visible, specific and documented. This page is designed to show what USAS enables, not just what it says it values.",
    sections: [
      { heading: "Measure what matters", items: ["Members", "Universities", "Events", "Mentorship hours", "Scholarships", "Volunteers", "Funds raised"] },
      { heading: "Impact stories", body: "Short, human stories showing how a connection, mentor, opportunity or act of support changed an outcome." },
      { heading: "Reports", body: "Annual reports and financial transparency help the wider community judge progress for itself." },
    ],
    cta: { label: "See transparency", href: "/transparency" },
  },
  transparency: {
    eyebrow: "Transparency",
    title: "Trust grows when the receipts are visible.",
    intro: "USAS can set a higher standard for community organisations by making financial summaries, annual reports and governance documents easy to find.",
    sections: [
      { heading: "Financial reports", items: ["Reunion 2025", "Reunion 2026", "Income", "Expense", "Sponsor contribution"] },
      { heading: "Annual reports", body: "Yearly summaries of programs, events, membership, partnerships, impact and priorities." },
      { heading: "Governance documents", body: "Committee structures, responsibilities, terms, selection process and code of conduct." },
    ],
  },
  "get-involved/member": {
    eyebrow: "Become a Member",
    title: "Your next useful connection may already be in the community.",
    intro: "Membership is the entry point to the USAS network and the foundation for a more useful directory, mentorship system and opportunity layer.",
    sections: [
      { heading: "Member benefits", items: ["USAS member identity", "Community network", "Mentorship", "Events", "Resources", "Directory access", "Scholarship opportunities"] },
      { heading: "Member profile", items: ["Name and photo", "University and department", "Session and SSC batch", "Profession and location", "Contact details", "LinkedIn", "Areas of interest"] },
      { heading: "Privacy first", body: "Members should control which profile details are visible to the wider community." },
    ],
    cta: { label: "Explore the community", href: "/community" },
  },
  "get-involved/volunteer": {
    eyebrow: "Volunteer",
    title: "Don't just join the community. Build it.",
    intro: "USAS becomes stronger when members turn skills and time into shared infrastructure for everyone else.",
    sections: [
      { heading: "Volunteer areas", items: ["Content", "Technology", "Events", "Community", "Research", "Design", "Partnerships", "Data"] },
    ],
  },
  "get-involved/ambassador": {
    eyebrow: "University Ambassador",
    title: "Bring the network to your campus.",
    intro: "University ambassadors help USAS remain connected to students where university life actually happens.",
    sections: [
      { heading: "The role", items: ["Connect campus members", "Onboard new students", "Organise campus activity", "Communicate USAS updates"] },
    ],
  },
  "get-involved/partner": {
    eyebrow: "Partnership",
    title: "Partner with a network built around education and community.",
    intro: "Partnerships can support programs, events, scholarships, resources and other community initiatives with clear acknowledgement and transparency.",
    sections: [
      { heading: "Ways to partner", items: ["Community partner", "Program partner", "Event sponsor", "Knowledge partner", "Scholarship supporter"] },
    ],
  },
  "get-involved/support": {
    eyebrow: "Support USAS",
    title: "Support the community.",
    intro: "A transparent support system can help the community fund useful work without making financial contribution the centre of the experience.",
    sections: [
      { heading: "Possible funds", items: ["Scholarship fund", "Student emergency fund", "Community operations", "Event fund"] },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start a useful conversation.",
    intro: "Use this section for general contact, suggestions, media requests and partnership enquiries once official contact channels are confirmed.",
    sections: [
      { heading: "General", body: "Official email and social links should be added here before launch." },
      { heading: "Suggestions & feedback", body: "Community members will be able to suggest ideas, report issues, recommend speakers and propose events." },
      { heading: "Media & partnership", body: "A dedicated path for collaboration, sponsorship and media enquiries." },
    ],
  },
};

const genericContext: Record<string, string> = {
  community: "Explore the people, universities, stories and connections that make the USAS network useful.",
  programs: "Explore a practical USAS program designed to connect people with support, learning and opportunity.",
  events: "Explore USAS gatherings, archives and community experiences.",
  knowledge: "Discover practical knowledge, stories and resources shared through the USAS network.",
  impact: "See how USAS documents contribution, progress and community outcomes.",
  "get-involved": "Choose a way to participate in building the USAS community.",
};

function titleFromPath(path: string) {
  return path
    .split("/")
    .at(-1)!
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getPageCopy(path: string): PageCopy {
  if (pageOverrides[path]) return pageOverrides[path];
  const root = path.split("/")[0];
  const title = titleFromPath(path);
  return {
    eyebrow: mainNav.find((item) => item.href === `/${root}`)?.label ?? "USAS",
    title,
    intro: genericContext[root] ?? "This section is part of the growing USAS digital community platform.",
    sections: [
      {
        heading: "Designed to grow",
        body: "This page is included in the first website architecture and is ready for verified content, CMS data and community contributions.",
      },
      {
        heading: "Next layer",
        body: "The production version can connect this page to membership, event, article, resource and reporting collections without changing the visual system.",
      },
    ],
  };
}

export const allRoutes = Array.from(
  new Set([
    ...mainNav.flatMap((item) => [item.href, ...(item.children?.map((child) => child.href) ?? [])]),
    "/get-involved/member",
    "/get-involved/volunteer",
    "/get-involved/mentor",
    "/get-involved/ambassador",
    "/get-involved/partner",
    "/get-involved/support",
    "/impact/stories",
    "/impact/annual-reports",
    "/impact/partners",
    "/contact",
    "/contact/feedback",
    "/contact/media-partnership",
  ]),
).filter((route) => route !== "/");
