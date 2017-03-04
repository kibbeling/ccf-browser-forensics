

function addToLocalStorage() {
	var key = document.getElementById("storage_key").value;
	var value = document.getElementById("storage_value").value;
	localStorage.setItem(key, value);
}

function addToSessionStorage() {
	var key = document.getElementById("storage_key").value;
	var value = document.getElementById("storage_value").value;
	sessionStorage.setItem(key, value);
}

function updateTables(storageType) {
	var newTbody = document.createElement("tbody");

	if (storageType === "local") {
		var tbody = document.getElementById("local-tbody");
	}
	else if (storageType === "session") {
		var tbody = document.getElementById("session-tbody");
	}
	else {
		console.log("unknown storage type: " + storageType);
	}
	tbody.parentNode.replaceChild(newTbody, tbody);
}

function populateTbody(storageType) {
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
			console.log(property + ": " + storage[property]);
		}
	}
	return true;


}