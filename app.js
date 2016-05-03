$(function() {
  $('#formInput').submit(function(event) {
    event.preventDefault();
    var txtNumbers = event.target.numbers.value;
    var numbers = txtNumbers.split(',');
    if(numbers) {
      console.log('numbers', numbers)
    }
  });
});
