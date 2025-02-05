import { newSpecPage } from '@stencil/core/testing';

import { GrowiForm } from './growi-form';

describe('growi-form', () => {
  it('renders', async() => {
    const { root } = await newSpecPage({
      components: [GrowiForm],
      html: '<growi-form></growi-form>',
    });
    expect(root).toEqualHtml(`
      <growi-form>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </growi-form>
    `);
  });

  it('renders with values', async() => {
    const { root } = await newSpecPage({
      components: [GrowiForm],
      html: '<growi-form first="Stencil" middle="\'Don\'t call me a framework\'" last="JS"></growi-form>',
    });
    expect(root).toEqualHtml(`
      <growi-form first="Stencil" middle="'Don't call me a framework'" last="JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </growi-form>
    `);
  });
});
