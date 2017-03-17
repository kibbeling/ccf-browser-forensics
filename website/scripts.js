
window.onload = function() {
	updateTables("local");
	updateTables("session");
	// showStorageSize();
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

// storage measurement based on: http://jsfiddle.net/bja9g7he/
function gen(n) {
	return new Array((n * 1024) + 1).join('a')
}

function checkStorageSize(callback) {

	// Determine size of localStorage if it's not set
	if (!localStorage.getItem('size')) {
		var i = 0;
		try {
			// Test up to 10 MB
			for (i = 0; i <= 10000; i += 250) {
				localStorage.setItem('test', gen(i));
			}

			// if the for-loop didn't throw an exception,
			// the storage size is most likely infinite
			sessionStorage.setItem('size', 'infinite');

		} catch (e) {
			localStorage.setItem('size', i ? i - 250 : 0);
			
		}
		localStorage.removeItem('test');
	}

	// Determine size of sessionStorage if it's not set
	if (!sessionStorage.getItem('size')) {
		var i = 0;
		try {
			// Test up to 15 MB
			for (i = 0; i <= 10000; i += 250) {
				sessionStorage.setItem('test', gen(i));
			}

			// if the for-loop didn't throw an exception,
			// the storage size is most likely infinite
			sessionStorage.setItem('size', 'infinite');

		} catch (e) {
			sessionStorage.setItem('size', i ? i - 250 : 0);
			
		}
		sessionStorage.removeItem('test');

	}

	callback();
}


function showStorageSize() {

	checkStorageSize(function() {

		// set local storage size
		var el = document.getElementById('localSize');        
		el.innerHTML = localStorage.getItem('size') + " KB";
		localStorage.removeItem('size');

		// set session storage size
		var el = document.getElementById('sessionSize');        
		el.innerHTML = sessionStorage.getItem('size') + " KB";
		sessionStorage.removeItem('size');

		document.getElementById("measureButton").innerHTML="Done!";
	});
}

function updateText() {
	document.getElementById("measureButton").innerHTML="measuring ...";
}