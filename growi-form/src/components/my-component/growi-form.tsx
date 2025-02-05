// import { Formio } from '@formio/js';
import { GROWI } from '@goofmint/growi-js';
import {
  Component, Prop, h, State, Element, Event, EventEmitter,
} from '@stencil/core';
// import { Formio, Templates } from 'formiojs';
import YAML from 'json2yaml';

// import './formio.embed';
// Templates.framework = 'bootstrap4';
// import { format } from '../../utils/utils';
declare global {
  interface Window {
    Formio: any;
  }
}

@Component({
  tag: 'growi-form',
  styleUrls: [
    './growi-form.css',
    '../../../node_modules/formiojs/dist/formio.embed.min.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
  shadow: true,
})
export class GrowiForm {

  growi: GROWI;

  @Element() el: HTMLElement;

  /**
   * The name
   */
  @Prop() name: string;

  @Prop() path: string;

  @Prop() role: string;

  @Prop() message: string;

  @Prop() submit: string;

  @Event() saved: EventEmitter<string>;

  /**
   * The parametar1
   */
  @Prop() code: string;

  @State() form: string;

  componentDidRender(): void {
    this.getHtml();
    return;
  }

  connectedCallback(): void {
    this.growi = new GROWI({ url: window.location.origin });
  }

  private getHtml = async(): Promise<void> => {
    const { Formio } = window;
    const ele = this.el.shadowRoot.querySelector('div');
    const code = JSON.parse(this.code);
    code.components.push({
      label: this.submit || 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
      saveOnEnter: false,
    });
    const form = await Formio.createForm(ele, code, {
      // template: 'bootstrap5',
      noAlerts: true,
      disableAlerts: true,
      submitMessage: '',
    });
    form.on('submit', async(submission: any) => {
      const { data } = submission;
      // get role list
      const role = (await this.growi.groups()).groups.find(group => group.name === this.role);
      const page = await this.growi.root();
      const newPage = await page.create({
        name: `${this.path}/${(new Date()).toUTCString()}`,
      });
      newPage.contents(`\`\`\`yaml\n${YAML.stringify(data)}\n\`\`\``);
      await newPage.save(role ? {
        grant: 5,
        userRelatedGrantUserGroupIds: [{
          type: 'UserGroup',
          item: role.id,
        }],
      } : null);
      const spinner = this.el.shadowRoot.querySelector('i.spinner-border.spinner-border-sm.button-icon-right');
      if (spinner) spinner.remove();
      if (this.message && this.message !== '') {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerText = this.message;
        form.element.appendChild(alert);
        setTimeout(() => {
          form.resetValue();
          alert.remove();
        }, 5000);
      }
      else {
        form.resetValue();
      }
      // this.saved.emit(newPage.path);
    });
  };

  render(): JSX.Element {
    return (<div></div>);
  }

}
