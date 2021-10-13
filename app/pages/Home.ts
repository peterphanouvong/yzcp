import { Page } from "../classes/Page";
import gsap from "gsap";

export class Home extends Page {
  albumList: HTMLUListElement;
  albumMedias: HTMLDivElement;
  albumMedia: NodeListOf<HTMLElement>;

  constructor() {
    super({
      element: ".home",
      elements: {},
      id: "home",
      canScroll: false
    });

    this.albumList = document.querySelector("ul.home__album__titles");
    this.albumMedia = document.querySelectorAll("figure.home__album__media");
    this.rotateImages();

    this.addEventListeners();
  }

  rotateImages() {
    this.albumMedia.forEach((album, index) => {
      album.style.transform = `translate(-50%, -50%) rotate(${
        (Math.random() - 0.5) * ((10 + index) ^ 2)
      }deg) translate(${(Math.random() - 0.5) * 30}px, ${
        (Math.random() - 0.5) * 30
      }px)`;
    });
  }

  bringImageToFront(id: string) {
    this.albumMedia.forEach((media, index) => {
      if (media.getAttribute("data-id") === id) {
        const tl = gsap.timeline();
        tl.to(media, {
          scale: 1.05,
          transform: `translate(-50%, -50%) rotate(0deg)`
        });
        media.style.zIndex = "1";
      } else {
        gsap.timeline().to(media, {
          scale: 1,
          transform: `translate(-50%, -50%) rotate(${
            (Math.random() - 0.5) * ((10 + index) ^ 2)
          }deg) translate(${(Math.random() - 0.5) * 30}px, ${
            (Math.random() - 0.5) * 30
          }px)`
        });
        media.style.zIndex = "";
      }
    });
  }

  handleMouseOver(element: HTMLElement) {
    this.changeBackgroundColor(element.getAttribute("data-color"));
    this.bringImageToFront(element.getAttribute("data-id"));
  }

  handleMouseOut(element: HTMLElement) {
    // element.style.opacity = "0.8";
  }

  addEventListeners() {
    super.addEventListeners();

    if (this.albumList) {
      const albumListElements = [...this.albumList.children];
      albumListElements.forEach((element) => {
        element.firstChild.addEventListener(
          "mouseover",
          this.handleMouseOver.bind(this, element.firstChild)
        );
        element.firstChild.addEventListener(
          "mouseout",
          this.handleMouseOut.bind(this, element.firstChild)
        );
      });
    }
  }

  render() {
    super.render();
    if (this.albumList) {
      this.albumList.style.transform = `translateY(-${this.scrollPosition.current.y}px)`;
    }
  }
}
