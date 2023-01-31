//// ALTURA DEL CONTENEDOR ////
function setChartHeight() {
    if(document.getElementById('chartBlock').clientHeight != 0) {
        document.getElementsByClassName('container-data')[0].style.height = document.getElementById('chartBlock').clientHeight + 'px';
        document.getElementsByClassName('container-iframe')[0].style.height = document.getElementById('chartBlock').clientHeight + 'px';
        document.getElementsByClassName('container-rrss')[0].style.height = document.getElementById('chartBlock').clientHeight + 'px';
        pymChild.sendHeight();
    }
}
setChartHeight();
//// FINAL ALTURA ////


//// DESCARGA IMAGEN ////
let innerCanvas;

function setChartCanvas() {
    //Invisibilizamos el iframe
    document.getElementById('chartDw').getElementsByTagName('iframe')[0].style.display = 'none';
    //Visibilizamos la imagen Datawrapper 
    document.getElementById('chartDw').getElementsByClassName('chart-img')[0].style.display = 'block';
    //Ejecutamos la operación con HTML2CANVAS
    html2canvas(
        document.querySelector("#chartBlock"), 
        {
            width: document.querySelector("#chartBlock").clientWidth, 
            height: document.querySelector("#chartBlock").clientHeight, 
            imageTimeout: 3000, 
            useCORS: true
        }
    )
    .then(canvas => { 
        innerCanvas = canvas;
        //Visibilizamos el frame
        document.getElementById('chartDw').getElementsByTagName('iframe')[0].style.display = 'block';
        //Invisiblizamos la imagen
        document.getElementById('chartDw').getElementsByClassName('chart-img')[0].style.display = 'none';
    });
}

function setChartCanvasImage() {    
    let image = innerCanvas.toDataURL();
    let aDownloadLink = document.createElement('a');
    aDownloadLink.download = 'grafico.png'; //Posibilidad de cambiar el nombre
    aDownloadLink.href = image;
    aDownloadLink.click();
}

let pngDownload = document.getElementById('pngImage');

pngDownload.addEventListener('click', function(){
    setChartCanvasImage();
});
//// FINAL - DESCARGA IMAGEN ////


//// IFRAMES ////
let githubRepo = 'visualizaciones-articulos/2023-02_mayores-censos-provincias/grafico1_evolucion_mayores_jovenes'; //Cambiar el nombre del repositorio por el que se cree
//Iframe fijo
let id1 = document.getElementById('iframe-fixed');
id1.innerHTML = '<iframe src="https://EnvejecimientoEnRed/' + githubRepo + '/" style="height:720px;width:100%;" title="Gráfico Envejecimiento en Red"></iframe>';

//Iframe responsive
let id2 = document.getElementById('iframe-responsive');
id2.innerHTML = "<div id='grafico_enr'></div><script type='text/javascript' src='https://pym.nprapps.org/pym.v1.min.js'><\/script><script>let pymParent = new pym.Parent('grafico_enr', 'https://EnvejecimientoEnRed.github.io/" + githubRepo + "/', {}<\/script>";
//// FINAL - IFRAMES ////
 

//// REDES SOCIALES (Posibilidad de cambiar 'text' en Twitter y WhatsApp y 'title' en Linkedin) ////
function setRRSS() {
    let urlPage = window.location.href;
    //Facebook
    let shareFB = document.getElementById("shareFB");
    let fbHref = "https://www.facebook.com/sharer/sharer.php?u="+urlPage;
    shareFB.setAttribute("href",fbHref);

    //Twitter
    let shareTW = document.getElementById("shareTW");
    let twHref = "https://twitter.com/intent/tweet?url="+urlPage+"&text=grafico_enr&original_referer="+urlPage;
    shareTW.setAttribute("href",twHref);

    //Linkedin
    let shareLK = document.getElementById("shareLK");
    let lkHref = "https://www.linkedin.com/shareArticle?mini=true&url="+urlPage+"&title=grafico_enr&summary=&source=";
    shareLK.setAttribute("href",lkHref);

    //WhatsApp
    let shareWA = document.getElementById("shareWA");
    let waHref = "https://api.whatsapp.com/send?text=grafico_enr"+urlPage;
    shareWA.setAttribute("href",waHref);
}
setRRSS();
//// FINAL - RRSS ////


//// SISTEMA DE PESTAÑAS ////
let tabs = document.getElementsByClassName('tab');
let contenidos = document.getElementsByClassName('container');
let tabCount = 0;

for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function(e) {
        //Obtenemos nueva imagen 
        if(i != 0 && tabCount != 1) {
            tabCount = 1;
            setChartCanvas();
        }
        //Mostramos nueva pestaña
        document.getElementsByClassName('chart-main')[0].scrollIntoView();
        displayContainer(e.target);
    });
}

function displayContainer(elem) {
    let content = elem.getAttribute('data-target');

    //Poner activo el botón
    for(let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    elem.classList.add('active');

    //Activar el contenido
    for(let i = 0; i < contenidos.length; i++) {
        contenidos[i].classList.remove('active');
    }

    document.getElementsByClassName(content)[0].classList.add('active');
}
//// FINAL - SISTEMA DE PESTAÑAS ////


//// CAMBIO NOMBRE EN NOTAS (POR ESPACIO) ////
window.addEventListener('resize', function() {
    setChartHeight();
    if(window.innerWidth < 500) {
        document.getElementById('dataText').textContent = 'Datos';
    } else {
        document.getElementById('dataText').textContent = 'Notas y datos';
    }
});
//// FINAL - CAMBIO NOMBRE EN NOTAS ////