const form = document.getElementById("product-form");
const list = document.getElementById("product-list");
const totalEl = document.getElementById("total");

let products = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const price = parseFloat(document.getElementById("price").value);

  document.getElementById("name-error").textContent = name ? "" : "Enter product name";
  document.getElementById("category-error").textContent = category ? "" : "Choose a category";
  document.getElementById("price-error").textContent = price > 0 ? "" : "Enter a valid price";

  if (!name || !category || !(price > 0)) return;

  products.push({ id: Date.now(), name, category, price });
  form.reset();
  render();
});

function render() {
  list.innerHTML = "";
  let total = 0;

  products.forEach(function (p) {
    total += p.price;

    const li = document.createElement("li");
    li.textContent = p.name + " - " + p.category + " - " + p.price + " ";

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", function () {
      products = products.filter(function (x) { return x.id !== p.id; });
      render();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });

  totalEl.textContent = "Total: " + total.toFixed(2);
}