const url = 'https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json'


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function firstUpperCaseForEachWord(string){
    let stringToArray = string.split(' ')
    let stringConcat = ''
    stringToArray.map((word) => { 

        stringConcat += (word[0].toUpperCase() + word.substring(1) + ' ')
        return stringConcat; 
    }).join(" ");

    return stringConcat
}


var inverval_timer;

inverval_timer = setInterval(function() { 
    Apuracao()
}, 4000);


const Apuracao = ()=>{

    

    fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{
        

        const candidatos = data.cand //array
        
        let bolsonaroObj = candidatos.find(obj=>{
            return obj.n === '22'
        })

        let lulaObj = candidatos.find(obj=>{
            return obj.n === '13'
        })
        
        document.querySelector('#nm-bolsonaro').textContent = firstUpperCaseForEachWord(bolsonaroObj.nm.toLowerCase())
        document.querySelector('#nm-lula').textContent = firstUpperCaseForEachWord(lulaObj.nm.toLowerCase())

        document.querySelector('#vice-bolsonaro').textContent = firstUpperCaseForEachWord(bolsonaroObj.nv.toLowerCase())
        document.querySelector('#vice-lula').textContent = firstUpperCaseForEachWord(lulaObj.nv.toLowerCase())

        document.querySelector('#vap-bolsonaro').textContent = parseInt(bolsonaroObj.vap).toLocaleString('pt-BR')
        document.querySelector('#pvap-bolsonaro').textContent = bolsonaroObj.pvap + '%' 

        document.querySelector('#vap-lula').textContent = parseInt(lulaObj.vap).toLocaleString('pt-BR')
        document.querySelector('#pvap-lula').textContent = lulaObj.pvap + '%'

        document.querySelector('#update-time').textContent = `${data.dg} às ${data.hg}`


        document.querySelector('#update-count').textContent = parseInt(document.querySelector('#update-count').textContent) + 1


        if(parseFloat(bolsonaroObj.pvap) > parseFloat(lulaObj.pvap)){
            document.querySelector('#card-lula').classList.remove('vencendo')
            document.querySelector('#card-bolsonaro').classList.add('vencendo')
        }else{
            document.querySelector('#card-lula').classList.add('vencendo')
            document.querySelector('#card-bolsonaro').classList.remove('vencendo')
        }

        if(parseFloat(bolsonaroObj.pvap) == parseFloat(lulaObj.pvap)){
            document.querySelector('#card-lula').classList.remove('vencendo')
            document.querySelector('#card-bolsonaro').classList.remove('vencendo')
        }

    }).catch(
        err=>console.log(err)
    )
}

Apuracao()