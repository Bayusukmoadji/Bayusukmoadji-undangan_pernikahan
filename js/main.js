(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-300px");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 90,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Kode untuk Splash Screen dan Autoplay Musik
  window.addEventListener("load", function () {
    const splashScreen = document.getElementById("splashScreen");
    const music = document.getElementById("background_music");

    if (!splashScreen) {
      console.log(
        "Splash screen tidak ditemukan, musik mungkin tidak akan autoplay."
      );
      return;
    }

    // Fungsi yang akan dijalankan saat layar diketuk
    function openInvitation() {
      // 1. Ubah opacity menjadi 0 untuk memulai efek fade-out
      splashScreen.style.opacity = "0";

      // 2. Putar musiknya
      music.play().catch((error) => {
        console.error("Gagal memutar musik:", error);
      });

      // 3. Setelah transisi selesai (800ms), sembunyikan elemen splash screen
      //    agar tidak menghalangi konten di bawahnya.
      setTimeout(() => {
        splashScreen.style.display = "none";
      }, 800); // Angka ini (800ms) harus sama dengan durasi transisi di CSS
    }

    // Menambahkan event listener ke splash screen
    // Opsi { once: true } memastikan listener ini hanya berjalan sekali
    splashScreen.addEventListener("click", openInvitation, { once: true });
    splashScreen.addEventListener("touchstart", openInvitation, { once: true });
  });
})(jQuery);
