import { defineConfig } from 'astro/config';

const slugifyHeading = (value = '') => String(value)
  .toLocaleLowerCase('ru-RU')
  .trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '') || 'section';

function nodeText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(nodeText).join('');
}

function reviewedMarkdownEnhancements() {
  return (tree) => {
    const headingCounts = new Map();

    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName || '')) {
        const base = slugifyHeading(nodeText(node));
        const seen = (headingCounts.get(base) || 0) + 1;
        headingCounts.set(base, seen);
        node.properties ||= {};
        node.properties.id = seen === 1 ? base : `${base}-${seen}`;
      }

      if (node.type === 'element' && node.tagName === 'a') {
        const href = String(node.properties?.href || '');
        if (/^https?:\/\//i.test(href)) {
          node.properties ||= {};
          const existing = Array.isArray(node.properties.rel)
            ? node.properties.rel
            : String(node.properties.rel || '').split(/\s+/).filter(Boolean);
          node.properties.rel = [...new Set([...existing, 'noopener'])];
        }
      }

      for (const child of node.children || []) visit(child);
    };

    visit(tree);
  };
}

export default defineConfig({
  markdown: {
    rehypePlugins: [reviewedMarkdownEnhancements]
  }
});
