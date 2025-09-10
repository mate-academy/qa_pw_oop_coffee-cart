import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const TEST_FOLDER = '/tests/';

  // Normalize path separators so this works on Windows and *nix
  const normalized = String(fileName).replace(/\\/g, '/');

  // Get the part after "/tests/" if present; otherwise use the whole path
  const afterTests = normalized.includes(TEST_FOLDER)
    ? normalized.split(TEST_FOLDER)[1]
    : normalized;

  // Split into path segments
  const parts = afterTests.split('/').filter(Boolean);

  // Convert to nice phrases
  let attributes = parts.map((p) => capitalize(camelCaseToPhrase(p)));

  // If the last segment is a spec/test file, drop it from the hierarchy
  const last = attributes[attributes.length - 1] || '';
  if (/\.(spec|test)\.(t|j)sx?$/i.test(last.replace(/\s+/g, ''))) {
    attributes = attributes.slice(0, -1);
  }

  logger?.debug?.(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);
  return attributes;
}