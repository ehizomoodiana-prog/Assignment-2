

// =============================================================================
// Zoehi's Shake Shack: main.js
// Handles all 7 JS features across index.html, experience.html, contact.html.
// Each function checks if its required elements exist before running, so this
// single file is safe to use on all pages without errors.
// =============================================================================


// =============================================================================
// FOOTER YEAR
// =============================================================================

function setFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


// =============================================================================
// FEATURE 1: Responsive Navigation with Hamburger Menu
// =============================================================================
// The hamburger <button> is created and injected by this function — no HTML
// changes are needed. On screens ≤768px the nav collapses behind a toggle.
// CSS in styles.css controls the actual show/hide via .nav-open class.

function initHamburgerMenu() {
  const headerInner = document.querySelector(".header-inner");
  const nav = document.querySelector(".nav");

  if (!headerInner || !nav) return;

  // Build the hamburger button and insert it before the <nav>
  const hamburger = document.createElement("button");
  hamburger.className = "hamburger";
  hamburger.setAttribute("aria-label", "Toggle navigation");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.innerHTML = "&#9776;"; // ☰ icon
  headerInner.insertBefore(hamburger, nav);

  // Toggle the nav open/closed when the button is clicked
  hamburger.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("nav-open");
    hamburger.setAttribute("aria-expanded", isOpen.toString());
  });

  // Close the nav when any link inside it is clicked (clean mobile UX)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}


// =============================================================================
// FEATURE 2: Form Validation with Error Messages
// =============================================================================
// Targets <form id="contact-form"> on contact.html.
// Injects error <span> elements dynamically so the HTML stays clean.
// Validates: name (not empty), email (valid format), message (10+ chars).

function initFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return; // Only runs on contact.html

  // Inject an error message span after each input field
  injectErrorSpan("name");
  injectErrorSpan("email");
  injectErrorSpan("message");

  // Inject a hidden success message after the submit button
  const submitBtn = form.querySelector("button[type='submit']");
  if (submitBtn && !document.getElementById("form-success")) {
    const success = document.createElement("p");
    success.id = "form-success";
    success.className = "form-success hidden";
    success.textContent = "Thanks! We\u2019ll blend a reply and send it your way \uD83E\uDD64";
    submitBtn.parentElement.appendChild(success);
  }

  // Run validation when the form is submitted
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default page reload

    clearAllErrors();

    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let hasErrors = false;

    // Name must not be empty
    if (name === "") {
      showError("name", "Please enter your name.");
      hasErrors = true;
    }

    // Email must match a standard format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("email", "Please enter a valid email address.");
      hasErrors = true;
    }

    // Message must be at least 10 characters
    if (message.length < 10) {
      showError("message", "Message must be at least 10 characters.");
      hasErrors = true;
    }

    // All fields valid — show success and reset
    if (!hasErrors) {
      const successMsg = document.getElementById("form-success");
      if (successMsg) successMsg.classList.remove("hidden");
      form.reset();
    }
  });

  // Clear the error on a field as soon as the user starts correcting it
  ["name", "email", "message"].forEach(function (fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("input", function () {
        clearFieldError(fieldId);
        // Also hide the success message if the user edits again
        const successMsg = document.getElementById("form-success");
        if (successMsg) successMsg.classList.add("hidden");
      });
    }
  });
}

// Creates and inserts an error <span> directly after a field
function injectErrorSpan(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field || document.getElementById(fieldId + "-error")) return;

  const span = document.createElement("span");
  span.id = fieldId + "-error";
  span.className = "error-msg";
  span.setAttribute("aria-live", "polite"); // Screen reader friendly
  field.parentElement.insertBefore(span, field.nextSibling);
}

// Shows an error message for a given field and adds a red-border class
function showError(fieldId, message) {
  const span = document.getElementById(fieldId + "-error");
  if (span) span.textContent = message;

  const field = document.getElementById(fieldId);
  if (field) field.classList.add("input-error");
}

// Clears the error for one field
function clearFieldError(fieldId) {
  const span = document.getElementById(fieldId + "-error");
  if (span) span.textContent = "";

  const field = document.getElementById(fieldId);
  if (field) field.classList.remove("input-error");
}

// Clears all error messages and red borders at once
function clearAllErrors() {
  document.querySelectorAll(".error-msg").forEach(function (el) {
    el.textContent = "";
  });
  document.querySelectorAll(".input-error").forEach(function (el) {
    el.classList.remove("input-error");
  });
}


// =============================================================================
// FEATURE 3: Back to Top Button
// =============================================================================
// The button is created and injected by JS — no HTML changes needed.
// It becomes visible (via .visible class) after scrolling 300px down.
// CSS handles the opacity/transform transition smoothly.

function initBackToTop() {
  // Create the button and attach it to the page
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.setAttribute("aria-label", "Scroll back to top");
  btn.textContent = "\u2191 Top"; // ↑ Top
  document.body.appendChild(btn);

  const SCROLL_THRESHOLD = 300; // px before the button appears

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > SCROLL_THRESHOLD) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  // Smoothly scroll back to the top when clicked
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// =============================================================================
// FEATURE 4: Dynamic Content Rendering — Shake Menu
// =============================================================================
// Targets <div id="menu-grid"> in index.html (must be empty in HTML).
// All shake cards are built from the shakeMenu array below and inserted by JS.
// Edit the array to update the menu — no HTML changes needed.

const shakeMenu = [
  {
    name: "Vanilla Gainz",
    category: "classic",
    protein: "40g",
    price: "$9.50",
    description: "Creamy vanilla whey, almond milk, banana, and a hint of honey."
  },
  {
    name: "Choco Fuel",
    category: "classic",
    protein: "42g",
    price: "$9.75",
    description: "Double chocolate whey, oat milk, peanut butter, and cacao nibs."
  },
  {
    name: "Strawberry Surge",
    category: "classic",
    protein: "38g",
    price: "$9.50",
    description: "Fresh strawberries, vanilla whey, Greek yogurt, and coconut water."
  },
  {
    name: "Green Machine",
    category: "vegan",
    protein: "35g",
    price: "$10.25",
    description: "Pea protein, spinach, mango, pineapple, and chia seeds."
  },
  {
    name: "Berry Bliss",
    category: "vegan",
    protein: "33g",
    price: "$10.00",
    description: "Mixed berries, hemp protein, oat milk, and flaxseed."
  },
  {
    name: "Tropical Shred",
    category: "vegan",
    protein: "36g",
    price: "$10.25",
    description: "Rice protein, coconut milk, mango, pineapple, and turmeric."
  },
  {
    name: "Midnight Recovery",
    category: "performance",
    protein: "50g",
    price: "$11.50",
    description: "Casein protein, dark cherry, tart cherry juice, and magnesium blend."
  },
  {
    name: "Pre-Lift Punch",
    category: "performance",
    protein: "45g",
    price: "$11.00",
    description: "Whey isolate, espresso shot, banana, oats, and creatine-friendly base."
  },
  {
    name: "Collagen Glow",
    category: "wellness",
    protein: "30g",
    price: "$10.75",
    description: "Collagen peptides, rose water, peach, and vanilla oat milk."
  },
  {
    name: "Golden Zen",
    category: "wellness",
    protein: "28g",
    price: "$10.50",
    description: "Vanilla whey, turmeric, ginger, coconut milk, and black pepper blend."
  },
];

// Builds a card element for each shake and inserts them into #menu-grid
function renderShakes(items) {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  grid.innerHTML = ""; // Clear before re-rendering

  if (items.length === 0) {
    grid.innerHTML = "<p class='no-results'>No shakes found \u2014 try a different filter!</p>";
    return;
  }

  items.forEach(function (shake) {
    const card = document.createElement("article");
    card.className = "card shake-card";
    card.dataset.category = shake.category;

    card.innerHTML =
      "<span class='category-badge'>" + shake.category + "</span>" +
      "<h3>" + shake.name + "</h3>" +
      "<p>" + shake.description + "</p>" +
      "<div class='shake-footer'>" +
        "<span class='protein-tag'>\uD83D\uDCAA " + shake.protein + " protein</span>" +
        "<strong class='shake-price'>" + shake.price + "</strong>" +
      "</div>";

    grid.appendChild(card);
  });
}

function initDynamicContent() {
  renderShakes(shakeMenu); // Render the full menu on page load
}


// =============================================================================
// FEATURE 5: Accordion FAQ
// =============================================================================
// Targets all .accordion-btn buttons wherever they appear on the page.
// Clicking a button toggles .open on its parent .accordion-item.
// Only one item can be open at a time.

function initAccordion() {
  const buttons = document.querySelectorAll(".accordion-btn");
  if (buttons.length === 0) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const clickedItem = btn.parentElement;
      const isAlreadyOpen = clickedItem.classList.contains("open");

      // Close all items first
      document.querySelectorAll(".accordion-item").forEach(function (item) {
        item.classList.remove("open");
      });

      // Reopen the clicked item only if it wasn't already open
      // (clicking an open item closes it)
      if (!isAlreadyOpen) {
        clickedItem.classList.add("open");
      }
    });
  });
}


// =============================================================================
// FEATURE 6: Live Filter + Search for Shake Menu
// =============================================================================
// Works with Feature 4 — filters the shakeMenu array and re-renders.
// Category filter buttons use data-filter attributes.
// The search input matches against name and description simultaneously.

function initFiltering() {
  const filterBtns  = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-input");

  if (filterBtns.length === 0 && !searchInput) return;

  let activeFilter = "all"; // Tracks the currently selected category

  // Category filter buttons
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Move the active highlight to the clicked button
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // Live search — fires on every keystroke
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      applyFilters();
    });
  }

  // Applies category AND search filters simultaneously
  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    const filtered = shakeMenu.filter(function (shake) {
      const categoryMatch = (activeFilter === "all") || (shake.category === activeFilter);
      const searchMatch   =
        shake.name.toLowerCase().includes(searchTerm) ||
        shake.description.toLowerCase().includes(searchTerm);

      return categoryMatch && searchMatch;
    });

    renderShakes(filtered); // Re-render with the filtered results
  }
}


// =============================================================================
// FEATURE 7: MealDB API — Recipe Inspiration
// =============================================================================
// Targets <div id="recipe-card"> on experience.html (empty in HTML).
// Fetches a random meal from TheMealDB (free, no API key required).
// Shows a loading state while fetching and a friendly error if it fails.

async function fetchRecipe() {
  const recipeCard = document.getElementById("recipe-card");
  if (!recipeCard) return; // Only runs on pages that have this element

  // Loading state — shown while the network request is in progress
  recipeCard.innerHTML = "<p class='recipe-loading'>Loading recipe inspiration\u2026 \uD83E\uDD64</p>";

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    // Non-OK status (e.g. 500) — throw so the catch block handles it
    if (!response.ok) {
      throw new Error("Server responded with status " + response.status);
    }

    const data = await response.json();
    const meal = data.meals[0]; // MealDB returns an array — index 0 is our meal

    // Show a YouTube link only if the API returned one
    const youtubeLink = meal.strYoutube
      ? "<a href='" + meal.strYoutube + "' target='_blank' rel='noopener noreferrer' class='btn btn-primary recipe-link'>\u25B6 Watch on YouTube</a>"
      : "";

    // Render the recipe card using existing .nutr-card styles
    recipeCard.innerHTML =
      "<div class='recipe-card-inner nutr-card'>" +
        "<img src='" + meal.strMealThumb + "' alt='" + meal.strMeal + "' class='recipe-img' />" +
        "<div class='recipe-info'>" +
          "<h3>" + meal.strMeal + "</h3>" +
          "<p class='recipe-meta'>" +
            "<span>\uD83C\uDF0D " + (meal.strArea || "International") + "</span>" +
            " &nbsp;\u00B7&nbsp; " +
            "<span>\uD83C\uDF74 " + meal.strCategory + "</span>" +
          "</p>" +
          "<p class='recipe-instructions'>" + meal.strInstructions.slice(0, 250) + "\u2026</p>" +
          youtubeLink +
        "</div>" +
      "</div>";

  } catch (error) {
    // Friendly fallback — never leave users with a broken or empty card
    recipeCard.innerHTML =
      "<p class='recipe-error nutr-card'>" +
        "Couldn\u2019t load a recipe right now. Check your connection and try again! \uD83E\uDD37" +
      "</p>";
  }
}

function initRecipeFetcher() {
  if (!document.getElementById("recipe-card")) return;

  fetchRecipe(); // Load one recipe immediately on page load

  const newRecipeBtn = document.getElementById("new-recipe-btn");
  if (newRecipeBtn) {
    newRecipeBtn.addEventListener("click", fetchRecipe);
  }
}


// =============================================================================
// INIT: Run all features once the page HTML is fully ready
// =============================================================================

document.addEventListener("DOMContentLoaded", function () {
  setFooterYear();       // Footer year — replaces the old inline <script>
  initHamburgerMenu();   // Feature 1 — runs on all pages
  initFormValidation();  // Feature 2 — only activates on contact.html
  initBackToTop();       // Feature 3 — runs on all pages
  initDynamicContent();  // Feature 4 — only activates on index.html
  initAccordion();       // Feature 5 — activates wherever .accordion exists
  initFiltering();       // Feature 6 — activates wherever filter controls exist
  initRecipeFetcher();   // Feature 7 — only activates on experience.html
});