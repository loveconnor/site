import type { PatternKind } from "@/components/moire";

export type Project = {
  slug: string;
  name: string;
  label: string;
  role: string;
  status: string;
  /** A public link shown with the case study facts. */
  live?: { href: string; label: string };
  summary: string;
  cta: string;
  pattern: PatternKind;
  /** Card colour and whether text on it is light or dark. */
  theme: { bg: string; tone: "light" | "dark" };
  /** Screenshots in public/work, first one leads the case study. */
  screens: { src: string; alt: string; width: number; height: number }[];
  headline: string;
  sections: { title: string; body: string[] }[];
  closing?: { title: string; body: string; cta: string; engagement: "project" | "monthly" };
};

// Case studies stay factual: role and status are shown exactly as they stand today.
// Client workspace screens are taken from the live demo at demo.moirel.com (fictional data).
export const projects: Project[] = [
  {
    slug: "client-workspace",
    name: "Client workspace",
    label: "Studio-built tool",
    role: "Product design and development",
    status: "In use for studio engagements",
    live: { href: "https://demo.moirel.com", label: "Live demo" },
    summary:
      "A shared place for requests, progress, approvals, and files. Built to make the next step of a project easier to understand.",
    cta: "See the workspace",
    pattern: "rings",
    theme: { bg: "#d9481f", tone: "light" },
    screens: [
      { src: "/work/portal-home.webp", alt: "Home: what needs the client next, the state of each project, and Connor’s latest update.", width: 2400, height: 1500 },
      { src: "/work/portal-project.webp", alt: "A project overview: everything waiting on the client, the current phase, and the target launch.", width: 2400, height: 1500 },
      { src: "/work/portal-review.webp", alt: "A design review: the homepage preview beside its version history, comments, and the approval decision.", width: 2400, height: 1500 },
      { src: "/work/portal-request.webp", alt: "A request for extra work: the estimate, its effect on the timeline, and the conversation that shaped it.", width: 2400, height: 1500 },
    ],
    headline: "A clearer place to work together.",
    sections: [
      {
        title: "Overview",
        body: [
          "The client workspace gives a project a shared home. Requests, tasks, files, comments, approvals, and updates sit alongside the work they belong to, so a client can participate and understand what needs attention.",
        ],
      },
      {
        title: "The problem",
        body: [
          "A project creates several kinds of information at once: the next request, the current task, the latest file, and a decision waiting for feedback.",
          "I wanted the client experience to make those relationships understandable and give each action a clear place.",
        ],
      },
      {
        title: "The approach",
        body: [
          "The workspace focuses on the project and the next useful action. A client can request something, provide context, review work, and respond where a decision is needed.",
          "Comments and approvals stay connected to the item under discussion. Progress updates explain what is happening between those moments.",
        ],
      },
      {
        title: "How it supports the studio",
        body: [
          "The workspace is part of how Moirel intends to run an engagement: a shared place for participation, with direct communication from Connor.",
          "It also demonstrates the kind of focused business tool the studio can design and develop.",
        ],
      },
    ],
    closing: {
      title: "Want a tool that fits your workflow?",
      body: "Tell me where work gets stuck and who needs to use the system. We can map the important actions before deciding what to build.",
      cta: "Discuss an application",
      engagement: "project",
    },
  },
  {
    slug: "honestui",
    name: "HonestUI",
    label: "Open-source project",
    role: "Creator and maintainer",
    status: "Open source",
    live: { href: "https://honestui.com", label: "Website" },
    summary:
      "A React component library that puts the source in your hands, with interface patterns and documentation designed to work together.",
    cta: "Explore HonestUI",
    pattern: "lines",
    theme: { bg: "#161513", tone: "light" },
    screens: [
      { src: "/work/honestui-1.webp", alt: "The HonestUI homepage, with components and charts shown in place.", width: 2400, height: 1500 },
      { src: "/work/honestui-2.webp", alt: "The HonestUI documentation introduction and how each collection is distributed.", width: 2400, height: 1500 },
    ],
    headline: "Components you own, documented as a system.",
    sections: [
      {
        title: "Overview",
        body: [
          "HonestUI is an open-source React component library. Instead of hiding components behind a package boundary, it puts the source in your hands, so a team can read, adapt, and keep what it ships.",
        ],
      },
      {
        title: "My role",
        body: [
          "I created HonestUI and maintain it: the components, the interface patterns they share, and the documentation that explains how to use them together.",
        ],
      },
      {
        title: "What it demonstrates",
        body: [
          "Reusable interfaces and component systems are the foundation of consistent product work. HonestUI is where that practice is visible in public, from the API of a single component to the way patterns and documentation reinforce each other.",
        ],
      },
    ],
    closing: {
      title: "Need a system your team can build on?",
      body: "Design-system work and interface improvements fit well inside Studio Monthly. Tell me about the product and where consistency breaks down.",
      cta: "Discuss ongoing work",
      engagement: "monthly",
    },
  },
  {
    slug: "swipz",
    name: "Swipz",
    label: "Co-founded product · Early pilot",
    role: "Co-founder · Technology lead",
    status: "Early pilot",
    summary:
      "A restaurant discovery app that helps people choose where to eat. I lead the technology across the app, web experience, and the systems behind them.",
    cta: "See the project",
    pattern: "radial",
    theme: { bg: "#e4d9c8", tone: "dark" },
    screens: [
      { src: "/work/swipz-site-1.webp", alt: "Swipz: decide where to eat, one restaurant at a time, with the app shown on a phone.", width: 2400, height: 1500 },
      { src: "/work/swipz-site-2.webp", alt: "How Swipz works: swipe to browse, double-tap to like, swipe up for details.", width: 2400, height: 1500 },
      { src: "/work/swipz-site-3.webp", alt: "Less time deciding, more time at the table.", width: 2400, height: 1500 },
    ],
    headline: "Helping people decide where to eat.",
    sections: [
      {
        title: "Overview",
        body: [
          "Swipz is a restaurant discovery app that helps people choose where to eat. It is currently in an early pilot.",
        ],
      },
      {
        title: "My role",
        body: [
          "I co-founded Swipz and lead its technology: the app, the web experience, and the systems that support them.",
        ],
      },
      {
        title: "What it demonstrates",
        body: [
          "Building a product means connecting several surfaces into one experience. Swipz is end-to-end product development, from the interface someone taps through to the systems that keep it running.",
        ],
      },
    ],
    closing: {
      title: "Building a product of your own?",
      body: "From a focused first release to the features that follow, we can agree on a useful scope to build and evaluate.",
      cta: "Discuss an application",
      engagement: "project",
    },
  },
  {
    slug: "handwork",
    name: "Handwork",
    label: "Independent product",
    role: "Runtime and interface",
    status: "Publicly available",
    live: { href: "https://handwork.sh", label: "Website" },
    summary:
      "An independent software product built end to end, from the runtime underneath to the interface people work in.",
    cta: "See the project",
    pattern: "grid",
    theme: { bg: "#b9b1a4", tone: "dark" },
    screens: [
      { src: "/work/handwork-cli-1.webp", alt: "A real Handwork session: it inspects the bug, edits one line, and the tests pass.", width: 2200, height: 1440 },
      { src: "/work/handwork-cli-2.webp", alt: "Handwork: an AI coding agent for your terminal and desktop.", width: 2400, height: 1500 },
      { src: "/work/handwork-cli-3.webp", alt: "The Handwork docs: install, connect a model provider, and start a first task.", width: 2400, height: 1500 },
    ],
    headline: "Engineering depth, from runtime to interface.",
    sections: [
      {
        title: "Overview",
        body: [
          "Handwork is an independent software product. It is a substantial build, and it is where much of my deeper engineering work happens.",
        ],
      },
      {
        title: "My role",
        body: [
          "I am responsible for Handwork’s runtime and its interface: the systems that make it work and the experience people use to work with it.",
        ],
      },
      {
        title: "What it demonstrates",
        body: [
          "Clients benefit from a studio that understands what happens beneath the screen. Handwork shows the ability to design and sustain a substantial software product, not only its surface.",
        ],
      },
    ],
    closing: {
      title: "Need software with real depth?",
      body: "If the hard part sits beneath the interface, tell me what the system has to do. We can scope the core before deciding what to build around it.",
      cta: "Discuss an application",
      engagement: "project",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
