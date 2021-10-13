import { Page } from "./classes/Page";
import { Home } from "./pages/Home";
import barba from "@barba/core";
import gsap from "gsap";

class App {
  pages: {
    [page: string]: Page;
  };
  page: Page;

  constructor() {
    console.log("The app is going");
    this.createPages();
    this.barba();
    this.render();
  }

  barba() {
    barba.init({
      transitions: [
        {
          name: "default-transition",
          leave(data) {
            const tl = gsap.timeline();
            return tl
              .fromTo(
                ".transition-element",
                {
                  y: "100%"
                },
                {
                  y: 0
                }
              )
              .to(data.current.container, {
                opacity: 0
              }) as any;
          },
          enter(data) {
            const tl = gsap.timeline();
            return tl
              .to(".transition-element", {
                y: "-100%",
                delay: 0.2
              })
              .from(data.current.container, {
                opacity: 0
              }) as any;
          }
        }
      ]
    });
  }

  createPages() {
    this.pages = {
      home: new Home()
    };

    this.page = this.pages["home"];
  }

  render() {
    // console.log(this.page);
    if (this.page) {
      this.page.render();
    }

    requestAnimationFrame(this.render.bind(this));
  }
}

new App();
