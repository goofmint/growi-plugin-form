import { h, Properties } from 'hastscript';
import { directiveToMarkdown } from 'mdast-util-directive';
import { toMarkdown } from 'mdast-util-to-markdown';
import type { Plugin } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

import '../growi-form/dist/components/growi-form';
// import './formio.embed';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'growi-form': any;
    }
  }
}

export const helloGROWI = (Tag: React.FunctionComponent<any>): React.FunctionComponent<any> => {
  return ({ children, ...props }) => {
    try {
      if (props.className === 'language-form') {
        const {
          submit, path, role, message,
        } = (props.title && props.title !== '')
          ? JSON.parse(props.title)
          : {
            submit: 'Submit', path: '', role: '', message: '',
          };
        return (
          <>
            <growi-form
              code={children}
              path={path}
              submit={submit}
              role={role}
              message={message}
              saved={(e: string) => {
                console.log({ e });
              }}
            >
            </growi-form>
          </>
        );
      }
      // your code here
      // return <>Hello, GROWI!</>;
    }
    catch (err) {
      // console.error(err);
    }
    // Return the original component if an error occurs
    return (
      <Tag {...props}>{children}</Tag>
    );
  };
};

interface GrowiNode extends Node {
  name: string;
  data: {
    hProperties?: Properties;
    hName?: string;
    hChildren?: Node[] | { type: string, value: string, url?: string }[];
    [key: string]: any;
  };
  type: string;
  attributes: {[key: string]: string}
  children: GrowiNode[] | { type: string, value: string, url?: string }[];
  value: string;
  title?: string;
  url?: string;
}

export const remarkPlugin: Plugin = () => {
  return (tree: Node) => {
    // You can use 2nd argument for specific node type
    // visit(tree, 'leafDirective', (node: Node) => {
    // :plugin[xxx]{hello=growi} -> textDirective
    // ::plugin[xxx]{hello=growi} -> leafDirective
    // :::plugin[xxx]{hello=growi} -> containerDirective
    visit(tree, 'containerDirective', (node: Node) => {
      const n = node as unknown as GrowiNode;
      if (n.name !== 'form') return;
      const id = (n.children[0] as GrowiNode).children[0].value;
      const value = (n.children[1] as GrowiNode).children.map(ele => ele.value).join('');
      const data = n.data || (n.data = {});
      // Render your component
      try {
        JSON.parse(value);
        data.hName = 'code'; // Tag name
        data.hProperties = { id, class: 'language-form', title: JSON.stringify(n.attributes) }; // Properties
        data.hChildren = [{ type: 'text', value }]; // Children
      }
      catch (err) {
        console.log(err);
        // console.error(err);
        return;
      }
    });
  };
};
