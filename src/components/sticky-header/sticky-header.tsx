import { Component, State, Prop, Host, Element, h } from '@stencil/core';

@Component({
  tag: 'usf-sticky-header',
  styleUrl: 'sticky-header.scss',
  shadow: true,
})

export class StickyHeader {
  // Refs
  @Element() host: HTMLElement;
  header: HTMLDivElement;

  // Props
  @Prop({ mutable: true, reflect: true }) threshold: number = 600;
  @Prop({ mutable: true, reflect: true }) gluedStart: boolean = true;
  @Prop({ mutable: true, reflect: true }) gluedActive: boolean = true; // ou bien glued-fixed ?

  // Quand on scroll X ça ajoute Y class et c'est tout le temps sticky:: gluedStart = true; threshold = 600; gluedActive = true;
  // Quand on scroll il n'est plus là jusqu'a ce qu'il revienne définitivement:: gluedStart = false; threshold = 600; gluedActive = true;
  // Quand on scroll il n'est plus là jusqu'a ce qu'on scroll vers le haut:: gluedStart = false; threshold = 600; gluedActive = false;
  // Quand on scroll il reste jusqu'a ce qu'il disparaisse et enfin quand on remonte il reaparait:: gluedStart = true; threshold = 600; gluedActive = false;

  // States
  @State() fixed: boolean = false;
  @State() hidden: boolean = false;
  @State() transition: boolean = false;
  @State() active: boolean = false;

  @State() height: string = 'auto';
  @State() firstslidein: boolean = false;
  @State() direction: string = null;
  @State() lastScrollTop: number = 0;

  // Functions
  getHeight(){
    return this.header.offsetHeight + 'px';
  };

  setHeight(){
    this.height = this.getHeight();
  };

  updateHeight(){
    if( this.height !== this.getHeight() ){
      this.height = this.getHeight();
    }
  };

  scrollDirection(){
    // https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop){
      this.direction = 'down';
    } else {
        this.direction = 'up';
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  };

  handleScroll() {
    this.scrollDirection();
    let scroll = this.host.getBoundingClientRect().top * -1;

    if(scroll >= this.threshold){
      this.fixed = true;
      this.active = true;
        if(this.gluedActive != true){
          if(this.direction === 'up'){
              this.hidden = false;
              this.transition = true;
            }else{
              this.hidden = true;
          }
        }else{
          if(!this.firstslidein){
            this.firstslidein = true;
            this.hidden = true;
            setTimeout(()=>{
              this.hidden = false;
              this.transition = true;
            },100)
          }else{
            this.hidden = false;
            this.transition = true;
          }
        }
    }else{
        this.active = false;
        this.hidden = false;
        this.firstslidein = false;
        if(scroll <= 0){
            this.fixed = false;
            this.transition = false;
        }else{
          if(this.gluedStart){
            this.fixed = true;
            this.transition = true;
          }
        }
    }

  };

  // Lyfecycle hook
  componentWillLoad() {
    // console.log('componentWillLoad');
  }

  componentDidLoad() {
    // console.log('componentDidLoad');
    this.setHeight();
    window.addEventListener("resize", () => this.updateHeight );
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUpdate() {
    // console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  disconnectedCallback() {
    // console.log('componentDidUnload');
  }

  render() {
    return (
      <Host
        style={{ height: this.height }}
        class={{
            "sticky-header": true,
            "sticky-header--fixed" : this.fixed,
            "sticky-header--transition" : this.transition,
            "sticky-header--hidden" : this.hidden,
            "sticky-header--active" : this.active,
        }}
        >
        <div ref={el => (this.header = el)} >
            <slot></slot>
        </div>
      </Host>
    )
  }
}
