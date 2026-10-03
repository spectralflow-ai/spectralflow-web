// fr-source: app/privacy/page.tsx sha256:b83a056268419764
// Généré par traduction de la page anglaise : corriger l'anglais ou le cahier, puis retraduire.
import type { Metadata } from "next";
import Link from "next/link";
import { Prose, Eyebrow, H2, Body, PageHeader } from "../../components/kit";
import { CONTACT_EMAIL } from "../../lib/contact";
import { ADDRESS, BRAND, LEGAL_NAME } from "../../lib/facts";
import { SHARE_IMAGE } from "../../lib/fr/facts";

const DESCRIPTION = `Politique de confidentialité du site spectralflow.ai : comment ${LEGAL_NAME} traite les données personnelles conformément au RGPD.`;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: DESCRIPTION,
  alternates: { canonical: "/fr/privacy", languages: { en: "/privacy", fr: "/fr/privacy" } },
  openGraph: {
    images: [SHARE_IMAGE],
    title: `Politique de confidentialité · ${BRAND}`,
    description: DESCRIPTION,
    url: "/fr/privacy",
    siteName: BRAND,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    images: [SHARE_IMAGE.url],
    card: "summary_large_image",
    title: `Politique de confidentialité · ${BRAND}`,
    description: DESCRIPTION,
  },
};

const strong = { color: "var(--text-primary)" } as const;

export default function Privacy() {
  return (
    <main>
      <PageHeader
        eyebrow="Politique de confidentialité"
        title="Politique de confidentialité"
        intro="Comment nous collectons et traitons les données personnelles, conformément au règlement général sur la protection des données de l’Union européenne (RGPD)."
      />

      <Prose>
        <Eyebrow>Responsable du traitement</Eyebrow>
        <H2 className="max-w-3xl mb-6">Qui est responsable</H2>
        <Body className="max-w-3xl">
          Le responsable du traitement est <strong style={strong}>{LEGAL_NAME}</strong>,{" "}
          {ADDRESS.street}, {ADDRESS.postalCode} {ADDRESS.locality}, {ADDRESS.country}. Pour toute
          question sur vos données, écrivez à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Ce que nous collectons et pourquoi</Eyebrow>
        <H2 className="max-w-3xl mb-6">Données, finalités et base légale</H2>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Contacts et demandes.</strong> Lorsque vous nous écrivez par
          courriel ou utilisez le formulaire de contact (demandes générales, demandes liées à un
          programme, à un laboratoire, à la presse ou au recrutement, demandes de la fiche technique
          issue du modèle ou d’une session de simulation experte), nous traitons les données que
          vous fournissez, en général votre nom, votre adresse électronique, votre organisation et
          votre message, dans le seul but de vous répondre et de gérer la relation qui s’ensuit.
          Base légale&nbsp;: notre intérêt légitime à répondre aux demandes qui nous sont
          adressées, et l’exécution de mesures précontractuelles prises à votre demande.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Acheminement du formulaire.</strong> Les messages envoyés par le
          formulaire sont transmis à notre boîte de réception par Resend, un service de Plus Five
          Five, Inc. (États-Unis), prestataire d’acheminement de courriels qui agit sur nos
          instructions. Si le formulaire ne parvient pas à envoyer le message, votre propre
          logiciel de messagerie s’ouvre avec le message préparé, et rien ne passe par Resend.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Journaux techniques.</strong> Notre hébergeur, Vercel Inc.
          (États-Unis), peut traiter des données techniques courantes (par exemple l’adresse IP, le
          navigateur et l’horodatage) pour diffuser et sécuriser le site.
          Base légale&nbsp;: notre intérêt légitime à assurer la sécurité et le bon fonctionnement
          du site.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Missions de démonstration.</strong> L’Instrument joue des missions
          calculées à l’avance et servies avec ce site. Ce n’est que lors des sessions expertes,
          ouvertes depuis un lien dédié, que votre navigateur se connecte à notre service de
          calcul, hébergé par Google Cloud France SARL sur des serveurs situés dans l’Union
          européenne, qui calcule chaque mission simulée. Ce service reçoit votre adresse IP et les
          données techniques courantes nécessaires pour répondre à la requête. Vous ne saisissez
          aucune donnée personnelle dans les démonstrations, et nous n’utilisons pas ces requêtes
          pour identifier les visiteurs.
        </Body>
        <Body className="max-w-3xl mb-4">
          <strong style={strong}>Carte des interférences GNSS en direct.</strong> Certaines pages
          affichent une carte en direct de gpsjam.org, un site tiers exploité par John Wiseman. La
          carte se charge automatiquement lorsque vous approchez de cette partie de la page&nbsp;:
          votre navigateur se connecte alors à gpsjam.org, qui reçoit votre adresse IP et des
          données techniques courantes. Dans la carte, gpsjam.org peut charger ses propres
          ressources (tuiles cartographiques, polices, mesure d’audience sans cookie), dont
          certaines auprès d’autres prestataires, qui reçoivent alors eux aussi votre adresse IP,
          et peut conserver ses réglages dans le stockage de votre navigateur. Cela relève des
          conditions propres à gpsjam.org. Nous ne recevons rien de gpsjam.org à votre sujet. Pour
          savoir si la carte est disponible, c’est notre propre serveur, et non votre navigateur,
          qui vérifie que gpsjam.org répond&#8239;; cette vérification ne transmet rien à votre
          sujet. Si la carte ne peut pas s’afficher, la page présente à la place un dessin réalisé
          par nos soins. Base légale&nbsp;: notre intérêt légitime à présenter des données
          publiques actuelles sur les interférences de la navigation par satellite.
        </Body>
        <Body className="max-w-3xl">
          <strong style={strong}>Cookies et mesure d’audience.</strong> Ce site n’utilise aucune
          mesure d’audience (la carte de gpsjam.org décrite ci-dessus utilise la sienne, sans
          cookie), aucun cookie publicitaire ou de suivi, et ne procède à aucun profilage des
          visiteurs. Les polices et les images sont servies par ce site lui-même, sauf à
          l’intérieur de la carte tierce décrite ci-dessus. Seuls des cookies strictement
          nécessaires à la diffusion sécurisée du site peuvent être déposés par notre hébergeur.
          Aucun bandeau de consentement n’est donc requis&#8239;; si nous ajoutions une mesure
          d’audience, cette politique serait d’abord mise à jour et le consentement demandé
          lorsque la loi l’exige.
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Conservation et partage</Eyebrow>
        <H2 className="max-w-3xl mb-6">Combien de temps, et avec qui</H2>
        <Body className="max-w-3xl mb-4">
          Nous conservons les données des demandes le temps de traiter votre demande et la relation
          qui s’ensuit, et au plus trois ans après notre dernier échange&#8239;; nous les supprimons
          ensuite. Nous ne vendons pas de données personnelles. Elles peuvent être traitées par nos
          prestataires (hébergement, calcul et acheminement des courriels, nommés ci-dessus), qui
          agissent sur nos instructions. Certains d’entre eux opèrent hors de l’Union européenne,
          notamment aux États-Unis&#8239;; ces transferts reposent sur les garanties prévues par le
          RGPD, comme le cadre de protection des données UE-États-Unis (
          <span lang="en">EU-US Data Privacy Framework</span>) ou les clauses contractuelles types
          de la Commission européenne.
        </Body>
      </Prose>

      <Prose>
        <Eyebrow>Vos droits</Eyebrow>
        <H2 className="max-w-3xl mb-6">Accès, rectification, effacement</H2>
        <Body className="max-w-3xl mb-4">
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et d’effacement
          de vos données personnelles, du droit d’en limiter le traitement ou de vous y opposer,
          ainsi que du droit à la portabilité de vos données. Pour exercer ces droits, écrivez à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
            {CONTACT_EMAIL}
          </a>
          .
        </Body>
        <Body className="max-w-3xl">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
          réclamation à l’autorité française de protection des données, la CNIL (
          <a href="https://www.cnil.fr" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </Body>
      </Prose>

      <Prose>
        <Body className="max-w-3xl">
          Voir aussi nos{" "}
          <Link href="/fr/legal" style={{ color: "var(--accent)" }}>
            mentions légales
          </Link>
          . Cette politique peut être mise à jour&#8239;; la version en vigueur fait foi.
        </Body>
      </Prose>
    </main>
  );
}
