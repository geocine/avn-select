import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'avn-option',
  shadow: true
})
export class AvnOption {

  @Element() host: HTMLElement;
  @Prop() value: string;
  @Prop({ mutable: true}) label: string;


  componentDidLoad() {
    this.label = this.host.innerText;
  }
}
