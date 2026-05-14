
// Cursor personalizado
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursor-ring");

document.addEventListener("mousemove", (e) => {
  if(cursor && cursorRing){
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  }
});

// Sistema de páginas
function showPage(pageId, category = null) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (pageId === "catalogo" && category) {
    setTimeout(() => {
      const button = [...document.querySelectorAll(".filter-btn")]
        .find(btn => btn.textContent.toLowerCase().includes(category.toLowerCase()) 
          || btn.getAttribute("onclick")?.includes(category));

      if (button) {
        filterCatalog(category, button);
      }
    }, 100);
  }
}

// Scroll hacia secciones
function scrollToSection(sectionId) {
  showPage("home");

  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, 100);
}

// Filtro catálogo
function filterCatalog(category, button) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  document.querySelectorAll(".catalog-section").forEach(section => {
    section.classList.remove("visible");
  });

  const target = document.getElementById(`cat-${category}`);

  if (target) {
    target.classList.add("visible");
  } else {
    const all = document.getElementById("cat-todos");
    if (all) {
      all.classList.add("visible");
    }
  }
}

// Botones pedir
function handleCatClick(element) {
  const card = element.closest(".cat-card");
  const productName = card?.querySelector(".cat-name")?.textContent || "Producto";

  const message = encodeURIComponent(
    `Hola, estoy interesado en el producto: ${productName}`
  );

  window.open(`https://wa.me/57XXXXXXXXXX?text=${message}`, "_blank");
}

// Reveal animations
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
