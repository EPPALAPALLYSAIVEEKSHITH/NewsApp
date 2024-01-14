const API_KEY="27f8345ee9b3a286eda72ffa6ee04df0";
const url="https://gnews.io/api/v4/search?q="
window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';

    articles.forEach(article => { 
        if(!article.image)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.image;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })
    cardClone.firstElementChild.addEventListener("click" , ()=>{
    window.open(article.url,"_blank");
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`
}

let curSelectedNav=null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('news-input');

searchButton.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
}
);

function relaod(){
    window.location.reload();
}