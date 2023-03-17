var postsArray = []
fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(post => postsArray.push(post));
    renderPosts(4);
  })
  .catch(error => console.error(error));

const preview = document.querySelector('.preview');
const layout = document.querySelector('.layout');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'LOAD MORE'
let index = 4;

function createCard(post, postId) {
  var dateString = post.date;
  var tempDate = new Date(dateString);
  var formattedDate = tempDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  var sourceTypeIconPath = (post.source_type === 'facebook') ? 'icons/facebook.svg' : 'icons/instagram.svg';
  const cardElement = document.createElement('div');

  var liked = false;
  cardElement.classList.add('card');
  const profileImg = document.createElement('img');
  profileImg.src = post.profile_image;
  profileImg.alt = post.name;
  profileImg.classList.add("profile-picture");
  const nameHeading = document.createElement('h2');
  nameHeading.textContent = post.name;
  const date = document.createElement('p');
  date.textContent = formattedDate;
  const sourceTypeImg = document.createElement('img');
  sourceTypeImg.src = sourceTypeIconPath;
  sourceTypeImg.alt = 'Source';
  const postImg = document.createElement('img');
  postImg.src = post.image;
  postImg.alt = 'Content'
  postImg.classList.add("post-image");
  const caption = document.createElement('p');
  caption.textContent = post.caption;
  const likeIcon = document.createElement('img');
  likeIcon.src = 'icons/heart.svg';
  likeIcon.alt = 'Like';
  likeIcon.addEventListener('click', () => {
    likeIcon.classList.toggle('liked');
    if(!liked) {
      likesCount.textContent = post.likes;
    } else {
      likesCount.textContent = post.likes+1;
    }
  });
  const likesCount = document.createElement('p');
  likesCount.textContent = post.likes;
  cardElement.appendChild(profileImg);
  cardElement.appendChild(nameHeading);
  cardElement.appendChild(date);
  cardElement.appendChild(sourceTypeImg);
  cardElement.appendChild(postImg);
  cardElement.appendChild(caption);
  cardElement.appendChild(likeIcon);
  cardElement.appendChild(likesCount);
  return cardElement;
}

function renderPosts(numPosts) {
  for (let i = 0; i < numPosts && i < postsArray.length; i++) {
    layout.appendChild(createCard(postsArray[i], i));
  }
  if (numPosts >= postsArray.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}


loadMoreBtn.addEventListener('click', () => {
  for (let i = index; i < index + 4 && i < postsArray.length; i++) {
    layout.appendChild(createCard(postsArray[i], i));
    index++;
  }
  if (index === postsArray.length) {
    loadMoreBtn.style.display = 'none';
  }
});
preview.appendChild(loadMoreBtn);


for (let i = 0; i < 4 && i < postsArray.length; i++) {
  layout.appendChild(createCard(postsArray[i], i));
  index++;
}