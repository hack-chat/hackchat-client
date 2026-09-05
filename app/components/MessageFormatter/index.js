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
import { InlineMath, BlockMath } from 'react-katex';

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

const MarkdownImage = ({ alt, src, title }) => {
  const loadSafe = useSelector(
    (state) => selectSettingsPageDomain(state).loadSafeImages ?? true,
  );
  const loadUnsafe = useSelector(
    (state) => selectSettingsPageDomain(state).loadUnsafeImages ?? false,
  );

  let isSafeHost = false;
  try {
    const url = new URL(src);
    const host = url.hostname;
    const whitelist = [
      'i.imgur.com',
      'imgur.com',
      'share.lyka.pro',
      'cdn.discordapp.com',
      'i.gyazo.com',
      'i.postimg.cc',
      'i.ytimg.com',
      'i.ibb.co',
      'giphy.com',
    ];

    if (whitelist.includes(host) || host.endsWith('.giphy.com')) {
      isSafeHost = true;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('url error:', e);
    isSafeHost = false;
  }

  const shouldRenderImage = loadUnsafe || (loadSafe && isSafeHost);

  if (shouldRenderImage) {
    const html = `<a href="${src}" target="_blank" title="${
      title || alt
    }" rel="noopener noreferrer"><img src="${src}" alt="${alt}" referrerpolicy="no-referrer" /></a>`;
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(html, {
            ADD_ATTR: ['target', 'referrerpolicy'],
          }),
        }}
      />
    );
  }

  const fallbackText = alt || src;
  const html = `<a href="${src}" target="_blank" title="${
    title || fallbackText
  }" rel="noopener noreferrer">${src}</a>`;

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
      }}
    />
  );
};

const KatexInlineComponent = ({ content }) => {
  const allowKatex = useSelector(
    (state) => selectSettingsPageDomain(state).allowKatex ?? true,
  );
  if (!allowKatex) return <span>${content}$</span>;
  return <InlineMath>{content}</InlineMath>;
};

const KatexBlockComponent = ({ content }) => {
  const allowKatex = useSelector(
    (state) => selectSettingsPageDomain(state).allowKatex ?? true,
  );
  if (!allowKatex) return <span>$${content}$$</span>;
  return <BlockMath>{content}</BlockMath>;
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

const MarkdownElement = ({ tag: Tag, prefix = '', suffix = '', children }) => {
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

  return <Tag>{children}</Tag>;
};

MessageFormatter.renderer = new RemarkableReactRenderer({
  components: {
    a: ({ href, title, children }) => {
      const html = `<a href="${href}" target="_blank" title="${title}" rel="noopener noreferrer">${children}</a>`;

      return (
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
          }}
        />
      );
    },
    img: MarkdownImage,
    pre: ExternalCodeComponent,
    katex_block: KatexBlockComponent,
    katex_inline: KatexInlineComponent,
    spoiler: ({ content }) => <Spoiler>{content}</Spoiler>,
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
      <MarkdownElement tag="code" prefix="\`" suffix="\`" {...props} />
    ),
    p: ({ children }) => {
      const alteredChildren = [];
      for (let i = 0, j = children.length; i < j; i += 1) {
        if (typeof children[i] === 'string') {
          if (children[i].indexOf('?') !== -1) {
            const chunks = children[i].split(/(\?\S*)/gm);
            for (let k = 0, l = chunks.length; k < l; k += 1) {
              const chunk = chunks[k];
              const isChannelLink =
                chunk.startsWith('?') &&
                chunk.length > 1 &&
                /[^?.,;:!"']/.test(chunk);

              if (isChannelLink) {
                const key = `invite-${Math.random() * 9999}`;
                alteredChildren.push(
                  <Link key={key} to={`/${DOMPurify.sanitize(chunk)}`}>
                    {DOMPurify.sanitize(chunk)}
                  </Link>,
                );
              } else if (chunk !== '') {
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

  for (let i = 0, j = tokens.length; i < j; i += 1) {
    if (tokens[i].type === 'inline') {
      tokens[i].children = parseSpoiler(tokens[i].children);
    }
  }
};

const parseSpoiler = (children) => {
  const newChildren = [];
  const delimiter = '||';

  for (let i = 0, j = children.length; i < j; i += 1) {
    if (children[i].type === 'text') {
      const content = children[i].content;
      const parts = content.split(delimiter);

      if (parts.length === 1) {
        newChildren.push(children[i]);
        continue;
      }

      for (let k = 0; k < parts.length; k += 1) {
        if (k % 2 === 1) {
          newChildren.push({
            type: 'spoiler',
            content: parts[k],
          });
        } else {
          if (parts[k] !== '') {
            newChildren.push({
              type: 'text',
              content: parts[k],
            });
          }
        }
      }
    } else {
      newChildren.push(children[i]);
    }
  }

  return newChildren;
};

const parseKatex = (children) => {
  let buffer = '';
  let content = '';
  let char = '';
  const katexDelim = '$';
  let inBlock = false;
  let inInline = false;
  const newChildren = [];

  for (let i = 0, j = children.length; i < j; i += 1) {
    if (children[i].type === 'text') {
      content = children[i].content;
      for (let o = 0, p = content.length; o <= p; o += 1) {
        char = content.charAt(o);
        if (o === p && inInline === false && inBlock === false) {
          if (buffer !== '') {
            newChildren.push({
              type: 'text',
              content: buffer,
            });

            buffer = '';
          }
        }
        if (char === katexDelim) {
          if (inBlock) {
            newChildren.push({
              type: 'katex_block',
              content: buffer,
            });

            buffer = '';
            o += 1;
            inBlock = false;
          } else if (inInline) {
            newChildren.push({
              type: 'katex_inline',
              content: buffer,
            });

            buffer = '';
            inInline = false;
          } else {
            newChildren.push({
              type: 'text',
              content: buffer,
            });

            buffer = '';

            if (content.charAt(o + 1) === katexDelim) {
              o += 1;
              inBlock = true;
            } else {
              inInline = true;
            }
          }
        } else {
          buffer += char;
        }
      }
    } else if (children[i].type === 'hardbreak' && (inBlock || inInline)) {
      buffer += ' \\\\ ';
    } else if (inBlock === false && inInline === false) {
      newChildren.push(children[i]);
    }
  }

  return newChildren;
};

MessageFormatter.core.ruler.push('katex', katexRule);
MessageFormatter.core.ruler.push('spoiler', spoilerRule);

export default MessageFormatter;
