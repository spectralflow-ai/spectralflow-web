import type { ReactNode } from "react";

/** Every page under /fr is in French: the language is declared on its content. */
export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <div lang="fr">{children}</div>;
}
