function header_menu() {
  function toggleMenu() {
    const content = this.nextElementSibling
    this.classList.toggle("is-active")
    content.classList.toggle("is-open")
  }

  postMenu = document.querySelector('.HeaderPostButton')
  postMenu.addEventListener('click', toggleMenu)

  userMenu = document.querySelector('.HeaderUserButton')
  userMenu.addEventListener('click', toggleMenu)
}

window.addEventListener('load', header_menu)