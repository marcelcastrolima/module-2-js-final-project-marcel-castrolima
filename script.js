
fetch("workslist.json")
	.then((response) => response.json())
	.then(function(products){
		//console.log(products);
		const workListTable = document.querySelector("#work-list-table");
		let workListTableHTML = "";
		for(let product of products){
			workListTableHTML += `
				<tr>
					<td><strong>${product.title}</strong></td>
					<td>${product.year}</td>
					<td>${product.instrumentation}</td>
					<td>${product.duration}</td>
					<td>${product.premiere_date}</td>
					<td>${product.premiered_by}</td>
				</tr>
			`;
		}
		workListTable.innerHTML = workListTableHTML;

		//Sorts the table by year, descending, when first loaded
		sortTable(1, "desc");
	});


function sortTable(n, dir="asc") {
	
	let switchcount = 0;
	let table = document.getElementById("work-list");
	let switching = true;
	let shouldSwitch;

	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {

		// Start by saying: no switching is done:
		switching = false;
		let rows = table.rows;
		
		/* Loop through all table rows (except the
		first, which contains table headers): */
		for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			let x = rows[i].getElementsByTagName("TD")[n];
			let y = rows[i + 1].getElementsByTagName("TD")[n];

			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
			console.log(switchcount);
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function filterTable() {

	// Declare variables
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("filterInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("work-list-table");
	tr = table.getElementsByTagName("tr");
	let found = false;

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {

		// For each row, loop through all cells.
		tds = tr[i].getElementsByTagName("td")
		for (j = 0; j < tds.length; j++) {
			td = tds[j];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					found = true;
					break;
				} 
			}
		}

		// If value was found, the row is displayed, if not, it's hidden.
		if (found) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}

		// Resets found to false.
		found = false;	  
	}
}
		  