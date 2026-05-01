const hamburgerMenu = document.getElementById('hamburger-menu');
const hamburgerMenuContainer = document.getElementById('hamburger-menu-container');
const selectLanguageContainer = document.getElementById('languages-hamburger-menu');

const hamburgerMenuChildren = Array.from(hamburgerMenuContainer.children);
hamburgerMenuChildren.pop();

const toggleHamburgerMenu = () => {
    hamburgerMenuContainer.classList.toggle('hidden');
};

hamburgerMenu.addEventListener('click', toggleHamburgerMenu);

hamburgerMenuChildren.forEach(child => {
    child.addEventListener('click', toggleHamburgerMenu);
});

selectLanguageContainer.addEventListener('change', toggleHamburgerMenu);