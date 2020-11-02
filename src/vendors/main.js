$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    // formData.append('utm_source', getUrlParameter("utm_source"));
    // formData.append('utm_medium', getUrlParameter("utm_medium"));
    // formData.append('utm_campaign', getUrlParameter("utm_campaign"));

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
        // gtag('event', 'sendemail', {'event_category': 'form', 'event_action': 'submitted'});
        // ym(68320468, 'reachGoal', 'form-submitted');
        console.log('form-submitted');
      });
  });

});