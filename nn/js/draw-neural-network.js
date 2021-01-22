var vetor = document.getElementById("vetor");
// variáveis de config. da rede:
var num_camadas = 8; // NUMERO DE CAMADAS DA REDE
var neuronios = [25, 15, 15, 20, 15, 10, 5, 2]; // NUMERO DE NEURONIOS EM CADA CAMADA
var cor_neuronios = "#3850B0";
var cor_contorno = "#183090";
var cor_pesos = "#0FF";
var pos_x_neuronios = [];
var pos_y_neuronios = [];
// variáveis para definição do tamanho do vetor:
var screen = document.getElementById("screen");
var svgns = "http://www.w3.org/2000/svg";
var vetor_largura = 700;
var vetor_altura = 700;
// disposição dos neurônios na tela:
var espaco_x_neuronios;
var espaco_y_neuronios;
var x;
var y;
var r_calc;
// função desenha os neurônios:
var c = 0;
function desenhaNeuronios(raio=r_calc){
    r_calc = 10;
    pos_x_neuronios = [];
    pos_y_neuronios = [];
    espaco_x_neuronios = vetor_largura / num_camadas;
    espaco_y_neuronios = vetor_altura / maior(neuronios);
    x = espaco_x_neuronios / 2;
    y = espaco_y_neuronios / 2;
    for(var i = 0; i < neuronios.length; i++){
        y = (vetor_largura - (neuronios[i] * espaco_y_neuronios))/ 2 + (espaco_y_neuronios / 2);
        for(var k = 0; k < neuronios[i]; k++){
            var circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'class', 'neuronio');
            circle.setAttributeNS(null, 'cx', x);
            circle.setAttributeNS(null, 'cy', y);
            circle.setAttributeNS(null, 'r', raio);
            circle.setAttributeNS(null, 'fill', cor_neuronios);
            circle.setAttributeNS(null, 'stroke-width', raio/(raio/2));
            circle.setAttributeNS(null, 'stroke', cor_contorno);
            vetor.appendChild(circle);
            pos_x_neuronios.push(x);
            pos_y_neuronios.push(y);
            y = y + espaco_y_neuronios;
        }
        x = x + espaco_x_neuronios;
    }
}
// desenha linha:
function desenhaLinha(x1=0, y1=0, x2=0, y2=0){
    var line = document.createElementNS(svgns, 'line');
    line.setAttributeNS(null, 'class', 'peso');
    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    line.setAttributeNS(null, 'stroke', cor_pesos);
    line.setAttributeNS(null, 'stroke-width', 2);
    vetor.appendChild(line);
}
// função para desenhar pesos:
function desenhaPesos(){
    var neuro = document.getElementsByClassName("neuronio");
    var x1, y1, x2, y2 = 0;
    c = 0;
    for(var j = 1; j < num_camadas; j++){
        for(var i = 0; i < neuronios[j]; i++){
            x1 = neuro[(neuronios[j-1])+i+c].getAttribute("cx");
            y1 = neuro[(neuronios[j-1])+i+c].getAttribute("cy");
            for(var k = 0; k < neuronios[j-1]; k++){
                x2 = neuro[k+c].getAttribute("cx");
                y2 = neuro[k+c].getAttribute("cy");
                desenhaLinha(x1, y1, x2, y2);
            }
        }
        c = c + neuronios[j-1]
    }
}
// função sobe neurônios para camada de cima:
function desenhaSobre(){
    desenhaNeuronios();
}
// função que retorna o maior valor de uma lista:
function maior(matriz){
    var m = matriz[0];
    for(var i = 0; i < matriz.length; i++){
        if(m < matriz[i]){
            m = matriz[i];
        }
    }
    console.log(m);
    return m;
}
desenhaNeuronios();
desenhaPesos();
desenhaSobre();