// obtendo o tamanho da tela:
var w = window;
var x = w.innerWidth;
var y = w.innerHeight;
// definindo o tamanho das seções:
var first = document.getElementsByClassName("seção");
for(var i = 0; i < 3; i++){
    first[i].style.height = y + 'px';
}
function home(){
    window.location.href = "zetta.html";
}