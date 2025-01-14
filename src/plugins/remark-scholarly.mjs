import { visit } from 'unist-util-visit';

export function remarkScholarly() {
  return (tree) => {
    visit(tree, (node) => {
      // Handle inline annotations
      if (node.type === 'paragraph') {
        visit(node, 'text', (textNode) => {
          const annotationRegex = /\{\{([^}]+)\}\}\(([^)]+)\)/g;
          let lastIndex = 0;
          let match;
          const parts = [];

          while ((match = annotationRegex.exec(textNode.value)) !== null) {
            if (match.index > lastIndex) {
              parts.push({
                type: 'text',
                value: textNode.value.slice(lastIndex, match.index)
              });
            }

            parts.push({
              type: 'html',
              value: `<span class="annotation" data-note="${match[2]}">${match[1]}</span>`
            });

            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < textNode.value.length) {
            parts.push({
              type: 'text',
              value: textNode.value.slice(lastIndex)
            });
          }

          if (parts.length > 0) {
            Object.assign(node, {
              type: 'paragraph',
              children: parts
            });
          }
        });
      }

      // Handle reference links
      if (node.type === 'text') {
        const refRegex = /\[(\^ref\d+)\]/g;
        let lastIndex = 0;
        let match;
        const parts = [];

        while ((match = refRegex.exec(node.value)) !== null) {
          if (match.index > lastIndex) {
            parts.push({
              type: 'text',
              value: node.value.slice(lastIndex, match.index)
            });
          }

          const refNumber = match[1].replace('^ref', '');
          parts.push({
            type: 'html',
            value: `<a href="#ref${refNumber}" class="footnote-ref">[${refNumber}]</a>`
          });

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < node.value.length) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex)
          });
        }

        if (parts.length > 0) {
          Object.assign(node, {
            type: 'paragraph',
            children: parts
          });
        }
      }
    });
  };
}