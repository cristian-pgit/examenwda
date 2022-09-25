console.clear();

const urlTrend = `https://api.giphy.com/v1/gifs/trending?api_key=Fq4JhwFWQBpbx4Sxq1W74npKzRwUcfDg`;

const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=Fq4JhwFWQBpbx4Sxq1W74npKzRwUcfDg`;

let actualUrl = "";
let indexStart = 0;
const limitPage = 21;

document.getElementById("buscar").addEventListener("keypress", function(event){
    if(event.key === 'Enter'){
        event.preventDefault()
    }
  });

const construirPantalla = async(url ) =>{
    const contenedor = document.createElement("div");
    contenedor.className = "trending";
    const contenedorImagen = document.createElement("img");
    contenedorImagen.src = url;
  

    contenedor.appendChild(contenedorImagen);

    document.querySelector("main").appendChild(contenedor);
}

const getGiphys = async (url) => {
    const respuesta= await fetch(url);
    const giphys = await respuesta.json();
    return giphys.data;
  
}

const cargar = async (url) => {
    const gyphys = await getGiphys(url);
    if (gyphys.length == 0){
        document.querySelector("main").innerHTML = "";//borrar el cotenido de main
        document.querySelector("main").innerHTML = "<h2>Search not Found</h2>";//agregar a main mensaje Search not found
    }
    for (let gy of gyphys){
        construirPantalla(gy.images.original.webp);
    }
}

btn.onclick = () =>{
    indexStart = 0;
    document.querySelector("main").innerHTML = "";
    let url = buildUrl(urlSearch,indexStart);
    actualUrl = urlSearch;
    cargar(url);
}

const buildUrl = ( url, index) => {

    let q = "&q="+document.getElementById("buscar").value;    
    let limit = "&limit="+limitPage;
    let i = "&offSet="+index;     
    indexStart = indexStart + 21;
    let isUrlTrending = url === urlTrend;
    return isUrlTrending ? url+limit+i : url+q+limit+i;
}



const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.pageYOffset + 100 > document.body.offsetHeight;
   
    if (endOfPage) {
        let actual = buildUrl(actualUrl, indexStart) 
        cargar(actual);
    }
  };

  window.addEventListener("scroll", handleInfiniteScroll);


  actualUrl = urlTrend;
  cargar(buildUrl(urlTrend,indexStart));
  

//local Storage --> resguardo de busquedas//
miStorage = window.localStorage;