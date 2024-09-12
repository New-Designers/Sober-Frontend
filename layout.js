function setActive(element) {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const icons = link.querySelectorAll('i');
        icons[0].style.display = 'inline-block'; 
        icons[1].style.display = 'none';
    });

    const currentIcons = element.querySelectorAll('i');
    currentIcons[0].style.display = 'none';
    currentIcons[1].style.display = 'inline-block';
}
