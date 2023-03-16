var postsArray = []
fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(obj => postsArray.push(obj));
  })
  .catch(error => console.error(error));