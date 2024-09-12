

document.querySelectorAll('.profile-button').forEach(button => {
  button.addEventListener('click', () => {
    alert(button.textContent.trim());
  });
});


