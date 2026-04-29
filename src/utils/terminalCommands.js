import { ref } from "vue";

export const projectDetails = {
  bedboat: {
    name: "BedBoat Platform",
    description:
      "Une plateforme SaaS complète pour la gestion de réservations de bateaux. J'ai piloté l'audit technique et la restructuration globale de l'architecture pour supporter une montée en charge importante.",
    url: "https://bedboat.fr",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Stripe", "Make", "Agile"],
    status: "EN PRODUCTION",
    role: "Fullstack Architect",
  },
  orthophonie: {
    name: "Assistance Orthophonique",
    description:
      "Outil thérapeutique innovant basé sur la sémiophonie. L'application permet aux praticiens de créer des exercices personnalisés et de suivre la progression clinique des patients en temps réel.",
    url: "#",
    tech: ["React", "Tailwind CSS", "Vite", "Web Audio API"],
    status: "DÉPLOYÉ",
    role: "Frontend Developer",
  },
  thomas_os: {
    name: "Thomas_OS Portfolio",
    description:
      "Une expérience immersive simulant un système d'exploitation rétro-futuriste. Ce projet explore les limites des interfaces textuelles modernes avec Vue 3 et Tailwind CSS v4.",
    url: "https://github.com/lythomm/terminal-portfolio",
    tech: ["Vue 3", "Vite", "Tailwind CSS v4", "Framer Motion"],
    status: "VERSION 1.0.0",
    role: "Lead Developer / Designer",
  },
};

export const welcomeMessage = [
  {
    type: "ascii",
    content: `
  ████████╗██╗  ██╗ ██████╗ ███╗   ███╗ █████╗ ███████╗
  ╚══██╔══╝██║  ██║██╔═══██╗████╗ ████║██╔══██╗██╔════╝
     ██║   ███████║██║   ██║██╔████╔██║███████║███████╗
     ██║   ██╔══██║██║   ██║██║╚██╔╝██║██╔══██║╚════██║
     ██║   ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║  ██║███████║
     ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
  `,
  },
  { type: "text", content: "THOMAS_OS v1.0.0 - INITIALISATION..." },
  {
    type: "text",
    content: 'Tapez "aide" pour afficher la liste des commandes.',
  },
  { type: "text", content: "" },
];

/**
 * Command Registry
 * Each command is an object with:
 * - name: string
 * - desc: string
 * - handler: function(args, { terminalLines, activeHelp })
 */
export const commandRegistry = [
  {
    name: "a-propos",
    desc: "en savoir plus sur moi",
    handler: () => [
      { type: "header", content: "// à propos" },
      {
        type: "text",
        content:
          "Développeur Fullstack / App Engineer avec 5 ans d'expérience, passionné par la création de solutions techniques innovantes et l'optimisation de processus.",
      },
      {
        type: "text",
        content:
          "Spécialisé en JavaScript (Vue, React, Node), je conçois des architectures robustes et implémente des automatisations stratégiques (n8n, Make).",
      },
      {
        type: "text",
        content: "Basé à Toulouse, engagé à livrer un code propre et scalable.",
      },
    ],
  },
  {
    name: "projets",
    desc: "liste de mes réalisations",
    handler: () => [
      { type: "header", content: "// projets sélectionnés" },
      { type: "project-header" },
      {
        type: "project",
        name: "BedBoat",
        year: "2026",
        stack: "Vue.js / Node.js / PostgreSQL",
        status: "EN LIGNE",
      },
      {
        type: "project",
        name: "Orthophonie",
        year: "2021",
        stack: "React / Tailwind CSS",
        status: "PUBLIÉ",
      },
      {
        type: "project",
        name: "Thomas_OS",
        year: "2026",
        stack: "Vue 3 / Tailwind CSS v4",
        status: "CE PROJET",
      },
      {
        type: "text",
        content:
          'Utilisez "ouvrir <nom>" pour explorer un projet spécifique ou bien cliquez simplement dessus.',
      },
    ],
  },
  {
    name: "ouvrir",
    desc: "détails sur un projet",
    usage: "ouvrir <nom>",
    handler: (args) => {
      if (!args || args.length === 0) {
        return [{ type: "error", content: "USAGE: ouvrir <nom_du_projet>" }];
      }

      const projectName = args[0].toLowerCase();

      if (projectName in projectDetails) {
        const p = projectDetails[projectName];
        return [
          {
            type: "project-detail",
            ...p,
          },
        ];
      } else {
        return [
          { type: "error", content: `ERR: Projet '${projectName}' introuvable.` },
        ];
      }
    },
  },
  {
    name: "parcours",
    desc: "mon parcours professionnel",
    handler: () => [
      { type: "header", content: "// expérience professionnelle" },
      {
        type: "experience",
        role: "Développeur Fullstack",
        company: "BedBoat",
        url: "https://bedboat.fr/",
        period: "2022 - 2026",
      },
      {
        type: "desc",
        content:
          "Audit technique de l'existant et restructuration de la plateforme pour améliorer la performance, la scalabilité et la maintenance du code",
      },
      {
        type: "desc",
        content:
          "Introduction de la culture Agile au sein de l'équipe, mise en place de rituels (Sprints, Daily, Retrospectives) là où aucun cadre n'existait",
      },
      {
        type: "desc",
        content:
          "Développement du système de réservation et intégration du système de paiement Stripe",
      },
      {
        type: "desc",
        content: "Optimisation des processus internes via automatisations Make",
      },
      { type: "text", content: "" },
      {
        type: "experience",
        role: "Développeur Fullstack",
        company: "iologo",
        url: "https://www.iologo.io/",
        period: "2021 - 2022",
      },
      {
        type: "desc",
        content:
          "Implémentation de fonctionnalités de bout en bout, de l’interface utilisateur à la logique métier et l'API",
      },
      {
        type: "desc",
        content:
          "Participation active à la transition technique et à l'unification des outils suite à la fusion avec Lexidia",
      },
      {
        type: "desc",
        content:
          "Création d'un back-office permettant aux équipes non-techniques (support, marketing) de gérer et d'éditer les données de la base en toute autonomie et sécurité",
      },
      { type: "text", content: "" },
      {
        type: "experience",
        role: "Développeur Frontend",
        company: "Lexidia",
        url: "https://www.lexidia.org/",
        period: "2020 - 2021",
      },
      {
        type: "desc",
        content:
          "Conception de l'interface utilisateur pour une application d'aide à l'orthophonie basée sur la sémiophonie",
      },
      {
        type: "desc",
        content:
          "Travail en lien étroit avec les professionnels de santé pour traduire leurs besoins cliniques en solutions techniques concrètes",
      },

      { type: "header", content: "// éducation" },
      {
        type: "experience",
        role: "Ingénieur spécialité AISL",
        company: "IPST-CNAM (Toulouse)",
        period: "2021 - 2023",
      },
      {
        type: "experience",
        role: "Licence Informatique",
        company: "IPST-CNAM (Toulouse)",
        period: "2020 - 2021",
      },
      {
        type: "experience",
        role: "DUT Informatique",
        company: "IUT Informatique Paul Sabatier (Toulouse)",
        period: "2018 - 2020",
      },
    ],
  },
  {
    name: "competences",
    desc: "mes compétences techniques",
    handler: () => [
      { type: "header", content: "// compétences techniques" },
      {
        type: "skills-multi-frame",
        modules: [
          {
            title: "FRONTEND_ENGINE",
            id: "FE-802",
            skills: [
              { name: "Vue.js / Vite", addr: "0x4B", bar: 92, status: "STABLE" },
              { name: "React / Next", addr: "0x4C", bar: 85, status: "ACTIVE" },
              { name: "Tailwind CSS", addr: "0x4A", bar: 95, status: "OPTIMIZED" }
            ]
          },
          {
            title: "BACKEND_CORE",
            id: "BE-501",
            skills: [
              { name: "Node.js / Express", addr: "0x1B", bar: 88, status: "READY" },
              { name: "PostgreSQL", addr: "0x1C", bar: 75, status: "STABLE" },
              { name: "Supabase", addr: "0x1D", bar: 82, status: "LINKED" }
            ]
          },
          {
            title: "AUTOMATION_UNIT",
            id: "AU-99",
            skills: [
              { name: "n8n Workflows", addr: "0x8C", bar: 95, status: "OPTIMIZED" },
              { name: "Make / Zapier", addr: "0x8D", bar: 85, status: "READY" },
              { name: "API Logic", addr: "0x8E", bar: 90, status: "ACTIVE" }
            ]
          }
        ]
      }
    ],
  },
  {
    name: "contact",
    desc: "me contacter (email, réseaux)",
    handler: () => [
      { type: "header", content: "// me contacter" },
      { type: "text", content: "Email: lythomm@gmail.com" },
      { type: "text", content: "LinkedIn: linkedin.com/in/thomas-ly" },
      { type: "text", content: "GitHub: github.com/lythomm" },
      { type: "text", content: "Portfolio: thomas-ly.vercel.app" },
    ],
  },
  {
    name: "effacer",
    desc: "effacer le terminal",
    handler: (args, { terminalLines, activeHelp }) => {
      terminalLines.value = [];
      activeHelp.value = null;
      return [];
    },
  },
  {
    name: "aide",
    desc: "afficher la liste des commandes",
    handler: (args, { terminalLines, activeHelp }) => {
      const helpLines = [
        {
          type: "text",
          content: "commandes disponibles :",
          class: "dim-text term-small mb-3",
        },
      ];

      commandRegistry.forEach((cmd) => {
        helpLines.push({
          type: "command",
          name: cmd.usage || cmd.name,
          desc: cmd.desc,
        });
      });

      return helpLines;
    },
  },
];

// Helper to get command object by name
export const getCommand = (name) => {
  return commandRegistry.find((c) => c.name === name.toLowerCase());
};
