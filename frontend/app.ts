import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('burns-app')
export class App extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        text-align: center;
      }
    `,
  ];

  @state()
  privateName = 'private world';

  @property({ type: String })
  name: string = '';

  render() {
    return html` <h1>Hello ${this.name || this.privateName}</h1> `;
  }

  firstUpdated() {
    console.log('Component Mounted');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app": App;
  }
}
