(function () {
  var $;
  $ = this.jQuery || window.jQuery;
  (win = $(window)), (body = $('body')), (doc = $(document));

  $.fn.hc_accordion = function () {
    var acd = $(this);
    acd.find('ul>li').each(function (index, el) {
      if ($(el).find('ul li').length > 0)
        $(el).prepend('<button type="button" class="acd-drop"></button>');
    });
    acd.on('click', '.acd-drop', function (e) {
      e.preventDefault();
      var ul = $(this).nextAll('ul');
      if (ul.is(':hidden') === true) {
        ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
        ul.parent('li')
          .parent('ul')
          .children('li')
          .children('.acd-drop')
          .removeClass('active');
        $(this).addClass('active');
        ul.slideDown(180);
      } else {
        $(this).removeClass('active');
        ul.slideUp(180);
      }
    });
  };

  $.fn.hc_menu = function (options) {
    var settings = $.extend(
        {
          open: '.open-mnav',
        },
        options
      ),
      this_ = $(this);
    var m_nav = $(
      '<div class="m-nav"><button class="m-nav-close"><i class="fal fa-times"></i></button><div class="nav-ct"></div></div>'
    );
    var m_nav_over = $('<div class="m-nav-over"></div>');
    body.append(m_nav);
    body.append(m_nav_over);

    m_nav.find('.m-nav-close').click(function (e) {
      e.preventDefault();
      mnav_close();
    });
    m_nav.find('.nav-ct').append($('.logo').clone());
    m_nav.find('.nav-ct').append(this_.children().clone());

    var mnav_open = function () {
      m_nav.addClass('active');
      m_nav_over.addClass('active');
      body.css('overflow', 'hidden');
    };
    var mnav_close = function () {
      m_nav.removeClass('active');
      m_nav_over.removeClass('active');
      body.css('overflow', '');
    };

    doc
      .on('click', settings.open, function (e) {
        e.preventDefault();
        if (win.width() <= 991) mnav_open();
      })
      .on('click', '.m-nav-over', function (e) {
        e.preventDefault();
        mnav_close();
      });

    m_nav.hc_accordion();
  };

  var UI = {
    showArrowSubMenu: function () {
      $('.d-nav')
        .find('ul>li')
        .each(function (index, el) {
          if ($(el).find('ul li').length > 0) $(el).addClass('sub');
        });
    },

    fixedNav: function () {
      $(window).scroll(function () {
        var header = $('header');
        if ($(this).scrollTop() > 50) {
          header.addClass('scroll');
        } else {
          header.removeClass('scroll');
        }
      });
    },

    ready: function () {
      UI.showArrowSubMenu();
      UI.fixedNav();
    },
  };

  UI.ready();

  /*custom here*/
  WOW.prototype.addBox = function (element) {
    this.boxes.push(element);
  };

  var wow = new WOW({
    mobile: false,
  });
  wow.init();

  $('.d-nav').hc_menu({
    open: '.open-mnav',
  });
}).call(this);

const selectOption = {
  init() {
    this.selectOption();
  },

  selectOption() {
    const optionMenu = document.querySelector('.select');

    if (optionMenu) {
      (selectBtn = optionMenu.querySelector('.select-btn')),
        (options = optionMenu.querySelectorAll('.option')),
        (selectText = optionMenu.querySelector('.select-text'));

      selectBtn.addEventListener('click', () =>
        optionMenu.classList.toggle('active')
      );

      options.forEach((option) => {
        option.addEventListener('click', () => {
          const selectedOption =
            option.querySelector('.option-text').textContent;

          selectText.textContent = selectedOption;
          optionMenu.classList.remove('active');
        });
      });
    }
  },
};

const placeABet = {
  init() {
    this.selectIncreaseAndDecrease();
    this.selectTimer();
    this.selectMoney();
  },

  selectIncreaseAndDecrease() {
    const btnBets = document.querySelectorAll('.btn-bet');

    if (!btnBets) return;

    btnBets.forEach((btn) => {
      btn.addEventListener('click', this.handleBetBtnClick);
    });
  },

  handleBetBtnClick() {
    const increaseBtn = document.querySelector('.btn-increase');
    const decreaseBtn = document.querySelector('.btn-decrease');
    const betGuide = document.querySelector('.bet-item-guide');
    const betMoney = document.querySelector('.bet-item-money');

    if (!increaseBtn || !decreaseBtn) return;

    increaseBtn.classList.remove('active');
    decreaseBtn.classList.remove('active');

    this.classList.add('active');

    if (this.classList.contains('btn-decrease')) {
      betGuide.textContent = 'Giảm';
      betGuide.classList.remove('bet-item-rise');
      betGuide.classList.add('bet-item-drop');

      betMoney.classList.remove('bet-item-rise');
      betMoney.classList.add('bet-item-drop');
    } else {
      betGuide.textContent = 'Tăng';
      betGuide.classList.remove('bet-item-drop');
      betGuide.classList.add('bet-item-rise');

      betMoney.classList.remove('bet-item-drop');
      betMoney.classList.add('bet-item-rise');
    }
  },

  selectTimer() {
    this.selectActive('.bet-timer-list > li');
  },

  selectMoney() {
    this.selectActive('.bet-number > li');

    const betNumberList = document.querySelector('.bet-number');

    if (!betNumberList) return;

    betNumberList.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const moneyValue = e.target.textContent;
        const amount = document.querySelector('.bet-currency-amount input');
        amount.value = moneyValue;
      }
    });
  },

  selectActive(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements) return;

    elements.forEach((el) => {
      el.addEventListener('click', () => {
        const currentActive = document.querySelector(`${selector}.active`);
        if (currentActive) currentActive.classList.remove('active');

        el.classList.add('active');
      });
    });
  },
};

const optionAvatar = {
  init() {
    this.openSelectUser();
    this.openSelectLang();
  },

  openSelectUser() {
    const btnAvatar = document.querySelector('.user button');

    btnAvatar?.addEventListener('click', function () {
      this.nextElementSibling.classList.toggle('active');
    });
  },

  openSelectLang() {
    const btnLang = document.querySelector('.lang>button');

    btnLang?.addEventListener('click', function () {
      this.nextElementSibling.classList.toggle('active');
    });
  },
};

const popup = {
  init() {
    this.showPopup();
    this.handleHidePopup();
  },

  elem: {
    btnClosePopup: document.querySelector('.pop-close'),
    btnCancelPopup: document.querySelector('.cancel'),
    btnSuccess: document.querySelector('.pop-foot .success'),
  },

  handleHidePopup() {
    this.hidePopup(this.elem.btnClosePopup);
    this.hidePopup(this.elem.btnCancelPopup);
    this.hidePopup(this.elem.btnSuccess);
  },

  showPopup() {
    const btnShowPopup = document.querySelectorAll('.buy .body>button');
    btnShowPopup.forEach(function (item) {
      item.addEventListener('click', () => {
        document.querySelector('.popup').classList.add('active');
      });
    });
  },

  hidePopup(el) {
    el?.addEventListener('click', function () {
      this.closest('.popup').classList.remove('active');
    });
  },
};

const menuMo = {
  init() {
    // this.showMenu();
  },
  showMenu() {
    const btnMenu = $('.wrap-bet .btn-menu');
    btnMenu.click(function () {
      $(this).next().toggleClass('active')
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
//   selectOption.init();
//   placeABet.init();
//   optionAvatar.init();
//   popup.init();
//   menuMo.init();
});
