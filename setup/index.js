var postsArray = []
fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(post => postsArray.push(post));
  })
  .catch(error => console.error(error));

function createCard(post) {
    var dateString = post.date;
    var date = new Date(dateString);
    var formattedDate = date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
    var sourceTypeIconPath = (post.source_type === 'facebook') ? 'icons/facebook.svg' : 'icons/instagram.svg';
    return `
    <div class="card">
        <img src=${post.profile_image} alt="${post.name}">
        <h2>${post.name}</h2>
        <p>${formattedDate}</p>
        <img src="${sourceTypeIconPath}" alt="Source">
        <img src="${post.image}">
        <p>${post.caption}</p>
        <img src="icons\heart.svg" alt="Like">
        <p>${post.likes}</p>
    </div>
    `;
}

const preview = document.querySelector('.preview');
const layout = document.querySelector('.layout-placeholder');
layout.innerHTML="";

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'LOAD MORE'
loadMoreBtn.addEventListener('click', () => {
    for (let i = index; i < index + 4 && i < postsArray.length; i++) {
        layout.innerHTML += createCard(postsArray[i]);
      index++;
    }
    if (index === postsArray.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
  
  preview.appendChild(loadMoreBtn);

let index = 0;

for (let i = 0; i < 4 && i < postsArray.length; i++) {
  layout.innerHTML += createCard(postsArray[i]);
  index++;
}

if (index === postsArray.length) {
  loadMoreBtn.style.display = 'none';
}