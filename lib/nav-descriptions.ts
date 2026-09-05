export const navDescriptions: Record<string, string> = {
  "/about": "Learn what USAS is, why it exists and how the community is evolving.",
  "/about/history": "Trace the story, milestones and generations that shaped the USAS community.",
  "/about/vision-mission": "See the long-term direction and practical mission guiding USAS.",
  "/about/core-values": "Explore the principles that keep the community inclusive, respectful and trusted.",
  "/about/governance": "Understand how roles, teams and responsibilities are structured across USAS.",
  "/transparency": "Follow governance, reporting and financial information that strengthens community trust.",

  "/community/members": "Meet the students and professionals who make up the growing USAS network.",
  "/community/alumni": "Connect with alumni experience, mentorship and professional networks across generations.",
  "/community/universities": "Explore the universities and campuses represented across the USAS community.",
  "/community/stories": "Read the journeys, lessons and experiences of people across the community.",
  "/community/mentors": "Find experienced people willing to guide students through important decisions.",
  "/community/directory": "Navigate the wider network by university, profession, location and expertise.",

  "/programs/mentorship": "Get guidance from seniors, alumni and experienced professionals at key transitions.",
  "/programs/career-skills": "Build practical career, communication and professional skills for the next step.",
  "/programs/scholarships": "Find curated funding and scholarship opportunities relevant to students.",
  "/programs/webinars-workshops": "Join practical sessions led by alumni, mentors and professionals.",
  "/programs/student-support": "Access academic, emergency and community support when it matters most.",
  "/programs/networking": "Create useful connections across campuses, industries, cities and generations.",
  "/programs/civic-dialogue": "Take part in informed, respectful and non-partisan conversations about Shyamnagar.",
  "/programs/civic-dialogue/ask-your-mp": "Bring community questions into a structured conversation with public representatives.",

  "/events/upcoming": "See what is coming next and find ways to participate in the community.",
  "/events/past": "Explore previous gatherings, sessions, recordings and community moments.",
  "/events/reunion": "Discover the reunion hub, where generations reconnect and community history is archived.",
  "/events/reunion/2026": "Follow the next chapter of the USAS reunion and its growing community experience.",
  "/events/reunion/2025": "Revisit the milestone reunion that helped reconnect the wider USAS community.",
  "/events/gallery": "Browse photos and visual stories from USAS events and community gatherings.",
  "/events/registration": "Register for upcoming USAS events and participation opportunities.",

  "/knowledge/articles": "Explore searchable articles, guides and ideas created for the USAS community.",
  "/knowledge/career": "Find practical guidance for jobs, skills, interviews and career decisions.",
  "/knowledge/scholarships": "Discover scholarship guides, funding opportunities and application resources.",
  "/knowledge/higher-education": "Explore admission, higher-study and academic pathways in Bangladesh and abroad.",
  "/knowledge/member-insights": "Learn from the experience, expertise and perspective of USAS members.",
  "/knowledge/community-stories": "Read stories that capture the people, places and progress of the community.",
  "/knowledge/resources": "Access useful templates, guides and learning resources in one place.",

  "/impact": "See how connections, programs and participation translate into meaningful community value.",
  "/impact/stories": "Explore real examples of people, programs and collaborations creating positive outcomes.",
  "/impact/annual-reports": "Review yearly progress, activities, milestones and organisational learning.",
  "/impact/partners": "Meet the organisations and supporters helping USAS expand its impact.",
};

export function getNavDescription(href: string) {
  return navDescriptions[href] ?? "Explore this part of the USAS community and discover what is available here.";
}
