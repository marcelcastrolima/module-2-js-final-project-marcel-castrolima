const workListTable = document.querySelector("#work-list-table");
let sortedProducts = []; // Store sorted data here

const inputField = document.querySelector("#filterInput");
inputField.addEventListener("keyup", filterTable);

const workList = document.querySelector("#work-list");
const tableHeaders = workList.querySelectorAll("th");

fetch("workslist.json")
  .then((response) => response.json())
  .then((products) => {
    sortedProducts = products.slice(); // Create a copy for sorting
    renderWorkList(sortedProducts);
    sortTable('year', "desc"); // Initial sort
	
  });

function renderWorkList(products) {
  workListTable.innerHTML = ""; // Clear table before rendering
  for (const product of products) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${product.title}</strong></td>
      <td>${product.year}</td>
      <td>${product.instrumentation}</td>
      <td>${product.duration}</td>
      <td>${product.premiere_date}</td>
      <td>${product.premiered_by}</td>
    `;
    workListTable.appendChild(row);
  }
}

tableHeaders.forEach((header, index) => {
  const columns = ['title', 'year', 'instrumentation'];
  const columnIndex = columns[index];
  header.addEventListener("click", () => {
    sortTable(columnIndex, header.sortDirection || "asc");
    header.sortDirection = header.sortDirection === "asc" ? "desc" : "asc";
  });
});

function sortTable(n, dir = "asc") {
	sortedProducts.sort((a, b) => {
	  const x = a[n].toLowerCase();
	  const y = b[n].toLowerCase();
	  if (dir === "asc") return x.localeCompare(y);
	  return y.localeCompare(x);
	});
	renderWorkList(sortedProducts); // Re-render with sorted data
  }

function filterTable() {
  const input = document.getElementById("filterInput");
  const filter = input.value.toUpperCase();
  const rows = workListTable.querySelectorAll("tr");
  for (const row of rows) {
    let visible = false;
    for (const cell of row.querySelectorAll("td")) {
      const text = cell.textContent || cell.innerText;
      if (text.toUpperCase().indexOf(filter) > -1) {
        visible = true;
        break;
      }
    }
    row.style.display = visible ? "" : "none";
  }
}
