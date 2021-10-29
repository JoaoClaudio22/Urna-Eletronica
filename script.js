var seuVoto = document.querySelector(".d1-left span")
var cargo = document.querySelector(".d-1-2 span")
var informacoes = document.querySelector(".d-1-4")
var aviso = document.querySelector(".d-2")
var lateral = document.querySelector(".d1-right")
var numeros = document.querySelector(".d-1-3")

var btn = document.querySelectorAll(".btn-num")
var btnBranco = document.querySelector(".btn-branco")
var btnCorrige = document.querySelector(".btn-corrige")
var btnConfirma = document.querySelector(".btn-confirma")

//Efeito de botão pressionado nas teclas numéricas
for(let i = 0 ; i < btn.length ; i++){
    btn[i].addEventListener("mousedown",() => {
        btn[i].classList.add("btn-numPressionado")
    })
    btn[i].addEventListener("mouseup",() => {
        btn[i].classList.remove("btn-numPressionado")
    })
}

//Efeito de botão pressionado na tecla BRANCO
btnBranco.addEventListener("mousedown",() => {
    btnBranco.classList.add("btn-brancoPressionado")
})
btnBranco.addEventListener("mouseup",() => {
    btnBranco.classList.remove("btn-brancoPressionado")
})

//Efeito de botão pressionado na tecla CORRIGE
btnCorrige.addEventListener("mousedown",() => {
    btnCorrige.classList.add("btn-corrigePressionado")
})
btnCorrige.addEventListener("mouseup",() => {
    btnCorrige.classList.remove("btn-corrigePressionado")
})

//Efeito de botão pressionado na tecla CONFIRMA
btnConfirma.addEventListener("mousedown",() => {
    btnConfirma.classList.add("btn-confirmaPressionado")
})
btnConfirma.addEventListener("mouseup",() => {
    btnConfirma.classList.remove("btn-confirmaPressionado")
})

var etapaAtual = 0
var numero = ""
var branco = false
var confVotos = []


function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ""
    branco = false

    //Adiciona a área destinada ao números
    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0 ){ // Verifica se é o primeiro e adiciona a class 'pisca'
            numeroHtml += '<div class="num pisca"></div>' 
        }else{
            numeroHtml += '<div class="num"></div>' 
        }
        
    }
    
    //Seta o layout inicial da tela
    seuVoto.style.display = "none"
    cargo.innerHTML = etapa.titulo
    informacoes.innerHTML = ""
    aviso.style.display = "none"
    lateral.innerHTML = ""
    numeros.innerHTML = numeroHtml
    
}


function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    //Verifica se o número do candidato é igual ao numero digitado pelo usuário
    let canditado = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true
        }else{
            return false
        }
    })
    //Se houver candidado ( true == 1) então mostra suas informações
    if(canditado.length > 0){
        let etapa = etapas[etapaAtual]
        canditado = canditado[0]
        seuVoto.style.display = "block"
        if(etapas.titulo === "PREFEITO"){ //Precisa de revisão
            informacoes.innerHTML = `Nome: ${canditado.nome}<br/> Partido: ${canditado.partido} <br/> Vice-Prefeito: ${canditado.vice}`
        }else{
            informacoes.innerHTML = `Nome: ${canditado.nome}<br/> Partido: ${canditado.partido}`
        }
        
        aviso.style.display = "block"

        let fotosHtml = ""
        for(let i in canditado.fotos){
            if(canditado.fotos[i].small){ //Verifica se a propriedade 'small' é true (Vice prefeito)
                fotosHtml += `<div class="d1-image small"> <img src="image/${canditado.fotos[i].url}.png" alt="">${canditado.fotos[i].legenda}</div>`
            }else{
                fotosHtml += `<div class="d1-image"> <img src="image/${canditado.fotos[i].url}.png" alt="">${canditado.fotos[i].legenda}</div>`
            }
            
        }
        lateral.innerHTML = fotosHtml
    }else{
        //Caso não exista candidato o voto será NULO
        seuVoto.style.display = "block"
        aviso.style.display = "block"
        informacoes.innerHTML = `<div class="aviso pisca">VOTO NULO</div>`
    }

    console.log("Candidato",canditado)
}

for(let i = 0; i < btn.length ; i++){ // Evento de click no teclado numérico
    btn[i].addEventListener("click", (evt) => {
        var num = evt.target.innerHTML
        var elNumero = document.querySelector(".num.pisca")
        
        //Caso tenha 1 slot piscando
        if(elNumero !== null){
            elNumero.innerHTML = num
            numero = `${numero}${num}`

            elNumero.classList.remove("pisca")
            if(elNumero.nextElementSibling !== null){ //Caso tenha um proximo slot
                elNumero.nextElementSibling.classList.add("pisca") //Proximo slot recebe a class pisca
            }else{ // Caso n tenha slot livre faz a chamada da função para verificar os votos
                atualizaInterface() 
            }
        } 
    })
}
btnBranco.addEventListener("click",(evt) => {
    //Se não tiver nenhum valor digitado na tela o voto será BRANCO
    if(numero === ""){
        branco = true
        seuVoto.style.display = "block"
        numeros.innerHTML = ""
        aviso.style.display = "block"
        informacoes.innerHTML = `<div class="aviso pisca">VOTO EM BRANCO</div>`
    }else{
        //Caso tenha, será mostrado um aviso na tela, orientando o usuário a apagar os numéros antes de votar BRANCO
        alert("Para votar em BRANCO o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o campo de voto. ")   
    }
   
})
//Reinicia a tela -> Botão corrige
btnCorrige.addEventListener("click",(evt) => {
    comecarEtapa()
})

//Confirma os vots -> Botão Confima
btnConfirma.addEventListener("click",(evt) => {
    let etapa = etapas[etapaAtual]
    let votoCofirmado = false

    //Caso tenha votado BRANCO confima o voto
    if(branco === true ){
        confVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "BRANCO"
        })
        votoCofirmado = true
        console.log("Confirmou voto branco")
    }else if(numero.length === etapa.numeros){ //Se a quantidade de numeros digitados pelo usuário, bater com a quantidade de numéros de cada cargo
        confVotos.push({ //Adiciona informações no arrey confVotos, para contabilizar os votos
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        votoCofirmado = true
        console.log("Confirmou voto: "+numero)
    }

    //Caso não seja digitado == cargo, nada a acontece e o usuário fica impedido de continuar 

    //Se o voto for confimado, passa para a próx etapa
    if(votoCofirmado){
        etapaAtual++
        //Caso ainda tenha uma próxima etapa, começa a nova etapa
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{  // Caso não tenha finaliza os votos e mostra a tela FIM
            seuVoto.style.display = "none"
            cargo.innerHTML = ""
            informacoes.innerHTML = `<div class="avisoFim">FIM</div>`
            aviso.style.display = "none"
            lateral.innerHTML = ""
            numeros.innerHTML = ""

            var btnFinal = document.querySelector(".btnFinal")
            btnFinal.style.display = "block"
        }
        console.log(confVotos)
    }
})
comecarEtapa() //Inicializa a tela 






