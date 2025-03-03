export function updateSwiperOnDownloadImages(mainSlider, slider) {
    const sliderWrapper = slider.querySelector('.swiper-wrapper')

    function addSlide(imgSrc, index) {
        let slide = sliderWrapper.querySelector(`img[src="${imgSrc}"]`)
        if (slide) return

        slide = Object.assign(document.createElement('div'), { className: 'swiper-slide' })
        slide.dataset.index = index
        //клик на слайд

        slide.innerHTML = `<img width="60" height="60" src="${imgSrc}" alt="Красивая футболка" />`

        sliderWrapper.append(slide)
    }

    addSlides()

    const observer = new MutationObserver((mutations, obs) => addSlides)

    function addSlides() {
        mainSlider.querySelectorAll('.t-slds__item:not([data-slide-index="0"]) .t-slds__imgwrapper').forEach((imgWrapper, index) => {
            const src = imgWrapper.dataset.imgZoomUrl

            if (src === undefined) return

            addSlide(src, index + 1)
        })
    }

    observer.observe(mainSlider, { childList: true, subtree: true })
}
