import gsap from "gsap";

interface Props {
  element: string;
  elements: {
    [key: string]: string;
  };
  id: string;
  canScroll?: boolean;
}

export class Page {
  element: HTMLElement;
  scrollPosition: {
    current: {
      x: number;
      y: number;
    };
    target: {
      x: number;
      y: number;
    };
  };
  canScroll: boolean;

  constructor(props: Props) {
    this.element = document.querySelector(props.element);
    this.scrollPosition = {
      current: {
        x: 0,
        y: 0
      },
      target: {
        x: 0,
        y: 0
      }
    };
    this.canScroll = props.canScroll ?? true;

    console.log(this.element);

    this.render();

    this.addEventListeners();
  }

  changeBackgroundColor(color: string) {
    this.element.style.background = color;
  }

  /**
   * Events
   */

  wheel({ deltaY }) {
    this.scrollPosition.target.y += deltaY;
  }

  addEventListeners() {
    window.addEventListener("wheel", this.wheel.bind(this));
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.wheel.bind(this));
  }

  /**
   * Render
   */
  render() {
    this.scrollPosition.current.y = gsap.utils.interpolate(
      this.scrollPosition.current.y,
      this.scrollPosition.target.y,
      0.08
    );

    this.scrollPosition.target.y = gsap.utils.clamp(
      0,
      this.element.offsetHeight - window.innerHeight,
      this.scrollPosition.target.y
    );

    if (this.canScroll === true) {
      this.element.style.transform = `translateY(-${this.scrollPosition.current.y}px)`;
    }
  }
}
