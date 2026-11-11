import type { Metadata } from "next";
import NotFoundPage, { NOT_FOUND_METADATA } from "../components/NotFoundPage";

export const metadata: Metadata = NOT_FOUND_METADATA;

/** The 404 page is written in English: inside a French document, its block says so. */
export default function FrenchNotFound() {
  return (
    <div lang="en">
      <NotFoundPage />
    </div>
  );
}
