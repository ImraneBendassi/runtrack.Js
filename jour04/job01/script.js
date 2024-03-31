const button = document.getElementById('button');
const paragraph = document.createElement('p');

button.addEventListener('click', () => {
  fetch('expression.txt')
    .then(response => response.text())
    .then(data => {
      paragraph.textContent = data;
      document.body.appendChild(paragraph);
    })
    .catch(error => console.log(error));
});