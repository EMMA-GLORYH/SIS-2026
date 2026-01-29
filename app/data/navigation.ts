export const NAVIGATION = {
  brand: {
    name: "ICT Services",
    shortName: "ISSC",
    logo: "/logo.svg",
    href: "/",
  },

  main: [
    {
      label: "Services",
      type: "dropdown",
      items: [
        {
          label: "Web Development",
          description: "Modern, scalable websites and platforms",
          href: "/services/web-development",
        },
        {
          label: "Applications & Systems",
          description: "Desktop, web, and internal business systems",
          href: "/services/application-development",
        },
        {
          label: "ICT Teaching",
          description: "Part-time ICT training for schools",
          href: "/services/ict-teaching",
        },
        {
          label: "Graphic Designing",
          description: "Branding, UI, and visual communication",
          href: "/services/graphic-design",
        },
        {
          label: "Hardware Fixing",
          description: "Mobile phones & laptop diagnostics and repairs",
          href: "/services/hardware-fixing",
        },
        {
          label: "Technical Support",
          description: "IT support, maintenance & troubleshooting",
          href: "/services/technical-support",
        },
      ],
    },

    {
      label: "About",
      type: "dropdown",
      items: [
        {
          label: "About Us",
          description: "Who we are and what we do",
          href: "/about",
        },
        {
          label: "Mission & Vision",
          description: "Our purpose and long-term goals",
          href: "/about/mission-vision",
        },
        {
          label: "Our Values",
          description: "Principles that guide our work",
          href: "/about/values",
        },
        {
          label: "Our Team",
          description: "Meet the people behind SIS Solutions",
          href: "/about/team",
        },
        {
          label: "Why Choose Us",
          description: "What sets us apart",
          href: "/about/why-us",
        },
      ],
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ],

  footer: {
    services: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Applications & Systems", href: "/services/application-development" },
      { label: "ICT Teaching", href: "/services/ict-teaching" },
      { label: "Graphic Designing", href: "/services/graphic-design" },
      { label: "Hardware Fixing", href: "/services/hardware-fixing" },
      { label: "Technical Support", href: "/services/technical-support" },
    ],

    company: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Our Values", href: "/about/values" },
      { label: "Our Team", href: "/about/team" },
    ],

    social: [
      { platform: "Facebook", href: "#" },
      { platform: "X", href: "#" },
      { platform: "LinkedIn", href: "#" },
      { platform: "WhatsApp", href: "#" },
    ],
  },
};
