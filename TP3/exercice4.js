function load_and_render()
{
  var promise = new Promise((resolve,reject) => {
    var xhr = new XMLHttpRequest();
    var obj = {};
    xhr.onload = () => {
      obj = JSON.parse(xhr.responseText);
      n_slides = obj.slides.length
      resolve(obj);
    };
    xhr.open("GET","slides.json",true);
    xhr.send();
  });
  return promise;
}


var timer_id;
var active = 0;
var test_pause = true;
var n_slides;
var div = document.getElementById("MAIN");
var iframe = document.createElement("iframe");
div.appendChild(iframe);



function play(i,test)
{
  load_and_render().then(obj =>{
    active = i;
    if(i < obj.slides.length-1){
        iframe.src = obj.slides[i].url;
        if(test){
            if(i === 0)
                time = 1000*obj.slides[i+1].time;
            else{
              time = 1000*obj.slides[i].time - obj.slides[i-1].time
            }
            timer_id = setTimeout(play.bind(null,i+1,true),time);

        }
    }

})
}

function pause()
{
    if(test_pause){
        clearTimeout(timer_id);
    }
    else{
        setTimeout(play.bind(null,active+1,true),500);
    }
    test_pause = !test_pause;
}

function next()
{
  load_and_render().then(obj =>{
    test_pause = false;
    clearTimeout(timer_id);
    if(active < n_slides-1)
        play(active+1,false);

  });

}

function previous()
{
    load_and_render().then(obj =>{
    test_pause = false;
    clearTimeout(timer_id);
    if(active > 0)
        play(active-1,false);
    else {
      play(n_slides-2,false)
    }
    });
}
