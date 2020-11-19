$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    $.ajax({
      url: "sendmail.php",
      type: 'POST',
      data: formData,
      beforeSend: function () {
        $.fancybox.open({
          src: "#popup-sending"
        });
      },
      success: function (data) {

      },
      cache: false,
      contentType: false,
      processData: false
    })
      .done(function (data) {
        // $(".loader").removeClass("on");
        $.fancybox.close();
        $.fancybox.open({
          src: "#popup-thanks"
        });
        console.log('form-submitted');
      });
  });
});