// fr-source: app/lib/news.ts sha256:0260838ad52fa0ef
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Actualités en français. Mêmes noms d'export que app/lib/news.ts.
 * Chaque article reprend l'article anglais (slug, dates ISO, étiquette,
 * sources, illustration) et n'en redéfinit que les textes : les adresses
 * /fr/news/<slug> reprennent le slug anglais. Un lien interne va vers la
 * page française quand elle existe ; sinon il garde la page anglaise et son
 * libellé le signale. Un article sans traduction ici n'est pas publié en
 * français.
 */

import { frHref } from "../i18n";
import { POSTS as POSTS_EN, type Post } from "../news";

export type { Post, PostTag } from "../news";
export { POST_TAGS } from "../news";

/* ----- Dates en français ---------------------------------------------- */

const MOIS: Record<string, string> = {
  January: "janvier",
  February: "février",
  March: "mars",
  April: "avril",
  May: "mai",
  June: "juin",
  July: "juillet",
  August: "août",
  September: "septembre",
  October: "octobre",
  November: "novembre",
  December: "décembre",
};

/** Une date anglaise imprimée, en français : "October 2026" devient "octobre 2026". */
function dateLabelFr(label: string): string {
  return label
    .replace(/\b1 (?=[A-Z])/g, "1er ")
    .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, (m) => MOIS[m])
    .replace(/ and /g, " et ");
}

/* ----- Textes, par slug ------------------------------------------------ */

type PostText = {
  title: string;
  excerpt: string;
  body: string[];
  /** Libellé du lien de fin d'article, quand l'article anglais en a un. */
  ctaLabel?: string;
};

const TEXT: Record<string, PostText> = {
  /* ----- Octobre 2026 ---------------------------------------------- */
  "member-of-quic": {
    title: "Spectral Flow rejoint QuIC, le consortium européen de l’industrie quantique",
    excerpt:
      "Spectral Flow est désormais membre de QuIC, l’association de l’industrie européenne des technologies quantiques.",
    body: [
      "Spectral Flow est désormais membre de QuIC, le consortium européen de l’industrie quantique (European Quantum Industry Consortium). QuIC réunit les entreprises et les organismes de recherche qui construisent l’industrie européenne des technologies quantiques.",
      "Cette adhésion nous donne une place dans ses groupes de travail, où l’industrie débat des normes, des feuilles de route et des usages des capteurs quantiques.",
    ],
    ctaLabel: "Reconnaissance et adhésions",
  },
  "first-mobile-prototype-designed": {
    title: "Notre premier prototype mobile est conçu",
    excerpt:
      "La conception de notre premier prototype mobile est achevée. Son assemblage commence dès que son financement est confirmé.",
    body: [
      "La conception de notre premier prototype mobile est achevée : le capteur, l’électronique qui le pilote et le lit, et la mécanique qui les porte sur un véhicule en mouvement.",
      "Son premier rôle est de vérifier, sous les contraintes d’un instrument qui se déplace, que rien n’a été oublié entre la simulation et le matériel.",
      "Le logiciel de navigation a déjà effectué des missions complètes en simulation. Ici, c’est le logiciel qui attend le matériel, et non l’inverse.",
      "Son assemblage commence dès que son financement est confirmé. Viendront ensuite les premières mesures, puis les essais en mouvement.",
    ],
    ctaLabel: "Où nous en sommes",
  },
  "selected-tech-tour-quantum-defence-berlin": {
    title: "Sélectionnée pour présenter son projet au Tech Tour Quantum & Defence, à Berlin",
    excerpt:
      "Spectral Flow a été sélectionnée pour présenter son projet au Tech Tour Quantum & Defence 2026, à Berlin les 8 et 9 octobre.",
    body: [
      "Spectral Flow a été sélectionnée pour présenter son projet au Tech Tour Quantum & Defence 2026, qui se tient à Berlin les 8 et 9 octobre.",
      "Le Tech Tour met en relation des jeunes entreprises sélectionnées avec des investisseurs et des groupes industriels. Nous y présenterons une navigation fiable sans GPS : un instrument conçu pour lire le champ magnétique de la Terre et rendre chaque position avec sa borne d’erreur.",
      "Nous cherchons des partenaires de programme : intégrateurs de navigation, laboratoires de recherche et investisseurs qui apportent un programme. Si vous êtes à Berlin, demandez-nous la mission de démonstration en direct.",
    ],
    ctaLabel: "Retrouvez-nous à Berlin",
  },
  "seventeen-patent-applications": {
    title: "Dix-sept demandes de brevet déposées en 2026",
    excerpt: "En septembre 2026, nous avons déposé une nouvelle demande de brevet, en France.",
    body: [
      "En septembre 2026, nous avons déposé une nouvelle demande de brevet, en France.",
      "Cela porte à dix-sept le nombre de demandes de brevet déposées en 2026 : seize demandes provisoires au Royaume-Uni et une en France. Le contenu de la nouvelle demande reste confidentiel jusqu’à sa publication.",
    ],
    ctaLabel: "Nos demandes de brevet",
  },
  "position-and-its-error-bound": {
    title: "Une position ne vaut que par sa borne d’erreur",
    excerpt:
      "La navigation magnétique a déjà été essayée en vol. L’étape suivante est un instrument qui dit au véhicule, à chaque instant, de combien sa position peut être fausse.",
    body: [
      "La navigation magnétique a déjà été essayée en vol. Plusieurs équipes ont montré que la lecture du champ magnétique de la Terre peut corriger la position d’un véhicule sans satellites. La question n’est plus de savoir si cela fonctionne.",
      "La question ouverte est celle de la confiance. Une position seule laisse le pilote, ou le pilote automatique, deviner jusqu’à quel point s’y fier. Ce qui compte n’est pas la précision du système un bon jour. C’est de combien la position peut être fausse, à l’instant.",
      "L’aviation civile fonctionne déjà ainsi avec la navigation par satellite. Pour une approche aux instruments, le récepteur calcule un niveau de protection : une borne que l’erreur de sa position ne devrait dépasser qu’avec une probabilité très faible et spécifiée. L’approche n’est disponible que si cette borne convient à l’opération. La navigation magnétique a besoin de la même discipline.",
      "Nous concevons notre instrument autour de cette idée. Chaque recalage s’accompagne de sa borne d’erreur, calculée à chaque instant. Intégrité : l’instrument dit quand il ne faut pas s’y fier.",
      "Il complète la centrale inertielle, il ne la remplace pas. Entre deux recalages, la centrale inertielle porte la position ; chaque recalage magnétique la corrige et s’accompagne de sa borne.",
      "La borne est déclarée par l’instrument lui-même. La certifier est le travail d’un programme, avec ses utilisateurs et son autorité. Tant que notre premier prototype n’est pas assemblé et essayé, ce que nous montrons est issu du modèle, calculé en simulation.",
    ],
    ctaLabel: "Piloter une mission",
  },
  "contested-satellite-navigation": {
    title: "La navigation par satellite est contestée chaque jour",
    excerpt:
      "Le brouillage et le leurrage du positionnement par satellite font partie du quotidien des opérations aériennes dans plusieurs régions. Les chiffres, avec leurs sources, et ce qu’ils signifient pour la navigation.",
    body: [
      "Le brouillage et le leurrage du positionnement par satellite font partie du quotidien des opérations aériennes dans plusieurs régions. C’est sur les avions que ces interférences sont le mieux documentées, parce que les équipages et les compagnies aériennes les signalent.",
      "Deux formes dominent. Le brouillage noie le signal : le récepteur perd sa position. Le leurrage remplace le signal par un faux : le récepteur garde une position qui est fausse.",
      "Des signalements arrivent chaque jour, et l’aviation européenne traite le problème comme durable plutôt que passager. Les chiffres ci-dessous proviennent des publications de l’aviation elle-même, chacun avec sa source.",
      "La navigation par satellite restera essentielle. Ce qui change, c’est qu’un véhicule ne peut plus tenir sa position pour acquise. Le leurrage est le cas le plus difficile : le récepteur ne sait pas toujours qu’il est trompé.",
      "C’est le problème sur lequel nous travaillons. Notre instrument est conçu pour corriger la position d’un véhicule sans satellites, à l’aide du champ magnétique de la Terre. Passif : il lit le champ propre de la Terre et n’a besoin d’aucun signal extérieur. Il complète la centrale inertielle, il ne la remplace pas.",
      "Chaque recalage s’accompagne de sa borne d’erreur : non pas la précision de la position un bon jour, mais de combien elle peut être fausse, à l’instant.",
      "Une source magnétique placée à proximité peut perturber un magnétomètre. L’instrument est conçu pour le détecter et le dire.",
    ],
    ctaLabel: "Comment fonctionne notre navigation",
  },

  /* ----- Juillet 2026 ---------------------------------------------- */
  "esa-estec-quantum-workshop": {
    title: "Spectral Flow à l’atelier quantique de l’ESA, à l’ESTEC",
    excerpt:
      "Nous avons participé à l’atelier Quantum Technologies for Space Exploration de l’ESA, à l’ESTEC à Noordwijk, avec la communauté européenne des capteurs quantiques.",
    body: [
      "Nous avons participé à l’atelier Quantum Technologies for Space Exploration de l’ESA, à l’ESTEC à Noordwijk, aux côtés de la communauté européenne des capteurs quantiques.",
      "Entre les sessions, notre mission de démonstration tournait en direct sur des ordinateurs portables dans la salle : une mission complète sans navigation par satellite, recalculée dans le navigateur, chaque chiffre portant la mention « issu du modèle ».",
      "Notre message aux échanges sur la feuille de route était simple : pour l’autonomie de l’exploration, l’intégrité compte autant que la sensibilité. Un instrument doit savoir quand se méfier de lui-même.",
      "Un capteur compact, conçu pour rejeter à bord le champ magnétique propre de l’engin spatial, pourrait réduire la longueur du mât et l’effort de propreté magnétique que les missions paient encore aujourd’hui.",
    ],
    ctaLabel: "Piloter le profil spatial",
  },
  "sixteen-patent-applications": {
    title: "Seize demandes de brevet déposées",
    excerpt:
      "Trois demandes de brevet ont été déposées en dix jours, entre fin juin et début juillet, ce qui porte le total à seize demandes provisoires au Royaume-Uni.",
    body: [
      "Trois demandes de brevet ont été déposées en dix jours, entre fin juin et début juillet, ce qui porte le total à seize demandes provisoires au Royaume-Uni.",
      "Parmi elles, l’une porte sur la façon dont l’architecture de mesure rejette à bord les interférences magnétiques propres à la plateforme porteuse. Une autre porte sur la couche embarquée qui transforme le signal nettoyé en données de navigation dont le système peut se porter garant. Leur détail n’est pas public.",
      "Mise à jour, octobre 2026 : une dix-septième demande, déposée en France, a suivi en septembre.",
    ],
  },
  "qualified-deeptech-bpifrance": {
    title: "Qualifiée Deeptech par Bpifrance",
    excerpt:
      "Spectral Flow est désormais qualifiée Deeptech par Bpifrance, la banque publique d’investissement française.",
    body: [
      "Spectral Flow est désormais qualifiée Deeptech par Bpifrance, la banque publique d’investissement française.",
      "Bpifrance attribue la qualification Deeptech à une entreprise selon quatre critères : un lien étroit avec la recherche, de fortes barrières à l’entrée dues à des verrous technologiques difficiles, un avantage fortement différenciant, et un chemin long et complexe vers le marché.",
      "Cette qualification ouvre l’accès à l’écosystème français de soutien à la deeptech, alors que nous développons notre premier prototype.",
    ],
  },
  "the-instrument-is-public": {
    title: "L’Instrument est public : pilotez une mission dans votre navigateur",
    excerpt: "Nos missions de démonstration sont désormais ouvertes à tous, dans le navigateur, sans créer de compte.",
    body: [
      "Nos missions de démonstration sont désormais ouvertes à tous, dans le navigateur, sans créer de compte. Pilotez une mission complète là où les satellites ne peuvent pas aider, injectez des attaques contre votre propre instrument et voyez comment il les signale.",
      "Chaque chiffre est recalculé en direct, le bilan de mission montre l’apport de chaque couche, et la science derrière chaque panneau est à un clic. Chaque chiffre porte la mention « issu du modèle » : c’est une simulation, encore à calibrer sur le matériel, et utile en relatif.",
    ],
    ctaLabel: "Piloter l’Instrument",
  },
  "register-of-published-experiments": {
    title: "Plus d’une centaine d’expériences publiées gardent notre simulation honnête",
    excerpt:
      "Notre simulation est confrontée à un registre de plus d’une centaine de résultats expérimentaux publiés.",
    body: [
      "Une simulation ne vaut que par sa confrontation avec la littérature. La nôtre est confrontée à un registre de plus d’une centaine de résultats expérimentaux publiés, choisis un à un et revérifiés à mesure que le modèle évolue.",
      "La validation quantitative porte sur le sous-ensemble dont les conditions expérimentales sont assez bien documentées, et la liste est disponible sur demande. Quand le modèle et une expérience divergent, l’expérience l’emporte et le modèle change.",
    ],
  },

  /* ----- Juin 2026 ------------------------------------------------- */
  "navigation-simulation-online": {
    title: "Notre simulation de navigation est en ligne",
    excerpt:
      "Avant l’assemblage de notre premier prototype, notre capteur, tel que conçu, effectue des missions complètes en simulation.",
    body: [
      "Avant l’assemblage de notre premier prototype, notre capteur, tel que conçu, effectue des missions complètes en simulation : relief magnétique, véhicule avec ses propres interférences, modèle du capteur et filtre de navigation, de bout en bout.",
      "Chaque chiffre porte la mention « issu du modèle ». La simulation reste à calibrer sur le matériel et elle est utile en relatif : elle fixe les objectifs de conception que vise notre programme matériel. Des sessions de simulation expertes sont proposées sur demande.",
    ],
    ctaLabel: "Piloter une mission",
  },
  "they-compensate-we-measure": {
    title: "Rejeter le champ propre du véhicule, à bord",
    excerpt:
      "Les magnétomètres embarqués aujourd’hui sont corrigés par des modèles de compensation ajustés à chaque véhicule. Nous concevons notre capteur pour rejeter aussi, à bord, le champ propre de la plateforme.",
    body: [
      "Les magnétomètres embarqués aujourd’hui sont le plus souvent corrigés par des modèles de compensation ajustés à chaque véhicule, une méthode éprouvée de longue date dans les levés aéroportés.",
      "Nous ajoutons une seconde ligne de défense : un capteur conçu pour rejeter à bord le champ magnétique propre de la plateforme, afin qu’il reste moins à corriger pour le modèle.",
    ],
  },
  "joins-nvidia-inception": {
    title: "Spectral Flow rejoint NVIDIA Inception",
    excerpt: "Nous sommes désormais membres de NVIDIA Inception, le programme de NVIDIA pour les jeunes entreprises.",
    body: ["Nous sommes désormais membres de NVIDIA Inception, le programme de NVIDIA pour les jeunes entreprises."],
    ctaLabel: "Soutiens et adhésions",
  },
  "why-navigation-first": {
    title: "Pourquoi la navigation sans GPS est notre première application",
    excerpt:
      "La navigation par satellite est de plus en plus brouillée, leurrée et rendue indisponible. Une référence magnétique passive ajoute une couche qui ne dépend pas des satellites.",
    body: [
      "La navigation par satellite est de plus en plus brouillée, leurrée et rendue indisponible. Une référence magnétique passive, qui lit le champ propre de la Terre et n’a besoin d’aucun signal extérieur, ajoute une couche qui ne dépend pas des satellites.",
      "Mesurer des champs magnétiques faibles sous la forme d’un vecteur complet, à température ambiante : c’est ce que les centres azote-lacune du diamant font bien.",
    ],
  },
  "designing-in-software-first": {
    title: "Concevoir un capteur quantique, d’abord en logiciel",
    excerpt: "Avant d’arriver en salle blanche, un capteur vit dans notre simulation.",
    body: [
      "Avant d’arriver en salle blanche, un capteur vit dans notre simulation. Modéliser la cohérence et la sensibilité sur l’ensemble des canaux de décohérence permet à une petite équipe d’explorer vite l’espace de conception et de choisir ce qu’il faut fabriquer.",
      "La simulation doit encore être calibrée sur le matériel. Nous nous en servons pour comparer des conceptions, pas pour promettre des chiffres.",
    ],
  },
};

/* ----- Articles -------------------------------------------------------- */

/** Le lien de fin d'article : page française si elle existe, sinon page anglaise signalée. */
function ctaFr(cta: { href: string; label: string }, label: string): { href: string; label: string } {
  const href = frHref(cta.href);
  const english = href.startsWith("/") && href === cta.href;
  return { href, label: english ? `${label} (en anglais)` : label };
}

function translate(p: Post): Post[] {
  const t = TEXT[p.slug];
  if (!t) return [];
  const { cta, ...rest } = p;
  const post: Post = {
    ...rest,
    dateLabel: dateLabelFr(p.dateLabel),
    title: t.title,
    excerpt: t.excerpt,
    body: t.body,
  };
  if (cta && t.ctaLabel) post.cta = ctaFr(cta, t.ctaLabel);
  return [post];
}

/** Tous les articles, le plus récent d'abord, dans l'ordre de l'anglais. */
export const POSTS: Post[] = POSTS_EN.flatMap(translate);

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function latestPosts(n: number): Post[] {
  return POSTS.slice(0, Math.max(0, n));
}

export const POST_SLUGS = POSTS.map((p) => p.slug);

/**
 * Articles à suggérer sous un article : même étiquette d'abord, le plus
 * récent d'abord, puis les plus récents des autres.
 */
export function relatedPosts(slug: string, n = 3): Post[] {
  const post = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  if (!post) return others.slice(0, n);
  const sameTag = others.filter((p) => p.tag === post.tag);
  const rest = others.filter((p) => p.tag !== post.tag);
  return [...sameTag, ...rest].slice(0, Math.max(0, n));
}
