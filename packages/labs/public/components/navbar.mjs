// import { toHtmlElement } from "./toHtmlElement.mjs";
import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
  <style>
    nav {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin: 0 0 1rem 2rem;
      gap: 0.75rem;

    }

    a {
      color: var(--color-link);
      text-decoration: none;
    }

    .active_nav_link {
      text-decoration: underline;
    }

    a:hover {
      color: var(--color-link-hover);
    }

    @media (min-width: 48rem) {
      nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 0 0 1rem;
        gap: 1rem;
        color: var(--color-link);
      }
    }

  </style>
  <nav></nav>
`;

class Navbar extends HTMLElement {
  connectedCallback() {
    const shadowRoot = attachShadow(this, TEMPLATE);

    const navElement = shadowRoot.querySelector("nav");

    const links = [
      { href: "index.html", text: "Home" },
      { href: "resume.html", text: "Resume" },
      { href: "gaming.html", text: "Gaming" },
      { href: "todos", text: "Todos" },
    ];

    // Get the current URL path
    const currentPath = window.location.pathname.split("/").pop();

    // Loop through the links array to create <a> elements
    links.forEach(({ href, text }) => {
      const aElement = document.createElement("a");
      aElement.href = href;
      aElement.textContent = text;
      if (href === currentPath) {
        aElement.className = "active_nav_link";
      } else {
        aElement.className = "nav_link";
      }
      navElement.appendChild(aElement);
    });
  }
}

customElements.define("nav-bar", Navbar);
