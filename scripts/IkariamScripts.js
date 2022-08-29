try{
	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
	    link = document.createElement('link');
	    link.rel = 'icon';
	    document.getElementsByTagName('head')[0].appendChild(link);
	}
	link.href = 'https://www.mozilla.org/media/img/favicons/firefox/browser/favicon.f093404c0135.ico';

	var mainBox = document.createElement('div');
		mainBox.id =  'mainBox';
		mainBox.style.visibility = 'hidden';
		mainBox.style.opacity = '0';
		mainBox.classList = 'draggable_div';
		document.body.appendChild(mainBox);
	//
	restoreBtn = document.createElement('b');
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

	// MENU BUTTONS
	var buttonsDiv = document.createElement('div');
		buttonsDiv.classList =  'buttonsMenuDiv';
	//
	var btn = document.createElement('b');
		btn.innerHTML = "<span></span><span></span><span></span><span></span>&#10006;";
		btn.classList = "btn-menu btn-close";
		btn.onclick = mainBoxShowHidden;
		buttonsDiv.appendChild(btn);
	//
	var btn = document.createElement('button');
		btn.innerHTML = "Bárbaros";
		btn.classList = "btn-menu";
		btn.onclick = resBarb;
		buttonsDiv.appendChild(btn);
	//
	var btn = document.createElement('button');
		btn.innerHTML = "exibirProducao";
		btn.classList = "btn-menu";
		btn.onclick = exibirProducao;
		buttonsDiv.appendChild(btn);
	//
	var btn = document.createElement('button');
		btn.innerHTML = "Auto Pirataria";
		btn.classList = "btn-menu";
		btn.onclick = ()=>{
			$('.div-menu').css( "visibility", "hidden" );
			$('#piratariaDiv').css( "visibility", "visible" );
		}
		buttonsDiv.appendChild(btn);

	mainBox.appendChild(buttonsDiv);
	//
	var hr = document.createElement('hr');
	mainBox.appendChild(hr);

	// MENU CONTENT DIVS
	var contentDiv = document.createElement('div');
	contentDiv.classList =  'contentMenuDiv';
	mainBox.appendChild(contentDiv);

	// PIRATARIA
	var piratariaDiv = document.createElement('div');
		piratariaDiv.id = 'piratariaDiv'
		piratariaDiv.style.visibility = 'hidden'
		contentDiv.appendChild(piratariaDiv);
	var iniciaPara = document.createElement('button');
		iniciaPara.innerHTML = "Iniciar";
		iniciaPara.setAttribute('func', 'start');
		iniciaPara.classList = "btn-menu";
		iniciaPara.onclick = ()=>{
			if(iniciaPara.getAttribute('func') == 'start'){
				piratariaDivContent.innerHTML = null;
				autoPirataria();
				iniciaPara.setAttribute('func', 'stop');
				iniciaPara.innerHTML = "<span></span><span></span><span></span><span></span>Parar";
			}else{
				piratariaTimer.stop();
				auxPirata = 1;
				piratariaTimer = null;
				iniciaPara.setAttribute('func', 'start');
				iniciaPara.innerHTML = "Iniciar";
			}
			
		}
	piratariaDiv.appendChild(iniciaPara);
	var piratariaDivContent = document.createElement('div');
		piratariaDivContent.style.overflowY = 'auto'
	piratariaDiv.appendChild(piratariaDivContent)
	//
}catch(error){
	alert(error);
}
if (typeof browser === "undefined") {
    var browser = chrome;
}
// FUNÇÕES
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
			//let habitantes = Number(document.getElementById('js_TownHallOccupiedSpace').innerHTML.replace(",","").replace("k","000"));
			let maxHabitantes = Number(document.getElementById('js_TownHallMaxInhabitants').innerHTML.replace(",","").replace("k","000"));
			//let crescimentoPH = Number(document.getElementById('js_TownHallPopulationGrowthValue').innerHTML.replace(",","").replace("k","000"));
			let satisfacao = Number(document.getElementById('js_TownHallHappinessLargeValue').innerHTML.replace(",","").replace("k","000"));

			let positivos = document.getElementsByClassName('positives')[0].getElementsByClassName('cat');
			let bonusSatisfacao = 0;
			for(item of positivos){
				for(child of item.children){
					if(!child.classList.contains('invisible') && child.tagName == 'DIV'){
						bonusSatisfacao = bonusSatisfacao + Number(child.querySelector('.value').innerHTML.replace(",","").replace("k","000"));;
					}
				}
			}

			let tempoParaLotar = 50*Math.log(satisfacao/(bonusSatisfacao-maxHabitantes));

			let aviso = '';
			if(tempoParaLotar < 0 ){
				aviso = '-E-'
			}
			let tempo = decimalToTime(Math.abs(tempoParaLotar));

			let textString = "<br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M "+aviso+"<br>";;
			if(document.getElementById('textResultado') != null){
				let textResultado = document.getElementById('textResultado');
				textResultado.innerHTML = textString;
			}else{
				let textResultado = document.createElement('b');
				textResultado.id = 'textResultado';
				textResultado.innerHTML = textString;
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
	let divMaster = document.createElement('div');
	document.getElementById('buildingUpgrade').appendChild(divMaster);

	for(let item of resourceElement.childNodes){
		if(typeof(item.classList) != 'undefined'){
			let txt = document.createElement('b');
			txt.style.fontSize = '10px';
			txt.style.left = '0px';
			let tempo = 0;
			let falta = 0;
			let img = '';

			if(item.classList.contains('wood')){
				let nesc = Number((item.innerText.replace(",","").replace("k","000").split(":"))[1]);	
				let estoque = Number(document.getElementById('js_GlobalMenu_wood').innerHTML.replace(",","").replace("k","000"));
				if(estoque >= nesc)
					continue;
				let producao = Number(document.getElementById('js_GlobalMenu_resourceProduction').innerHTML.replace(",","").replace("k","000"));
				falta = nesc - estoque;
				tempo = decimalToTime(falta / producao);
				txt.id = 'buildingTimeCalcMadeira';
				img = "<img width='13px' src='//gf2.geo.gfsrv.net/cdn19/c3527b2f694fb882563c04df6d8972.png'>";

			}else
			if(item.classList.contains('marble')){
				let nesc = Number((item.innerText.replace(",","").replace("k","000").split(":"))[1]);
				let estoque = Number(document.getElementById('js_GlobalMenu_marble').innerHTML.replace(",","").replace("k","000"));
				if(estoque >= nesc)
					continue;
				let producao = Number(document.getElementById('js_GlobalMenu_production_marble').innerHTML.replace(",","").replace("k","000"));
				falta = nesc - estoque;
				tempo = decimalToTime(falta / producao);
				txt.id = 'buildingTimeCalcMarmore';
				img = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_marble.png'>";
			}else
			if(item.classList.contains('wine')){
				let nesc = Number((item.innerText.replace(",","").replace("k","000").split(":"))[1]);
				let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",","").replace("k","000"));
				if(estoque >= nesc)
					continue;
				let producao = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",","").replace("k","000"));
				falta = nesc - estoque;
				tempo = decimalToTime(falta / producao);
				txt.id = 'buildingTimeCalcVinho';
				img = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_wine.png'>";
			}else
			if(item.classList.contains('glass')){
				let nesc = Number((item.innerText.replace(",","").replace("k","000").split(":"))[1]);
				let estoque = Number(document.getElementById('js_GlobalMenu_crystal').innerHTML.replace(",","").replace("k","000"));
				if(estoque >= nesc)
					continue;
				let producao = Number(document.getElementById('js_GlobalMenu_production_crystal').innerHTML.replace(",","").replace("k","000"));
				falta = nesc - estoque;
				tempo = decimalToTime(falta / producao);
				txt.id = 'buildingTimeCalcCristal';
				img = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_glass.png'>";
			}else
			if(item.classList.contains('sulfur')){
				let nesc = Number((item.innerText.replace(",","").replace("k","000").split(":"))[1]);
				let estoque = Number(document.getElementById('js_GlobalMenu_sulfur').innerHTML.replace(",","").replace("k","000"));
				if(estoque >= nesc)
					continue;
				let producao = Number(document.getElementById('js_GlobalMenu_production_sulfur').innerHTML.replace(",","").replace("k","000"));
				falta = nesc - estoque;
				tempo = decimalToTime(falta / producao);
				txt.id = 'buildingTimeCalcEnxofre';
				img = "<img width='13px' src='https://s303-en.ikariam.gameforge.com/cdn/all/both/resources/icon_sulfur.png'>";
			}

			if(falta > 0){
				divMaster.classList = 'buildTimeDiv';
				if(!isNaN(tempo.minutos)){
					txt.innerHTML = 
						img+" ( "+new Intl.NumberFormat('pt-BR',  { maximumFractionDigits: 2 }).format(falta)+" ) 🡆 "+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				}else{
					txt.innerHTML = img+" ( "+new Intl.NumberFormat('pt-BR',  { maximumFractionDigits: 2 } ).format(falta)+" ) 🡆 ∞ <br>";
				}
				if(document.getElementById(txt.id) == null)
					divMaster.appendChild(txt);
				else
					document.getElementById(txt.id).innerHTML = txt.innerHTML;
			}
		}
	}

}
function exibirProducao(){
	let producaoMadeira = Number(document.getElementById('js_GlobalMenu_resourceProduction').innerHTML.replace(",","").replace("k","000")) || 0;
	let producaoMarmore = Number(document.getElementById('js_GlobalMenu_production_marble').innerHTML.replace(",","").replace("k","000")) || 0;
	let producaoVinho = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",","").replace("k","000")) || 0;
	let consumoVinho = Number(document.getElementById('js_GlobalMenu_WineConsumption').innerHTML.replace(",","").replace("k","000")) || 0;
	let producaoCristal = Number(document.getElementById('js_GlobalMenu_production_crystal').innerHTML.replace(",","").replace("k","000")) || 0;
	let producaoEnxofre = Number(document.getElementById('js_GlobalMenu_production_sulfur').innerHTML.replace(",","").replace("k","000")) || 0;
	let producaoGold = Number(document.getElementById('js_GlobalMenu_gold_Calculation').innerHTML.replace(",","").replace("k","000")) || 0;
	$('.producaoDiv').remove()
	let gold = document.getElementById('js_GlobalMenu_gold');
		gold.innerHTML += '<span class="producaoDiv '+((producaoGold) > 0 ? 'positivo' : 'negativo')+'"><br>('+producaoGold+')</span>';
		gold.style.lineHeight = "13px";

	let cityResources = document.getElementById('cityResources')
	cityResources.getElementsByClassName('resources')[0].childNodes.forEach(element => {
		if(typeof(element.classList) != 'undefined'){
			if(element.classList.contains('wood')){
				element.innerHTML += '<div class="producaoDiv"><span class="producaoLabel '+((producaoMadeira) > 0 ? 'positivo' : 'negativo')+'">('+producaoMadeira+')</span></div>';
			}
			if(element.classList.contains('wine')){
				let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",","").replace("k","000"));
				let tempoPraZerar = '';
				if((producaoVinho-consumoVinho) < 0 ){
					tempoPraZerar = decimalToTime(estoque / Math.abs(producaoVinho-consumoVinho))
					stringTempo = tempoPraZerar.dias+'D '+tempoPraZerar.horas+'H '+tempoPraZerar.minutos+'M';
					document.getElementById('js_GlobalMenu_wine_tooltip').getElementsByTagName('tbody')[0].innerHTML += '<tr id="js_GlobalMenu_production_wine_tempoPraZerar" class="producaoDiv"><td class="smallFont" >Tempo até zerar</td><td class="rightText" id="js_GlobalMenu_production_wine_tempoPraZerar_value">'+stringTempo+'</td></tr>';
				}
				element.innerHTML += '<div class="producaoDiv"><span class="producaoLabel '+((producaoVinho-consumoVinho) > 0 ? 'positivo' : 'negativo')+'">('+(producaoVinho-consumoVinho)+')</span>';
			}
			if(element.classList.contains('marble')){
				element.innerHTML += '<div class="producaoDiv"><span class="producaoLabel '+((producaoMarmore) > 0 ? 'positivo' : 'negativo')+'">('+producaoMarmore+')</span></div>';
			}
			if(element.classList.contains('glass')){
				element.innerHTML += '<div class="producaoDiv"><span class="producaoLabel '+((producaoCristal) > 0 ? 'positivo' : 'negativo')+'">('+producaoCristal+')</span></div>';
			}
			if(element.classList.contains('sulfur')){
				element.innerHTML += '<div class="producaoDiv"><span class="producaoLabel '+((producaoEnxofre) > 0 ? 'positivo' : 'negativo')+'">('+producaoEnxofre+')</span></div>';
			}
			element.style.lineHeight = "13px";
		}
	});

}
function mainBoxShowHidden(){
	//let mainBox = document.getElementById('mainBox');
	//let restoreBtn = document.getElementById('restoreBtn');
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
function resBarb(){
	$('.resources').ready(()=>{
		var recursosDiv = document.querySelector('.barbarianCityResources .resources');
		var recursos = recursosDiv.children;
		var resultado = 0;
		var arr = [];
		for (let item of recursos){
			if(!item.classList.contains("gold")){
				arr.push(item.innerHTML.replace(",","").replace("k","000"));
				resultado = Number(resultado) + Number(item.innerHTML.replace(",","").replace("k","000"));
			}
		}
		recursosDiv.innerHTML += '<li class="barcosIcon" id="totalBarcos">'+Math.ceil(resultado/500)+'</li>';
	});
	
	
}
function troopsResTime(){
	costsDiv = document.getElementById('accumulatedResourcesCosts');
	costsDiv.style.height = "auto";

	for(let item of costsDiv.childNodes){
		if(typeof(item.classList) != 'undefined')
		if(item.classList.contains('wood')){
			let nesc = Number(item.innerText.replace(",","").replace("k","000"));	
			let producao = Number(document.getElementById('js_GlobalMenu_resourceProduction').innerHTML.replace(",","").replace("k","000"));
			let estoque = Number(document.getElementById('js_GlobalMenu_wood').innerHTML.replace(",","").replace("k","000"));
			mainBox.innerHTML +=  producao + " - " + estoque;
			if(estoque >= nesc)
				continue;
			else{
				let tempo = decimalToTime((nesc - estoque) / producao);
				
				let txt = document.createElement('b');
				txt.id = 'troopsTimeCalcMadeira';
				txt.style.fontSize = '10px';
				txt.style.left = '0';
				txt.style.fontWeight = '500';
				txt.style.position = 'absolute';
				txt.innerHTML = "<br><br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				item.appendChild(txt);
			}
		}else
		if(item.classList.contains('marble')){
			let nesc = Number(item.innerText.replace(",","").replace("k","000"));
			let producao = Number(document.getElementById('js_GlobalMenu_production_marble').innerHTML.replace(",","").replace("k","000"));
			let estoque = Number(document.getElementById('js_GlobalMenu_marble').innerHTML.replace(",","").replace("k","000"));
			if(estoque >= nesc)
				continue;
			else{
				let tempo = decimalToTime((nesc - estoque) / producao);
				
				let txt = document.createElement('b');
				txt.id = 'troopsTimeCalcMarmore';
				txt.style.fontSize = '10px';
				txt.style.left = '0';
				txt.style.fontWeight = '500';
				txt.style.position = 'absolute';
				txt.innerHTML = "<br><br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				item.appendChild(txt);
			}
		}else
		if(item.classList.contains('wine')){
			let nesc = Number(item.innerText.replace(",","").replace("k","000"));
			let producao = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",","").replace("k","000"));
			let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",","").replace("k","000"));
			if(estoque >= nesc)
				continue;
			else{
				let tempo = decimalToTime((nesc - estoque) / producao);
				
				let txt = document.createElement('b');
				txt.id = 'troopsTimeCalcVinho';
				txt.style.fontSize = '10px';
				txt.style.left = '0';
				txt.style.fontWeight = '500';
				txt.style.position = 'absolute';
				txt.innerHTML = "<br><br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				item.appendChild(txt);
			}
		}else
		if(item.classList.contains('glass')){
			let nesc = Number(item.innerText.replace(",","").replace("k","000"));
			let producao = Number(document.getElementById('js_GlobalMenu_production_crystal').innerHTML.replace(",","").replace("k","000"));
			let estoque = Number(document.getElementById('js_GlobalMenu_crystal').innerHTML.replace(",","").replace("k","000"));
			if(estoque >= nesc)
				continue;
			else{
				let tempo = decimalToTime((nesc - estoque) / producao);
				
				let txt = document.createElement('b');
				txt.id = 'troopsTimeCalcCristal';
				txt.style.fontSize = '10px';
				txt.style.left = '0';
				txt.style.fontWeight = '500';
				txt.style.position = 'absolute';
				txt.innerHTML = "<br><br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				item.appendChild(txt);
			}
		}else
		if(item.classList.contains('sulfur')){
			let nesc = Number(item.innerText.replace(",","").replace("k","000"));
			let producao = Number(document.getElementById('js_GlobalMenu_production_sulfur').innerHTML.replace(",","").replace("k","000"));
			let estoque = Number(document.getElementById('js_GlobalMenu_sulfur').innerHTML.replace(",","").replace("k","000"));
			if(estoque >= nesc)
				continue;
			else{
				let tempo = decimalToTime((nesc - estoque) / producao);
				
				let txt = document.createElement('b');
				txt.id = 'troopsTimeCalcEnxofre';
				txt.style.fontSize = '10px';
				txt.style.left = '0';
				txt.style.fontWeight = '500';
				txt.style.position = 'absolute';
				txt.innerHTML = "<br><br>"+tempo.dias+"D "+tempo.horas+"H "+tempo.minutos+"M <br>";
				item.appendChild(txt);
			}
		}
	}

}
function calcRecursos(){
	
}
function islandFilter(){
	document.querySelectorAll('.ally').forEach((el)=>{
		el.parentElement.style = "visibility: hidden";
	});
	
}
var auxPirata = 1;
var piratariaTimer;
async function autoPirataria(chk = 0){
	console.log('Capturando...')
	//cookieidCityPirataria = cookies.get('idCityPirataria')
	//console.log(cookieidCityPirataria);
	let cookieidCityPirataria = document.cookie.split('; ').find((row) => row.startsWith('idCityPirataria='))?.split('=')[1];
	console.log("1> "+cookieidCityPirataria)
	asyncAjax("https://s303-en.ikariam.gameforge.com/?view=pirateFortress&position=17&ajax=1").then((r)=>{
		if(cookieidCityPirataria == null || cookieidCityPirataria == "" || cookieidCityPirataria == "undefined" ){
			cookieidCityPirataria = r[0][1].headerData.cityDropdownMenu.selectedCity.replace(/\D/g,'')
			document.cookie = "idCityPirataria="+cookieidCityPirataria
		}
		console.log("2> "+r[0][1].headerData.cityDropdownMenu.selectedCity.replace(/\D/g,''))
		asyncAjax(
			"https://s303-en.ikariam.gameforge.com/?action=PiracyScreen&function=capture&buildingLevel=1&view=pirateFortress&cityId="
			+cookieidCityPirataria+"&position=17&activeTab=tabBootyQuest&backgroundView=city&currentCityId="
			+cookieidCityPirataria+"&templateView=pirateFortress&actionRequest="
			+r[0][1].actionRequest+"&ajax=1"
		).then((res)=>{
			console.log(res);
			let erros = false;
			let dv = document.createElement('div');
			try{
				if(res[3][1][0].type == 10 && !res[1][1][1].includes('captcha')){
					console.log("Pirateando");
					var mostrador = document.createElement('b');
					dv.id = "showPirate_"+auxPirata;
					dv.innerHTML = "Pirateando 🡆 ";
					piratariaTimer = new Timer(153, mostrador, function() {
						dv.innerHTML = "Pirateado ["+auxPirata+"]";
						autoPirataria(auxPirata++);
					});
					piratariaTimer.start();
					dv.appendChild(mostrador);
				}else{
					let capcheck = res[1][1][1].includes('captcha') ? 'Captcha' : '';
					let token = '';
					if(res[3][1][0] !== "undefined")
						token = res[3][1][0].text != 10 ? res[3][1][0].text : ''
					erros = [capcheck, token]
				}
			}catch(err){
				let capcheck = res[1][1][1].includes('captcha') ? 'Captcha' : '';
				erros = [capcheck, err]
			}
			if(erros){
				dv.innerHTML = "Falha ao piratear: " + erros
				var notifyAudio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-sci-fi-confirmation-914.wav");
					notifyAudio.play();
				iniciaPara.setAttribute('func', 'start');
				iniciaPara.innerHTML = "Iniciar";
				piratariaTimer = null;
				auxPirata = 1
				console.log(res)
			}
			piratariaDivContent.appendChild(dv);
			piratariaDivContent.scrollTop = piratariaDivContent.scrollHeight;
		});
	
	})

	/* console.log('Capturando...')
	document.querySelector('#pirateCaptureBox > div.content > table > tbody > tr:nth-child(1) > td.action > a').click() */

}
function getDataSet () {
	if(document.getElementById('datasetDOM') == null)
		datasetDOM = document.createElement('textarea')
	else
		document.getElementById('datasetDOM').remove();
	datasetDOM.id = 'datasetDOM';
	datasetDOM.style.visibility = 'hidden';
	datasetDOM.innerHTML = JSON.stringify(dataSetForView);
	(document.body || document.head || document.documentElement).appendChild(datasetDOM);
}
const asyncAjax = async function(url){
    return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                beforeSend: function() {            
                },
                success: function(data) {
                    resolve(data) // Resolve promise and when success
                },
                error: function(err) {
                    reject(err) // Reject the promise and go to catch()
                }
            });
    });
} 
var cities = [];
async function getCitiesInfo (){
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ getDataSet +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
	var dataset = JSON.parse(document.getElementById('datasetDOM').innerHTML);
	document.querySelector('#dropDown_js_citySelectContainer > div.bg > ul').childNodes.forEach(async (el)=>{
		try{
			let r = await asyncAjax("https://s303-en.ikariam.gameforge.com/?view=updateGlobalData&currentCityId="+el.getAttribute('selectvalue')+
			"&templateView=townHall&actionRequest="+dataset.actionRequest+"&ajax=1")
			console.log(r);
			cities.push((r))
		}catch(err){
			alert(err);
		}
	})
	console.log(cities)
	var madeira = 0;
	var vinho = 0;
	var marmore = 0;
	var cristal = 0;
	var enxofre = 0;

	cities.forEach((city)=>{
		vinho = vinho + city[0][1].headerData.currentResources[1]
	})

	//citiesStats = document.createElement('div')
	//citiesStats.innerHTML += " => " + vinho;
	//mainBox.appendChild(citiesStats);
}

// TIMER
	function Timer(mins, target, cb) {
		this.counter = mins;
		this.target = target;
		this.callback = cb;
		this.clock = null;

	}
	Timer.prototype.pad = function(s) {
		return (s < 10) ? '0' + s : s;
	}
	Timer.prototype.start = function(s) {
		this.count();
	}
	Timer.prototype.stop = function(s) {
		clearInterval(this.clock);
	}
	Timer.prototype.done = function(s) {
		if (this.callback) this.callback();
	}
	Timer.prototype.display = function(s) {
		this.target.innerHTML = this.pad(s);
	}
	Timer.prototype.count = function(s) {
		var self = this;
		self.display.call(self, self.counter);
		self.counter--;
		self.clock = setInterval(function() {
			self.display(self.counter);
			self.counter--;
			if (self.counter < 0) {
				clearInterval(self.clock);
				self.done.call(self);
			}
		}, 1000);
	}

//

// ARRASTAR ELEMENTOS
	var dragMe = mainBox;
	/* o x inicial do drag*/
	dragOfX = 0,
	/* o y inicial do drag */
	dragOfY = 0;
	/* ao segurar o elemento */
	function dragStart(e) {
		/* define o x inicial do drag */
		dragOfX = e.pageX - dragMe.offsetLeft;
		/* define o y inicial do drag */
		dragOfY = e.pageY - dragMe.offsetTop;
		
		/* adiciona os eventos */
		addEventListener("mousemove", dragMove);
		addEventListener("mouseup", dragEnd);
	}
	/* ao ser arrastado */
	function dragMove(e) {
		/* atualiza a posição do elemento */
		dragMe.style.left = (e.pageX - dragOfX) + 'px';
		dragMe.style.top = (e.pageY - dragOfY) + 'px';
	}
	/* ao terminar o drag */
	function dragEnd() {
		/* remove os eventos */
		removeEventListener("mousemove", dragMove);
		removeEventListener("mouseup", dragEnd);
	} 
	/* adiciona o evento que começa o drag */
	dragMe.addEventListener("mousedown", dragStart);
//

// START
getCitiesInfo()

exibirProducao();

var config = {childList: true, subtree: true };
var callback = function(mutationList, observer) {
    for (var mutation of mutationList) {
        if (mutation.type === 'childList') {

			if ( mutation.target.id == "sidebar" ) {
				$(mutation.target).ready(buildingTime);
			}
        }

			if ( mutation.target.id == "js_TownHallOccupiedSpace" ) {
				$(mutation.target).ready(CMStats);
			} 

			if (mutation.target.id == "js_GlobalMenu_wood"){
				$(mutation.target).ready(exibirProducao());
			}

			if (mutation.target.id == "js_GlobalMenu_gold_Calculation"){
				$(mutation.target).ready(exibirProducao());
			}

			if (mutation.target.id == "barbarianVillage_c"){
				resBarb();
			}

			if (mutation.target.id == 'js_unitCountIcons'){
				troopsResTime();
			}

			if(mutation.target == document.querySelector('#js_wineAmountContainer > span > a')){
				let consumoVinho = Number(mutation.target.innerHTML.replace(/\D+$/g, "")) || 0;
				let producaoVinho = Number(document.getElementById('js_GlobalMenu_production_wine').innerHTML.replace(",","").replace("k","000")) || 0;
				let estoque = Number(document.getElementById('js_GlobalMenu_wine').innerHTML.replace(",","").replace("k","000")) || 0;
				let tempoPraZerar = '';
				let stringTempo ='';
				if((producaoVinho-consumoVinho) < 0 ){
					tempoPraZerar = decimalToTime(estoque / Math.abs(producaoVinho-consumoVinho))
					stringTempo = tempoPraZerar.dias+'D '+tempoPraZerar.horas+'H '+tempoPraZerar.minutos+'M';
				}
				stringFinal='<div class="tabernaStats"><br><b>Até Zerar:</b> '+stringTempo+
							'<br><b>Consumo Diário:</b> '+(consumoVinho*24)+'<br></div>'
				$('.tabernaStats').remove();
				$(mutation.target).after(stringFinal);
				

			}
			//AUTO CLICK CAPTURA PIRATA
			/* if(mutation.target == $('.alt')[1]){
				$('.alt')[1].children[4].children[0].click()
			} */
    }
};
var observer = new MutationObserver(callback);
observer.observe(document, config);


try {
	
} catch (error) {
	var btn = document.createElement('b');
	btn.innerHTML = (error)+' # Error';
	mainBox.appendChild(btn);
}