import {
  catalogCards,
  bestSalesCards,
  contacts
} from './utils/initial.js'

//SECTION PROMO
const mobBurgerBtnElement = document.querySelector('.mob-burger');
const mobMenuElement = document.querySelector('.nav-list');

mobBurgerBtnElement.addEventListener('click', (event) => {
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
//desktop = 11, mobile = 4
let catalogCardsShowMoreStep = 4;
let catalogCardsShowMoreEnd = catalogCardsShowMoreStart + catalogCardsShowMoreStep;

function setCatalogCards(cardsList, filter) {
  let filteredCardsList = [];
  let showMore = true;
  catalogCardsFilter = filter;

  if (catalogCardsFilter === 'all') {
    filteredCardsList = cardsList;
  } else {
    filteredCardsList = cardsList.filter((card) => {
      if (card.filter === Number(catalogCardsFilter)) return card;
    });
  }

  for (let i = 0; i < catalogCardsShowMoreEnd; i++) {
    if (i >= filteredCardsList.length) {
      showMore = false;
      break;
    }

    const catalogCardTemplate = document.querySelector('.catalog-card-template').content.querySelector('.catalog-cards-item').cloneNode(true);
    const catalogCardImgElement = catalogCardTemplate.querySelector('.catalog-cards-item__img');
    const catalogCardTitleElement = catalogCardTemplate.querySelector('.catalog-cards-item__title');
    const catalogCardTypeElement = catalogCardTemplate.querySelector('.catalog-cards-item-type');
    const catalogCardHeightElement = catalogCardTemplate.querySelector('.catalog-cards-item-height');
    const catalogCardWeightElement = catalogCardTemplate.querySelector('.catalog-cards-item-weight');
    const catalogCardPowerTypeElement = catalogCardTemplate.querySelector('.catalog-cards-item-power-type');
    const catalogCardCarryElement = catalogCardTemplate.querySelector('.catalog-cards-item-carry');

    catalogCardImgElement.src = `images/section-catalog/cards/${filteredCardsList[i].imgLink}`;
    catalogCardTitleElement.textContent = filteredCardsList[i].name;
    catalogCardTypeElement.textContent = filteredCardsList[i].type;
    catalogCardHeightElement.textContent = filteredCardsList[i].height;
    catalogCardWeightElement.textContent = filteredCardsList[i].weight;
    catalogCardCarryElement.textContent = filteredCardsList[i].carrying;
    catalogCardPowerTypeElement.textContent = filteredCardsList[i].powerType

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
//default city
let markerLat = 55.914292;
let markerLng = 37.417769;
let centerLat = 55.914636;
let centerLng = 37.414357;
let centerLatMob = 55.918684;
let centerLngMob = 37.417554;

const isMobMap = window.screen.width < 768;

function initMap() {
  let mapX;
  let MapY;
  if (isMobMap) {
    mapX = centerLatMob;
    MapY = centerLngMob;
  } else {
    mapX = centerLat;
    MapY = centerLng;
  }
  myMap = new ymaps.Map("map", {
    center: [mapX, MapY],
    zoom: 16,
    controls: ["zoomControl", "typeSelector"]
  });
  myMap.behaviors.disable('scrollZoom');

  function createMarker(content, markerLat, markerLng) {
    let myPlacemark = new ymaps.Placemark([markerLat, markerLng], {
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

  createMarker('', markerLat, markerLng);
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

function reInitMap(markerX, markerY, mapX, mapY, mapXMob, mapYMob) {
  myMap.destroy();
  markerLat = markerX;
  markerLng = markerY;
  centerLat = mapX;
  centerLng = mapY;
  centerLatMob = mapXMob;
  centerLngMob = mapYMob;
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
const cityVoronezhElement = document.querySelector('.map-info__city_voronezh');
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

cityMskElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('msk');
  reInitMap(55.914292, 37.417769, 55.914636, 37.414357, 55.918684, 37.417554);
});

citySpbElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('spb');
  reInitMap(59.944702, 30.515438, 59.945008, 30.511619, 59.948022, 30.514344);
});

cityRostovElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('rostov');
  reInitMap(47.192296, 39.689932, 47.192859, 39.687207, 47.196004, 39.690704);
});

cityKazanElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('kazan');
  reInitMap(55.825578, 49.021847, 55.826043, 49.018585, 55.828380, 49.022083);
});

cityKrasnElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('krasn');
  reInitMap(45.024488, 39.126338, 45.024816, 39.123805, 45.028329, 39.125982);
});

cityVoronezhElement.addEventListener('click', (event) => {
  setActiveCityLink(event);
  setCityContacts('voronezh');
  reInitMap(51.680453, 39.176859, 51.680687, 39.174070, 51.684499, 39.176649);
});

setCityContacts('msk');


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