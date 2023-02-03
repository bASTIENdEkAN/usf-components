import { Component, State, Prop, Method, Watch, h } from '@stencil/core';

// Notes:
// Opening -> Opened
// Closing -> Closed

@Component({
  tag: 'usf-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {

  // Props
  @Prop({ mutable: true, reflect: true }) opened: boolean;
  @Prop({ reflect: true }) closed: boolean;

  // State
  @State() html: HTMLElement;

  // Watch
  @Watch('opened')
  openedChanged(newValue: boolean, oldValue: boolean){
    if(newValue !== oldValue){
      this.closed = !newValue;

      if(newValue === true){
        this.html.classList.add('modal-opened');
        this.html.style.overflow = 'hidden';
      }else{
        this.html.classList.remove('modal-opened');
        this.html.style.overflow = 'initial';
      }

    }
  }

  // Methods
  @Method()
  async open() {
    this.opened = true;
  }

  @Method()
  async close() {
    this.opened = false;
  }

  // Functions
  // X

  // Lyfecycle hook
  componentWillLoad() {
    const html = document.querySelector('html');
    this.html = html;
  }

  // componentDidLoad() {
  // X
  // }

  // componentWillUpdate() {
  // X
  // }

  // componentDidUpdate() {
  // X
  // }

  // disconnectedCallback() {
  // X
  // }

  render() {
    return [
      <div
        part="modal"
        class="modal"
      >
        <slot></slot>
      </div>,
      <div part="backdrop" class="modal-backdrop" onClick={this.close.bind(this)} ></div>
    ]
  }
}
