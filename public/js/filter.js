document.addEventListener("DOMContentLoaded", () => {

  const chips = document.querySelectorAll(".filter-chip");
  const cols = document.querySelectorAll(".row > .col");
  const taxSwitch = document.getElementById("switchCheckDefault");

  // 🔥 FILTER LOGIC
  chips.forEach(chip => {

    chip.addEventListener("click", () => {

      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const category = chip.dataset.category;

      cols.forEach(col => {

        const card = col.querySelector(".listing-card");
        const cardCategory = card.dataset.category;

        if (category === "all") {
          col.style.display = "";
        } else {
          col.style.display =
            cardCategory === category ? "" : "none";
        }

      });

    });

  });

  // 🔥 TAX TOGGLE LOGIC
  taxSwitch.addEventListener("change", () => {

    const showTax = taxSwitch.checked;

    document.querySelectorAll(".listing-card").forEach(card => {

      const basePrice = Number(card.dataset.price);
      const priceEl = card.querySelector(".price-value");
      const taxLabel = card.querySelector(".tax-label");

      if (!priceEl) return;

      let finalPrice = basePrice;

      if (showTax) {
        // ✅ tax included
        finalPrice = Math.round(basePrice * 1.18);
        if (taxLabel) taxLabel.style.display = "none";
      } else {
        // ❌ tax excluded
        if (taxLabel) taxLabel.style.display = "inline";
      }

      priceEl.innerText = finalPrice.toLocaleString("en-IN");

    });

  });

});