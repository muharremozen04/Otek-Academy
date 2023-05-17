const form = document.querySelector("form");
const galleryList = document.querySelector(".search-gallery");
//form değişkeni, HTML'deki ilk <form> öğesini seçer.
//galleryList değişkeni, HTML'deki .search-gallery sınıfına sahip öğeyi seçer.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = document.querySelector("#search-input").value;
    galleryList.innerHTML = "";
    //form öğesine bir submit olay dinleyicisi eklenir. Bu dinleyici,
    // form gönderildiğinde çalışır.
   //e.preventDefault() yöntemi, formun varsayılan davranışını engeller, 
   //yani sayfanın yeniden yüklenmesini önler.
   //const search = document.querySelector("#search-input").value; ile kullanıcının arama kutusuna girdiği değeri alır ve search değişkenine atar.
   //galleryList.innerHTML = ""; ile galeri listesini temizler.
    ///
    fetch(
        `https://api.unsplash.com/search/photos?query=${search}&client_id=Je0UqxQNYCz-x9R1uVow91Z2O0kCGkyus6cbwacZ3Kk`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.results.length > 0) {
                data.results.forEach((item) => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("gallery-item");
                    const image = document.createElement("img");
                    image.src = item.urls.small;
                    image.srcset = item.urls.full;

                    itemElement.appendChild(image);
                    galleryList.appendChild(itemElement);
                });
            } else {
                const noResultsMessage = document.createElement("p");
                noResultsMessage.innerText = "Fotoğraf bulunamadı.";
                noResultsMessage.classList.add("no-results-message");
                galleryList.appendChild(noResultsMessage);
            }
        })
        .finally(() => {
            const gallery = document.querySelectorAll(".search-gallery img");
            gallery.forEach((img) => {
                img.addEventListener("click", openModal);
            });
        });
});

//fetch() yöntemi, belirtilen URL'ye bir GET isteği yapar ve Unsplash API'dan fotoğraf arama sonuçlarını alır.
//İstek sonucunda gelen veri, önce res.json() ile JSON formatına dönüştürülür.
//Daha sonra, alınan veri üzerinde işlem yapılır. Eğer sonuçlar mevcutsa (data.results.length > 0), 
//her bir sonuç için bir <div> oluşturulur ve içine bir <img> eklenir. Oluşturulan bu öğeler, galeri listesine (galleryList) eklenir.
//Eğer sonuç yoksa, "Fotoğraf bulunamadı." içeren bir <p> öğesi oluşturulur,
// bu öğe "no-results-message" sınıfını alır ve galeri listesine eklenir.
//finally bloğunda, galerideki her resim için bir olay dinleyicisi eklenir. Bu dinleyici, bir resme tıklandığında openModal işlevini çağırır.
//
const openModal = (e) => {
    const modal = document.querySelector(".modal");
    modal.classList.add("show");

    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = "";

    const closeIcon = document.createElement("div");
    closeIcon.classList.add("close-icon");
    closeIcon.innerHTML = "&#10006;"; // X işareti (Unicode: U+2716)
    closeIcon.addEventListener("click", closeModal);
    modalContent.appendChild(closeIcon);

    const clickedImage = e.target;
    const bigImage = clickedImage.srcset;

    const image = document.createElement("img");
    image.src = bigImage;
    modalContent.appendChild(image);

    addNavigationButtons();
};

//openModal işlevi, modal penceresini açar.
//const modal = document.querySelector(".modal"); ile modal öğesini seçer.
//modal.classList.add("show"); ile modalın "show" sınıfını ekler ve görünür hale getirir.
//const modalContent = modal.querySelector(".modal-content"); ile modal içeriğini temsil eden öğeyi seçer.
//modalContent.innerHTML = ""; ile modal içeriğini temizler.
//Kapatma simgesi için bir <div> oluşturulur, sınıfları eklenir, içeriği ayarlanır ve kapatma işlevine bir olay dinleyicisi eklenir.
//Tıklanan resmin büyük boyutlu URL'si (bigImage) alınır ve bir <img> öğesi oluşturulur, kaynak (src) ayarlanır ve modal içeriğine eklenir.
//addNavigationButtons() işlevi çağrılarak modal'a gezinme düğmeleri eklenir.

const addNavigationButtons = () => {
  const modal = document.querySelector(".modal");

 // İleri butonunu oluştur
 const nextButton = document.createElement("button");
 nextButton.innerText = "İleri";
 nextButton.classList.add("modal-button", "next-button");
 nextButton.addEventListener("click", nextImage);

   // Geri butonunu oluştur
   const previousButton = document.createElement("button");
   previousButton.innerText = "Geri";
   previousButton.classList.add("modal-button", "previous-button");
   previousButton.addEventListener("click", previousImage);

  // Butonları modala ekle
  modal.appendChild(previousButton);
  modal.appendChild(nextButton);
};

//addNavigationButtons işlevi, modal'a gezinme düğmelerini ekler.
//İleri düğmesi (nextButton) ve geri düğmesi (previousButton) için <button> öğeleri oluşturulur, 
//içerikleri ve sınıfları ayarlanır ve ilgili işlevlere olay dinleyicileri eklenir.
//Düğmeler modal'a (modal) eklenir.

let currentImageIndex = 0; // Mevcut resim indeksi

const changeImage = (increment) => {
  const gallery = document.querySelectorAll(".search-gallery img");
  const numImages = gallery.length;

  // Mevcut resmin indeksini güncelle
  currentImageIndex += increment;

  // İndeksleri sınırla
  if (currentImageIndex < 0) {
    currentImageIndex = numImages - 1;
  } else if (currentImageIndex >= numImages) {
    currentImageIndex = 0;
  }

  // Modal içindeki resmi güncelle
  const modalContent = document.querySelector(".modal-content");
  const currentImage = modalContent.querySelector("img");
  currentImage.src = gallery[currentImageIndex].srcset;
};

const nextImage = () => {
  changeImage(1);
};

const previousImage = () => {
  changeImage(-1);
};


//currentImageIndex değişkeni, mevcut görüntünün dizinini tutar.
//changeImage işlevi, mevcut görüntüyü değiştirir. İleri veya geri yönde ilerlemeyi belirten bir artış/değer azalışı alır.
//gallery değişkeni, galerideki tüm resim öğelerini seçer.
//numImages değişkeni, galerideki toplam resim sayısını tutar.
//currentImageIndex değeri artırılır veya azaltılır ve sınırlar kontrol edilir. İndeks 0'dan küçükse, son resim indeksine geçer.
// İndeks resim sayısından büyük veya eşitse, ilk resim indeksine döner.
//Modal içeriğini temsil eden öğe (modalContent) ve mevcut görüntüyü temsil eden öğe (currentImage) seçilir
// ve currentImage öğesinin kaynağı, galerideki yeni görüntünün kaynağıyla güncellenir.

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
  modal.innerHTML = "";
};
//closeModal işlevi, modalı kapatır.
//Modal öğesi seçilir (modal), "show" sınıfı kaldırılır ve içeriği temizlenir.

// ESC tuşuyla modalı kapatma
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
  //Klavye olayını dinleyen bir olay dinleyicisi eklenir. 
  //Eğer tuş "Escape" ise (e.key === "Escape"), closeModal işlevi çağırılır ve modal kapatılır.
});

// Modal kapatma işlemini tetikleyecek bir olay dinleyicisi
document.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target === modal) {
    closeModal();
  }
  //ıklama olayını dinleyen bir olay dinleyicisi eklenir. 
  //Eğer tıklanan öğe modal öğesiyle (e.target === modal) aynı ise, closeModal işlevi çağırılır ve modal kapatılır.
});

// Açılan resimlerde ileri geri işlevselliğini etkinleştir
const enableGalleryNavigation = () => {
  const gallery = document.querySelectorAll(".search-gallery img");
  gallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      openModal(e);
    });
  });
};
//enableGalleryNavigation işlevi, galeri gezinme işlevselliğini etkinleştirir.
//Tüm galeri resimlerini seçer (gallery), 
//her bir resim için bir olay dinleyicisi ekler. Bu dinleyici, bir resme tıklandığında openModal işlevini çağırır.
