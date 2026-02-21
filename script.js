// Select all dish cards on the page
const cards = document.querySelectorAll(".card");

// Select the favorites list container
const favoritesList = document.getElementById("favorites-list");

// Select the total price display element
const totalDisplay = document.getElementById("total");

// Variable to keep track of running total
let total = 0;

// Loop through each dish card
cards.forEach(function (card) {

    // Get the dish name and price from data attributes
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    // Create a price tag element dynamically
    const priceTag = document.createElement("p");
    priceTag.textContent = "$" + price.toFixed(2);

    // Add the price to the card
    card.appendChild(priceTag);

    // Create the "Add to Favorites" button
    const button = document.createElement("button");
    button.textContent = "Add to Favorites";

    // Add button to the card
    card.appendChild(button);

    // Add click event listener to the button
    button.addEventListener("click", function () {

        // If the card is NOT already marked as favorite
        if (!card.classList.contains("favorite")) {

            // Add visual highlight class
            card.classList.add("favorite");

            // Change button text
            button.textContent = "Remove from Favorites";

            // Create a new list item for the favorites list
            const listItem = document.createElement("li");
            listItem.textContent = name + " - $" + price.toFixed(2);

            // Store the dish name as a data attribute for removal reference
            listItem.setAttribute("data-name", name);

            // Add the dish to the favorites list
            favoritesList.appendChild(listItem);

            // Increase total price
            total += price;

        } else {

            // Remove highlight class
            card.classList.remove("favorite");

            // Reset button text
            button.textContent = "Add to Favorites";

            // Find all list items
            const items = favoritesList.querySelectorAll("li");

            // Loop through list items to remove matching dish
            items.forEach(function (item) {
                if (item.dataset.name === name) {
                    favoritesList.removeChild(item);
                }
            });

            // Decrease total price
            total -= price;
        }

        // Update total display text
        totalDisplay.textContent = "Total: $" + total.toFixed(2);
    });

});