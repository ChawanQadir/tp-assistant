// Framework registry — the single place where framework documents are registered.
// To add a new framework:
//   1. Create lib/frameworks/<id>.ts with data only.
//   2. Import it here and add it to ALL_FRAMEWORKS.
//   No other file needs to change.

import type { FrameworkDocument } from "./types";
import irc482 from "./irc-482";
// import oecd from "./oecd-guidelines";
// import beps810 from "./beps-8-10";
// import coso from "./coso";
// import unTpManual from "./un-tp-manual";

export const ALL_FRAMEWORKS: FrameworkDocument[] = [
  irc482,
  // oecd,
  // beps810,
  // coso,
  // unTpManual,
];

export const FRAMEWORK_MAP = new Map<string, FrameworkDocument>(
  ALL_FRAMEWORKS.map((fw) => [fw.id, fw])
);
