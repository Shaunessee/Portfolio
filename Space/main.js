
const spacestagram = async () => {

    //get API data
    const data = await getData();
    //render data to page
    renderData(data);
    //add listeners
    likes();
}

document.addEventListener("DOMContentLoaded", spacestagram)



const getData = async () => {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=fsGFdDRi8RrSH2amEqypJ2cML8W7Afp3WpQ205oS&count=16');

    const data = await response.json();
    return data;
}


const renderData = data => {
    const main = document.querySelector("main");
    const cardArray = [];

    data.forEach((data) => {
        const imgObj = createCardElements();
        const card = createNasaCard(imgObj, data);
        cardArray.push(card);
    });

    cardArray.forEach((card) => {
        main.appendChild(card);
    });
};

const createCardElements = () => {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const date = document.createElement("p");
    const like = document.createElement("div");
    return { article, img, title, date, like };
};

const createNasaCard = (imgObj, info) => {
    const { article, img, title, date, like } = imgObj;

    like.classList.add("like", "like-no");

    img.src = info.url;
    title.textContent = info.title;
    date.textContent = info.date;

    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(like);
    return article;

};

const likes = () => {
    const likes = document.querySelectorAll(".like");
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            event.target.classList.toggle("like-no");
            event.target.classList.toggle("like-yes");
            if (event.target.classList.contains("like-yes")) {
                getFaveData(event.target);
            } else {
                getFaveData(event.target);
            }
        })
    })
}
const getFaveData = (elem) => {
    const parent = elem.parentElement;
    const img = parent.querySelector("img").src;
    const title = parent.querySelector("h2").textContent;
    const date = parent.querySelector("p").textContent
    const imgObj = { img, title, date };
}


