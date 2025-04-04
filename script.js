// this is the function thaty encrypts the passowerd using basic base 64 encryption

function encrypt(text) {
    return btoa(text);

}
// this is the functiopn that will decrpyt the passwords for when its needed 
function decrypt(text){
    return atob(text);
}
// function to save the passwords
document.getElementById("saveBtn").addEventListener("click", savePassword);

function savePassword() {
    let websiteInput = document.getElementById("website");
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    if (!websiteInput || !usernameInput || !passwordInput) {
        console.error("One or more input fields are missing!");
        return;
    }

    let website = websiteInput.value;
    let username = usernameInput.value;
    let password = passwordInput.value;

    if (!website || !username || !password) {
        alert("All fields are required!");
        return;
    }

    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push({ website, username, password });

    localStorage.setItem("passwords", JSON.stringify(passwords));

    alert("Password saved!");
    displayPasswords();
}

function displayPasswords() {
    let passwordTable = document.getElementById("passwordTable");

    if (!passwordTable) {
        console.error("Password table element is missing!");
        return;
    }

    passwordTable.innerHTML = "";
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    if (!Array.isArray(passwords)) {
        console.error("Stored passwords data is not an array!");
        passwords = [];  // Reset to empty array
    }

    passwords.forEach((entry, index) => {
        let row = `<tr>
            <td>${entry.website}</td>
            <td>${entry.username}</td>
            <td>****** <button onclick="togglePassword(${index})">Show</button></td>
            <td><button onclick="deletePassword(${index})">Delete</button></td>
        </tr>`;
        passwordTable.innerHTML += row;
    });
}

//this will be the function to toggle the passwords visibility 
function togglePasswords(index){
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    let passwordSpan = document.getElementById(`pass-${index}`);



    if (passwordSpan.innerText === "*******"){
        passwordSpan.innerText = decrypt(passwords[index].password);
    }else{
        [passwordSpan.innerText = "*******"];

    }
}


//this function will be used to delete password entry

function deletePassword(index){
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayPasswords();
}

// this will display the passwords when the page loads 
window.onload = displayPasswords;
