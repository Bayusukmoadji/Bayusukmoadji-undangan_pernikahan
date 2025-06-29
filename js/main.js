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

  // SOLUSI HYBRID (KLIK + SCROLL) - Metode Paling Andal
  window.addEventListener("load", function () {
    const music = document.getElementById("background_music");
    let hasInteracted = false; // Penanda apakah pengguna sudah berinteraksi

    if (!music) {
      console.error("Elemen musik tidak ditemukan!");
      return;
    }

    // --- BAGIAN 1: MEMBUKA KUNCI AUDIO DENGAN INTERAKSI PERTAMA ---
    // Fungsi ini hanya berjalan SEKALI untuk membuka izin audio
    function unlockAudio() {
      if (!hasInteracted) {
        console.log(
          "Interaksi pertama (klik/sentuh) terdeteksi. Izin audio dibuka."
        );
        // Trik: putar dan langsung jeda untuk "mendaftarkan" interaksi
        music
          .play()
          .then(() => {
            music.pause();
            music.currentTime = 0; // Kembali ke awal lagu
          })
          .catch((e) => console.log("Gagal membuka izin audio."));

        hasInteracted = true;
        // Hapus listener ini setelah berhasil
        document.body.removeEventListener("click", unlockAudio);
        document.body.removeEventListener("touchstart", unlockAudio);
      }
    }

    document.body.addEventListener("click", unlockAudio);
    document.body.addEventListener("touchstart", unlockAudio);

    // --- BAGIAN 2: MEMUTAR MUSIK SAAT PENGGUNA SCROLL ---
    // Fungsi ini akan memutar musik jika izin sudah dibuka DAN pengguna sudah scroll
    function playMusicOnScroll() {
      // Cek 2 kondisi: sudah ada interaksi DAN sudah scroll melewati batas
      if (hasInteracted && window.scrollY > 50) {
        if (music.paused) {
          console.log(
            "Scroll terdeteksi setelah interaksi. Memutar musik sekarang."
          );
          music.play();
          // Hapus listener scroll agar tidak berjalan terus-menerus
          window.removeEventListener("scroll", playMusicOnScroll);
        }
      }
    }

    window.addEventListener("scroll", playMusicOnScroll);

    console.log("Sistem musik Hybrid siap. Menunggu interaksi dan scroll.");
  });
})(jQuery);
