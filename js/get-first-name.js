let firstname;

const submitName = document.getElementById('submit-firstname');



submitName.addEventListener('click', () => {
  
  let firstname = document.getElementById('uName').value

  localStorage.setItem('user', firstname);

  document.location.href = 'Question-1.html';
});