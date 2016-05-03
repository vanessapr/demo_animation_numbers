$(function() {
  $('#formInput').submit(function(event) {
    event.preventDefault();
    var txtNumbers = event.target.numbers.value;

    if(validate(txtNumbers)) {
      var numbers = txtNumbers.split(',');
      var htmlNumber = renderNumbers(numbers);
      $('#result').empty().html(htmlNumber);
      generate_animation(numbers);
    } else {
      alert('Entrada no válida');
    }
  });

  function validate(txtNumbers) {
    var bool = false;
    var patron = /^(\d+,)*\d+$/;
    if(patron.test(txtNumbers)) {
      var numbers = txtNumbers.split(',');
      var count = numbers.length;
      bool = true;
      for (var i = 0; i < count-1; i++) {
        for (var j = i+1; j < count; j++) {
          if(numbers[i] === numbers[j]) {
            bool = false;
            break;
          }
        }
      }

    }

    return bool;
  }

  function renderNumbers(numbers) {
    var count = numbers.length;
    var result = `<ul style="width:${70*count}px;padding-top:120px;overflow-x:auto;">`;
    numbers.forEach(function(item, index) {
      result+=`<li class="block nro-${item}">${item}</li>`;
    });
    result+='</ul>';
    return result;
  }

  function generate_animation(data) {
    var temp, band;
    var animations = [];

    for (var i = 0; i < data.length; i++) {
      temp = Number(data[i]);
      band = -1;
      var children = [];
      var newObject = {};

      for (var j = i-1; j>=0; j--) {
          if(temp < Number(data[j])) {
            band = j;
            children.push(`li.block.nro-${data[j]}`);
            data[j+1] = data[j];
          }
      }

      if(band !== -1){
        data[band] = temp;
      }

      newObject.parent = `li.block.nro-${temp}`;
      newObject.children = children;
      animations.push(newObject);
    }

    animation(animations, 0);
  }

  function animation(animations, index){
    if(animations[index]) {
      var top = animations[index].children.length !== 0 ? 110: 0;

      $(animations[index].parent).animate({
        borderColor: '#ff0000'
      }, 500).animate({
        borderColor:'transparent'
      }, 500)
      .animate({
        borderColor:'#ff0000'
      }, 500)
      .animate({
        top:`-=${top}px`
      }).promise().done(function() {
        moverLeft(animations[index].parent, animations[index].children, 0, function(){ animation(animations, index + 1)} );
      });
    }
  }

  function moverLeft(parent, toAnimate, i, cb){
    if(toAnimate[i]) {
      $(toAnimate[i]).animate({
          left: '+=70'
      }).promise().done(function() {
        moverLeft(parent, toAnimate, i+1, cb);
      });
    } else {
      var count = toAnimate.length;
      var top = count !== 0? 110:0;

      $(parent).animate({
        top: `+=${top}px`,
        left: `-=${count*70}px`
      }, 800).animate({
        borderColor:'#000'
      })
      .promise().done(function() {
          cb();
      });
    }
  }

});
