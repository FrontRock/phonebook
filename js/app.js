const LOCAL_KEY = "users";
const BASE_URL = "http://localhost:3000";
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");
let usersData = null;
const TABLE_HEAD = [
	{
		id: "avatar",
		label: "Avatar",
		value: (value) => {
			return /* html */ `<img src="${value}" alt="user avatar"/>`;
		},
	},
	{
		id: "id",
		label: "#",
	},

	{
		id: "username",
		label: "Username",
	},
	{
		id: "name",
		label: "Name",
	},
	{
		id: "phone",
		label: "Phone Number",
	},
	{
		id: "email",
		label: "Email",
	},
	{
		id: "company",
		label: "Company Name",
	},
	{
		id: "website",
		label: "Website",
	},
	{
		id: "action",
		label: "Action",
	},
];

async function getUsersAsync() {
	try {
		const res = await fetch(BASE_URL + "/users");
		const json = await res.json();
		console.log(json);
		return json;
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: error.message,
			footer: "Why do I have this issue?",
		});
	}
}

async function init() {
	if (!localStorage.hasOwnProperty(LOCAL_KEY)) {
		const users = await getUsersAsync();
		if (users) {
			localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
		}
	}
	try {
		return getLocalData(LOCAL_KEY);
	} catch (error) {}
}

function getLocalData(key) {
	if (localStorage.hasOwnProperty(key)) {
		const localDataString = localStorage.getItem(key);
		return JSON.parse(localDataString);
	} else {
		throw new Error(key + " not found");
	}
}

function renderTableBody() {
	tableBody.innerHTML = "";
	usersData.forEach((userObj) => {
		let tr = /* html */ `<tr>`;

		TABLE_HEAD.forEach(({ id }) => {
			if (id === "action") {
				tr += /* html */ ` 
				<td>
					<button class="edit-btn" onclick="handleEdit(${userObj.id})">Edit</button><button class="delete-btn" onclick="handleDelete(${userObj.id})">Delete</button>
				</td>`;
			} else {
				tr += /* html */ `<td>${userObj[id]}</td>`;
			}
		});
		tr += /* html */ `</tr>`;
		tableBody.innerHTML += tr;
	});
}

function renderTableHeader() {
	tableHead.innerHTML = "";
	let tr = `<tr>`;
	TABLE_HEAD.forEach(({ label }) => {
		tr += /* html */ `<th>${label}</th>`;
	});
	tr += /* html */ `</tr>`;
	tableHead.innerHTML += tr;
}

function handleEdit(id) {
	alert(id);
}
function handleDelete(id) {
	alert(id);
}

async function load() {
	renderTableHeader();
	usersData = await init();
	renderTableBody();
}

load();
