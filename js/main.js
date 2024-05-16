function openToModal() {
  $(".icon").click(function () {
    $(".icon").toggleClass("active");
  });
  $("#exampleModal").modal("show");
}

// sticky
function stickyElement(e) {
  var header = document.querySelector(".default-header");
  header.classList.toggle("sticky", window.scrollY > 10);
}

function swiperHome() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    autoplay: {
      delay: 20000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });
}

function swiperHomePrice() {
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 20,
    loop: false,
    loopFillGroupWithBlank: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        // enabled: false,
      },
    },
  });
}

function swiperManu() {
  var swiper3 = new Swiper(".mySwiper-manu", {
    pagination: {
      el: ".swiper-pagination-manu",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: 1.05,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
    },
  });
}

function displayFullYear(element) {
  const year = document.querySelector(element);
  const getYear = new Date().getFullYear();

  year.innerText = getYear;
}

function price() {
  // URL da API web do Google Apps Script
  var url =
    "https://script.googleusercontent.com/macros/echo?user_content_key=fspkvkXKFcdF1OKzY7Ww0Ygvqkixx0_8PRMaUfYlvaGD0BHpPry2zZhV5Vy_DlRNAMneQhIwdSRkysuiu4CXuWF8eWCsTfa6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGxV2ptZgjkHtsvNiaE3glHqxaqFRaEMvo-M9KthEgyXjCVbegnPU3dPiSGSlh5WQ3KaCgsh9QPEHOpaQG8HAKy2iFG_EfrtuA&lib=McWWPsEVZWtAeRcVh3roohzLob1edPsIR";

  // Realizar a requisição AJAX
  $.ajax({
    url: url,
    dataType: "json",
    success: function (data) {
      // Verificar se 'price' está presente nos dados e exibir o preço
      if (data.length > 0 && data[0].hasOwnProperty("price")) {
        $(".js-price").text(data[0].price);
        $(".js-msg").text(data[0].msg);
      } else {
        $(".js-price").text("A combinar");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Erro ao carregar os dados:", textStatus, errorThrown);
      $(".js-price").text("A Combinar");
    },
  });
}

// init
$(document).ready(function () {
  AOS.init();
  new window.VLibras.Widget("https://vlibras.gov.br/app");
  window.addEventListener("scroll", stickyElement);

  price();
  openToModal();
  swiperHome();
  swiperHomePrice();
  swiperManu();
  displayFullYear(".myDate");
});

$.get("./templates/footer.html", function (data) {
  $("#footer-placeholder").replaceWith(data);
});

$.get("./templates/navbar.html", function (data) {
  $("#navbar-placeholder").replaceWith(data);
});

//news;
// function SubForm() {
//   $.ajax({
//     url: "https://api.apispreadsheets.com/data/16165/",
//     type: "post",
//     data: $("#myForm").serializeArray(),
//     success: function () {
//       alert("Email cadastrado com sucesso :)");
//     },
//     error: function () {
//       alert("Aconteceu um problema :(");
//     },
//   });
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (registration) {
      // Registro realizado com sucesso (NOTA: Observe que declaro um arquivo chamado sw.js, ele é onde colocaremos as notações do nosso Service Workers)
      console.log(
        "O ServiceWorker foi registrado com escopo: ",
        registration.scope
      );
    })
    .catch(function (err) {
      // O registro falhou :(
      console.log("O registro do ServiceWorker falhou com o erro: ", err);
    });
}

if (window.Notification && Notification.permission !== "denied") {
  Notification.requestPermission(function (status) {
    // status is "granted", if accepted by user
    var n = new Notification("Agora é a hora de você aprender espanhol!", {
      body: "De R$ 90,00 por R$ 70,00 a hora/aula. ",
      icon: "img/icons/icon-72x72.png", // optional
    });
  });
}
