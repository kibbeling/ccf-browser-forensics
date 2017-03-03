

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