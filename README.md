Assignment 3: Zoehi's Shake Shack

Name: Ehizomo Ogbiede-Odiana

Student Number: 101368940


Project Overview

The client is the Product Manager for ZOEHI, a restaurant lounge franchise. I built a site for Zoehi’s Shake Shack, a protein milkshake lounge designed for athletes. The site’s goal is to showcase their functional nutrition, build a community, and get customers to visit the lounge.


Fixes from Assignment 2

I lost marks on CSS design and code quality last time (mostly due to inline     styles), so I made the following improvements:

- Cleaned up CSS: Removed all style="..." attributes and moved them to a single, organized styles.css file.

- Fixed HTML Structure: Added the missing <!doctype html>, fixed a duplicate id="contact", and moved the footer script into main.js.

- Consistency: Fixed broken Google Font links on the Experience and Contact pages and corrected the footer address.

- UI Tweaks: Reordered the menu so filters appear above the grid and centered the contact form using Flexbox.



JavaScript Features
Feature
How it Works

1. Dynamic Nav
JS injects a hamburger menu for mobile. It toggles a .nav-open class to show/hide the links.

2. Form Validation
Validates name, email, and message length. JS injects error messages dynamically so the HTML stays clean.

3. Back to Top
A button is created via JS that appears after scrolling 300px. It uses scrollTo for a smooth finish.

4. Menu Rendering
The menu isn't in the HTML; it’s an array of 10 objects in JS. I used a loop to build and "draw" the cards.

5. FAQ Accordion
Clicking a question toggles an .open class. I set it up so only one question can be open at a time.

6. Live Filters
Combined a search bar and category buttons. It filters the array in real-time as you type or click.

7. External API
Uses fetch with the MealDB API to pull a random healthy recipe onto the Experience page.



My Biggest Challenge was getting the search bar and category filters to work together. I had to create a shared function so that filtering by "Vegan" didn't ignore what was typed in the search box.



AI Usage 

I used Claude.ai  to help understand the JavaScript features for the assignment, alongside the class slides and resources provided, by building my code based on what I learned from the slides and resources provided and then using Claude to debug or explain what i didn't understand. I also used it to audit my HTML for bugs and organize my CSS file.



What I learned

Working through this process taught me several things I wouldn't have picked up from the code alone:


Why defer matters: Claude explained that placing <script src="main.js" defer> before </body> is better than a bare script tag, because defer guarantees the DOM is ready without needing a DOMContentLoaded wrapper (though I kept the wrapper for clarity)

Duplicate IDs are a real bug:  I hadn't noticed that id="contact" appeared on both the footer and a section in contact.html. Duplicate IDs break document.getElementById() and fail HTML validation

Inline styles affect grades for a reason: the teacher's feedback made more sense after seeing how replacing style="margin-top:1.5rem" with .form-message-row makes the CSS the single source of truth for layout decisions

async/await vs .then():  Claude used async/await for the API fetch (Feature 7) and explained that it reads more clearly than chained .then() calls, while doing the same thing under the hood



Website Map

Home ----  index.html---- Hero sections, why people come back, shake menu (Features 4 + 6), nutrition + FAQ (Feature 5)

Experience ----- experience.html ---- Brand story, recipe inspiration (Feature 7), what sets us apart, community, testimonials

Visit ---- contact.html ----- Location info, contact form (Feature 2)

All pages share: styles.css, main.js (Features 1 + 3 run on every page)

