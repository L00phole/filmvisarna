function carousel() {
  const buttons = document.querySelectorAll("[data-carousel-button]")
  // adds functionality to all the buttons lets them loop through the pictures
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

      const activeSlide = slides.querySelector("[data-active]")

      // makes it so the pictures loop indefinetely
      let newIndex = [...slides.children].indexOf(activeSlide) + offset
      if (newIndex < 0) newIndex = slides.children.length - 1
      if (newIndex >= slides.children.length) newIndex = 0

      // adds the active dataset to the current picture that is to be displayed and removes it from the previous one
      slides.children[newIndex].dataset.active = true
      delete activeSlide.dataset.active
    })
  })
}
carousel();