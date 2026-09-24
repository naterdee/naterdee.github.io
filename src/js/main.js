/* Your JS here. */

const navButtons = document.querySelectorAll('.navbar a.buttons');
const sections = document.querySelectorAll('.top, .projects, .showcase, .contact');
const navBar = document.querySelector('.navbar');
const name = document.querySelector('.navbar a.name');
const right = document.querySelector('.next');
const left = document.querySelector('.prev');
const modal = document.querySelector('.modal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalLink = document.querySelector('#modal-link');
let activeModalTrigger;

const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');

let slideNum = 1;
showSlides(slideNum);



function scrollUpdate() {
  let currentSectionId = '';

  if (window.scrollY > 80) {
    navBar.style.height = "58px";
    navButtons.forEach((button) => {
      button.style.fontSize = "14px";
      button.style.padding = "8px 10px";
    });
    name.style.fontSize = "25px";
  } else {
    navBar.style.height = "82px";
    navButtons.forEach((button) => {
      button.style.fontSize = "16px";
      button.style.padding = "12px 10px";
    });
    name.style.fontSize = "34px";
  }

  const navBottom = navBar.getBoundingClientRect().bottom;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= navBottom + 4) {
      currentSectionId = section.getAttribute('id');
    }
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentSectionId = 'contact';
  }

  // Sets button's active status
  navButtons.forEach((button) => {
    button.classList.remove('active');
    if (button.getAttribute('href') === `#${currentSectionId}`) {
      button.classList.add('active');
    }
  });

}

navButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(button.getAttribute('href'));
    const targetOffset = target.id === 'top' ? 82 : 58;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - targetOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

// Next/previous controls
right.addEventListener('click', () => showSlides(slideNum + 1));
left.addEventListener('click', () => showSlides(slideNum - 1));

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    activeModalTrigger = trigger;
    modalTitle.textContent = trigger.dataset.title;
    modalDescription.textContent = trigger.dataset.description;
    modalLink.href = trigger.dataset.link;
    modalLink.textContent = `${trigger.dataset.linkText} `;
    modalLink.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>');
    modal.hidden = false;
    modalClose.focus();
  });
});

modalClose.addEventListener('click', () => {
  modal.hidden = true;
  activeModalTrigger.focus();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.hidden = true;
    activeModalTrigger.focus();
  }
});

document.addEventListener('keydown', (event) => {
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
  let i;
  if (n > slides.length) {n = 1}
  if (n < 1) {n = slides.length}
  slideNum = n;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  slides[slideNum-1].style.display = "block";
  if (dots[slideNum-1]) {
    dots[slideNum-1].classList.add('active');
  }
}

// Listeners
window.addEventListener('scroll', scrollUpdate);
scrollUpdate();



