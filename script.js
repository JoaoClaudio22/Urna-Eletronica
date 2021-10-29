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


var etapaAtual = 0
var numero = ""
var branco = false
var confVotos = []


function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ""
    branco = false

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0 ){
            numeroHtml += '<div class="num pisca"></div>' 
        }else{
            numeroHtml += '<div class="num"></div>' 
        }
        
    }
    
    seuVoto.style.display = "none"
    cargo.innerHTML = etapa.titulo
    informacoes.innerHTML = ""
    aviso.style.display = "none"
    lateral.innerHTML = ""
    numeros.innerHTML = numeroHtml
    
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let canditado = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true
        }else{
            return false
        }
    })

    if(canditado.length > 0){
        let etapa = etapas[etapaAtual]
        canditado = canditado[0]
        seuVoto.style.display = "block"
        if(etapas.titulo === "PREFEITO"){
            informacoes.innerHTML = `Nome: ${canditado.nome}<br/> Partido: ${canditado.partido} <br/> Vice-Prefeito: ${canditado.vice}`
        }else{
            informacoes.innerHTML = `Nome: ${canditado.nome}<br/> Partido: ${canditado.partido}`
        }
        
        aviso.style.display = "block"

        let fotosHtml = ""
        for(let i in canditado.fotos){
            if(canditado.fotos[i].small){
                fotosHtml += `<div class="d1-image small"> <img src="image/${canditado.fotos[i].url}.png" alt="">${canditado.fotos[i].legenda}</div>`
            }else{
                fotosHtml += `<div class="d1-image"> <img src="image/${canditado.fotos[i].url}.png" alt="">${canditado.fotos[i].legenda}</div>`
            }
            
        }

        lateral.innerHTML = fotosHtml
    }else{
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
        
        if(elNumero !== null){
            elNumero.innerHTML = num
            numero = `${numero}${num}`

            elNumero.classList.remove("pisca")
            if(elNumero.nextElementSibling !== null){
                elNumero.nextElementSibling.classList.add("pisca")
            }else{
                atualizaInterface()
            }
        } 
    })
}

btnBranco.addEventListener("click",(evt) => {

    if(numero === ""){
        branco = true
        seuVoto.style.display = "block"
        numeros.innerHTML = ""
        aviso.style.display = "block"
        informacoes.innerHTML = `<div class="aviso pisca">VOTO EM BRANCO</div>`
    }else{
        alert("Para votar em BRANCO o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o campo de voto. ")   
    }
   
})

btnCorrige.addEventListener("click",(evt) => {
    comecarEtapa()
})

btnConfirma.addEventListener("click",(evt) => {
    let etapa = etapas[etapaAtual]

    let votoCofirmado = false
    if(branco === true ){
        confVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "BRANCO"
        })
        votoCofirmado = true
        console.log("Confirmou voto branco")
    }else if(numero.length === etapa.numeros){
        confVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        votoCofirmado = true
        console.log("Confirmou voto: "+numero)
    }

    if(votoCofirmado){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
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




comecarEtapa()






