var mainBox = document.createElement('div');
	mainBox.style.position =  'fixed';
	mainBox.style.opacity = '0';
	mainBox.style.visibility = 'hidden';
	mainBox.style.background =  'rgba(0, 0, 0, 0.9)';
	mainBox.style.width =  '400px';
	mainBox.style.height =  '200px';
	mainBox.style.borderRadius = "10px";
	mainBox.id =  'mainBox';
	mainBox.classList = 'btn-menu';
	mainBox.style.zIndex = '9999';
	mainBox.style.bottom = '10px';
	mainBox.style.left = '20px';
	mainBox.style.transition = "0.5s";
	mainBox.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.7)";
	mainBox.innerHTML = "<span></span><span></span><span></span><span></span>";
	document.body.appendChild(mainBox);
//
var restoreBtn = document.createElement('b');
	restoreBtn.style.position =  'fixed';
	restoreBtn.style.opacity = '1';
	restoreBtn.style.visibility = 'visible';
	restoreBtn.style.background =  'rgba(0, 0, 0, 0.9)';
	restoreBtn.style.padding =  '20px';
	restoreBtn.style.borderRadius = "10px";
	restoreBtn.classList = 'btn-menu';
	restoreBtn.style.zIndex = '9999';
	restoreBtn.style.bottom = '10px';
	restoreBtn.style.left = '20px';
	restoreBtn.id = 'restoreBtn';
	restoreBtn.style.transition = "0.5s";
	restoreBtn.style.cursor = "pointer";
	restoreBtn.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.7)";
	restoreBtn.innerHTML = "<span></span><span></span><span></span><span></span>";
	restoreBtn.onclick = mainBoxShowHidden;
	restoreBtn.innerHTML = '&#9851;';
	document.body.appendChild(restoreBtn);
//
var btn = document.createElement('b');
	btn.innerHTML = "<span></span><span></span><span></span><span></span>&#10006;";
	btn.classList = "btn-menu btn-close";
	btn.onclick = mainBoxShowHidden;
	mainBox.appendChild(btn);
//
var btn = document.createElement('button');
	btn.innerHTML = "<span></span><span></span><span></span><span></span>Bárbaros";
	btn.classList = "btn-menu";
	btn.onclick = resBarb;
	mainBox.appendChild(btn);
//
var btn = document.createElement('button');
	btn.innerHTML = "<span></span><span></span><span></span>exibirProducao";
	btn.classList = "btn-menu";
	btn.onclick = exibirProducao;
	mainBox.appendChild(btn);
//
var btn = document.createElement('button');
	btn.innerHTML = "<span></span><span></span><span></span><span></span>Building Disponível";
	btn.classList = "btn-menu";
	btn.onclick = buildingTime;
	mainBox.appendChild(btn);
//
var hr = document.createElement('hr');
mainBox.appendChild(hr);

/* $(ikariam.getScreen().selectBarbarianVillage(
	document.getElementById("barbarianVillage"))).ready(function(){
		alert('o')
	}); 
*/

/* SOMA DE RECURSOS PILHAGEM DE BÁRBAROS */
function resBarb(){
	
	document.getElementById("barbarianVillage").click();
	setTimeout(()=>{
		var recursos = document.getElementsByClassName('resources')[1].children
		var resultado = 0;
		var arr = [];
		for (let item of recursos){
			if(!item.classList.contains("gold")){
				arr.push(item.innerHTML.replace(",",""));
				resultado = Number(resultado) + Number(item.innerHTML.replace(",",""));
			}
		}
		if(document.getElementById('textResultado') != null){
			var textResultado = document.getElementById('textResultado');
			textResultado.innerHTML = " # "+resultado+" Recursos => ( "+Math.ceil(resultado/500)+" barcos )";
		}else{
			var textResultado = document.createElement('b');
			textResultado.style.color = 'white';
			textResultado.id = 'textResultado';
			textResultado.innerHTML = " # "+resultado+" Recursos => ( "+Math.ceil(resultado/500)+" barcos )";
			mainBox.appendChild(textResultado);
		}
		
	}, 2000);
	
	/* 
	$(ikariam.getScreen().selectBarbarianVillage(document.getElementById("barbarianVillage"))).ready(function(){
		var recursos = document.getElementsByClassName('resources')[1].children
		var resultado = 0;
		var arr = [];
		for (let item of recursos){
			if(!item.classList.contains("gold")){
				arr.push(item.innerHTML.replace(",",""));
				resultado = Number(resultado) + Number(item.innerHTML.replace(",",""));
			}
		}
		alert(resultado);
	}); 
	*/
	
}


function decimalToTime(decimal){
	if(Number(decimal) == NaN){
		alert('error')
		return;
	}
	let segundos = decimal*3600;
	let dias = Math.floor(segundos/86400);
	let diasResto = segundos % 86400;
	let horas = Math.floor(diasResto/3600)
	let horasResto = segundos % 3600;
	let minutos = Math.floor(horasResto / 60);
	
	return {dias: dias, horas: horas, minutos: minutos};
}
function CMStats(){
	try {
			//let habitantes = Number(document.getElementById('js_TownHallOccupiedSpace').innerHTML.replace(",",""));
			let maxHabitantes = Number(document.getElementById('js_TownHallMaxInhabitants').innerHTML.replace(",",""));
			//let crescimentoPH = Number(document.getElementById('js_TownHallPopulationGrowthValue').innerHTML.replace(",",""));
			let satisfacao = Number(document.getElementById('js_TownHallHappinessLargeValue').innerHTML.replace(",",""));
			
			let baseBonus = document.getElementById('js_TownHallSatisfactionOverviewBaseBoniBaseBonusValue');
			if(!baseBonus.parentElement.classList.contains('invisible')){
				baseBonus = Number(baseBonus.innerHTML.replace(",",""));
			}else{
				baseBonus = 0;
			}

			let baseBonusCapital = document.getElementById('js_TownHallSatisfactionOverviewBaseBoniCapitalBonusValue');
			if(!baseBonusCapital.parentElement.classList.contains('invisible')){
				baseBonusCapital = Number(baseBonusCapital.innerHTML.replace(",",""));
			}else{
				baseBonusCapital = 0;
			}

			let wineBonusTaverna = document.getElementById('js_TownHallSatisfactionOverviewWineBoniTavernBonusValue');
			if(!wineBonusTaverna.parentElement.classList.contains('invisible')){
				wineBonusTaverna = Number(wineBonusTaverna.innerHTML.replace(",",""));
			}else{
				wineBonusTaverna = 0;
			}

			let wineBonusServido = document.getElementById('js_TownHallSatisfactionOverviewWineBoniServeBonusValue');
			if(!wineBonusServido.parentElement.classList.contains('invisible')){
				wineBonusServido = Number(wineBonusServido.innerHTML.replace(",",""));
			}else{
				wineBonusServido = 0;
			}
			
			let bonusSatisfacao = baseBonus + baseBonusCapital + wineBonusTaverna + wineBonusServido;
			//let tempoParaLotar = (maxHabitantes - habitantes) / crescimentoPH
			let tempoParaLotar = 50*Math.log(satisfacao/(bonusSatisfacao-maxHabitantes));

			let aviso = '';
			if(tempoParaLotar < 0 ){
				aviso = '-E-'
			}
			let tempo = decimalToTime(Math.abs(tempoParaLotar));

			if(document.getElementById('textResultado') != null){
				let textResultado = document.getElementById('textResultado');
				textResultado.innerHTML = "<br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M "+aviso+"<br>";
			}else{
				let textResultado = document.createElement('b');
				textResultado.id = 'textResultado';
				textResultado.innerHTML = "<br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M "+aviso+"<br>";
				document.getElementsByClassName('space')[0].appendChild(textResultado);
			}
	} catch (error) {
		alert((error));
	}


}
function buildingTime(){
	document.getElementById('buildingUpgrade').style.height = "auto";
	exibirProducao();
	let resourceElement = '';
	for( let item of document.getElementsByClassName('resources')){
		if(item.parentElement.id == 'buildingUpgrade'){
			resourceElement = item;
		}
	}

	for(let item of resourceElement.childNodes){
		if(typeof(item.classList) != 'undefined')
		if(item.classList.contains('wood')){
			let nesc = Number((item.innerText.replace(",","").split(":"))[1]);	
			let producao = Number(document.getElementById('js_GlobalMenu_resourceProduction').innerHTML.replace(",",""));
			let estoque = Number(document.getElementById('js_GlobalMenu_wood').innerHTML.replace(",",""));
			if(estoque > nesc)
				continue;
			let tempo = decimalToTime((nesc - estoque) / producao);
			
			if(document.getElementById('buildingTimeCalcMadeira') != null){
				let txt = document.getElementById('buildingTimeCalcMadeira');
				txt.innerHTML = "<br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
			}else{
				let txt = document.createElement('b');
				txt.id = 'buildingTimeCalcMadeira';
				txt.style.fontSize = '10px';
				txt.innerHTML = "<img width='13px' src='//gf2.geo.gfsrv.net/cdn19/c3527b2f694fb882563c04df6d8972.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				document.getElementById('buildingUpgrade').appendChild(txt);
			}
		}else
		if(item.classList.contains('marble')){
			let nesc = Number((item.innerText.replace(",","").split(":"))[1]);
			let producao = Number(document.getElementById('js_GlobalMenu_production_marble').innerHTML.replace(",",""));
			let estoque = Number(document.getElementById('js_GlobalMenu_marble').innerHTML.replace(",",""));
			if(estoque > nesc)
				continue;
			let tempo = decimalToTime((nesc - estoque) / producao);
			
			if(document.getElementById('buildingTimeCalcMarmore') != null){
				document.getElementById('buildingTimeCalcMarmore').innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_marble.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
			}else{
				let txt = document.createElement('b');
				txt.id = 'buildingTimeCalcMarmore';
				txt.style.fontSize = '10px';
				txt.innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_marble.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				document.getElementById('buildingUpgrade').appendChild(txt);
			}
		}else
		if(item.classList.contains('wine')){
			let nesc = Number((item.innerText.replace(",","").split(":"))[1]);
			let producao = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",",""));
			let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",",""));
			if(estoque > nesc)
				continue;
			let tempo = decimalToTime((nesc - estoque) / producao);
			
			if(document.getElementById('buildingTimeCalcVinho') != null){
				document.getElementById('buildingTimeCalcVinho').innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_wine.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
			}else{
				let txt = document.createElement('b');
				txt.id = 'buildingTimeCalcVinho';
				txt.style.fontSize = '10px';
				txt.innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_wine.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				document.getElementById('buildingUpgrade').appendChild(txt);
			}
		}else
		if(item.classList.contains('glass')){
			let nesc = Number((item.innerText.replace(",","").split(":"))[1]);
			let producao = Number(document.getElementById('js_GlobalMenu_production_crystal').innerHTML.replace(",",""));
			let estoque = Number(document.getElementById('js_GlobalMenu_crystal').innerHTML.replace(",",""));
			if(estoque > nesc)
				continue;
			let tempo = decimalToTime((nesc - estoque) / producao);
			
			if(document.getElementById('buildingTimeCalcCristal') != null){
				document.getElementById('buildingTimeCalcCristal').innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_glass.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
			}else{
				let txt = document.createElement('b');
				txt.id = 'buildingTimeCalcCristal';
				txt.style.fontSize = '10px';
				txt.innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_glass.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				document.getElementById('buildingUpgrade').appendChild(txt);
			}
		}else
		if(item.classList.contains('sulfur')){
			let nesc = Number((item.innerText.replace(",","").split(":"))[1]);
			let producao = Number(document.getElementById('js_GlobalMenu_production_sulfur').innerHTML.replace(",",""));
			let estoque = Number(document.getElementById('js_GlobalMenu_sulfur').innerHTML.replace(",",""));
			if(estoque > nesc)
				continue;
			let tempo = decimalToTime((nesc - estoque) / producao);
			
			if(document.getElementById('buildingTimeCalcEnxofre') != null){
				document.getElementById('buildingTimeCalcEnxofre').innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_sulfur.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
			}else{
				let txt = document.createElement('b');
				txt.id = 'buildingTimeCalcEnxofre';
				txt.style.fontSize = '10px';
				txt.innerHTML = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_sulfur.png'> "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				document.getElementById('buildingUpgrade').appendChild(txt);
			}
		}
	}

}
function exibirProducao(){
	let producaoMadeira = Number(document.getElementById('js_GlobalMenu_resourceProduction').innerHTML.replace(",",""));
	let producaoMarmore = Number(document.getElementById('js_GlobalMenu_production_marble').innerHTML.replace(",",""));
	let producaoVinho = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",",""));
	let consumoVinho = Number(document.getElementById('js_GlobalMenu_WineConsumption').innerHTML.replace(",",""));
	let producaoCristal = Number(document.getElementById('js_GlobalMenu_production_crystal').innerHTML.replace(",",""));
	let producaoEnxofre = Number(document.getElementById('js_GlobalMenu_production_sulfur').innerHTML.replace(",",""));
	let producaoGold = Number(document.getElementById('js_GlobalMenu_gold_Calculation').innerHTML.replace(",",""));
	$('.producaoLabel').remove()
	document.getElementById('js_GlobalMenu_gold').innerHTML += ' <span class="producaoLabel '+((producaoGold) > 0 ? 'positivo' : 'negativo')+'">('+producaoGold+')</span>';

	let cityResources = document.getElementById('cityResources')
	cityResources.getElementsByClassName('resources')[0].childNodes.forEach(element => {
		if(typeof(element.classList) != 'undefined'){
			if(element.classList.contains('wood')){
				element.innerHTML += '<span class="producaoLabel '+((producaoMadeira) > 0 ? 'positivo' : 'negativo')+'">('+producaoMadeira+')</span>';
			}
			if(element.classList.contains('wine')){
				let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",",""));
				let tempoPraZerar = '';
				if((producaoVinho-consumoVinho) < 0 ){
					tempoPraZerar = decimalToTime(estoque / Math.abs(producaoVinho-consumoVinho))
					stringTempo = tempoPraZerar.dias+'D '+tempoPraZerar.horas+'H '+tempoPraZerar.minutos+'M';
					document.getElementById('js_GlobalMenu_wine_tooltip').getElementsByTagName('tbody')[0].innerHTML += '<tr id="js_GlobalMenu_production_wine_tempoPraZerar" class="producaoLabel"><td class="smallFont" >Tempo até zerar</td><td class="rightText" id="js_GlobalMenu_production_wine_tempoPraZerar_value">'+stringTempo+'</td></tr>';
				}
				element.innerHTML += '<span class="producaoLabel '+((producaoVinho-consumoVinho) > 0 ? 'positivo' : 'negativo')+'">('+(producaoVinho-consumoVinho)+')</span>';
			}
			if(element.classList.contains('marble')){
				element.innerHTML += '<span class="producaoLabel '+((producaoMarmore) > 0 ? 'positivo' : 'negativo')+'">('+producaoMarmore+')</span>';
			}
			if(element.classList.contains('glass')){
				element.innerHTML += '<span class="producaoLabel '+((producaoCristal) > 0 ? 'positivo' : 'negativo')+'">('+producaoCristal+')</span>';
			}
			if(element.classList.contains('sulfur')){
				element.innerHTML += '<span class="producaoLabel '+((producaoEnxofre) > 0 ? 'positivo' : 'negativo')+'">('+producaoEnxofre+')</span>';
			}
		}
	});

}
function mainBoxShowHidden(){
	let mainBox = document.getElementById('mainBox');
	let restoreBtn = document.getElementById('restoreBtn');
	if(mainBox.style.opacity == '0'){
		mainBox.style.opacity = '1'
		mainBox.style.visibility = 'visible';
		restoreBtn.style.visibility = 'hidden';
		restoreBtn.style.opacity = '0'
	}else{
		mainBox.style.opacity = '0'
		mainBox.style.visibility = 'hidden';
		restoreBtn.style.visibility = 'visible';
		restoreBtn.style.opacity = '1'
	}
}
exibirProducao();
var config = {childList: true, subtree: true };
var callback = function(mutationList, observer) {
    for (var mutation of mutationList) {
        if (mutation.type === 'childList') {
			if ( mutation.target.id == "townHall_c" ) {
				$(mutation.target).ready(CMStats);
			}
			if ( mutation.target.id == "sidebar" ) {
				$(mutation.target).ready(buildingTime);
			}
        }
    }
};
function notifyExtension() {
	browser.runtime.sendMessage({msg: 'Vai lá chehcar, bucha!!', title: 'Algo Aconteceu!'});
	return;
}
try {
	var notifyAudio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-sci-fi-confirmation-914.wav");
	//notifyAudio.play();
	//document.getElementById('advCities').addEventListener("click", notifyExtension);
	var btn = document.createElement('b');
	btn.innerHTML = ' # OK';
	mainBox.appendChild(btn);
} catch (error) {
	var btn = document.createElement('b');
	btn.innerHTML = (error)+' # Error';
	mainBox.appendChild(btn);
}

var notify = new MutationObserver(notifyExtension);
notify.observe(document.getElementById('advCities'), config);

var observer = new MutationObserver(callback);
observer.observe(document, config);

