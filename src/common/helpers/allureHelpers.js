// src/common/helpers/allureHelpers.js
import { camelCaseToPhrase, capitalize } from './stringHelpers.js';

export function parseTestTreeHierarchy(fileName, logger) {
  if (!fileName) return [];

  // normalize separators for Windows/*nix
  const normalized = String(fileName).replace(/\\/g, '/');

  // robustly take the part after "/tests/"
  const testsMatch = /\/tests(?:\/|$)/i.exec(normalized);
  const afterTests = testsMatch
    ? normalized.slice(testsMatch.index + testsMatch[0].length)
    : normalized;

  // split into raw path parts
  let parts = afterTests.split('/').filter(Boolean);

  // drop spec/test file if present — use the raw last segment, not humanized
  const lastSegment = parts[parts.length - 1] || '';
  if (/\.(spec|test)\.(t|j)sx?$/i.test(lastSegment)) {
    parts = parts.slice(0, -1);
  }

  // now humanize remaining parts
  const attributes = parts.map((p) => capitalize(camelCaseToPhrase(p)));

  logger?.debug?.(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);
  return attributes;
}