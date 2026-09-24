/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js"
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js"
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "../node_modules/html-loader/dist/runtime/getUrl.js"
/*!**********************************************************!*\
  !*** ../node_modules/html-loader/dist/runtime/getUrl.js ***!
  \**********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ },

/***/ "./js/main.js"
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
() {

/* Your JS here. */

var navButtons = document.querySelectorAll('.navbar a.buttons');
var sections = document.querySelectorAll('.top, .projects, .showcase, .contact');
var navBar = document.querySelector('.navbar');
var name = document.querySelector('.navbar a.name');
var right = document.querySelector('.next');
var left = document.querySelector('.prev');
var modal = document.querySelector('.modal');
var modalTriggers = document.querySelectorAll('.modal-trigger');
var modalClose = document.querySelector('.modal-close');
var modalTitle = document.querySelector('#modal-title');
var modalDescription = document.querySelector('#modal-description');
var modalLink = document.querySelector('#modal-link');
var activeModalTrigger;
var slides = document.querySelectorAll('.mySlides');
var dots = document.querySelectorAll('.dot');
var slideNum = 1;
showSlides(slideNum);
function scrollUpdate() {
  var currentSectionId = '';
  if (window.scrollY > 80) {
    navBar.style.height = "58px";
    navButtons.forEach(function (button) {
      button.style.fontSize = "14px";
      button.style.padding = "8px 10px";
    });
    name.style.fontSize = "25px";
  } else {
    navBar.style.height = "82px";
    navButtons.forEach(function (button) {
      button.style.fontSize = "16px";
      button.style.padding = "12px 10px";
    });
    name.style.fontSize = "34px";
  }
  var navBottom = navBar.getBoundingClientRect().bottom;
  sections.forEach(function (section) {
    var sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= navBottom + 4) {
      currentSectionId = section.getAttribute('id');
    }
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentSectionId = 'contact';
  }

  // Sets button's active status
  navButtons.forEach(function (button) {
    button.classList.remove('active');
    if (button.getAttribute('href') === "#".concat(currentSectionId)) {
      button.classList.add('active');
    }
  });
}
navButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var target = document.querySelector(button.getAttribute('href'));
    var targetOffset = target.id === 'top' ? 82 : 58;
    var targetPosition = target.getBoundingClientRect().top + window.scrollY - targetOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// Next/previous controls
right.addEventListener('click', function () {
  return showSlides(slideNum + 1);
});
left.addEventListener('click', function () {
  return showSlides(slideNum - 1);
});
modalTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    activeModalTrigger = trigger;
    modalTitle.textContent = trigger.dataset.title;
    modalDescription.textContent = trigger.dataset.description;
    modalLink.href = trigger.dataset.link;
    modalLink.textContent = "".concat(trigger.dataset.linkText, " ");
    modalLink.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>');
    modal.hidden = false;
    modalClose.focus();
  });
});
modalClose.addEventListener('click', function () {
  modal.hidden = true;
  activeModalTrigger.focus();
});
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.hidden = true;
    activeModalTrigger.focus();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.hidden) {
    modal.hidden = true;
    activeModalTrigger.focus();
  }
});

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideNum = n);
}
function showSlides(n) {
  var i;
  if (n > slides.length) {
    n = 1;
  }
  if (n < 1) {
    n = slides.length;
  }
  slideNum = n;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  slides[slideNum - 1].style.display = "block";
  if (dots[slideNum - 1]) {
    dots[slideNum - 1].classList.add('active');
  }
}

// Listeners
window.addEventListener('scroll', scrollUpdate);
scrollUpdate();

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss"
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss ***!
  \*************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/image.jpg */ "./assets/image.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #f5f3ed;
  color: #17232d;
  font-family: Georgia, "Times New Roman", serif;
}

.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 82px;
  padding: 0 24px;
  overflow: hidden;
  background: rgba(23, 35, 45, 0.96);
  color: white;
  transition: height 0.35s ease, padding 0.35s ease;
}

.navbar a {
  text-decoration: none;
}

.navbar .name {
  color: #2f80ed;
}

.navbar .buttons {
  position: relative;
  padding: 12px 10px;
  color: #dce7e8;
  font-size: 16px;
  transition: color 0.2s ease, font-size 0.35s ease;
}

.navbar .buttons:hover,
.navbar .buttons.active {
  color: white;
}

.navbar .buttons::after {
  position: absolute;
  right: 10px;
  bottom: 3px;
  left: 10px;
  height: 3px;
  background: #8de3d5;
  content: "";
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.navbar .buttons.active::after {
  transform: scaleX(1);
}

.slideshow-container {
  position: relative;
  overflow: hidden;
  max-width: 680px;
  margin: 0 auto;
  border: 10px solid rgba(255, 255, 255, 0.75);
  box-shadow: 20px 20px 0 rgba(23, 35, 45, 0.16);
}

.prev, .next {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 50%;
  background: rgba(23, 35, 45, 0.82);
  color: white;
  cursor: pointer;
  transform: translateY(-50%);
}

.projects {
  padding: clamp(72px, 10vw, 132px) 24px;
  scroll-margin-top: 82px;
  background: #f5f3ed;
}

.footer {
  padding: 28px 24px;
  background: #17232d;
  color: #dce7e8;
}

.modal {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(23, 35, 45, 0.75);
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 800px) {
  .navbar {
    padding: 0 14px;
  }
}
@media (max-width: 480px) {
  .navbar .name {
    display: none;
  }
}
.top {
  padding: clamp(72px, 10vw, 132px) 24px;
  scroll-margin-top: 82px;
  padding-top: calc(\$nav-height + 72px);
  padding-bottom: clamp(48px, 7vw, 88px);
  background: #66d6cb;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(32px, 7vw, 100px);
}

.eyebrow {
  margin: 0 0 14px;
  color: #167a78;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-copy h1, .section-inner h2 {
  margin: 0 0 18px;
  font-size: clamp(42px, 7vw, 86px);
  line-height: 0.98;
}

.hero-summary {
  max-width: 430px;
  margin: 0;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.35;
}

.mySlides {
  display: none;
  position: relative;
  width: 100%;
}

.mySlides img {
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  -o-object-fit: cover;
     object-fit: cover;
}

.caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 18px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: white;
  font-size: 16px;
}

.prev {
  left: 16px;
}

.next {
  right: 16px;
}

.prev:hover, .next:hover {
  background: #167a78;
}

.projects {
  padding: clamp(72px, 10vw, 132px) 24px;
  scroll-margin-top: 82px;
  background: #f5f3ed;
}

.projects h2, .contact h2 {
  font-size: clamp(38px, 6vw, 70px);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 52px;
}

.project-card {
  min-height: 250px;
  padding: 28px;
  background: white;
  border-top: 5px solid #8de3d5;
  box-shadow: 0 12px 28px rgba(23, 35, 45, 0.08);
}

.project-icon {
  color: #167a78;
  font-size: 30px;
}

.project-card h3 {
  margin: 34px 0 8px;
  font-size: 25px;
}

.project-card p {
  margin: 0;
  color: #59646b;
  font-size: 17px;
  line-height: 1.5;
}

.showcase {
  padding: clamp(72px, 10vw, 132px) 24px;
  scroll-margin-top: 82px;
  background: linear-gradient(rgba(23, 35, 45, 0.87), rgba(23, 35, 45, 0.87)), url(${___CSS_LOADER_URL_REPLACEMENT_0___}) center/cover fixed;
  color: white;
}

.showcase a {
  color: white;
}

.showcase a:hover {
  color: #8de3d5;
}

.showcase .eyebrow {
  color: #8de3d5;
}

.showcase h2 {
  max-width: 600px;
}

.showcase-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 64px;
}

.showcase-inner > div > p:last-of-type {
  max-width: 520px;
  color: #d9e1e1;
  font-size: 18px;
  line-height: 1.6;
}

.showcase-video {
  width: 100%;
  border: 8px solid rgba(255, 255, 255, 0.8);
}

.modal-trigger {
  margin-top: 20px;
  padding: 14px 18px;
  border: 0;
  background: #8de3d5;
  color: #17232d;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.contact {
  padding: clamp(72px, 10vw, 132px) 24px;
  scroll-margin-top: 82px;
  background: #d8eee8;
}

.contact-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 42px;
}

.contact-link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  background: white;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(23, 35, 45, 0.13);
}

.contact-link i {
  color: #167a78;
  font-size: 28px;
}

.contact-link span {
  font-size: 21px;
  font-weight: 700;
}

.contact-link small {
  color: #59646b;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.footer {
  padding: 28px 24px;
  background: #17232d;
  color: #dce7e8;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  font-size: 13px;
}

.footer-inner a {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid #738187;
  border-radius: 50%;
  text-decoration: none;
}

.modal[hidden] {
  display: none;
}

.modal {
  position: fixed;
  z-index: 20;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(23, 35, 45, 0.75);
}

.modal-panel {
  position: relative;
  max-width: 520px;
  padding: 46px;
  background: #f5f3ed;
  box-shadow: 14px 14px 0 #8de3d5;
  animation: reveal 0.25s ease-out;
}

.modal-panel h2 {
  margin: 0 0 15px;
  font-size: 42px;
  line-height: 1;
}

.modal-panel p:last-child {
  color: #59646b;
  font-size: 18px;
  line-height: 1.6;
}

.modal-link {
  display: inline-block;
  margin-top: 10px;
  color: #167a78;
  font-weight: 700;
}

.modal-link:hover {
  color: #17232d;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  border: 0;
  background: none;
  color: #17232d;
  cursor: pointer;
  font-size: 22px;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 800px) {
  .navbar {
    padding: 0 14px;
  }

  .navbar .name {
    font-size: 25px;
  }

  .navbar .buttons {
    padding: 10px 7px;
    font-size: 13px;
  }

  .hero-inner, .showcase-inner {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    text-align: center;
  }

  .hero-summary {
    margin: 0 auto;
  }

  .project-grid, .contact-links {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .navbar .name {
    display: none;
  }

  .rightnav {
    width: 100%;
    justify-content: space-between;
  }

  .navbar .buttons {
    font-size: 12px;
  }

  .top {
    padding-right: 14px;
    padding-left: 14px;
  }

  .slideshow-container {
    border-width: 5px;
    box-shadow: 8px 8px 0 rgba(23, 35, 45, 0.16);
  }

  .prev, .next {
    width: 36px;
    height: 36px;
  }
}`, "",{"version":3,"sources":["webpack://./css/main.scss"],"names":[],"mappings":"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","sourcesContent":["$ink: #17232d;\n$paper: #f5f3ed;\n$teal: #8de3d5;\n$nav-height: 82px;\n$content-width: 1160px;\n\n@mixin section-space {\n  padding: clamp(72px, 10vw, 132px) 24px;\n  scroll-margin-top: $nav-height;\n}\n\n* { box-sizing: border-box; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\nhtml { scroll-behavior: smooth; }\n\nbody {\n  margin: 0;\n  background: $paper;\n  color: $ink;\n  font-family: Georgia, 'Times New Roman', serif;\n}\n\n.navbar {\n  position: fixed;\n  z-index: 10;\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  height: $nav-height;\n  padding: 0 24px;\n  overflow: hidden;\n  background: rgba(23, 35, 45, 0.96);\n  color: white;\n  transition: height 0.35s ease, padding 0.35s ease;\n}\n\n.navbar a { text-decoration: none; }\n\n.navbar .name { color: #2f80ed; }\n\n.navbar .buttons {\n  position: relative;\n  padding: 12px 10px;\n  color: #dce7e8;\n  font-size: 16px;\n  transition: color 0.2s ease, font-size 0.35s ease;\n}\n\n.navbar .buttons:hover,\n.navbar .buttons.active { color: white; }\n\n.navbar .buttons::after {\n  position: absolute;\n  right: 10px;\n  bottom: 3px;\n  left: 10px;\n  height: 3px;\n  background: $teal;\n  content: '';\n  transform: scaleX(0);\n  transition: transform 0.2s ease;\n}\n\n.navbar .buttons.active::after { transform: scaleX(1); }\n\n.slideshow-container {\n  position: relative;\n  overflow: hidden;\n  max-width: 680px;\n  margin: 0 auto;\n  border: 10px solid rgba(255, 255, 255, 0.75);\n  box-shadow: 20px 20px 0 rgba(23, 35, 45, 0.16);\n}\n\n.prev, .next {\n  position: absolute;\n  top: 50%;\n  z-index: 1;\n  width: 46px;\n  height: 46px;\n  border: 0;\n  border-radius: 50%;\n  background: rgba(23, 35, 45, 0.82);\n  color: white;\n  cursor: pointer;\n  transform: translateY(-50%);\n}\n\n.projects {\n  @include section-space;\n  background: $paper;\n}\n\n.footer { padding: 28px 24px; background: $ink; color: #dce7e8; }\n\n.modal { position: fixed; z-index: 20; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(23, 35, 45, 0.75); }\n\n@keyframes reveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }\n\n@media (max-width: 800px) {\n  .navbar { padding: 0 14px; }\n}\n\n@media (max-width: 480px) {\n  .navbar .name { display: none; }\n}\n\n.top {\n  @include section-space;\n  padding-top: calc($nav-height + 72px);\n  padding-bottom: clamp(48px, 7vw, 88px);\n  background: #66d6cb;\n}\n\n.hero-inner { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: center; gap: clamp(32px, 7vw, 100px); }\n.eyebrow { margin: 0 0 14px; color: #167a78; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }\n.hero-copy h1, .section-inner h2 { margin: 0 0 18px; font-size: clamp(42px, 7vw, 86px); line-height: 0.98; }\n.hero-summary { max-width: 430px; margin: 0; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.35; }\n.mySlides { display: none; position: relative; width: 100%; }\n.mySlides img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }\n.caption { position: absolute; right: 0; bottom: 0; left: 0; padding: 18px; background: linear-gradient(transparent, rgba(0, 0, 0, 0.75)); color: white; font-size: 16px; }\n.prev { left: 16px; }\n.next { right: 16px; }\n.prev:hover, .next:hover { background: #167a78; }\n.projects { @include section-space; background: $paper; }\n.projects h2, .contact h2 { font-size: clamp(38px, 6vw, 70px); }\n.project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 52px; }\n.project-card { min-height: 250px; padding: 28px; background: white; border-top: 5px solid $teal; box-shadow: 0 12px 28px rgba(23, 35, 45, 0.08); }\n.project-icon { color: #167a78; font-size: 30px; }\n.project-card h3 { margin: 34px 0 8px; font-size: 25px; }\n.project-card p { margin: 0; color: #59646b; font-size: 17px; line-height: 1.5; }\n.showcase { @include section-space; background: linear-gradient(rgba(23, 35, 45, 0.87), rgba(23, 35, 45, 0.87)), url('../assets/image.jpg') center / cover fixed; color: white; }\n.showcase a { color: white; }\n.showcase a:hover { color: $teal; }\n.showcase .eyebrow { color: $teal; }\n.showcase h2 { max-width: 600px; }\n.showcase-inner { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 64px; }\n.showcase-inner > div > p:last-of-type { max-width: 520px; color: #d9e1e1; font-size: 18px; line-height: 1.6; }\n.showcase-video { width: 100%; border: 8px solid rgba(255, 255, 255, 0.8); }\n.modal-trigger { margin-top: 20px; padding: 14px 18px; border: 0; background: $teal; color: $ink; cursor: pointer; font: inherit; font-weight: 700; }\n.contact { @include section-space; background: #d8eee8; }\n.contact-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 42px; }\n.contact-link { display: flex; flex-direction: column; gap: 8px; padding: 24px; background: white; text-decoration: none; transition: transform 0.2s ease, box-shadow 0.2s ease; }\n.contact-link:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(23, 35, 45, 0.13); }\n.contact-link i { color: #167a78; font-size: 28px; }\n.contact-link span { font-size: 21px; font-weight: 700; }\n.contact-link small { color: #59646b; font-family: Arial, sans-serif; font-size: 14px; }\n.footer { padding: 28px 24px; background: $ink; color: #dce7e8; }\n.footer-inner { display: flex; align-items: center; justify-content: space-between; font-family: Arial, sans-serif; font-size: 13px; }\n.footer-inner a { display: grid; width: 36px; height: 36px; place-items: center; border: 1px solid #738187; border-radius: 50%; text-decoration: none; }\n.modal[hidden] { display: none; }\n.modal { position: fixed; z-index: 20; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(23, 35, 45, 0.75); }\n.modal-panel { position: relative; max-width: 520px; padding: 46px; background: $paper; box-shadow: 14px 14px 0 $teal; animation: reveal 0.25s ease-out; }\n.modal-panel h2 { margin: 0 0 15px; font-size: 42px; line-height: 1; }\n.modal-panel p:last-child { color: #59646b; font-size: 18px; line-height: 1.6; }\n.modal-link { display: inline-block; margin-top: 10px; color: #167a78; font-weight: 700; }\n.modal-link:hover { color: $ink; }\n.modal-close { position: absolute; top: 15px; right: 15px; border: 0; background: none; color: $ink; cursor: pointer; font-size: 22px; }\n@keyframes reveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }\n@media (max-width: 800px) { .navbar { padding: 0 14px; } .navbar .name { font-size: 25px; } .navbar .buttons { padding: 10px 7px; font-size: 13px; } .hero-inner, .showcase-inner { grid-template-columns: 1fr; } .hero-copy { text-align: center; } .hero-summary { margin: 0 auto; } .project-grid, .contact-links { grid-template-columns: 1fr; } }\n@media (max-width: 480px) { .navbar .name { display: none; } .rightnav { width: 100%; justify-content: space-between; } .navbar .buttons { font-size: 12px; } .top { padding-right: 14px; padding-left: 14px; } .slideshow-container { border-width: 5px; box-shadow: 8px 8px 0 rgba(23, 35, 45, 0.16); } .prev, .next { width: 36px; height: 36px; } }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./index.html"
/*!********************!*\
  !*** ./index.html ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./css/main.scss */ "./css/main.scss?122f"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/boba.jpeg */ "./assets/boba.jpeg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/travel.jpeg */ "./assets/travel.jpeg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/cs.jpeg */ "./assets/cs.jpeg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/tetris.mp4 */ "./assets/tetris.mp4"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./index.js */ "./index.js?1442"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css\">\n  <title>MP 1</title>\n</head>\n\n\n<body>\n<div class=\"navbar\">\n  <a class=\"name\" href=\"#top\">Nate Dower</a>\n  <div class=\"rightnav\">\n    <a class=\"buttons\" href=\"#top\">Home</a>\n    <a class=\"buttons\" href=\"#projects\">Projects</a>\n    <a class=\"buttons\" href=\"#showcase\">Showcase</a>\n    <a class=\"buttons\" href=\"#contact\">Contact</a>\n  </div>\n</div>\n\n<div id=\"top\" class=\"top\"> \n  <div class=\"section-inner hero-inner\">\n    <div class=\"hero-copy\">\n      <p class=\"eyebrow\">CS 409 / Interactive portfolio</p>\n      <h1>Hi! I'm Nate</h1>\n      <p class=\"hero-summary\">Here's a bit about who I am and what I do.</p>\n    </div>\n\n    <div class=\"slideshow-container\" aria-label=\"Project image carousel\">\n\n      <div class=\"mySlides fade\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"A red fire hydrant\">\n        <div class=\"caption\">I'm a bit of a fiend for milk tea...</div>\n      </div>\n\n      <div class=\"mySlides fade\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"A ceramic plate\">\n        <div class=\"caption\">I love traveling, having gone to 30+ states and 10+ countries.</div>\n      </div>\n\n      <div class=\"mySlides fade\">\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"A second view of a ceramic plate\">\n        <div class=\"caption\">And I'm a Junior at UIUC studying Computer Science!</div>\n      </div>\n\n      <button class=\"prev\" aria-label=\"Previous slide\"><i class=\"fa-solid fa-arrow-left\"></i></button>\n      <button class=\"next\" aria-label=\"Next slide\"><i class=\"fa-solid fa-arrow-right\"></i></button>\n    </div>\n  </div>\n</div>\n\n<div id=\"projects\" class=\"projects\"> \n  <div class=\"section-inner\">\n    <h2>Recent Projects</h2>\n    <div class=\"project-grid\">\n      <article class=\"project-card\">\n        <i class=\"fa-solid fa-dungeon project-icon\" aria-hidden=\"true\"></i>\n        <h3>Dungeon Game</h3>\n        <button class=\"modal-trigger\" type=\"button\" data-title=\"Dungeon Game\" data-description=\"A text-based dungeon crawler with minigames, built collaboratively in Python. The project focused on clear game states, simple interactions, and teamwork.\" data-link=\"https://github.com/CS196Illinois/FA24-Group24\" data-link-text=\"View the project\"><span>View details</span> <i class=\"fa-solid fa-arrow-up-right-from-square\"></i></button>\n      </article>\n      <article class=\"project-card\">\n        <i class=\"fa-solid fa-brain project-icon\" aria-hidden=\"true\"></i>\n        <h3>Neural Networks</h3>\n        <button class=\"modal-trigger\" type=\"button\" data-title=\"Neural Networks\" data-description=\"Exploring the fundamentals of neural networks and their applications in machine learning in Python.\" data-link=\"https://github.com/naterdee/final-project361\" data-link-text=\"View the code\"><span>View details</span> <i class=\"fa-solid fa-arrow-up-right-from-square\"></i></button>\n      </article>\n      <article class=\"project-card\">\n        <i class=\"fa-solid fa-street-view project-icon\" aria-hidden=\"true\"></i>\n        <h3>Street View Images</h3>\n        <button class=\"modal-trigger\" type=\"button\" data-title=\"Street View Images\" data-description=\"A project exploring the use of KartaView images to create 2D street view render in Python.\" data-link=\"https://gitlab.com/jng8893/cs445-final-project\" data-link-text=\"View the code\"><span>View details</span> <i class=\"fa-solid fa-arrow-up-right-from-square\"></i></button>\n      </article>\n    </div>\n  </div>\n</div>\n\n<div id=\"showcase\" class=\"showcase\">\n  <div class=\"section-inner showcase-inner\">\n    <div>\n      <h2>Tetris in Haskell</h2>\n      <p>A fun project built with Codeworld to test my understanding of functional programming.</p>\n      <p><a href=\"https://code.world/haskell#Pc0izLcV8Wv3H5_eeFV5WkQ\" target=\"_blank\" rel=\"noreferrer\">Check it out here <i class=\"fa-solid fa-arrow-up-right-from-square\" aria-hidden=\"true\"></i><span class=\"sr-only\"> (opens in a new tab)</span></a></p>\n    </div>\n    <video class=\"showcase-video\" controls preload=\"metadata\">\n      <source src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" type=\"video/mp4\">\n      Your browser does not support HTML5 video.\n    </video>\n  </div>\n</div>\n<div id=\"contact\" class=\"contact\"> \n  \n  <div class=\"section-inner\">\n    <h2>Let's get in contact!</h2>\n    <div class=\"contact-links\">\n      <a class=\"contact-link\" href=\"mailto:naterdee6@gmail.com\"><i class=\"fa-solid fa-envelope\"></i><span>Email</span><small>naterdee6@gmail.com</small></a>\n      <a class=\"contact-link\" href=\"https://www.linkedin.com/in/ndower/\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-linkedin\"></i><span>LinkedIn</span><small>Nathanael Dower</small></a>\n      <a class=\"contact-link\" href=\"https://www.instagram.com/natesipstea/\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-instagram\"></i><span>Instagram</span><small>@natesipstea</small></a>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" hidden>\n  <div class=\"modal-panel\">\n    <button class=\"modal-close\" type=\"button\" aria-label=\"Close project note\"><i class=\"fa-solid fa-xmark\"></i></button>\n    <p class=\"eyebrow\">Project details</p>\n    <h2 id=\"modal-title\"></h2>\n    <p id=\"modal-description\"></p>\n    <a id=\"modal-link\" class=\"modal-link\" href=\"#\" target=\"_blank\" rel=\"noreferrer\"></a>\n  </div>\n</div>\n  <" + "script src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" defer><" + "/script>\n</body>\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ },

/***/ "./css/main.scss?bd63"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./index.js?1442"
/*!******************!*\
  !*** ./index.js ***!
  \******************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "2f6f1cddf39952e19883.js";

/***/ },

/***/ "./css/main.scss?122f"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "1b1676ce0380ca5fc369.scss";

/***/ },

/***/ "./assets/boba.jpeg"
/*!**************************!*\
  !*** ./assets/boba.jpeg ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "52584be3fbb4fcffe30d.jpeg";

/***/ },

/***/ "./assets/cs.jpeg"
/*!************************!*\
  !*** ./assets/cs.jpeg ***!
  \************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "91167a54dfcbaa34d8db.jpeg";

/***/ },

/***/ "./assets/tetris.mp4"
/*!***************************!*\
  !*** ./assets/tetris.mp4 ***!
  \***************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "18b056b26072c47ea508.mp4";

/***/ },

/***/ "./assets/travel.jpeg"
/*!****************************!*\
  !*** ./assets/travel.jpeg ***!
  \****************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "ff21a0a063c65256a35b.jpeg";

/***/ },

/***/ "./assets/image.jpg"
/*!**************************!*\
  !*** ./assets/image.jpg ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "f7c3d1bc154868c1bcc8.jpg";

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// no installed chunks
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	__webpack_require__.nc = undefined;
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/main.scss */ "./css/main.scss?bd63");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ "./js/main.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files


// Stylesheets


// Scripts

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map