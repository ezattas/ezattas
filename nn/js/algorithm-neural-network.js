// ARQUITETURA DA REDE:
// 10 neurônios sensores
// 5 neurônios de entrada
// 5 neurônios ocultos
// 4 neurônios de saída
// FUNÇÃO PARA MULTIPLICAR ELEMENTOS DE VETOR:
function produtovetor(a, b){
    var soma = [];
    for (var i=0; i < a.length; i++) { // loop para efetuar a soma
        soma.push( parseFloat(a[i]) * parseFloat(b[i]) );
    }
    return soma; // retorna valor da soma
}
// FUNÇÃO  DE SOMA DOS ELEMENTOS DO VETOR:
function somatorio(x){
    var total = 0;
    for (var i = 0; i < x.length; i++){
        total += x[i];
    }
    return total;
}
// FUNÇÃO PARA GERAR VALORES ALEATÓRIOS:
function uniform(){
    return Math.random( );
}
// FUNÇÃO DE ATIVAÇÃO 1:
function tangenteHiperbolica(x){
    var th = (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    return th;
}
// FUNÇÃO DE ATIVAÇÃO 2:
function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}
// DEFINIÇÃO DE VARIÁVEIS E CONFIG. DA REDE:
var num_neuronios_sensores = 10;
var num_neuronios_entrada = 5;
var num_neuronios_oculto = 5;
const num_neuronios_saida = 1;
// CRIAÇÃO DOS NEURÔNIOS E PESOS DA REDE:
var X = []; // neurônios da camada de sensores
var E = []; // neurônios da camada de entrada
var O = []; // neurônios da camada oculta
var S = []; // neurônios de saída
var WEX = []; // pesos da camada de entrada
var WOE = []; // pesos da camada oculta
var WSO = []; // pesos da camada de saída
var vazio = [];
var matriz = [];
// OUTROS ELEMENTOS DA REDE:
var B = 1; // valor da constante bias (vies)
var custo = 0; // valor da taxa de custo
// INICIALIZAÇÃO DOS PESOS:
// =============== PESOS DE ENTRADA ==================//
for(var i = 0; i < num_neuronios_entrada; i++){
    WEX.push(vazio);
}
for(var i = 0; i < num_neuronios_entrada; i++){
    for(var j = 0; j < num_neuronios_sensores; j++){
        matriz.push(uniform()) // camada de entrada
    }
    WEX[i] = matriz;
    matriz = [];
}
// =============== PESOS DA OCULTA ==================//
for(var i = 0; i < num_neuronios_oculto; i++){
    WOE.push(vazio);
}
for(var i = 0; i < num_neuronios_oculto; i++){
    for(var j = 0; j < num_neuronios_entrada; j++){
        matriz.push(uniform()) // camada oculta
    }
    WOE[i] = matriz;
    matriz = [];
}
// =============== PESOS DE SAÍDA ==================//
for(var i = 0; i < num_neuronios_saida; i++){
    WSO.push(vazio);
}
for(var i = 0; i < num_neuronios_saida; i++){
    for(var j = 0; j < num_neuronios_oculto; j++){
        matriz.push(uniform()) // camada saida
    }
    WSO[i] = matriz;
    matriz = [];
}
// FUNÇÃO DEFINE ENTRADA:
function dados(){
    // definição dos valores dos neurônios de entrada:
    X = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}
// ALGORITMO DE PROPAGAÇÃO DOS DADOS PELA REDE:
function feedfoward(){
    var t;
    let s;
    // valores dos neurônio da camada de entrada:
    for(var j = 0; j < num_neuronios_entrada; j++){
        s = 0
        t = []
        t = produtovetor(X, WEX[j])
        for(let i = 0; i < t.length; i++){
            s += t[i];
        }
        E[j] = tangenteHiperbolica(s);
    }
    // valores dos neurônio da camada d oculta:
    for(var j = 0; j < num_neuronios_oculto; j++){
        s = 0
        t = []
        t = produtovetor(E, WOE[j])
        for(let i = 0; i < t.length; i++){
            s += t[i];
        }
        O[j] = tangenteHiperbolica(s);
    }
    // valores dos neurônio da camada de saída:
    for(var j = 0; j < num_neuronios_saida; j++){
        s = 0
        t = []
        t = produtovetor(O, WSO[j])
        for(let i = 0; i < t.length; i++){
            s += t[i];
        }
        S[j] = sigmoid(s);
    }
}
// ATUALIZAÇÃO E AJUSTE DOS PESOS (MEMÓRIA):
function atualizaPesos(erro, alpha=0.01){
    var entrada;// variáveis locais
    // atualização dos pesos da camada de saida:
    for (var i = 0; i < num_neuronios_saida; i++){
        for(var j = 0; j < num_neuronios_oculto; j++){
            entrada = O[j];
            WSO[i][j] = WSO[i][j] + (alpha * entrada * erro) // atualização do peso
        }
    }
    // atualização dos pesos da camada oculta:
    for (var i = 0; i < num_neuronios_oculto; i++){
        for(var j = 0; j < num_neuronios_entrada; j++){
            entrada = E[j];
            WOE[i][j] = WOE[i][j] + (alpha * entrada * erro) // atualização do peso
        }
    }
    // atualização dos pesos da camada de entrada:
    for (var i = 0; i < num_neuronios_entrada; i++){
        for(var j = 0; j < num_neuronios_sensores; j++){
            entrada = X[j];
            WEX[i][j] = WEX[i][j] + (alpha * entrada * erro) // atualização do peso
        }
    }
    custo = 0; // reseta o custo;
}
// CRIAÇÃO DA FUNÇÃO PRINCIPAL DA REDE NEURAL:
function redeneural(){
    dados(); // atualiza os dados
    feedfoward(); // recebe o valor da saída
    atualizaPesos(custo, 0.01); // backpropagation dos pesos
}
redeneural();
console.log(S)