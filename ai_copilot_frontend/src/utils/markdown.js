function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Basic fenced code block parsing: ```lang ... ```
function parseFencedCodeBlocks(text) {
  const fenceRegex = /```(\w+)?\n([\s\S]*?)```/g;
  return text.replace(fenceRegex, (_, lang = '', code = '') => {
    const safe = escapeHtml(code.trimEnd());
    const languageClass = lang ? ` language-${lang}` : '';
    return `<pre class="code-block"><code class="hljs${languageClass}">${safe}</code></pre>`;
  });
}

function parseInlineCode(text) {
  return text.replace(/`([^`]+?)`/g, (_, code) => `<code class="inline-code">${escapeHtml(code)}</code>`);
}

function parseBoldItalics(text) {
  // bold: **text** ; italics: *text*
  const bold = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const ital = bold.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return ital;
}

function parseParagraphs(text) {
  const parts = text.split(/\n{2,}/).map(block => {
    // Lists or headings could be added later; for now wrap in <p> if not a code block already
    if (block.trim().startsWith('<pre')) {
      return block;
    }
    const lines = block.split('\n').map(l => l.trim()).join('<br/>');
    return `<p>${lines}</p>`;
  });
  return parts.join('\n');
}

/**
 * PUBLIC_INTERFACE
 * renderMarkdown
 * Simple markdown to HTML rendering with basic code support.
 */
export function renderMarkdown(input = '') {
  const escaped = escapeHtml(input);
  const withFenced = parseFencedCodeBlocks(escaped);
  const withInline = parseInlineCode(withFenced);
  const withText = parseBoldItalics(withInline);
  return parseParagraphs(withText);
}
