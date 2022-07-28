/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/




/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const itemsPerPage = 9

function showPage(list, page){
   var startIndex = (page * itemsPerPage)-itemsPerPage;
   var endIndex = page * itemsPerPage
   var studentList = document.querySelector(".student-list")
   studentList.innerHTML = ""; 
   for (let i =0; i<list.length;i++){
      var lisT = list[i]
      if (i >= startIndex && endIndex > i ){
         var studentItem = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${lisT.picture.medium} alt="Profile Picture">
           <h3>${lisT.name.first} ${lisT.name.last}</h3>
           <span class="email">${lisT.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${lisT.registered.date}</span>
         </div>
       </li> `;
       studentList.insertAdjacentHTML('beforeend',studentItem)
      };
   };
};


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let numOfPages = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
     let button = `
         <li>
         <button type="button">${i}</button>
         </li>
       `;
 
     linkList.insertAdjacentHTML('beforeend', button);
     const activeButton = document.querySelector('li button');
     activeButton.className = 'active';
   }
 
   linkList.addEventListener('click', (e) => {
     const button = e.target;
     const pageNumber = button.textContent;
     const activeButton = linkList.querySelector('.active');
     if (e.target.tagName === 'BUTTON') {
       activeButton.className = '';
       button.className = 'active';
       showPage(list, pageNumber);
     }
   });
 
 }
 
// this is a search bar function that help find if the First name and Last name of the student to see if they exists in the list
// if the inputs don't exist then the 'No Result' display appears 
 function searchBar(searchInput, list) {
   let resultArray = [];
   for (let i = 0; i < list.length; i++) {
     const firstName = list[i].name.first.toLowerCase();
     const lastName = list[i].name.last.toLowerCase();
     if (searchInput.value.length !== 0 && firstName.includes(searchInput.value.toLowerCase()) || lastName.includes(searchInput.value.toLowerCase())) {
       resultArray.push(list[i]);
       showPage(resultArray, 1)
       addPagination(resultArray);
     } else if (resultArray.length === 0) {
       document.querySelector('.student-list').innerHTML = 'No Results';
       document.querySelector('.link-list').innerHTML = '';
     };
   };
 };
 
 const search = document.querySelector('#search');
 search.addEventListener('keyup', () => {
   searchBar(search, data);
 });

 
// Call functions
showPage(data, 1);
addPagination(data);
SearchBar();