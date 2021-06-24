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

MessageFormatter.renderer = new RemarkableReactRenderer({
  components: {
    a: ({ href, title, children }) => {
      const html = `<a href="${href}" target="_blank" title="${title}" rel="noopener noreferrer">${children}</a>`;

      return (
        <span
          // eslint-disable-next-line react/no-danger
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
          // eslint-disable-next-line react/no-danger
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
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(language, content).value,
              }}
            />
          );
        } catch (__) {
          // Yolo error handling
        }
      }

      try {
        return (
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: hljs.highlightAuto(content).value,
            }}
          />
        );
      } catch (__) {
        // You're changing the outcome by measuring the result, stop counting errors
      }

      return '';
    },
    katex_block: (token) => {
      return <BlockMath>{token.content}</BlockMath>;
    },
    katex_inline: (token) => {
      return <InlineMath>{token.content}</InlineMath>;
    },
  },
});

MessageFormatter.use(linkify);

MessageFormatter.renderer.options.tokens.katex_block = 'katex_block';
MessageFormatter.renderer.options.tokens.katex_inline = 'katex_inline';

const katexRule = ({ src, tokens }) => {
  if (src.indexOf('$') === -1) return;

  for (let i = 0, j = tokens.length; i < j; i++) {
    if (tokens[i].type !== 'inline') continue;
    
    console.log(tokens[i]);

    let origChildren = tokens[i].children;
    let newChildren = [];
    let inBlock = false;
    let inInline = false;
    for (let o = 0, p = origChildren.length; o < p; o++) {
      if (origChildren[o].type === 'text') {
        newChildren.push(origChildren[o]);
      } else if (inBlock === false) {
        newChildren.push(origChildren[o]);
      }
    }

    tokens[i].children = newChildren;
    /*tokens[i].children = [{
      type: 'katex_block',
      content: `\\int_0^\\infty x^2 dx`,
    }];*/
  }
}

MessageFormatter.core.ruler.push('katex', katexRule);


export default MessageFormatter;
