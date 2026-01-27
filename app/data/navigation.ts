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
          description: "Comprehensive IT & system support services",
          href: "/services/technical-support",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Team",
      href: "/team",
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

    social: [
      { platform: "Facebook", href: "#" },
      { platform: "X", href: "#" },
      { platform: "LinkedIn", href: "#" },
      { platform: "WhatsApp", href: "#" },
    ],
  },
};
