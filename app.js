$(function() {
  $('#formInput').submit(function(event) {
    event.preventDefault();
    var txtNumbers = event.target.numbers.value;
    var numbers = txtNumbers.split(',');
    if(numbers) {
      var htmlNumber = renderNumbers(numbers);
      $('#result').empty().html(htmlNumber);
    }
  });

  function renderNumbers(numbers) {
    var count = numbers.length;
    var result = `<ul style="width:${70*count};padding-top:120px;overflow-x:auto;">`;
    numbers.forEach(function(item, index) {
      result+=`<li class="block nro-${item}">${item}</li>`;
    });
    result+='</ul>';
    return result;
  }

});
