jQuery(document).ready(function ($) {
  $(document).ready(function () {
    const pin = 1011;
    const $pindiv = $("#pincode");
    let enterCode = "";
    enterCode.toString();

    $("#numbers button").click(function () {
      const clickedNumber = $(this).text().toString();
      enterCode = enterCode + clickedNumber;
      let lengthCode = parseInt(enterCode.length);
      lengthCode--;
      $("#fields .numberfield:eq(" + lengthCode + ")").addClass("active");

      if (lengthCode === 3) {
        // Check the PIN
        if (parseInt(enterCode) === pin) {
          // Right PIN!
          $("#fields .numberfield").addClass("right");
          $("#numbers").addClass("hide");
          $("#anleitung p").html("Surprise !");
          setTimeout(() => {
            $pindiv.addClass("displayNone");
            giftAnnim();

            setTimeout(() => {
              document.getElementById("card").style.display = "block";
              document.getElementById("confettis").style.display = "none";
            }, 4100);
          }, 2000);
        } else {
          // Wrong PIN!
          $("#fields").addClass("miss");
          enterCode = "";
          setTimeout(function () {
            $("#fields .numberfield").removeClass("active");
          }, 200);
          setTimeout(function () {
            $("#fields").removeClass("miss");
          }, 500);
        }
      } else {
      }
    });

    $("#restartbtn").click(function () {
      enterCode = "";
      $("#fields .numberfield").removeClass("active");
      $("#fields .numberfield").removeClass("right");
      $("#numbers").removeClass("hide");
    });
  });

  const $el = $("#pincode");
  const elHeight = $el.outerHeight();
  const elWidth = $el.outerWidth();

  const $el2 = $("#card");
  const elHeight2 = $el2.outerHeight();
  const elWidth2 = $el2.outerWidth();

  const $wrapper = $("window");

  window.addEventListener("resize", doResize);

  $wrapper.resizable({
    resize: doResize
  });

  function doResize(event, ui) {
    var scale, scale2, origin;

    scale = Math.min(
      window.innerWidth / elWidth,
      window.innerHeight / elHeight
    );

    scale2 = Math.min(
      window.innerWidth / elWidth2,
      window.innerHeight / elHeight2
    );

    $el.css({
      transform: "scale(" + scale + ")"
    });

    $el2.css({
      transform: "scale(" + scale2 + ")"
    });
  }

  const starterData = {
    size: {
      width: window.innerWidth,
      height: window.innerHidth
    }
  };
  doResize(null, starterData);
});

gsap.registerPlugin(CustomEase, EasePack, CustomWiggle);

function giftAnnim() {
  jQuery(function ($) {
    $(".svg-wrapper [data-origin]").each(function (index) {
      let thisName = $(this).is("[class]")
        ? "." + $(this).attr("class")
        : "#" + $(this).attr("id");
      thisName += " " + this.nodeName;

      if ($(this).is("[data-origin]")) {
        const tOrig = $(this).attr("data-origin");
        if (tOrig) {
          gsap.set($(this).get(0), { transformOrigin: tOrig });
        } else {
        }
      } else {
      }
    });

    gsap.set("g.surprise-gift .confetti", { opacity: 0 });
    for (let i = 0; i < $("g.surprise-gift .confetti rect").length; i++) {
      const confetto = $("g.surprise-gift .confetti rect")[i];
      const randX = Math.random() * 6 * 100;
      const xPos = randX + 50;
      const dataAngle = randX / 15 - 20;

      gsap.set(confetto, {
        xPercent: xPos,
        attr: { "data-angle": dataAngle, "data-x": xPos },
        rotation: Math.random() * 180,
        scale: Math.random() * 0.5 + 0.5
      });
      gsap.to(confetto, {
        scaleX: 0.2,
        rotation: Math.random() * 360,
        duration: (Math.random() * 10) / 10 + 0.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    let surpriseTL = gsap.timeline({ delay: 0.5 });
    CustomWiggle.create("giftShake", { wiggles: 60, timingEase: "expo.out" });
    surpriseTL.to("g.surprise-gift", {
      rotation: 2.5,
      duration: 2,
      ease: "giftShake",
      onStart: function () {
        $(".bg").removeClass("gift-open");
      }
    });
    surpriseTL.to("g.surprise-gift .lid", {
      yPercent: -70,
      rotation: -5,
      duration: 0.25,
      delay: -0.15,
      ease: "back.out(4)",
      onStart: function () {
        $(".bg").addClass("gift-open");
      }
    });
    surpriseTL.to("g.surprise-gift .lid-cast-shadow", {
      scaleY: 2,
      opacity: 0,
      duration: 0.25,
      delay: -0.4,
      ease: "expo.in"
    });
    surpriseTL.set("g.surprise-gift .confetti rect", { opacity: 1 }, "<0.15");
    surpriseTL.set(
      "g.surprise-gift .confetti",
      { opacity: 1, onComplete: sprinkleConfetti },
      "<0"
    );
    surpriseTL.to("g.surprise-gift .lid", {
      yPercent: 0,
      rotation: 0,
      duration: 0.5,
      delay: 1,
      ease: "bounce.out"
    });
    surpriseTL.to("g.surprise-gift .lid-cast-shadow", {
      scaleY: 1,
      opacity: 1,
      duration: 0.5,
      delay: -0.5,
      ease: "bounce.out"
    });

    function sprinkleConfetti() {
      for (let i = 0; i < $("g.surprise-gift .confetti rect").length; i++) {
        const peakY = Math.random() * 30 + 20;
        const upTime = (Math.random() * 10) / 10 + 0.1;
        const downTime = Math.random() * 1 + 0.5;
        const confetto = $("g.surprise-gift .confetti rect")[i];
        const jConfetto = $(confetto);
        const dataAngle = jConfetto.attr("data-angle");

        const confettoTL = gsap.timeline();
        confettoTL.to(confetto, {
          x: "+=" + dataAngle,
          y: -peakY,
          duration: upTime,
          ease: "expo.out"
        });
        confettoTL.to(confetto, {
          y: 60,
          opacity: 1,
          duration: downTime,
          ease: "linear"
        });
      }
    }
  });
}
