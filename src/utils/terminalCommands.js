import moiImage from "../assets/moi.png";
import aliciaPreview from "../assets/projects/alicia_preview.png";

export const projectDetails = {
  aliciaambroise: {
    name: "aliciaambroise",
    shortName: "aliciaambroise",
    year: "2026",
    shortStack: "HTML / CSS / Vue / Tailwind CSS",
    listStatus: "EN LIGNE",
    description:
      "Site vitrine pour une freelance en communication afin de présenter ses services et permettre la prise de rendez-vous.",
    url: "https://aliciaambroise.vercel.app/",
    tech: ["HTML", "CSS", "Vue", "Tailwind CSS", "Vite"],
    status: "EN PRODUCTION",
    role: "Développeur & Designer",
    sections: [
      {
        label: "MISSION",
        type: "text",
        content:
          "Conception et développement d'un site vitrine moderne et épuré pour une freelance en communication. L'objectif était de créer une identité forte tout en restant professionnelle.",
      },
      { label: "PREVIEW", type: "image", content: aliciaPreview },
      {
        label: "PROBLÈMES",
        type: "list",
        content: [
          "Absence de présence digitale",
          "Besoin d'un outil de réservation automatisé",
          "Vitesse de chargement critique pour le SEO",
        ],
      },
      {
        label: "SOLUTIONS",
        type: "text",
        content:
          "Mise en place d'une architecture Vue 3 performante avec intégration Cal.com et un design système sur mesure.",
      },
      {
        label: "ROLE",
        type: "text",
        content: "Développeur Lead & Designer UI/UX",
      },
    ],
  },
  edelstein: {
    name: "Edelstein",
    shortName: "Edelstein Lab",
    year: "2026",
    shortStack: "HTML / CSS / Vue / Tailwind CSS",
    listStatus: "EN LIGNE",
    description:
      "Site web pour une association de musique techno afin de promouvoir ses événements et permettre la prise de contact.",
    url: "https://edelstein-lab.vercel.app/",
    tech: ["HTML", "CSS", "Vue", "Tailwind CSS", "Vite"],
    status: "EN PRODUCTION",
    role: "Développeur & Designer",
    sections: [
      {
        label: "DESC",
        type: "text",
        content:
          "Plateforme événementielle pour un collectif techno basé à Paris.",
      },
      {
        label: "CONTEXTE",
        type: "text",
        content:
          "Le collectif Edelstein Lab avait besoin d'une interface reflétant l'esthétique brutaliste et industrielle de leurs événements.",
      },
      {
        label: "FONCTIONNALITÉS",
        type: "list",
        content: [
          "Calendrier des événements",
          "Système de contact sécurisé",
          "Player audio intégré (SoundCloud API)",
        ],
      },
      { label: "ROLE", type: "text", content: "Développeur & Designer" },
      { label: "STATUS", type: "text", content: "EN PRODUCTION" },
    ],
  },
  vendibringuecovoit: {
    name: "VendibringueCovoit",
    shortName: "VendibringueCovoit",
    year: "2026",
    shortStack: "VUE / Tailwind CSS / Supabase",
    listStatus: "EN LIGNE",
    description:
      "Application mobile permettant de favoriser le covoiturage entre les participants d'un même événement.",
    url: "https://vendibringue-covoit.vercel.app/",
    tech: ["VUE", "Tailwind CSS", "Supabase"],
    status: "EN PRODUCTION",
    role: "Développeur",
    sections: [
      {
        label: "DESC",
        type: "text",
        content:
          "Solution de covoiturage événementiel pour réduire l'empreinte carbone des festivals.",
      },
      {
        label: "DÉFI",
        type: "text",
        content:
          "Gérer la synchronisation en temps réel des trajets et des places disponibles lors de pics de connexion.",
      },
      {
        label: "STACK",
        type: "list",
        content: ["Vue.js 3", "Supabase (Auth/DB/Realtime)", "Tailwind CSS"],
      },
      { label: "ROLE", type: "text", content: "Développeur" },
    ],
  },
  shareme: {
    name: "ShareMe",
    shortName: "ShareMe",
    year: "2022",
    shortStack: "HTML / CSS / React / Tailwind CSS",
    listStatus: "EN LIGNE",
    description:
      "Clone de Pinterest permettant de partager des images et des vidéos.",
    url: "https://ly-thomas-shareme.vercel.app/search",
    tech: ["HTML", "CSS", "React", "Tailwind CSS", "Vite", "Sanity.io"],
    status: "EN PRODUCTION",
    role: "Développeur",
    sections: [
      {
        label: "CONTEXTE",
        type: "text",
        content:
          "Projet d'études réalisé pour maîtriser les hooks React et l'intégration de CMS headless.",
      },
      {
        label: "TECH_STACK",
        type: "list",
        content: [
          "React (Hooks, Router)",
          "Sanity CMS (Backend)",
          "Google OAuth Integration",
        ],
      },
      { label: "ROLE", type: "text", content: "Développeur Fullstack" },
    ],
  },
  thomas_os: {
    name: "Thomas_OS Portfolio",
    shortName: "Thomas_OS",
    year: "2026",
    shortStack: "Vue 3 / Tailwind CSS v4",
    listStatus: "CE PROJET",
    description:
      "Portfolio personnel et expérience immersive simulant un système d'exploitation rétro-futuriste.",
    url: "https://github.com/lythomm/terminal-portfolio",
    tech: ["Vue 3", "Vite", "Tailwind CSS v4", "Framer Motion"],
    status: "VERSION 1.0.0",
    role: "Développeur",
    sections: [
      {
        label: "MISSION",
        type: "text",
        content:
          "Créer un portfolio qui se démarque par son originalité et son interactivité.",
      },
      {
        label: "CONCEPTION",
        type: "text",
        content:
          "Design inspiré par les interfaces CRT des années 80, avec une attention particulière aux micro-interactions et aux effets de distorsion visuelle.",
      },
      {
        label: "ARCHITECTURE",
        type: "list",
        content: [
          "Moteur de terminal custom à base de registres de commandes",
          "Composants Vue 3 modulaires pour chaque type de réponse",
          "Animations CSS complexes synchronisées",
        ],
      },
      { label: "STATUS", type: "text", content: "VERSION 1.0.0" },
    ],
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
    handler: () => {
      const bioText =
        "Développeur fullstack avec 5 ans d'expérience, je combine une autonomie technique avec un fort esprit d’équipe. Je ne me contente pas de simplement 'coder des fonctionnalités', je recherche des solutions pertinentes et stratégiques pour répondre aux besoins business. Je m’attache à livrer un code propre et évolutif, tout en restant flexible pour m’adapter rapidement aux nouveaux enjeux techniques d'une équipe agile";

      return [
        { type: "header", content: "// Dossier Utilisateur : THOMAS" },
        {
          type: "about-variant",
          variant: "bios",
          data: {
            image: moiImage,
            bio: bioText,
          },
        },
      ];
    },
  },
  {
    name: "projets",
    desc: "liste de mes réalisations",
    handler: () => [
      { type: "header", content: "// projets sélectionnés" },
      { type: "project-header" },
      ...Object.entries(projectDetails).map(([id, p]) => ({
        type: "project",
        id: id,
        name: p.shortName,
        year: p.year,
        stack: p.shortStack,
        status: p.listStatus,
        description: p.description,
        role: p.role,
        fullStatus: p.status,
        sections: p.sections,
      })),
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
          {
            type: "error",
            content: `ERR: Projet '${projectName}' introuvable.`,
          },
        ];
      }
    },
  },
  {
    name: "parcours",
    desc: "mon parcours professionnel (comparaison des variantes)",
    handler: () => {
      const expData = {
        jobs: [
          {
            role: "Développeur Fullstack",
            company: "BedBoat",
            url: "https://bedboat.fr/",
            period: "2022 - 2026",
            descriptions: [
              "Audit technique et restructuration de la plateforme pour la performance et scalabilité",
              "Introduction de la culture Agile (Sprints, Daily, Retrospectives)",
              "Développement du système de réservation et intégration Stripe",
              "Optimisation des processus via automatisations Make",
            ],
          },
          {
            role: "Développeur Fullstack",
            company: "iologo",
            url: "https://www.iologo.io/",
            period: "2021 - 2022",
            descriptions: [
              "Implémentation de fonctionnalités de bout en bout (UI, Logique, API)",
              "Participation active à la transition technique suite à la fusion Lexidia",
              "Création d'un back-office autonome pour les équipes non-techniques",
            ],
          },
          {
            role: "Développeur Frontend",
            company: "Lexidia",
            url: "https://www.lexidia.org/",
            period: "2020 - 2021",
            descriptions: [
              "Conception UI pour une application d'aide à l'orthophonie",
              "Traduction des besoins cliniques en solutions techniques",
            ],
          },
        ],
        education: [
          {
            role: "Ingénieur spécialité AISL (Architecture et Ingénierie des Systèmes et Logiciels)",
            company: "IPST-CNAM (Toulouse)",
            period: "2021 - 2023",
          },
          {
            role: "Licence Informatique",
            company: "IPST-CNAM (Toulouse)",
            period: "2020 - 2021",
          },
          {
            role: "DUT Informatique",
            company: "IUT Informatique Paul Sabatier (Toulouse)",
            period: "2018 - 2020",
          },
        ],
      };

      return [{ type: "experience-logs", data: expData }];
    },
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
              {
                name: "Vue.js / Vite",
                addr: "0x4B",
                bar: 92,
                status: "STABLE",
              },
              {
                name: "Tailwind CSS",
                addr: "0x4A",
                bar: 95,
                status: "OPTIMIZED",
              },
              { name: "React / Next", addr: "0x4C", bar: 70, status: "ACTIVE" },
            ],
          },
          {
            title: "BACKEND_CORE",
            id: "BE-501",
            skills: [
              {
                name: "Node.js / Express",
                addr: "0x1B",
                bar: 88,
                status: "READY",
              },
              { name: "PostgreSQL", addr: "0x1C", bar: 85, status: "STABLE" },
              { name: "Supabase", addr: "0x1D", bar: 75, status: "LINKED" },
              { name: "REST APIs", addr: "0x1E", bar: 90, status: "READY" },
            ],
          },
          {
            title: "DEV_METHODS & SOFT_SKILLS",
            id: "PI-34",
            skills: [
              {
                name: "Méthode agile",
                addr: "0x8C",
                bar: 85,
                status: "OPTIMIZED",
              },
              {
                name: "Résolution de problèmes",
                addr: "0x8D",
                bar: 90,
                status: "READY",
              },
              {
                name: "Communication",
                addr: "0x8E",
                bar: 90,
                status: "ACTIVE",
              },
            ],
          },
          {
            title: "TOOLS_SYSTEM",
            id: "AU-99",
            skills: [
              {
                name: "n8n",
                addr: "0x8C",
                bar: 95,
                status: "OPTIMIZED",
              },
              { name: "Make", addr: "0x8D", bar: 85, status: "READY" },
              { name: "Notion", addr: "0x8E", bar: 95, status: "ACTIVE" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "contact",
    desc: "me contacter (email, réseaux)",
    handler: () => [
      { type: "header", content: "// fiche contact 0xADR" },
      {
        type: "text",
        content: "┌────────────────────────────────────────┐",
        class: "accent-text opacity-40 font-mono leading-none",
      },
      {
        type: "contact-row",
        label: "EMAIL",
        content: "lythomm@gmail.com",
        url: "mailto:lythomm@gmail.com",
      },
      {
        type: "contact-row",
        label: "GITHUB",
        content: "@lythomm",
        url: "https://github.com/lythomm",
      },
      {
        type: "contact-row",
        label: "LINKEDIN",
        content: "@thomas-ly",
        url: "https://www.linkedin.com/in/thomas-ly/",
      },
      {
        type: "contact-row",
        label: "TÉLÉPHONE",
        content: "06 11 59 76 27",
        url: "tel:+33637413634",
      },
      {
        type: "text",
        content: "└────────────────────────────────────────┘",
        class: "accent-text opacity-40 font-mono leading-none",
      },
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
  {
    name: "performance",
    desc: "basculer entre le mode FULL et ECO",
    handler: () => {
      const app = document.getElementById("app");
      const isLowPerf = app.classList.toggle("low-perf");
      return [
        {
          type: "text",
          content: `SYSTEM_UPDATE: Mode ${isLowPerf ? "ECO" : "FULL"} activé.`,
          class: isLowPerf ? "orange-text" : "accent-text",
        },
        {
          type: "text",
          content: isLowPerf
            ? "Distorsion d'écran désactivée. (Flicker, Scanlines & Noise actifs)"
            : "Distorsion haute fidélité activée. (GPU recommandé)",
        },
      ];
    },
  },
];

// Helper to get command object by name
export const getCommand = (name) => {
  return commandRegistry.find((c) => c.name === name.toLowerCase());
};
