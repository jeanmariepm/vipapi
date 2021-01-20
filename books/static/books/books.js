document.addEventListener('DOMContentLoaded', () => {

  // By default, submit button is disabled
  document.querySelector('#submit').disabled = true;
  document.querySelector('#id_comment').value = null

  // Enable button only if there is text in the input field
  document.querySelector('#id_comment').onkeyup = () => {
      if (document.querySelector('#id_comment').value.length > 0)
          document.querySelector('#submit').disabled = false;
      else
          document.querySelector('#submit').disabled = true;
  };


});
