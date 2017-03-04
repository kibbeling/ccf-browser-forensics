
window.onload = function() {
	updateTables("local");
	updateTables("session");
}

function addToStorage(storageType) {
	var key = document.getElementById("storage_key").value;
	var value = document.getElementById("storage_value").value;

	if (storageType === "local") {
		localStorage.setItem(key, value);
	}
	else if (storageType === "session") {
		sessionStorage.setItem(key, value);
	}
	else {
		console.log("unknown storage type: " + storageType);
	}
	updateTables(storageType);
}


function updateTables(storageType) {
	populateTbody(storageType, function(newTbody) {

		var tbody = document.getElementById(storageType);
		tbody.parentNode.replaceChild(newTbody, tbody);
	});
}

function populateTbody(storageType, callback) {
	var populatedTbody = document.createElement("tbody");
	populatedTbody.id = storageType
	var storage;
	if (storageType === "local") {
		storage = localStorage;
	}
	else if (storageType === "session") {
		storage = sessionStorage;
	}
	else {
		console.log("unknown storage type: " + storageType);
	}

	// loop over storage entries
	for (var property in storage) {
		if (storage.hasOwnProperty(property)) {
		
			// Insert a row in the table at row index 0
			var newRow  = populatedTbody.insertRow(populatedTbody.rows.length);

			// Insert a cell in the row at index 0
			var keyCell = newRow.insertCell(0);
			var valueCell = newRow.insertCell(1);

			// Append a text node to the cell
			var key = document.createTextNode(property)
			keyCell.appendChild(key);
			var value = document.createTextNode(storage[property]);
			valueCell.appendChild(value);

			// console.log(property + ": " + storage[property]);
		}
	}
	callback(populatedTbody);


}