let hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}


const allImages = document.querySelectorAll(".shorts-gallery");
const imageView = document.querySelector(".image-view");
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const imageBox = document.querySelector(".image-box");
const images = document.querySelectorAll(".shorts-gallery img")

let currentImageIdx=0;

imageView.addEventListener('click', function(){
    this.style.display="none";
    imageBox.style.display="none";
})

images.forEach(function(btn,index){
    btn.addEventListener('click',function(){
        imageView.style.display="block";
        imageBox.style.display="block";
        currentImageIdx = index + 1;
        currentImageDisplay(currentImageIdx);
    })
})

function currentImageDisplay(position){
    imageBox.style.background = `url(images/img${currentImageIdx}.jpeg) center/cover no-repeat`;
}
prevBtn.addEventListener('click', function(){
    currentImageIdx--;
    if(currentImageIdx===0){
        currentImageIdx= 8;
    }
    currentImageDisplay(currentImageIdx);


})

nextBtn.addEventListener('click', function(){
    currentImageIdx++;
    if(currentImageIdx===9){
        currentImageIdx= 1;
    }
    currentImageDisplay(currentImageIdx);

})