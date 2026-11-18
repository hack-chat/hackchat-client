/**
 * MessageFormatter configures the Remarkable rendering engine to parse and
 * transform raw chat messages into secure React components. It handles Markdown,
 * KaTeX math, syntax highlighting, spoiler tags, and image rendering, while
 * hooking into Redux to dynamically toggle these features based on user settings.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { linkify } from 'remarkable/linkify';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import katex from 'katex';

import { selectSettingsPageDomain } from '../../containers/SettingsPage/selectors';

import SpoilerWrapper from './SpoilerWrapper';

hljs.registerLanguage('javascript', javascript);

const Spoiler = ({ children }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <SpoilerWrapper
      onClick={(e) => {
        e.stopPropagation();
        setIsRevealed((prev) => !prev);
      }}
      $isRevealed={isRevealed}
      title={isRevealed ? '' : '👀'} /* lazy or genius? */
    >
      {children}
    </SpoilerWrapper>
  );
};

const MessageFormatter = new Remarkable('full', {
  html: false,
  xhtmlOut: false,
  breaks: true,
  langPrefix: '',
  linkTarget: '_blank',
  typographer: true,
  quotes: `""''`,
  doHighlight: true,
});

MessageFormatter.core.ruler.disable(['abbr']);
MessageFormatter.inline.ruler.disable(['sup']);

const isSafeHref = (href) =>
  typeof href === 'string' && DOMPurify.isValidAttribute('a', 'href', href);

const getDomainState = (urlStr, whitelist) => {
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase();
    const sortedWhitelist = [...whitelist].sort((a, b) => {
      const aLen = a.domain ? a.domain.length : 0;
      const bLen = b.domain ? b.domain.length : 0;

      return bLen - aLen;
    });

    const match = sortedWhitelist.find((d) => {
      if (!d.domain) return false;

      const dLower = d.domain.trim().toLowerCase();

      return host === dLower || host.endsWith(`.${dLower}`);
    });

    if (match && typeof match.state === 'number') {
      return match.state;
    }

    return 2;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('url error:', e);

    return 0;
  }
};

const MarkdownLink = ({ href, title, children }) => {
  const domainWhitelist = useSelector(
    (state) => selectSettingsPageDomain(state).domainWhitelist ?? [],
  );

  if (!isSafeHref(href)) {
    return <span>{children}</span>;
  }

  const domainState = getDomainState(href, domainWhitelist);

  if (domainState === 0) {
    return <span>{children}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      title={title || undefined}
      rel="noopener noreferrer"
      onClick={(e) => {
        if (domainState === 1) {
          e.stopPropagation();
        }
      }}
    >
      {children}
    </a>
  );
};

const MarkdownImage = ({ alt, src, title }) => {
  const domainWhitelist = useSelector(
    (state) => selectSettingsPageDomain(state).domainWhitelist ?? [],
  );

  if (!isSafeHref(src)) {
    return <span>{src}</span>;
  }

  const domainState = getDomainState(src, domainWhitelist);

  if (domainState === 0) {
    return <span>{alt || src || '\u00A0'}</span>;
  }

  if (domainState === 1) {
    return (
      <a
        href={src}
        target="_blank"
        title={title || alt}
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} referrerPolicy="no-referrer" />
      </a>
    );
  }

  const fallbackText = alt || src;

  return (
    <a
      href={src}
      target="_blank"
      title={title || fallbackText}
      rel="noopener noreferrer"
    >
      {fallbackText}
    </a>
  );
};

const KatexInlineComponent = ({ content }) => {
  const allowKatex = useSelector(
    (state) => selectSettingsPageDomain(state).allowKatex ?? true,
  );

  const isCurrency =
    /^\d+$/.test(content.trim()) || /^\s/.test(content) || /\s$/.test(content);

  if (!allowKatex || isCurrency) return <span>${content}$</span>;

  try {
    const html = katex.renderToString(content, {
      displayMode: false,
      throwOnError: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <span>${content}$</span>;
  }
};

const KatexBlockComponent = ({ content }) => {
  const allowKatex = useSelector(
    (state) => selectSettingsPageDomain(state).allowKatex ?? true,
  );
  if (!allowKatex) return <span>$${content}$$</span>;

  try {
    const html = katex.renderToString(content, {
      displayMode: true,
      throwOnError: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <span>$${content}$$</span>;
  }
};

const ExternalCodeComponent = ({ content, params: language }) => {
  if (language && hljs.getLanguage(language)) {
    try {
      return (
        <pre
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              hljs.highlight(content, { language }).value,
            ),
          }}
        />
      );
    } catch (__) {
      // eslint-disable-next-line no-console
      console.log(__);
    }
  }

  try {
    return (
      <pre
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(hljs.highlightAuto(content).value),
        }}
      />
    );
  } catch (__) {
    // eslint-disable-next-line no-console
    console.log(__);
  }

  return '';
};

const MarkdownElement = ({
  tag: Tag,
  prefix = '',
  suffix = '',
  children,
  ...props
}) => {
  const allowMarkdown = useSelector(
    (state) => selectSettingsPageDomain(state).allowMarkdown ?? true,
  );

  if (!allowMarkdown) {
    return (
      <span>
        {prefix}
        {children}
        {suffix}
      </span>
    );
  }

  return <Tag {...props}>{children}</Tag>;
};

MessageFormatter.renderer = new RemarkableReactRenderer({
  components: {
    a: (props) => <MarkdownElement tag={MarkdownLink} {...props} />,
    img: (props) => <MarkdownElement tag={MarkdownImage} {...props} />,
    pre: (props) => <MarkdownElement tag={ExternalCodeComponent} {...props} />,
    katex_block: KatexBlockComponent,
    katex_inline: KatexInlineComponent,
    spoiler: ({ children }) => <Spoiler>{children}</Spoiler>,
    strong: (props) => (
      <MarkdownElement tag="strong" prefix="**" suffix="**" {...props} />
    ),
    em: (props) => (
      <MarkdownElement tag="em" prefix="*" suffix="*" {...props} />
    ),
    del: (props) => (
      <MarkdownElement tag="del" prefix="~~" suffix="~~" {...props} />
    ),
    h1: (props) => <MarkdownElement tag="h1" prefix="# " {...props} />,
    h2: (props) => <MarkdownElement tag="h2" prefix="## " {...props} />,
    h3: (props) => <MarkdownElement tag="h3" prefix="### " {...props} />,
    h4: (props) => <MarkdownElement tag="h4" prefix="#### " {...props} />,
    h5: (props) => <MarkdownElement tag="h5" prefix="##### " {...props} />,
    h6: (props) => <MarkdownElement tag="h6" prefix="###### " {...props} />,
    blockquote: (props) => (
      <MarkdownElement tag="blockquote" prefix="> " {...props} />
    ),
    code: (props) => (
      <MarkdownElement tag="code" prefix={'`'} suffix={'`'} {...props} />
    ),
    p: ({ children }) => {
      const alteredChildren = [];
      for (let i = 0, j = children.length; i < j; i += 1) {
        if (typeof children[i] === 'string') {
          if (children[i].indexOf('?') !== -1) {
            const chunks = children[i].split(/(^|\s)(\?\S+)/gm);
            for (let k = 0, l = chunks.length; k < l; k += 1) {
              const chunk = chunks[k];

              if (!chunk) continue;

              if (chunk.startsWith('?') && !/\s/.test(chunk)) {
                const trailingPunctuationMatch = chunk.match(/([.,;:!"']+)$/);
                let cleanChannel = chunk;
                let trailingPunctuation = '';

                if (trailingPunctuationMatch) {
                  trailingPunctuation = trailingPunctuationMatch[1];
                  cleanChannel = chunk.slice(0, -trailingPunctuation.length);
                }

                if (cleanChannel.length > 1 && /[^?]/.test(cleanChannel)) {
                  const key = `invite-${i}-${k}`;
                  alteredChildren.push(
                    <Link key={key} to={`/${cleanChannel}`}>
                      {cleanChannel}
                    </Link>,
                  );

                  if (trailingPunctuation) {
                    alteredChildren.push(trailingPunctuation);
                  }
                } else {
                  alteredChildren.push(chunk);
                }
              } else {
                alteredChildren.push(chunk);
              }
            }
          } else {
            alteredChildren.push(children[i]);
          }
        } else {
          alteredChildren.push(children[i]);
        }
      }

      return <p>{alteredChildren}</p>;
    },
  },
});

// eslint-disable-next-line react-hooks/rules-of-hooks
MessageFormatter.use(linkify);

MessageFormatter.renderer.options.tokens.katex_block = 'katex_block';
MessageFormatter.renderer.options.tokens.katex_inline = 'katex_inline';
MessageFormatter.renderer.options.tokens.spoiler = 'spoiler';

const katexRule = ({ src, tokens }) => {
  if (src.indexOf('$') === -1) return;

  for (let i = 0, j = tokens.length; i < j; i += 1) {
    if (tokens[i].type === 'inline') {
      tokens[i].children = parseKatex(tokens[i].children);
    }
  }
};

const spoilerRule = ({ src, tokens }) => {
  if (src.indexOf('||') === -1) return;

  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i].type === 'inline') {
      tokens[i].children = parseSpoiler(tokens[i].children);
    }
  }
};

const parseSpoiler = (children) => {
  const newChildren = [];
  const delimiter = '||';

  let inSpoiler = false;
  let spoilerChildren = [];
  let buffer = '';

  const pushBuffer = (targetArray) => {
    if (buffer !== '') {
      targetArray.push({ type: 'text', content: buffer });
      buffer = '';
    }
  };

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'text') {
      const content = child.content;
      let start = 0;
      let idx = content.indexOf(delimiter);

      while (idx !== -1) {
        buffer += content.slice(start, idx);
        pushBuffer(inSpoiler ? spoilerChildren : newChildren);

        if (inSpoiler) {
          newChildren.push({ type: 'spoiler', children: spoilerChildren });
          spoilerChildren = [];
          inSpoiler = false;
        } else {
          inSpoiler = true;
        }

        start = idx + 2;
        idx = content.indexOf(delimiter, start);
      }

      buffer += content.slice(start);
      pushBuffer(inSpoiler ? spoilerChildren : newChildren);
    } else {
      pushBuffer(inSpoiler ? spoilerChildren : newChildren);
      if (inSpoiler) {
        spoilerChildren.push(child);
      } else {
        newChildren.push(child);
      }
    }
  }

  if (inSpoiler) {
    newChildren.push({ type: 'text', content: delimiter });
    newChildren.push(...spoilerChildren);
  }

  return newChildren;
};

const parseKatex = (children) => {
  if (!children || !Array.isArray(children)) return children;

  let buffer = '';
  const katexDelim = '$';
  let inBlock = false;
  let inInline = false;
  const newChildren = [];
  let pendingNonTextTokens = [];

  for (let i = 0, j = children.length; i < j; i += 1) {
    const child = children[i];

    if (child.type === 'text') {
      const content = child.content || '';

      for (let o = 0, p = content.length; o < p; o += 1) {
        const char = content.charAt(o);

        if (char === katexDelim) {
          if (inBlock) {
            if (o + 1 < p && content.charAt(o + 1) === katexDelim) {
              newChildren.push({ type: 'katex_block', content: buffer });
              buffer = '';
              o += 1;
              inBlock = false;
              pendingNonTextTokens = [];
            } else {
              buffer += char;
            }
          } else if (inInline) {
            newChildren.push({ type: 'katex_inline', content: buffer });
            buffer = '';
            inInline = false;
            pendingNonTextTokens = [];
          } else {
            if (buffer !== '') {
              newChildren.push({ type: 'text', content: buffer });
              buffer = '';
            }

            if (o + 1 < p && content.charAt(o + 1) === katexDelim) {
              inBlock = true;
              o += 1;
            } else {
              inInline = true;
            }
          }
        } else {
          buffer += char;
        }
      }

      if (!inBlock && !inInline && buffer !== '') {
        newChildren.push({ type: 'text', content: buffer });
        buffer = '';
      }
    } else if (child.type === 'hardbreak' && (inBlock || inInline)) {
      buffer += ' \\\\ ';
    } else if (inBlock || inInline) {
      pendingNonTextTokens.push(child);
    } else {
      newChildren.push(child);
    }
  }

  if (inBlock) {
    newChildren.push({ type: 'text', content: `$$${buffer}` });
    newChildren.push(...pendingNonTextTokens);
  } else if (inInline) {
    newChildren.push({ type: 'text', content: `$${buffer}` });
    newChildren.push(...pendingNonTextTokens);
  }

  return newChildren;
};

MessageFormatter.core.ruler.push('katex', katexRule);
MessageFormatter.core.ruler.push('spoiler', spoilerRule);

export default MessageFormatter;
