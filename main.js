const div = document.getElementById('User');
const photo = document.getElementById('Photo');
const checkbox = document.getElementById('address');
const usersTable = document.getElementById('last-users');
let currentUser = null;
const lastUsers = [];
let sortedUsers = [];
const firstButton = document.getElementById('first');
const lastButton = document.getElementById('last');
const natButton = document.getElementById('nat');
const dateButton = document.getElementById('date');


const locationDivTemplate = (user) => {
  if(user.location) return `\n<div>Location: ${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</div>`;
  return '';
}

const sortByFirst = (prev, next) => prev.name.first.localeCompare(next.name.first);
const sortByLast = (prev, next) => prev.name.last.localeCompare(next.name.last);
const sortByNat = (prev, next) => prev.nat.localeCompare(next.nat);
const sortByDate = (prev, next) => prev.registered.date.localeCompare(next.registered.date);

const sortUsers = (sortingFunc) => {
   sortedUsers = [...lastUsers];
   sortedUsers.sort(sortingFunc);
};

const renderTableSort = () => {
  usersTable.innerHTML = '';
  for (const user of sortedUsers) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name.first}</td>
      <td>${user.name.last}</td>
      <td>${user.nat}</td>
      <td>${new Date(user.registered.date).toLocaleString()}</td>
    `
    usersTable.appendChild(row);
  }}
  
const renderTable = () => {
  usersTable.innerHTML = '';
  for (const user of lastUsers) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name.first}</td>
      <td>${user.name.last}</td>
      <td>${user.nat}</td>
      <td>${new Date(user.registered.date).toLocaleString()}</td>
    `
    usersTable.appendChild(row);
  }
}

const newUser = () => {
  const checked = checkbox.checked;
  fetch(`https://randomuser.me/api/?inc=gender,name,nat,picture,registered${checked ? '' : ',location'}`)
  .then(response => response.json())
  .then(data => {
    if(currentUser) lastUsers.unshift(currentUser);
    if (lastUsers.length > 10) lastUsers.pop();
    const user = data.results[0];
    renderTable();
    div.innerHTML = `
    <div><img src='${user.picture.large}'></div>
    <div>Nationality: ${user.nat}</div>
    <div>Gender: ${user.gender}</div>${locationDivTemplate(user)}
    <div class='sortowanie'>Name: ${user.name.title} ${user.name.first} ${user.name.last}</div>
    <div>Date of registration: ${new Date(user.registered.date).toLocaleString()}</div>
    `
    currentUser = user;
  })};

document.querySelector('.addUser').addEventListener('click', newUser);
firstButton.addEventListener('click', () => {
  sortUsers(sortByFirst);
  renderTableSort();
});
lastButton.addEventListener('click', () => {
  sortUsers(sortByLast);
  renderTableSort();
});
natButton.addEventListener('click', () => {
  sortUsers(sortByNat);
  renderTableSort();
});
dateButton.addEventListener('click', () => {
  sortUsers(sortByDate);
  renderTableSort();
});
