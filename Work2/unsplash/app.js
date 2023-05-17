const form = document.querySelector("form");
const galleryList = document.querySelector(".search-gallery");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = document.querySelector("#search-input").value;
    galleryList.innerHTML = "";

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

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
  modal.innerHTML = "";
};

// ESC tuşuyla modalı kapatma
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Modal kapatma işlemini tetikleyecek bir olay dinleyicisi
document.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (e.target === modal) {
    closeModal();
  }
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
