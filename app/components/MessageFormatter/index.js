import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { linkify } from 'remarkable/linkify';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { InlineMath, BlockMath } from 'react-katex';

hljs.registerLanguage('javascript', javascript);

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
    img: ({ alt, src, title }) => {
      const html = `<a href="${src}" target="_blank" title="${
        title || alt
      }" rel="noopener noreferrer">${src}</a>`;

      return (
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
          }}
        />
      );
    },
    table: ({ children }) => (
      <Table dark striped>
        {children}
      </Table>
    ),
    p: ({ children }) => {
      const alteredChildren = [];
      for (let i = 0, j = children.length; i < j; i += 1) {
        if (typeof children[i] === 'string') {
          if (children[i].indexOf('?') !== -1) {
            const chunks = children[i].split(/(\?\S*)/gm);
            for (let k = 0, l = chunks.length; k < l; k += 1) {
              if (chunks[k][0] === '?') {
                const key = `invite-${Math.random() * 9999}`;
                alteredChildren.push(
                  <Link key={key} to={`/${DOMPurify.sanitize(chunks[k])}`}>
                    {DOMPurify.sanitize(chunks[k])}
                  </Link>,
                );
              } else if (chunks[k] !== '') {
                alteredChildren.push(chunks[k]);
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
    pre: ({ content, params: language }) => {
      if (hljs.getLanguage(language)) {
        try {
          return (
            <pre
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(language, content).value,
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
              __html: hljs.highlightAuto(content).value,
            }}
          />
        );
      } catch (__) {
        // eslint-disable-next-line no-console
        console.log(__);
      }

      return '';
    },
    katex_block: (token) => <BlockMath>{token.content}</BlockMath>,
    katex_inline: (token) => <InlineMath>{token.content}</InlineMath>,
  },
});

// eslint-disable-next-line react-hooks/rules-of-hooks
MessageFormatter.use(linkify);

MessageFormatter.renderer.options.tokens.katex_block = 'katex_block';
MessageFormatter.renderer.options.tokens.katex_inline = 'katex_inline';

const katexRule = ({ src, tokens }) => {
  if (src.indexOf('$') === -1) return;

  for (let i = 0, j = tokens.length; i < j; i += 1) {
    if (tokens[i].type === 'inline') {
      tokens[i].children = parseKatex(tokens[i].children);
    }
  }
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

export default MessageFormatter;
