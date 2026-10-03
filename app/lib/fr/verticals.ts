// fr-source: app/lib/verticals.ts sha256:b6f6ad3f2446c08d
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.

/**
 * Contenu de la section Applications, en français. Mêmes noms d'export que
 * app/lib/verticals.ts. Chaque application reprend de l'anglais son slug et
 * son ordre, et redéfinit ici tous ses textes : un champ de texte ajouté en
 * anglais empêche la compilation tant qu'il n'est pas traduit. Une
 * application sans traduction ici n'est pas affichée en français.
 *
 * Seule la navigation a une page française ; verticalHref renvoie vers la
 * page anglaise pour les autres applications.
 */

import { frHref } from "../i18n";
import {
  ADJACENT_VERTICALS as ADJACENT_EN,
  FLAGSHIP_VERTICAL as FLAGSHIP_EN,
  verticalHref as verticalHrefEn,
  type ApplicationPage,
  type Vertical,
} from "../verticals";
import { STAGE_LINE } from "./facts";

export type { ApplicationPage, Beat, Faq, Vertical } from "../verticals";

type Fixed = "slug" | "order" | "flagship";

const NAVIGATION_TEXT: Omit<Vertical, Fixed> = {
  navLabel: "Navigation",
  title: "Une navigation fiable sans GPS.",
  tagline: "Une référence magnétique lue dans le champ propre de la Terre, avec une borne d’erreur à chaque recalage.",
  intro:
    "Là où le positionnement par satellite fait défaut, personne ne sait dire de combien la position est fausse. Notre instrument lit le champ magnétique de la Terre, le compare à une carte pour corriger la centrale inertielle, et rend chaque recalage avec sa borne d’erreur. La navigation est la première application que nous développons.",
  horizon: {
    label: "Première application",
    note: STAGE_LINE,
  },
  glyphCaption: "Le champ lu à bord, comparé à une carte magnétique, donne un recalage de la position.",
};

const APPLICATION_TEXT: Record<string, Omit<ApplicationPage, Fixed>> = {
  "life-sciences": {
    navLabel: "Sciences du vivant",
    eyebrow: "Applications · Sciences du vivant",
    title: "Des capteurs à diamant pour les molécules et les cellules vivantes.",
    tagline: "La RMN de molécules à l’échelle d’une puce, et le bruit magnétique des radicaux libres dans les cellules vivantes.",
    intro:
      "Les centres NV que nous développons pour la navigation peuvent aussi lire le vivant, de deux façons : la résonance magnétique nucléaire de molécules posées à la surface d’un diamant, et la relaxométrie, qui suit l’activité des radicaux libres à l’intérieur de cellules vivantes.",
    horizon: {
      label: "Axe de recherche",
      note: "Aucun produit aujourd’hui. Les travaux commenceraient ici avec des partenaires de recherche, après la navigation.",
    },
    metaTitle: "Sciences du vivant : RMN sur puce et biodétection quantique",
    metaDescription:
      "Les centres NV du diamant pour les sciences du vivant : RMN sur puce de molécules en surface, et relaxométrie dans les cellules vivantes. Un axe de recherche de Spectral Flow.",
    glyphCaption:
      "Un même capteur NV, deux lectures : une molécule à la surface du diamant, et le bruit des radicaux dans une cellule.",
    teach: {
      eyebrow: "Le domaine",
      h: "Des molécules en surface, et le bruit magnétique d’une cellule vivante.",
      lead:
        "Deux mesures différentes partagent un même capteur à diamant. L’une lit la chimie d’une surface. L’autre suit l’activité des radicaux libres dans une cellule.",
      body:
        "La RMN sur puce ramène la résonance magnétique nucléaire à la taille d’un capteur sur une puce. Des centres NV proches de la surface du diamant captent les spins nucléaires des molécules qui y sont posées, dans des échantillons trop petits pour une bobine classique. La relaxométrie fonctionne autrement. Un nanodiamant fluorescent placé dans une cellule vivante perd plus vite sa polarisation de spin quand des radicaux libres voisins ajoutent du bruit magnétique. Suivre ce changement dans le temps donne une image de l’activité radicalaire sans consommer de sonde chimique.",
    },
    whyNV: {
      eyebrow: "Pourquoi le diamant",
      h: "Là où les bobines et les colorants atteignent leurs limites.",
      points: [
        {
          h: "De petits échantillons",
          p: "Le signal vient des molécules situées juste à la surface du diamant, dans des volumes bien trop petits pour une bobine classique.",
        },
        {
          h: "Dans les cellules vivantes",
          p: "Les nanodiamants sont décrits comme bien tolérés par de nombreux types de cellules et ne sont pas consommés par la mesure : on peut suivre la même cellule dans le temps.",
        },
        {
          h: "Aucun colorant qui pâlit",
          p: "Le capteur lit directement un signal magnétique. Il ne dépend pas d’un colorant qui pâlit ou qui réagit.",
        },
        {
          h: "Température ambiante",
          p: "Aucune cryogénie. La mesure se fait dans les conditions ambiantes.",
        },
      ],
    },
    approach: {
      eyebrow: "Ce qui se transpose",
      h: "Un meilleur diamant, et une lecture qui annonce son incertitude.",
      body:
        "Deux volets de notre travail sur la navigation s’appliquent ici : le diamant lui-même, dont la qualité fixe la limite de toute mesure faite avec lui, et un logiciel qui transforme un signal optique bruité en une valeur assortie de son incertitude.",
    },
    proof: {
      eyebrow: "Comment nous travaillerions",
      h: "Une recherche commune, après la navigation.",
      body:
        "Les travaux seraient ici une recherche commune avec des laboratoires spécialisés dans la fabrication du diamant, la chimie de surface et la RMN. Ils viennent après la navigation, notre première application.",
    },
    cta: {
      h: "Vous faites de la recherche en RMN, en biologie structurale ou en biologie cellulaire ?",
      body:
        "Si une mesure de votre laboratoire est limitée par la taille de l’échantillon ou par la sonde, nous aimerions le savoir.",
    },
    faq: [
      {
        q: "Qu’est-ce que la RMN sur puce ?",
        a: "La RMN sur puce ramène la résonance magnétique nucléaire à la taille d’un capteur sur une puce. Avec des centres azote-lacune du diamant, elle lit les spins nucléaires de molécules situées à la surface du diamant ou près d’elle, dans des volumes d’échantillon bien trop petits pour une bobine inductive classique.",
      },
      {
        q: "Qu’est-ce que la biodétection quantique par nanodiamants ?",
        a: "Des nanodiamants fluorescents qui contiennent des centres azote-lacune peuvent servir de capteurs magnétiques à l’intérieur de cellules vivantes. En relaxométrie, le bruit magnétique des radicaux libres voisins raccourcit le temps de relaxation de spin des centres NV. Les chercheurs s’en servent pour suivre dans le temps l’évolution de l’activité radicalaire, sans consommer de sonde chimique.",
      },
      {
        q: "La relaxométrie par nanodiamants mesure-t-elle une concentration ?",
        a: "Pas directement. Elle détecte le bruit magnétique près du capteur, qui reflète l’activité radicalaire alentour. Le signal se lit au mieux comme une variation relative dans le temps, non comme une concentration absolue.",
      },
      {
        q: "Spectral Flow vend-elle des instruments pour les sciences du vivant ?",
        a: "Non. Les sciences du vivant sont un axe de recherche pour Spectral Flow, à mener avec des partenaires de recherche. Sa première application est la navigation sans GPS.",
      },
    ],
  },
  semiconductors: {
    navLabel: "Semi-conducteurs et industrie",
    eyebrow: "Applications · Semi-conducteurs et industrie",
    title: "Voir le courant à l’intérieur de la puce.",
    tagline: "L’imagerie magnétique des chemins de courant et des défauts enfouis, à température ambiante.",
    intro:
      "À mesure que les puces s’empilent dans des boîtiers 2,5D et 3D, les défauts qui comptent se cachent dans des couches que la lumière et les électrons peinent à atteindre. Un microscope quantique à diamant image le champ magnétique du courant lui-même, à température ambiante, par une mesure qui n’altère pas la pièce.",
    horizon: {
      label: "Marché adjacent",
      note: "La même physique que la navigation, utilisée pour l’imagerie. Aucun instrument proposé aujourd’hui.",
    },
    metaTitle: "Analyse de défaillance des semi-conducteurs et inspection industrielle",
    metaDescription:
      "La microscopie quantique à diamant pour l’analyse de défaillance et l’inspection : des images magnétiques des chemins de courant et des défauts enfouis. Un marché adjacent pour Spectral Flow.",
    glyphCaption: "Une couche de centres NV image le champ magnétique d’un chemin de courant enfoui.",
    teach: {
      eyebrow: "Le domaine",
      h: "Les défauts qui comptent sont enfouis.",
      lead:
        "La mise en boîtier avancée empile le silicium en structures denses 2,5D et 3D. Quand une pièce tombe en panne, le défaut se trouve souvent plusieurs couches plus bas, difficile à atteindre par les méthodes optiques et à faisceau d’électrons.",
      body:
        "Tout courant crée un champ magnétique, et ce champ traverse les couches qui arrêtent la lumière. L’imager montre où le courant circule réellement, et où il ne devrait pas circuler. Un microscope quantique à diamant cartographie ces champs sur une surface et transforme une image magnétique en une vue des chemins de courant, des courts-circuits et des défauts enfouis. Le même principe s’applique à l’inspection industrielle, où beaucoup de défauts cachés dans les soudures, les batteries et les pièces critiques modifient le champ magnétique local.",
    },
    whyNV: {
      eyebrow: "Pourquoi le diamant",
      h: "Une image magnétique de l’endroit où circule le courant.",
      points: [
        {
          h: "Une mesure non destructive",
          p: "Elle image le champ que produit la pièce sous tension. La mesure elle-même n’altère pas la pièce. Certains échantillons demandent tout de même une préparation pour approcher le capteur.",
        },
        {
          h: "Toute une zone à la fois",
          p: "Une fine couche de centres NV image un champ de vue d’un seul coup, au lieu de balayer point par point.",
        },
        {
          h: "Température ambiante",
          p: "Ni cryogénie ni vide : l’instrument peut prendre place dans un laboratoire d’analyse ordinaire.",
        },
        {
          h: "Les champs statiques aussi",
          p: "Il lit les champs statiques et lentement variables, que les méthodes fondées sur les courants induits ne voient pas directement.",
        },
      ],
    },
    approach: {
      eyebrow: "Ce qui se transpose",
      h: "Le même diamant et la même lecture, utilisés pour l’imagerie.",
      body:
        "L’imagerie magnétique de puces par le diamant a été démontrée dans des laboratoires de recherche, et des instruments de ce type existent déjà. Ce que nous apporterions, c’est ce que nous développons pour la navigation : le matériau diamant, sa lecture optique, et un logiciel qui donne chaque valeur avec son incertitude.",
    },
    cta: {
      h: "Analyse de défaillance ou inspection là où les méthodes classiques s’arrêtent ?",
      body:
        "Nous aimerions échanger avec les équipes de la mise en boîtier avancée, du stockage d’énergie et de l’inspection des pièces critiques. Dites-nous ce que vous avez besoin de voir.",
    },
    faq: [
      {
        q: "Qu’est-ce qu’un microscope quantique à diamant ?",
        a: "Un microscope quantique à diamant utilise une fine couche de centres azote-lacune du diamant pour imager les champs magnétiques sur une surface. Comme tout courant électrique produit un champ magnétique, il peut cartographier les chemins du courant, à température ambiante, par une mesure qui n’altère pas l’échantillon.",
      },
      {
        q: "Comment trouve-t-il les défauts à l’intérieur d’une puce ?",
        a: "Les champs magnétiques traversent les couches d’un boîtier qui arrêtent la lumière. En imageant le champ d’une puce sous tension, le microscope montre où le courant circule réellement, ce qui révèle les courts-circuits, les circuits ouverts et les défauts enfouis. Plus un courant est loin du diamant, plus son image est grossière : la profondeur fixe ce que l’on peut résoudre.",
      },
      {
        q: "Que peut-il inspecter au-delà des semi-conducteurs ?",
        a: "Le même principe s’applique au contrôle non destructif : beaucoup de défauts cachés dans les soudures, les batteries et les pièces métalliques critiques modifient le champ magnétique local d’une façon qu’un capteur à diamant peut lire, y compris en champ statique.",
      },
      {
        q: "Spectral Flow vend-elle un microscope à diamant ?",
        a: "Non. Les semi-conducteurs et l’industrie sont un marché adjacent pour le matériau diamant et la lecture que Spectral Flow développe pour la navigation, sa première application.",
      },
    ],
  },
  "quantum-computing": {
    navLabel: "Informatique quantique",
    eyebrow: "Applications · Informatique quantique",
    title: "Le contrôle de spin à température ambiante.",
    tagline: "Le spin NV comme brique de l’information quantique, contrôlé à température ambiante.",
    intro:
      "Le spin du centre azote-lacune, que nous lisons pour la mesure, peut aussi être préparé et lu avec de la lumière, et contrôlé par micro-ondes, à température ambiante. Cela en fait une brique candidate pour l’information quantique.",
    horizon: {
      label: "Horizon plus lointain",
      note: "Un axe de recherche que nous suivons. Aucun produit aujourd’hui.",
    },
    metaTitle: "L’information quantique avec les spins du diamant",
    metaDescription:
      "Le spin NV du diamant se lit avec de la lumière et se contrôle par micro-ondes, à température ambiante. Un axe de recherche à plus long terme pour Spectral Flow.",
    glyphCaption:
      "Un spin électronique NV couplé à un spin nucléaire voisin : un petit registre à température ambiante.",
    teach: {
      eyebrow: "Le domaine",
      h: "Beaucoup de qubits doivent être gardés au froid.",
      lead:
        "Plusieurs plateformes de qubits de premier plan fonctionnent à une fraction de degré au-dessus du zéro absolu, dans des réfrigérateurs à dilution. Ce refroidissement ajoute du coût et de la complexité.",
      body:
        "Un centre azote-lacune du diamant se comporte autrement. Son spin électronique peut être préparé et lu avec de la lumière, et contrôlé par micro-ondes, à température ambiante. Couplé à des spins nucléaires voisins, il forme un petit registre quantique. Étendre ce registre à de nombreux qubits connectés reste un problème de recherche ouvert, et la plupart des travaux qui relient des qubits NV à distance se font à des températures cryogéniques.",
    },
    whyNV: {
      eyebrow: "Pourquoi le diamant",
      h: "Ce qui aide la mesure aide aussi l’information.",
      points: [
        {
          h: "Lu avec de la lumière",
          p: "Le spin est préparé et lu optiquement, par le même mécanisme que celui sur lequel reposent nos capteurs.",
        },
        {
          h: "Cohérent à température ambiante",
          p: "Il conserve un état de spin cohérent à température ambiante, sans réfrigérateur à dilution.",
        },
        {
          h: "Un registre local",
          p: "Des spins nucléaires voisins étendent un centre unique en un petit registre quantique.",
        },
        {
          h: "Un socle commun",
          p: "La cohérence est le fil conducteur : le travail sur le matériau qui améliore nos capteurs compte aussi ici.",
        },
      ],
    },
    approach: {
      eyebrow: "Ce qui se transpose",
      h: "Le matériau et le contrôle du spin se transposent.",
      body:
        "Nous suivons l’information quantique comme axe de recherche. Le matériau diamant et le contrôle du spin dont nos capteurs ont besoin s’y transposent, et nous suivons l’évolution du domaine.",
    },
    cta: {
      h: "Vous explorez le contrôle de spin à température ambiante ?",
      body: "Si les spins NV font partie de vos recherches, nous aimerions le savoir.",
    },
    faq: [
      {
        q: "Les centres azote-lacune peuvent-ils servir de qubits ?",
        a: "Oui. Le spin électronique d’un centre azote-lacune du diamant peut être préparé et lu optiquement, contrôlé par micro-ondes, et couplé à des spins nucléaires voisins pour former un petit registre quantique. Les centres NV sont une plateforme établie pour la recherche sur les capteurs quantiques, les réseaux quantiques et l’information quantique.",
      },
      {
        q: "Que signifie l’informatique quantique à température ambiante ?",
        a: "Il s’agit de matériel quantique qui fonctionne sans refroidissement cryogénique. Plusieurs plateformes de qubits ont besoin de températures proches du zéro absolu. Un spin NV unique et ses spins nucléaires voisins peuvent être contrôlés à température ambiante, et c’est pourquoi le diamant est étudié dans ce but. Passer à de nombreux qubits connectés à température ambiante reste une question de recherche ouverte.",
      },
      {
        q: "Où se situe l’informatique quantique dans la feuille de route de Spectral Flow ?",
        a: "C’est un axe de recherche à plus long terme, pas un produit. La première application de Spectral Flow est la navigation sans GPS ; le matériau diamant et le contrôle de spin qu’elle exige se transposeront avec le temps à l’information quantique.",
      },
    ],
  },
};

const NAVIGATION: Vertical = {
  ...NAVIGATION_TEXT,
  slug: FLAGSHIP_EN.slug,
  order: FLAGSHIP_EN.order,
  flagship: FLAGSHIP_EN.flagship,
};

const APPLICATION_PAGES: ApplicationPage[] = ADJACENT_EN.flatMap((v) => {
  const t = APPLICATION_TEXT[v.slug];
  return t ? [{ ...t, slug: v.slug, order: v.order, flagship: v.flagship }] : [];
});

/** Toutes les applications, la navigation d'abord. */
export const VERTICALS_CONTENT: Vertical[] = [NAVIGATION, ...APPLICATION_PAGES];

export const VERTICALS_ORDERED: Vertical[] = [...VERTICALS_CONTENT].sort((a, b) => a.order - b.order);

export const VERTICAL_SLUGS = VERTICALS_ORDERED.map((v) => v.slug);

/** La première application, la navigation. */
export const FLAGSHIP_VERTICAL: Vertical = NAVIGATION;

/** Les applications après la navigation, servies par la route dynamique. */
export const ADJACENT_VERTICALS: ApplicationPage[] = [...APPLICATION_PAGES].sort(
  (a, b) => a.order - b.order
);

/** Une page d'application servie par la route dynamique (la navigation a la sienne). */
export function getVertical(slug: string): ApplicationPage | undefined {
  return APPLICATION_PAGES.find((v) => v.slug === slug);
}

/** L'adresse française de l'application quand sa page existe en français, l'adresse anglaise sinon. */
export function verticalHref(slug: string): string {
  return frHref(verticalHrefEn(slug));
}
