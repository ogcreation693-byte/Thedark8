export type CaseStudy = {
  client: string;
  industry: string;
  location: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  services: string[];
  implementation: string;
  results: string;
  metrics: string[];
  testimonial: string;
  images: string[];
  technologies: string[];
  date: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  author: string;
  date: string;
  category: string;
  featuredImage: string;
  summary: string;
  readingTime: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

export const caseStudies: CaseStudy[] = [];

export const testimonials: Array<{ quote: string; name: string; company: string }> = [];

export const socialLinks = {
  instagram: "",
  linkedin: "",
  facebook: "",
  youtube: "",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "commercial-growth-system",
    title: "Why channel performance falls apart without a commercial system",
    seoTitle: "Why Channel Performance Needs a Commercial Growth System",
    metaDescription: "A practical view of how marketing, sales and delivery lose efficiency when the operating model is disconnected.",
    author: "TheDark8 Tech",
    date: "2026-08-18",
    category: "Digital Marketing",
    featuredImage: "",
    summary: "A practical view of how marketing, sales and delivery lose efficiency when the operating model is disconnected.",
    readingTime: "6 min read",
    sections: [
      { heading: "The hidden cost of disconnected channels", paragraphs: ["A business can be active on search, social, email and a website and still have a weak growth system. The problem is usually not effort. It is that each channel is optimized for its own output instead of the customer decision.", "When campaign language does not match the landing page, or when a form submission does not create a clear sales task, attention leaks before it becomes useful demand."] },
      { heading: "Start with the commercial journey", paragraphs: ["Map the route from first discovery to conversation, purchase and repeat business. Mark where a customer needs proof, where the team needs context and where a handoff can fail.", "This simple map gives strategy a practical job: connect the promise, the page, the enquiry, the response and the measurement into one operating loop."] },
      { heading: "Build the feedback loop", paragraphs: ["A commercial system does not need every tool on day one. It needs clear ownership, useful events and a regular review of what is creating qualified movement.", "The strongest next step is often small: a better offer, a clearer landing page, a lead-routing rule or a reporting view that lets the team act sooner."] },
    ],
  },
  {
    slug: "seo-decision-clarity",
    title: "SEO is not content volume. It is decision clarity at scale",
    seoTitle: "SEO Is Decision Clarity at Scale",
    metaDescription: "The strongest search systems solve the right customer questions with usable, structured digital experiences.",
    author: "TheDark8 Tech",
    date: "2026-08-11",
    category: "SEO",
    featuredImage: "",
    summary: "The strongest search systems solve the right customer questions with useful, better-structured digital experiences.",
    readingTime: "5 min read",
    sections: [
      { heading: "Search intent is a business question", paragraphs: ["People rarely search for content in the abstract. They search because they are comparing options, checking risk, looking for a local provider or trying to understand the next step.", "SEO becomes more valuable when those questions are connected to a useful page and a clear action, not when a site simply produces more words."] },
      { heading: "Make the page do real work", paragraphs: ["A strong search page gives a visitor enough context to decide whether the business understands their problem. It explains the offer plainly, answers the objections that matter and makes the next action easy to find.", "Technical foundations still matter: crawlable structure, descriptive metadata, fast delivery, internal links and accessible content make the experience easier for both people and search engines."] },
      { heading: "Measure qualified discovery", paragraphs: ["Traffic is an early signal, not the finish line. Review which queries create engaged visits, enquiries, calls, store visits or other meaningful actions.", "The goal is not maximum visibility. It is useful visibility in the moments where a customer is ready to decide."] },
    ],
  },
  {
    slug: "crm-automation-interest-to-action",
    title: "CRM automation works best when it shortens the time between interest and action",
    seoTitle: "CRM Automation From Interest to Action",
    metaDescription: "The value of CRM automation is reducing the gap between a valid enquiry and a useful response.",
    author: "TheDark8 Tech",
    date: "2026-08-04",
    category: "CRM",
    featuredImage: "",
    summary: "The real value is not in sending more messages; it is in reducing the gap between a valid enquiry and a proper reply.",
    readingTime: "6 min read",
    sections: [
      { heading: "Speed is only part of the problem", paragraphs: ["A fast reply is not automatically a useful reply. Teams lose momentum when the message lacks context, arrives with no owner or asks the customer to repeat information they already supplied.", "Automation should protect the quality of the handoff as well as the time it takes. That starts with capturing the details a person needs to decide what happens next."] },
      { heading: "Design the first response", paragraphs: ["A practical workflow can acknowledge the enquiry, summarize the request, assign an owner and create a clear task with a due time. Different enquiry types can follow different routes without making the customer learn the internal process.", "Use templates for consistency, but leave room for a human response when the question is complex, sensitive or commercially important."] },
      { heading: "Keep the workflow observable", paragraphs: ["Review response time, contact rate, qualification quality and the reasons enquiries stall. These signals show whether automation is removing friction or simply moving it somewhere less visible.", "Start with the few fields and rules that improve a real decision, then expand carefully."] },
    ],
  },
];
