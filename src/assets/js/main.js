(function ($) {
  "use strict";
  jQuery(document).ready(function ($) {
    /*------------------------------
            counter section activation
        -------------------------------*/
    var counternumber = $(".count-num");
    counternumber.counterUp({
      delay: 20,
      time: 3000,
    });
    /*--------------------
            wow js init
        --------------------*/
    new WOW().init();
    /*----------------------------
            portfolio menu active
        ----------------------------*/
    var portfolioMenu = ".portfolio-menu li";
    $(document).on("click", portfolioMenu, function () {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
    });

    /*----------------------------------
            magnific popup activation
        ----------------------------------*/
    $(".image-popup").magnificPopup({
      type: "image",
    });
    $(".video-play-btn,.play-video-btn").magnificPopup({
      type: "video",
    });
    /*-------------------------------
            back to top
        ------------------------------*/
    $(document).on("click", ".back-to-top", function () {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        2000
      );
    });
    /*------------------------------
            smoth achor effect
        ------------------------------*/
    $(document).on("click", "#appside_main_menu li a", function (e) {
      var anchor = $(this).attr("href");
      var link = anchor.slice(0, 1);
      if ("#" == link) {
        e.preventDefault();
        var top = $(anchor).offset().top;
        $("html, body").animate(
          {
            scrollTop: $(anchor).offset().top,
          },
          1000
        );
        $(this).parent().addClass("active").siblings().removeClass("active");
      }
    });

    /*----------------------------------------
            screenshort carousel
        ----------------------------------------*/
    var $brandCarousel = $(".brand-carousel");
    if ($brandCarousel.length > 0) {
      $brandCarousel.owlCarousel({
        loop: true,
        autoplay: true, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: false,
        nav: true,
        smartSpeed: 3000,
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          360: {
            items: 2,
            nav: false,
          },
          767: {
            items: 2,
            nav: false,
          },
          768: {
            items: 2,
            nav: false,
          },
          960: {
            items: 3,
            nav: false,
          },
          1200: {
            items: 4,
          },
          1920: {
            items: 5,
          },
        },
      });
    }
    /*----------------------------------------
            screenshort carousel
        ----------------------------------------*/
    var $screenshortCarouselTwo = $(".screenshort-carousel-02");
    if ($screenshortCarouselTwo.length > 0) {
      $screenshortCarouselTwo.owlCarousel({
        loop: true,
        autoplay: true, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: false,
        nav: true,
        smartSpeed: 3000,
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          414: {
            items: 2,
            nav: false,
          },
          767: {
            items: 2,
            nav: false,
          },
          768: {
            items: 2,
            nav: false,
          },
          960: {
            items: 3,
            nav: false,
          },
          1200: {
            items: 4,
          },
          1920: {
            items: 3,
          },
        },
      });
    }
    /*----------------------------------------
            screenshort carousel
        ----------------------------------------*/
    var $screenshortCarousel = $(".screenshort-carousel");
    if ($screenshortCarousel.length > 0) {
      $screenshortCarousel.owlCarousel({
        loop: true,
        autoplay: true, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: false,
        nav: true,
        smartSpeed: 3000,
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          767: {
            items: 2,
            nav: false,
          },
          768: {
            items: 2,
            nav: false,
          },
          960: {
            items: 3,
            nav: false,
          },
          1200: {
            items: 4,
          },
          1920: {
            items: 4,
          },
        },
      });
    }
    /*----------------------------------------
            testimonial carousel
        ----------------------------------------*/
    var $testimonialCarousel = $(".testimonial-carousel");
    if ($testimonialCarousel.length > 0) {
      $testimonialCarousel.owlCarousel({
        loop: true,
        autoplay: true, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: true,
        nav: true,
        smartSpeed: 3000,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          767: {
            items: 1,
            nav: false,
          },
          768: {
            items: 1,
            nav: false,
          },
          960: {
            items: 1,
            nav: false,
          },
          1200: {
            items: 1,
          },
          1920: {
            items: 1,
          },
        },
      });
    }
    /*----------------------------------------
            testimonialtwo carousel
        ----------------------------------------*/
    var $testimonialCarouselTwo = $(".testimonial-carousel-02");
    if ($testimonialCarouselTwo.length > 0) {
      $testimonialCarouselTwo.owlCarousel({
        loop: true,
        autoplay: false, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 60,
        dots: true,
        nav: true,
        smartSpeed: 3000,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        navText: ["", ""],
        center: true,
        stagePadding: 100,
        responsive: {
          0: {
            items: 1,
            nav: false,
            center: false,
            stagePadding: 10,
          },
          414: {
            items: 1,
            nav: false,
            center: false,
            stagePadding: 10,
          },
          767: {
            items: 1,
            nav: false,
            center: false,
            stagePadding: 10,
          },
          768: {
            items: 1,
            nav: false,
          },
          960: {
            items: 1,
            nav: false,
            center: false,
          },
          1200: {
            items: 2,
            nav: false,
            center: false,
            stagePadding: 10,
          },
          1920: {
            items: 2,
          },
        },
      });
    }
    /*----------------------------------------
            testimonialtwo carousel
        ----------------------------------------*/
    var $testimonialCarouselThree = $(".testimonial-carousel-03");
    if ($testimonialCarouselThree.length > 0) {
      $testimonialCarouselThree.owlCarousel({
        loop: true,
        autoplay: false, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: true,
        nav: true,
        smartSpeed: 3000,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          767: {
            items: 1,
            nav: false,
          },
          768: {
            items: 1,
            nav: false,
          },
          960: {
            items: 2,
            nav: false,
          },
          1200: {
            items: 3,
          },
          1920: {
            items: 3,
          },
        },
      });
    }
    /*----------------------------------------
            Team carousel
        ----------------------------------------*/
    var $teamCarousel = $(".team-carousel");
    if ($teamCarousel.length > 0) {
      $teamCarousel.owlCarousel({
        loop: true,
        autoplay: true, //true if you want enable autoplay
        autoPlayTimeout: 1000,
        margin: 30,
        dots: true,
        nav: true,
        smartSpeed: 3000,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        navText: ["", ""],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          414: {
            items: 1,
            nav: false,
          },
          520: {
            items: 2,
            nav: false,
          },
          767: {
            items: 2,
            nav: false,
          },
          768: {
            items: 2,
            nav: false,
          },
          960: {
            items: 3,
            nav: false,
          },
          1200: {
            items: 4,
          },
          1920: {
            items: 4,
          },
        },
      });
    }
  });

  //define variable for store last scrolltop
  var lastScrollTop = "";
  $(window).on("scroll", function () {
    /*---------------------------
            back to top show / hide
        ---------------------------*/
    var ScrollTop = $(".back-to-top");
    if ($(window).scrollTop() > 1000) {
      ScrollTop.fadeIn(1000);
    } else {
      ScrollTop.fadeOut(1000);
    }
    /*--------------------------
        sticky menu activation
       ---------------------------*/
    var st = $(this).scrollTop();
    var mainMenuTop = $(".navbar-area");
    if ($(window).scrollTop() > 1000) {
      if (st > lastScrollTop) {
        // hide sticky menu on scrolldown
        mainMenuTop.removeClass("nav-fixed");
      } else {
        // active sticky menu on scrollup
        mainMenuTop.addClass("nav-fixed");
      }
    } else {
      mainMenuTop.removeClass("nav-fixed ");
    }
    lastScrollTop = st;
  });

  $(window).on("load", function () {
    /*-----------------------------
            preloader
        -----------------------------*/
    var preLoder = $("#preloader");
    preLoder.fadeOut(1000);
    /*-----------------------------
            back to top
        -----------------------------*/
    var backtoTop = $(".back-to-top");
    backtoTop.fadeOut(100);
  });
})(jQuery);

//handling backend endpoints

const postDataAsAccountant = () => {
  const endpointUrl = "http://localhost:3000/api/v1/accountantDetails";

  let dataFromAccountant = JSON.stringify({
    name: document.getElementById("name").value,
    name_entreprise: document.getElementById("nameEntrep").value,
    entreprise_fiscal_id: document.getElementById("matricule").value,
    entreprise_mobile_number: parseInt(document.getElementById("tel").value),
    accountant_mobile_number: parseInt(
      document.getElementById("telEntrep").value
    ),
    email: document.getElementById("mail").value,
  });

  fetch(endpointUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: dataFromAccountant,
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
};

const postEntrepriseDemand = () => {
  const endpointUrl = "http://localhost:3000/api/v1/entrepriseDetails";

  let dataFromEntreprise = {
    name_entreprise: document.getElementById("nameEntrep").value,
    entreprise_fiscal_id: document.getElementById("matricule").value,
    entreprise_mobile_number: parseInt(document.getElementById("tel").value),
    email: document.getElementById("mail").value,
  };

  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  formData.append("name_entreprise", dataFromEntreprise.name_entreprise);
  formData.append("email", dataFromEntreprise.email);
  formData.append(
    "entreprise_fiscal_id",
    dataFromEntreprise.entreprise_fiscal_id
  );
  formData.append(
    "entreprise_mobile_number",
    dataFromEntreprise.entreprise_mobile_number
  );

  formData.append("logo_filename", fileField.files[0]);

  fetch(endpointUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
