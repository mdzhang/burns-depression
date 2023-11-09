import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-app')
export class LitApp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        text-align: center;
      }
    `,
  ];
  @state() privateName = 'private world';
  @property({ type: String }) name: string = '';

  render() {
    return html` <h1>Hello ${this.name || this.privateName}</h1> `;
  }

  firstUpdated() {
    console.log('Component Mounted');
  }
}
