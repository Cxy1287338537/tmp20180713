$(document).ready(function () {

  // navbar的触发器
  (function () {
    $('[cxy-role=navbar-toggle]').on('click', function () {
      var toggle = $(this);
      if(toggle.hasClass('open')) {
        toggle.removeClass('open');
      }
      else {
        toggle.addClass('open');
      }
    })
  })();

  // banner
  (function () {
    var $data = {fx:true};
    var start = function () {
      $data.loopId = setInterval(function(){
        if($data.now===1) {
          $data.fx = true;
        }
        else if($data.now===5){
          $data.fx = false;
        }
        if($data.fx) {
          $data.now++;
        }
        else {
          $data.now--;
        }
      }, 3500)
    }
    var stop = function () {
      clearInterval($data.loopId);
    }

    Object.defineProperties($data, {
      now: {
        get: function () {
          return Number($('.banner-controls-item.active').attr('cxy-banner'));
        },
        set: function (n) {
          if(typeof n !== 'number') return;
          if(n<1 && n>5) return ;
          $('.banner-controls-item').removeClass('active');
          $(`.banner-controls-item[cxy-banner=${n}]`).addClass('active');
          $('.banner-imgs').css('transform', `translateX(-${20*(n-1)}%)`);
        }
      }
    });
    $('.banner-img').each(function(index, node){
      var src = $(node).attr('cxy-src');
      if(src) $(node).css('background-image', `url(${src})`);
    });
    $('.banner-controls-item').on('click', function(){
      $data.now = Number($(this).attr('cxy-banner'));
    });
    $('.banner').on('mouseover', stop);
    $('.banner').on('mouseleave', start);
    start();
  })();

  // 回到顶部
  (function () {
    $('[cxy-role=return-top]').on('click', function () {
      window.scrollTo(0,0);
    });
    $(document).on('scroll', function (e) {
      if(window.scrollY >= 150) {
        $('[cxy-role=return-top]').attr('hidden', null);
      }
      else {
        $('[cxy-role=return-top]').attr('hidden', 'hidden');
      }
    });
  })();
});