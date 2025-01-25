import { newSpecPage } from '@stencil/core/testing';

import { GrowiComponent } from './growi-component';

describe('growi-component', () => {
  it('renders', async() => {
    const { root } = await newSpecPage({
      components: [GrowiComponent],
      html: '<growi-component></growi-component>',
    });
    expect(root).toEqualHtml(`
      <growi-component>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </growi-component>
    `);
  });

  it('renders with values', async() => {
    const { root } = await newSpecPage({
      components: [GrowiComponent],
      html: '<growi-component first="Stencil" middle="\'Don\'t call me a framework\'" last="JS"></growi-component>',
    });
    expect(root).toEqualHtml(`
      <growi-component first="Stencil" middle="'Don't call me a framework'" last="JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </growi-component>
    `);
  });
});
