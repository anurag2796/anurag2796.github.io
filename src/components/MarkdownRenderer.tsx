import { useMemo } from "react";

const KYBER = "#00C8FF";
const SITH = "#FF1744";
const GOLD = "#FFE81F";
const GREEN = "#2EF8A0";
const ORBITRON = "'Orbitron', sans-serif";
const INTER = "'Inter', system-ui, sans-serif";

// ─── Slugify (must match extractToc in ProjectPage) ───────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_[\](){}#!]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// ─── Syntax Highlighter ───────────────────────────────────────────────────────
const KEYWORDS = new Set([
  "const", "let", "var", "function", "class", "extends", "import", "export",
  "default", "from", "return", "if", "elif", "else", "for", "while", "do",
  "switch", "case", "break", "continue", "new", "this", "typeof", "instanceof",
  "in", "of", "try", "catch", "finally", "throw", "async", "await", "yield",
  "interface", "type", "enum", "namespace", "declare", "abstract", "readonly",
  "def", "with", "as", "pass", "lambda", "and", "or", "not", "is", "True",
  "False", "None", "global", "nonlocal", "del", "raise", "except",
  "true", "false", "null", "undefined", "void", "any", "static",
  "public", "private", "protected", "self", "super", "require", "module",
]);

function tokenizeLine(line: string): React.ReactNode[] {
  const TOKEN_RE =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\/\/.*|#\s.*|--.*|\b\d+\.?\d*\b|[a-zA-Z_$][\w$]*|.)/g;
  const nodes: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    const token = match[0];
    let color = "rgba(200,208,220,0.75)";

    if (token.startsWith("//") || token.startsWith("# ") || token.startsWith("--")) {
      color = "rgba(255,255,255,0.28)";
    } else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      color = GREEN;
    } else if (/^\d/.test(token)) {
      color = GOLD;
    } else if (KEYWORDS.has(token)) {
      color = SITH;
    } else if (/^[a-zA-Z_$][\w$]*$/.test(token)) {
      const rest = line.slice((match.index ?? 0) + token.length).trimStart();
      color = rest.startsWith("(") ? KYBER : "#E8EAED";
    }

    nodes.push(
      <span key={k++} style={{ color }}>
        {token}
      </span>
    );
  }
  return nodes;
}

function SyntaxBlock({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const lines = code.split("\n");
  return (
    <div
      style={{
        position: "relative",
        marginBottom: 28,
        borderRadius: "0 10px 10px 0",
        overflow: "hidden",
        border: "1px solid rgba(0,200,255,0.12)",
        borderLeft: `3px solid ${KYBER}`,
        boxShadow: `0 0 30px rgba(0,200,255,0.06), inset 0 0 60px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "rgba(0,200,255,0.05)",
          borderBottom: "1px solid rgba(0,200,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[SITH, GOLD, GREEN].map((c) => (
            <div
              key={c}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: c,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.55rem",
            color: "rgba(0,200,255,0.4)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {lang || "CODE"} // TERMINAL
        </span>
      </div>

      {/* Code content */}
      <pre
        style={{
          margin: 0,
          padding: "18px 20px",
          overflowX: "auto",
          background: "rgba(1,2,10,0.85)",
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(0,200,255,0.15) transparent`,
        }}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: "0.82rem",
            lineHeight: 1.85,
          }}
        >
          {lines.map((line, li) => (
            <div key={li} style={{ display: "flex" }}>
              {/* Line number */}
              <span
                style={{
                  color: "rgba(0,200,255,0.2)",
                  userSelect: "none",
                  minWidth: 36,
                  marginRight: 16,
                  textAlign: "right",
                  fontSize: "0.75rem",
                  paddingTop: 1,
                }}
              >
                {li + 1}
              </span>
              {/* Syntax-highlighted line */}
              <span style={{ flex: 1, whiteSpace: "pre" }}>
                {tokenizeLine(line)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

// ─── Inline parser: bold, italic, code, links ─────────────────────────────────
function parseInline(text: string): React.ReactNode[] {
  const pattern =
    /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[2]) {
      nodes.push(
        <strong key={key++} style={{ color: "#C8D0DC", fontWeight: 700 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      nodes.push(
        <em key={key++} style={{ color: "#8892A4", fontStyle: "italic" }}>
          {match[3]}
        </em>
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={key++}
          style={{
            fontFamily: "monospace",
            fontSize: "0.85em",
            color: KYBER,
            background: "rgba(0,200,255,0.08)",
            padding: "2px 7px",
            borderRadius: 4,
            border: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          {match[4]}
        </code>
      );
    } else if (match[5] && match[6]) {
      nodes.push(
        <a
          key={key++}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: KYBER,
            textDecoration: "none",
            borderBottom: "1px solid rgba(0,200,255,0.3)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = KYBER)}
        >
          {match[5]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.length > 0 ? nodes : [text];
}

// ─── Block tokenizer ──────────────────────────────────────────────────────────
type Token =
  | { type: "h1" | "h2" | "h3" | "h4"; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "blockquote"; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }
  | { type: "img"; src: string; alt: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "p"; text: string }
  | { type: "blank" };

function tokenize(md: string): Token[] {
  const lines = md.split("\n");
  const tokens: Token[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { tokens.push({ type: "blank" }); i++; continue; }
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) { tokens.push({ type: "hr" }); i++; continue; }

    const h1 = line.match(/^# (.*)/);
    if (h1) { tokens.push({ type: "h1", text: h1[1] }); i++; continue; }
    const h2 = line.match(/^## (.*)/);
    if (h2) { tokens.push({ type: "h2", text: h2[1] }); i++; continue; }
    const h3 = line.match(/^### (.*)/);
    if (h3) { tokens.push({ type: "h3", text: h3[1] }); i++; continue; }
    const h4 = line.match(/^#### (.*)/);
    if (h4) { tokens.push({ type: "h4", text: h4[1] }); i++; continue; }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { codeLines.push(lines[i]); i++; }
      i++;
      tokens.push({ type: "code", lang, text: codeLines.join("\n") });
      continue;
    }

    if (line.startsWith("> ")) {
      const bqLines: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) { bqLines.push(lines[i].slice(2)); i++; }
      tokens.push({ type: "blockquote", lines: bqLines });
      continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [line.replace(/^[-*+]\s+/, "")];
      i++;
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*+]\s+/, "")); i++; }
      tokens.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [line.replace(/^\d+\.\s+/, "")];
      i++;
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, "")); i++; }
      tokens.push({ type: "ol", items });
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) { tokens.push({ type: "img", alt: imgMatch[1], src: imgMatch[2] }); i++; continue; }

    if (line.includes("|") && lines[i + 1]?.match(/^\|?[\s\-:]+\|/)) {
      const headers = line.split("|").map((s) => s.trim()).filter(Boolean);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map((s) => s.trim()).filter(Boolean));
        i++;
      }
      tokens.push({ type: "table", headers, rows });
      continue;
    }

    const pLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !/^[-*+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !lines[i].startsWith("|")
    ) {
      pLines.push(lines[i]);
      i++;
    }
    tokens.push({ type: "p", text: pLines.join(" ") });
  }
  return tokens;
}

// ─── Renderer ─────────────────────────────────────────────────────────────────
function renderTokens(tokens: Token[]): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let key = 0;

  for (const token of tokens) {
    switch (token.type) {
      case "blank":
        break;

      case "hr":
        nodes.push(
          <div
            key={key++}
            style={{
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(0,200,255,0.3), transparent)",
              margin: "36px 0",
            }}
          />
        );
        break;

      case "h1":
        nodes.push(
          <h1
            key={key++}
            id={slugify(token.text)}
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
              color: "#E8EAED",
              borderBottom: "1px solid rgba(0,200,255,0.18)",
              paddingBottom: 12,
              marginBottom: 20,
              marginTop: 40,
              letterSpacing: "0.05em",
              scrollMarginTop: 100,
            }}
          >
            {parseInline(token.text)}
          </h1>
        );
        break;

      case "h2":
        nodes.push(
          <h2
            key={key++}
            id={slugify(token.text)}
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)",
              color: "#C8D0DC",
              borderLeft: `3px solid ${KYBER}`,
              paddingLeft: 16,
              marginBottom: 14,
              marginTop: 36,
              letterSpacing: "0.04em",
              scrollMarginTop: 100,
            }}
          >
            {parseInline(token.text)}
          </h2>
        );
        break;

      case "h3":
        nodes.push(
          <h3
            key={key++}
            id={slugify(token.text)}
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#8892A4",
              marginBottom: 10,
              marginTop: 24,
              scrollMarginTop: 100,
            }}
          >
            {parseInline(token.text)}
          </h3>
        );
        break;

      case "h4":
        nodes.push(
          <h4
            key={key++}
            id={slugify(token.text)}
            style={{
              fontFamily: INTER,
              fontSize: "0.95rem",
              color: "#8892A4",
              marginBottom: 8,
              marginTop: 20,
              scrollMarginTop: 100,
            }}
          >
            {parseInline(token.text)}
          </h4>
        );
        break;

      case "p": {
        if (!token.text.trim()) break;
        const imgInPara = token.text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgInPara) {
          nodes.push(
            <img
              key={key++}
              src={imgInPara[2]}
              alt={imgInPara[1]}
              style={{
                maxWidth: "100%",
                borderRadius: 8,
                border: "1px solid rgba(0,200,255,0.1)",
                marginBottom: 20,
                marginTop: 8,
                display: "block",
              }}
            />
          );
          break;
        }
        nodes.push(
          <p
            key={key++}
            style={{
              fontFamily: INTER,
              fontSize: "0.93rem",
              color: "#8892A4",
              lineHeight: 1.85,
              marginBottom: 16,
            }}
          >
            {parseInline(token.text)}
          </p>
        );
        break;
      }

      case "code":
        nodes.push(<SyntaxBlock key={key++} code={token.text} lang={token.lang} />);
        break;

      case "blockquote":
        nodes.push(
          <div
            key={key++}
            style={{
              position: "relative",
              borderLeft: `4px solid ${SITH}`,
              margin: "28px 0",
              background: "rgba(255,23,68,0.04)",
              borderRadius: "0 10px 10px 0",
              padding: "0 0 0 0",
              overflow: "hidden",
            }}
          >
            {/* Transmission header */}
            <div
              style={{
                padding: "8px 20px",
                background: "rgba(255,23,68,0.08)",
                borderBottom: "1px solid rgba(255,23,68,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: SITH,
                  animation: "pulse 1.4s ease-in-out infinite",
                  boxShadow: `0 0 8px ${SITH}`,
                }}
              />
              <span
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.5rem",
                  color: `${SITH}aa`,
                  letterSpacing: "0.25em",
                }}
              >
                // ENCRYPTED TRANSMISSION
              </span>
            </div>
            <div style={{ padding: "14px 20px 16px" }}>
              {token.lines.map((l, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: INTER,
                    fontSize: "0.93rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    margin: j < token.lines.length - 1 ? "0 0 8px" : 0,
                  }}
                >
                  {parseInline(l)}
                </p>
              ))}
            </div>
          </div>
        );
        break;

      case "ul":
        nodes.push(
          <ul key={key++} style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
            {token.items.map((item, j) => (
              <li
                key={j}
                style={{
                  fontFamily: INTER,
                  fontSize: "0.93rem",
                  color: "#8892A4",
                  lineHeight: 1.75,
                  marginBottom: 7,
                  paddingLeft: 22,
                  position: "relative",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0,
                }}
              >
                {/* Imperial rank cylinder bullet */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.45em",
                    display: "inline-block",
                    width: 10,
                    height: 5,
                    borderRadius: 2,
                    background: KYBER,
                    boxShadow: `0 0 6px ${KYBER}80`,
                    flexShrink: 0,
                  }}
                />
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
        break;

      case "ol":
        nodes.push(
          <ol key={key++} style={{ paddingLeft: 24, margin: "0 0 18px" }}>
            {token.items.map((item, j) => (
              <li
                key={j}
                style={{
                  fontFamily: INTER,
                  fontSize: "0.93rem",
                  color: "#8892A4",
                  lineHeight: 1.75,
                  marginBottom: 7,
                }}
              >
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
        break;

      case "img":
        nodes.push(
          <img
            key={key++}
            src={token.src}
            alt={token.alt}
            style={{
              maxWidth: "100%",
              borderRadius: 8,
              border: "1px solid rgba(0,200,255,0.1)",
              marginBottom: 20,
              marginTop: 8,
              display: "block",
            }}
          />
        );
        break;

      case "table":
        nodes.push(
          <div key={key++} style={{ overflowX: "auto", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: INTER, fontSize: "0.88rem" }}>
              <thead>
                <tr>
                  {token.headers.map((h, j) => (
                    <th
                      key={j}
                      style={{
                        padding: "10px 16px",
                        background: "rgba(0,200,255,0.07)",
                        border: "1px solid rgba(0,200,255,0.14)",
                        color: KYBER,
                        fontFamily: ORBITRON,
                        fontSize: "0.68rem",
                        letterSpacing: "0.1em",
                        textAlign: "left",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {token.rows.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        style={{
                          padding: "10px 16px",
                          border: "1px solid rgba(0,200,255,0.07)",
                          color: "#8892A4",
                          background: j % 2 === 0 ? "transparent" : "rgba(0,200,255,0.02)",
                        }}
                      >
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        break;
    }
  }
  return nodes;
}

// ─── Public component ──────────────────────────────────────────────────────────
export function MarkdownRenderer({ content }: { content: string }) {
  const nodes = useMemo(() => {
    if (!content) return [];
    return renderTokens(tokenize(content));
  }, [content]);

  if (!content) return null;
  return <div style={{ color: "#8892A4" }}>{nodes}</div>;
}