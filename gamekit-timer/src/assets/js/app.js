$(document).ready(function() {
  // date variables set to show demo content only
  var now = new Date(Date.now());
  var day = now.getDate();
  var month = now.getMonth(); month++;
  var minutes = now.getMinutes() + 1;
  var formatted = now.getHours() + ":" + minutes;
  // ********************************************

  // date = '2017/10/13 23:49';
  var date = '2017/'+ month + '/' + day + ' ' + formatted;
  var fillColor = "#536d99";
  var startSeconds = 0;
  var currentSeconds = 1;
  var progressValue;
  var progressInitiation = false;

  $('#countdown-timer').countdown(date , function(event) {
    // console.log(event);
    if (startSeconds === 0) {
      startSeconds = event.offset.totalSeconds;
    }

    if (event.offset.days) {
      $(this).html(event.strftime('%d days %H:%M:%S'));
    }else if (event.offset.hours) {
      $(this).html(event.strftime('%H:%M:%S'));
    }else {
      $(this).html(event.strftime('%M:%S'));
      currentSeconds = event.offset.totalSeconds;
      progressValue = currentSeconds / startSeconds;

      // animating progress
      if (progressInitiation) {
        $('#progress-bar').circleProgress('value', progressValue); // set value to 0.75 & animate the change
        // looking for animation finish
        $('#progress-bar').on('circle-animation-end', function(event) {
          if (currentSeconds === 0) {
            $(this).css('display', 'none');
            $('.counter_content').find('p').text('Konkurs rozstrzygnięty. Poczekaj na następną edycję.');
            progressInitiation = false;
          }
        });
      }

    }
  });

  // drawing progressbar
  $('#progress-bar').circleProgress({
    value: progressValue,
    size: 150,
    animationStartValue: 1,
    fill: {
      "color": fillColor
    }
  });

  progressInitiation = true;

  // set custom <canvas> styles after circleProgress add
  $('#progress-bar').find('canvas').css('position', 'absolute');
  $('#progress-bar').find('canvas').css('top', '50%');
  $('#progress-bar').find('canvas').css('left', '50%');
  $('#progress-bar').find('canvas').css('transform', 'translate(-50%, -50%)');

});
