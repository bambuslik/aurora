import {
  catalogCards,
  bestSalesCards,
  contacts
} from './utils/initial.js'

//SECTION PROMO
const mobBurgerBtnElement = document.querySelector('.mob-burger');
const mobMenuElement = document.querySelector('.nav-list');

mobBurgerBtnElement.addEventListener('click', (event) => {
  console.log(
    9
  );
  mobBurgerBtnElement.classList.toggle('mob-burger_active');
  mobMenuElement.classList.toggle('nav-list_mob-active');
});

$('.scroll').click(function (event) {
  event.preventDefault();
  //calculate destination place
  let dest = 0;
  if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
    dest = $(document).height() - $(window).height();
  } else {
    dest = $(this.hash).offset().top;
  }
  //go to destination
  $('html,body').animate({scrollTop: dest}, 500, 'swing');
});

//SECTION CATALOG
const catalogListElement = document.querySelector('.catalog-cards');
const catalogMenuFilterElements = document.querySelectorAll('.catalog-menu__item-link');
let catalogCardsFilter = 'all'
let catalogCardsShowMoreStart = 0;
//desktop = 11, mobile = 3
let catalogCardsShowMoreStep = 3;
let catalogCardsShowMoreEnd = catalogCardsShowMoreStart + catalogCardsShowMoreStep;

function setCatalogCards(cardsList, filter) {
  let filteredCardsList = [];
  let showMore = true;
  catalogCardsFilter = filter;

  switch (filter) {
    case '220v':
      filteredCardsList = cardsList.filter((card) => {
        if (card.voltage === 220) return card;
      });
      break;

    case '330v':
      filteredCardsList = cardsList.filter((card) => {
        if (card.voltage === 330) return card;
      });
      break;

    case 'universal':
      filteredCardsList = cardsList;
      break;

    case 'height':
      filteredCardsList = cardsList;
      break;

    default:
      filteredCardsList = cardsList;
  }

  for (let i = 0; i < catalogCardsShowMoreEnd; i++) {
    if (i >= filteredCardsList.length) {
      showMore = false;
      break;
    }

    const catalogCardTemplate = document.querySelector('.catalog-card-template').content.querySelector('.catalog-cards-item').cloneNode(true);
    const catalogCardTitleElement = catalogCardTemplate.querySelector('.catalog-cards-item__title');
    const catalogCardHeightElement = catalogCardTemplate.querySelector('.catalog-cards-item-height');
    const catalogCardWeightElement = catalogCardTemplate.querySelector('.catalog-cards-item-weight');
    const catalogCardPowerTypeElement = catalogCardTemplate.querySelector('.catalog-cards-item-power-type');
    const catalogCardVoltageElement = catalogCardTemplate.querySelector('.catalog-cards-item-voltage');

    catalogCardTitleElement.textContent = filteredCardsList[i].name;
    catalogCardHeightElement.textContent = filteredCardsList[i].height;
    catalogCardWeightElement.textContent = filteredCardsList[i].carrying;
    catalogCardPowerTypeElement.textContent = filteredCardsList[i].powerType
    catalogCardVoltageElement.textContent = filteredCardsList[i].voltage

    catalogListElement.append(catalogCardTemplate);
  }

  if (showMore) {
    const catalogCardsShowMoreButton = document.querySelector('.catalog-card-readmore-button-template').content.querySelector('.catalog-cards-show-more-button-cont').cloneNode(true);
    catalogListElement.append(catalogCardsShowMoreButton);

    const catalogShowMoreButtonElement = document.querySelector('.catalog-cards-show-more-button');
    catalogShowMoreButtonElement.addEventListener('click', () => {
      catalogListElement.innerHTML = '';

      catalogCardsShowMoreEnd += catalogCardsShowMoreStep;

      setCatalogCards(catalogCards, catalogCardsFilter);
    });
  }

  $(".get-popup-kp").click(function (event) {
    event.preventDefault();
    $.fancybox.open({
      src: "#popup-kp",
      touch: false
    })
  });

}

setCatalogCards(catalogCards, catalogCardsFilter);


Array.from(catalogMenuFilterElements).forEach((menuItem) => {

  menuItem.addEventListener('click', (event) => {
    event.preventDefault();

    catalogListElement.innerHTML = '';
    catalogCardsShowMoreEnd = catalogCardsShowMoreStart + catalogCardsShowMoreStep;

    Array.from(catalogMenuFilterElements).forEach((menuItem) => {
      menuItem.classList.remove('catalog-menu__item-link_active');
    });
    event.target.classList.add('catalog-menu__item-link_active');

    setCatalogCards(catalogCards, event.target.dataset.filter);
  });


});


console.log(
  // catalogCardTemplate
);


//SECTION SALES LEADERS
const salesLeadersNavigationPrevElement = document.querySelector('.sales-leaders-slider-navigation__prev');
const salesLeadersNavigationNextElement = document.querySelector('.sales-leaders-slider-navigation__next');
const salesLeadersTitleElement = document.querySelector('.sales-leaders-slider__title');
const salesLeadersSubTitle = document.querySelector('.sales-leaders-slider__sub-title');
const salesLeadersHeight = document.querySelector('.sales-leaders-height');
const salesLeadersWeight = document.querySelector('.sales-leaders-weight');
const salesLeadersPowerType = document.querySelector('.sales-leaders-power-type');
const salesLeadersSalesLastMonth = document.querySelector('.sales-leaders-slider__sales-last-month');
const salesLeadersImg = document.querySelector('.sales-leaders-slider__img');

let salesLeadersActiveNumber = 0;

function slideSalesLeaders(activeNumber) {
  if (activeNumber < 0) activeNumber = (bestSalesCards.length - 1);
  if (activeNumber > (bestSalesCards.length - 1)) activeNumber = 0;

  salesLeadersTitleElement.textContent = bestSalesCards[activeNumber].name;
  salesLeadersSubTitle.textContent = bestSalesCards[activeNumber].purpose;
  salesLeadersHeight.textContent = bestSalesCards[activeNumber].height;
  salesLeadersWeight.textContent = bestSalesCards[activeNumber].carrying;
  salesLeadersPowerType.textContent = bestSalesCards[activeNumber].powerType;
  salesLeadersSalesLastMonth.textContent = bestSalesCards[activeNumber].salesLastMonth;
  salesLeadersImg.src = 'images/section-sales-leaders/cards/' + bestSalesCards[activeNumber].imgLink;

  salesLeadersActiveNumber = activeNumber;
}

salesLeadersNavigationPrevElement.addEventListener('click', () => {
  salesLeadersActiveNumber--;
  slideSalesLeaders(salesLeadersActiveNumber);
})

salesLeadersNavigationNextElement.addEventListener('click', () => {
  salesLeadersActiveNumber++;
  slideSalesLeaders(salesLeadersActiveNumber);
})

slideSalesLeaders(salesLeadersActiveNumber);

//SECTION PHOTOS
let photosSlider = tns({
  container: '.photos-slider',
  items: 3,
  controls: false,
  navPosition: 'bottom',
  gutter: 30,
  mouseDrag: true,
  responsive: {
    0: {
      items: 1
    },
    450: {
      items: 2,
      gutter: 10,
    },
    782: {
      items: 3,
      gutter: 30,
    }
  }
});

//SECTION MAP
//map start
let myMap;
let lat = 55.753215;
let lng = 37.622504;

function initMap() {
  myMap = new ymaps.Map("map", {
    center: [lat, lng],
    zoom: 16,
    controls: ["zoomControl", "typeSelector"]
  });
  myMap.behaviors.disable('scrollZoom');

  function createMarker(content, lat, lng) {
    let myPlacemark = new ymaps.Placemark([lat, lng], {
      hintContent: '',
      balloonContent: ''
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/map-hint-ico.png',
      iconImageSize: [52, 77],
      iconImageOffset: [-52 / 2, -77]
    });
    myMap.geoObjects.add(myPlacemark);
  }

  createMarker('', lat, lng);
}

let mapsShown = 0;

function showMap() {
  $.getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU', function (data, textStatus, jqxhr) {
    ymaps.ready(initMap);
  });
}

$(document).ready(function () {
  $(window).scroll(function () {
    if (!mapsShown) {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 2000) {
        showMap();
        mapsShown = 1;
      }
    }
  });
});

// showMap();

function reInitMap(x, y) {
  myMap.destroy();
  lat = x;
  lng = y;
  initMap();
}

function setActiveCityLink(event) {
  event.target.closest('.map-info__cities-list').querySelector('.map-info__city_active').classList.remove('map-info__city_active')
  event.target.classList.add('map-info__city_active');
}

const citySpbElement = document.querySelector('.map-info__city_spb');
const cityMskElement = document.querySelector('.map-info__city_msk');
const cityKrasnElement = document.querySelector('.map-info__city_krasn');
const cityKazanElement = document.querySelector('.map-info__city_kazan');
const cityRostovElement = document.querySelector('.map-info__city_rostov');

const mapInfoContactsTitleElement = document.querySelector('.map-info__contacts-title');
const mapInfoContactsTelElement = document.querySelector('.contacts-item-tel');
const mapInfoContactsMailElement = document.querySelector('.contacts-item-email');
const mapInfoContactsAddressElement = document.querySelector('.map-info__contacts-item_address');

function setCityContacts(city) {
  mapInfoContactsTitleElement.textContent = contacts[city].title;
  mapInfoContactsTelElement.textContent = contacts[city].tel;
  mapInfoContactsTelElement.href = `tel:${contacts[city].tel}`;
  mapInfoContactsMailElement.textContent = contacts[city].email;
  mapInfoContactsMailElement.href = `mailto:${contacts[city].email}`;
  mapInfoContactsAddressElement.innerHTML = contacts[city].address;
}

citySpbElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('spb');
  reInitMap(59.939095, 30.315868);
});

cityMskElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('msk');
  reInitMap(55.753215, 37.622504);
});

cityKrasnElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  reInitMap(45.035470, 38.975313);
});

cityKazanElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  reInitMap(55.796127, 49.106405);
});

cityRostovElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  reInitMap(47.229868, 39.723053);
});

//JQUERY
$(document).ready(function () {
  $("input[name='tel']").mask("+7 (999) 999-99-99");

  //POPUPS
  $(".get-popup-callback").click(function (event) {
    event.preventDefault();
    $.fancybox.open({
      src: "#popup-callback",
      touch: false
    })
  });

});