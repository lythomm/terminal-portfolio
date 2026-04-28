<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import BootScreen from "./components/BootScreen.vue";
import FullscreenHint from "./components/FullscreenHint.vue";
import pcStartupSound from "./assets/old-pc-startup.mp3";

const terminalLines = ref([]);
const isOff = ref(true);
const isBooting = ref(true);
const hasPoweredOn = ref(false);
const isMobile = ref(false);
const showFullscreenHint = ref(true);
const currentInput = ref("");
const inputRef = ref(null);
const containerRef = ref(null);
const commandHistory = ref([]);
const historyIndex = ref(-1);
const uptime = ref("00d 00h 00m 00s");
const systemStartTime = ref(new Date(2020, 8, 28, 12, 0, 0).getTime());
const activeHelp = ref(null);

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return;

  if (direction === "up") {
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
    }
  } else if (direction === "down") {
    if (historyIndex.value > -1) {
      historyIndex.value--;
    }
  }

  if (historyIndex.value === -1) {
    currentInput.value = "";
  } else {
    currentInput.value =
      commandHistory.value[
        commandHistory.value.length - 1 - historyIndex.value
      ];
  }
};

const updateUptime = () => {
  const now = new Date().getTime();
  const diff = now - systemStartTime.value;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  uptime.value = `${days}j ${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
};

let uptimeInterval;

const checkMobile = () => {
  isMobile.value =
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  updateUptime();
  uptimeInterval = setInterval(updateUptime, 1000);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  clearInterval(uptimeInterval);
});

const handlePowerOn = () => {
  showFullscreenHint.value = false;
  isOff.value = false;
  hasPoweredOn.value = true;
  const audio = new Audio(pcStartupSound);
  audio.volume = 0.6;
  audio.play().catch((e) => console.log("Audio play blocked:", e));
};

const commands = {
  "a-propos": () => {
    return [
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
    ];
  },
  projets: () => {
    return [
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
    ];
  },
  ouvrir: (args) => {
    if (!args || args.length === 0) {
      return [{ type: "error", content: "USAGE: ouvrir <nom_du_projet>" }];
    }

    const projectName = args[0].toLowerCase();
    const projectDetails = {
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
  parcours: () => {
    return [
      { type: "header", content: "// expérience professionnelle" },
      {
        type: "experience",
        role: "Développeur Fullstack (alternance -> CDI)",
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
        role: "Développeur Fullstack (alternance)",
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
        role: "Développeur Frontend (alternance)",
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
    ];
  },
  competences: () => {
    return [
      { type: "header", content: "// compétences techniques" },
      {
        type: "text",
        content: "Frontend: Vue.js, React.js, Tailwind CSS, JS (ES6+), Figma",
      },
      {
        type: "text",
        content: "Backend: Node.js, Express.js, PostgreSQL, Supabase",
      },
      {
        type: "text",
        content: "Automation: n8n, Make, Workflows d'automatisation",
      },
      {
        type: "text",
        content: "Outils: Git, Docker, GCP, Vercel, Heroku",
      },
      {
        type: "text",
        content: "IA: Prompt Engineering, Agents AI, Gemini/Claude APIs",
      },
    ];
  },
  contact: () => {
    return [
      { type: "header", content: "// me contacter" },
      { type: "text", content: "Email: lythomm@gmail.com" },
      { type: "text", content: "LinkedIn: linkedin.com/in/thomas-ly" },
      { type: "text", content: "GitHub: github.com/lythomm" },
      { type: "text", content: "Portfolio: thomas-ly.vercel.app" },
    ];
  },

  aide: () => {
    return [
      {
        type: "text",
        content: "commandes disponibles :",
        class: "dim-text term-small mb-3",
      },
      { type: "command", name: "a-propos", desc: "en savoir plus sur moi" },
      { type: "command", name: "projets", desc: "liste de mes réalisations" },
      { type: "command", name: "ouvrir <nom>", desc: "détails sur un projet" },
      { type: "command", name: "parcours", desc: "mon parcours professionnel" },
      {
        type: "command",
        name: "competences",
        desc: "mes compétences techniques",
      },
      {
        type: "command",
        name: "contact",
        desc: "me contacter (email, réseaux)",
      },
      { type: "command", name: "effacer", desc: "effacer le terminal" },
    ];
  },
  effacer: () => {
    terminalLines.value = [];
    activeHelp.value = null;
    return [];
  },
};

const welcomeMessage = [
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addLineWithTyping = async (line) => {
  if (line.type === "text") {
    const fullContent = line.content;
    const typingLine = ref({ ...line, content: "" });
    terminalLines.value.push(typingLine.value);

    for (let i = 0; i < fullContent.length; i++) {
      typingLine.value.content += fullContent[i];
      await sleep(20);
    }
  } else {
    terminalLines.value.push(line);
  }
};

const runCommand = (fullInput) => {
  const input = fullInput.trim();
  if (input === "") return;

  const [cmd, ...args] = input.toLowerCase().split(/\s+/);

  terminalLines.value.push({ type: "prompt", content: input });
  commandHistory.value.push(input);

  if (cmd === "aide") {
    activeHelp.value = commands.aide();
    return;
  }

  // Clear help for any other command
  activeHelp.value = null;

  if (cmd in commands) {
    const result = commands[cmd](args);
    if (result && result.length > 0) {
      terminalLines.value.push(...result);
    }
  } else {
    terminalLines.value.push({
      type: "error",
      content: `ERR: Commande '${cmd}' non reconnue. Essayez 'aide'.`,
    });
  }
};

const handleCommand = () => {
  runCommand(currentInput.value);
  currentInput.value = "";
};

const focusInput = () => {
  inputRef.value?.focus({ preventScroll: true });
};

const scrollToBottom = async () => {
  await nextTick();
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight;
  }
};

const onBootComplete = async () => {
  isBooting.value = false;

  // Welcome Message
  for (const line of welcomeMessage) {
    await addLineWithTyping(line);
    await sleep(100);
  }
  focusInput();
};

watch(terminalLines, scrollToBottom, { deep: true });
</script>

<template>
  <div
    v-if="isMobile"
    class="flex flex-col items-center justify-center h-100dvh text-center p-6 space-y-6"
  >
    <div class="text-err text-5xl animate-pulse">ERREUR MATÉRIELLE</div>
    <div class="border border-err/30 p-8 bg-err/5 max-w-md">
      <p class="text-xl mb-4">INCOMPATIBILITÉ DÉTECTÉE</p>
      <p class="dim-text leading-relaxed">
        Le système <span class="accent-text">THOMAS_OS</span> nécessite un
        clavier physique et une résolution d'affichage supérieure pour
        fonctionner correctement.
      </p>
      <div class="h-px bg-err/20 my-6"></div>
      <p class="text-sm">
        Pour une expérience optimale, veuillez redémarrer ce terminal sur un
        <span class="text-fg underline underline-offset-4">ordinateur</span>.
      </p>
    </div>
    <div class="dim-text text-xs tracking-widest uppercase">
      Code d'erreur: MOBILE_DEVICE_INCOMPATIBLE_ERR
    </div>
  </div>

  <div
    v-else
    class="terminal-container selection:bg-accent selection:text-bg"
    @click="focusInput"
  >
    <!-- Power Button (Visible only when system is OFF) -->
    <div
      v-if="isOff"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-bg"
    >
      <!-- Fullscreen Hint Modal -->
      <FullscreenHint
        :show="showFullscreenHint"
        @close="showFullscreenHint = false"
      />

      <button
        @click="handlePowerOn"
        class="group relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-dim hover:border-accent transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <span
          class="text-dim group-hover:text-accent text-4xl transition-colors!"
          >⏻</span
        >
        <div
          class="absolute inset-0 rounded-full group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-shadow"
        ></div>
      </button>
      <div class="text-dim text-xs tracking-[0.2em] uppercase animate-pulse">
        Démarrer
      </div>
    </div>

    <!-- Screen Content (Boot Sequence & Terminal) -->
    <div
      v-if="!isOff"
      class="h-full w-full flex flex-col"
      :class="[hasPoweredOn ? 'power-on-anim' : 'opacity-0']"
    >
      <!-- Top Banner -->
      <div v-if="!isBooting" class="sticky top-0 z-40 pb-5 pt-2">
        <div
          class="container-max flex justify-between items-start font-mono term-label tracking-widest"
        >
          <div class="space-y-1.5">
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Noyau</span>
              <span class="text-fg font-bold">THOMAS_OS v1.0.0</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Auth</span>
              <span class="accent-text bg-accent/5 px-1.5 py-0.5 rounded-sm"
                >ACCÈS_INVITÉ</span
              >
            </div>
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Nœud</span>
              <span class="text-fg">portfolio-node-01</span>
            </div>
          </div>
          <div class="space-y-1.5 text-right">
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Activité</span>
              <span class="text-fg tabular-nums">{{ uptime }}</span>
            </div>
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Session</span>
              <span class="text-fg">TTY-01</span>
            </div>
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Statut</span>
              <div class="flex items-center space-x-2">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-accent"
                  ></span>
                </span>
                <span class="text-accent font-bold">EN LIGNE</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Separator -->
        <div class="container-max px-4 mt-6">
          <div
            class="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
          ></div>
        </div>
      </div>

      <!-- Main Terminal Content -->
      <BootScreen v-if="isBooting" @complete="onBootComplete" />

      <div
        v-if="!isBooting"
        ref="containerRef"
        class="terminal-content container-max px-4"
      >
        <div
          v-for="(line, index) in terminalLines"
          :key="index"
          class="mb-4 last:mb-0"
        >
          <!-- Prompt -->
          <div
            v-if="line.type === 'prompt'"
            class="flex items-center term-main mb-4"
          >
            <span class="accent-text mr-2">thomas-portfolio:~$</span>
            <span class="text-fg">{{ line.content }}</span>
          </div>

          <!-- Header -->
          <div
            v-else-if="line.type === 'header'"
            class="accent-text term-main uppercase tracking-widest mb-4 mt-8 first:mt-0"
          >
            {{ line.content }}
          </div>

          <!-- ASCII -->
          <pre
            v-else-if="line.type === 'ascii'"
            class="accent-text text-xs leading-none font-mono opacity-80 overflow-x-hidden! ascii-art"
          >
            {{ line.content }}
          </pre>

          <!-- Error -->
          <div v-else-if="line.type === 'error'" class="text-err term-main">
            {{ line.content }}
          </div>

          <!-- Project Header -->
          <div
            v-else-if="line.type === 'project-header'"
            class="grid grid-cols-[1fr_80px_1.5fr_100px] gap-4 mb-4 border-b border-border/30 pb-2 px-4"
          >
            <div class="flex items-center space-x-3">
              <span class="w-4"></span>
              <div class="dim-text text-xs uppercase tracking-widest">Nom</div>
            </div>
            <div class="dim-text text-xs uppercase tracking-widest">Date</div>
            <div class="dim-text text-xs uppercase tracking-widest text-center">
              Stack techniques
            </div>
            <div class="dim-text text-xs uppercase tracking-widest text-right">
              Statut
            </div>
          </div>

          <!-- Project Item -->
          <div
            v-else-if="line.type === 'project'"
            class="group relative py-2.5 px-4 hover:bg-accent/5 transition-colors cursor-pointer border border-transparent hover:border-accent/10"
            @click="runCommand('ouvrir ' + line.name)"
          >
            <div
              class="grid grid-cols-[1fr_80px_1.5fr_100px] gap-4 items-center"
            >
              <div class="flex items-center space-x-3">
                <span
                  class="text-accent opacity-0 group-hover:opacity-100 transition-opacity w-4"
                  >→</span
                >
                <span class="text-fg font-bold term-main">{{ line.name }}</span>
              </div>
              <div class="dim-text term-secondary tabular-nums">
                {{ line.year }}
              </div>
              <div class="text-fg/80 term-small text-center truncate px-2">
                {{ line.stack }}
              </div>
              <div class="text-right">
                <span
                  class="text-[10px] px-2 py-0.5 border border-accent/30 text-accent bg-accent/5 tracking-wider font-bold"
                  >{{ line.status }}</span
                >
              </div>
            </div>
          </div>

          <!-- Experience -->
          <div
            v-else-if="line.type === 'experience'"
            class="flex flex-col space-y-1 mb-2"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-2">
                <span class="text-fg font-bold term-main">{{ line.role }}</span>
                <span class="dim-text">@</span>
                <a
                  v-if="line.url"
                  :href="line.url"
                  target="_blank"
                  class="accent-text hover:underline underline-offset-4 decoration-accent/30"
                  >{{ line.company }}</a
                >
                <span v-else class="accent-text">{{ line.company }}</span>
              </div>
              <span class="dim-text term-secondary tabular-nums">{{
                line.period
              }}</span>
            </div>
          </div>

          <!-- Description -->
          <div
            v-else-if="line.type === 'desc'"
            class="dim-text term-secondary pl-4 border-l-2 border-border ml-1 mb-4 leading-relaxed max-w-2xl"
          >
            {{ line.content }}
          </div>

          <!-- Text -->
          <div
            v-else-if="line.type === 'text'"
            :class="[line.class || 'text-fg/90 term-main leading-relaxed']"
          >
            {{ line.content }}
          </div>

          <!-- Project Detail -->
          <div
            v-else-if="line.type === 'project-detail'"
            class="mt-4 border border-border/40 bg-surface/30 p-8 space-y-8 backdrop-blur-xs relative overflow-hidden"
          >
            <!-- Corner decoration -->
            <div
              class="absolute top-0 right-0 w-16 h-16 border-t border-r border-accent/20"
            ></div>

            <div
              class="flex justify-between items-center border-b border-border/50 pb-6 mb-8"
            >
              <div class="flex items-center space-x-3">
                <span class="dim-text text-[10px] tracking-widest uppercase"
                  >Projet:</span
                >
                <h2
                  class="text-3xl font-bold accent-text tracking-tighter uppercase"
                >
                  {{ line.name }}
                </h2>
              </div>
              <div class="text-right">
                <div
                  class="dim-text text-[10px] uppercase mb-1 tracking-[0.2em]"
                >
                  Secteur_Statut
                </div>
                <div class="text-accent font-bold tracking-widest">
                  {{ line.status }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              <div class="space-y-8">
                <div class="space-y-4">
                  <span
                    class="dim-text text-[10px] uppercase tracking-[0.2em] block"
                    >// DESCRIPTION_FONCTIONNELLE</span
                  >
                  <p class="text-fg/90 leading-relaxed text-lg">
                    {{ line.description }}
                  </p>
                </div>

                <div v-if="line.url !== '#'" class="pt-4">
                  <a
                    :href="line.url"
                    target="_blank"
                    class="inline-flex items-center space-x-3 px-8 py-3 bg-accent text-bg font-bold hover:bg-accent/90 transition-all active:scale-95 group"
                  >
                    <span>LANCER L'APPLICATION</span>
                    <span class="group-hover:translate-x-1 transition-transform"
                      >↗</span
                    >
                  </a>
                </div>
              </div>

              <div class="space-y-8 border-l border-border/30 pl-10">
                <div>
                  <h3
                    class="dim-text text-[10px] uppercase mb-4 tracking-[0.2em]"
                  >
                    Dépendances_Techniques
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="t in line.tech"
                      :key="t"
                      class="px-3 py-1 bg-surface text-fg/80 text-[11px] border border-border/50 uppercase tracking-wider font-mono"
                      >{{ t }}</span
                    >
                  </div>
                </div>
                <div>
                  <h3
                    class="dim-text text-[10px] uppercase mb-2 tracking-[0.2em]"
                  >
                    Rôle_Attribué
                  </h3>
                  <div class="text-fg font-medium term-main tracking-tight">
                    {{ line.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Persistent Footer (Input + Optional Help) -->
      <div
        v-if="!isBooting"
        class="mt-4 border-t border-border/50 bg-bg/90 backdrop-blur-md pt-4 pb-4 z-40 container-max"
      >
        <div class="w-full px-4">
          <!-- Current Input Prompt -->
          <div class="flex items-center term-main">
            <span class="accent-text mr-2 font-bold tracking-tight"
              >thomas-portfolio:~$</span
            >
            <input
              ref="inputRef"
              v-model="currentInput"
              type="text"
              class="bg-transparent border-none outline-none flex-grow text-fg caret-accent p-0 font-mono placeholder:text-dim/50 term-main"
              placeholder="écrivez une commande (ex: aide)"
              @keydown.enter="handleCommand"
              @keydown.up.prevent="navigateHistory('up')"
              @keydown.down.prevent="navigateHistory('down')"
              spellcheck="false"
              autocomplete="off"
              autofocus
            />
          </div>

          <!-- Active Help Display -->
          <div
            v-if="activeHelp"
            class="mt-4 border-t border-border/50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-500"
          >
            <div v-for="(line, index) in activeHelp" :key="index">
              <!-- Command Help Item -->
              <div
                v-if="line.type === 'command'"
                class="grid grid-cols-[180px_auto] term-small"
              >
                <span class="text-fg font-bold">{{ line.name }}</span>
                <span class="dim-text tracking-tight">// {{ line.desc }}</span>
              </div>

              <!-- Simple Text -->
              <div
                v-else
                :class="[line.class || 'text-fg term-main font-bold mb-4']"
              >
                {{ line.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
