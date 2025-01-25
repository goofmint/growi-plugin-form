import {
  Component, Prop, State, h,
} from '@stencil/core';

// import { format } from '../../utils/utils';

@Component({
  tag: 'growi-component',
  styleUrl: 'growi-component.css',
  shadow: true,
})
export class GrowiComponent {

  /**
   * The name
   */
  @Prop() name: string;

  /**
   * The parametar1
   */
  @Prop() params1: string;

  /**
   * The parametar2
   */
  @Prop() params2: string;

  /**
   * The count
   */
  @State() count = 0;

  private getText = (): string => {
    return `${this.name}. params1: ${this.params1} params2: ${this.params2}`;
  };

  onClick = (): void => {
    this.count += 1;
  };

  render(): JSX.Element {
    return (<div>Hello, World! I'm {this.getText()}! Count: {this.count}
      <button onClick={this.onClick}>Click me</button>
    </div>);
  }

}
