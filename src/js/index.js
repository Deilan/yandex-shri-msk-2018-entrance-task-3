$(window).scroll(function (e) {
  $('.schedule__day-timeline').css("left", -$(window).scrollLeft())
});

$(document).ready(function () {
  resizeSchedule();
  $(window).resize(function (evt) {
      resizeSchedule(evt);
  });

  // $(".schedule").click(function (evt) {
  //     $('.timeline__item--active').removeClass('timeline__item--active');
  //     var target = evt.target;
  //     if (!target.classList.contains('meeting')) {
  //         return;
  //     }
  //     $(target).toggleClass('timeline__item--active');
  //     var halfTargetWidth = $(target).width() / 2;
  //     $(target).find('.timeline__meeting').css('margin-left', halfTargetWidth);
  // });

  // $(".schedule").click(function (evt) {
  //     var target = evt.target;
  //     if (target.classList.contains('schedule__slider-date')) {
  //         $('.schedule__calendar').addClass('schedule__calendar--active');
  //         return;
  //     }
  //     if (target.classList.contains('schedule__calendar') || target.classList.contains('schedule__calendar-inner')) {
  //         return;
  //     }
  //     $('.schedule__calendar--active').removeClass('schedule__calendar--active')
  // });
});

function resizeSchedule(evt) {
  var timelineWidth = getTimelineWidth();
  var windowWidth = $(window).width();
  var resultWidth = timelineWidth > windowWidth ? timelineWidth : "100%";
  $(".schedule").css("width", resultWidth);
}

function getTimelineWidth() {
  var spacing = getSpacing($(".schedule__day-timeline"));
  return spacing + $(".day-timeline__list").outerWidth(true);
}

function getSpacing(el) {
  return el.outerWidth(true) - el.outerWidth(false);
}
