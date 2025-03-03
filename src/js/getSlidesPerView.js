export function getSlidesPerView(mainSlider, slider) {
    const pad = 37
    const width = 980
    const slideSize = 65

    const mainSliderContainer = mainSlider.querySelector('.t-slds__items-wrapper')
    const sliderInner = slider.querySelector('.swiper')

    return new Promise(async (resolve, reject) => {
        const sizes = await getSizes()

        if (window.innerWidth >= width) {
            slider.style.maxWidth = `auto`
            slider.style.maxHeight = `${sizes.height}px`

            const count = Math.round((sizes.height - pad * 2) / slideSize)

            sliderInner.style.maxHeight = `${count * 60 + (count - 1) * 10}px`
            sliderInner.style.maxWidth = `auto`

            resolve(count)
            return
        }

        slider.style.maxHeight = `auto`
        slider.style.maxWidth = `${sizes.width}px`

        const count = Math.round((sizes.width - pad * 2) / slideSize)

        sliderInner.style.maxWidth = `${count * 60 + (count - 1) * 10}px`
        sliderInner.style.maxHeight = `auto`

        resolve(count)
        return

        function getSizes() {
            return new Promise((resolve, reject) => {
                let sizes = mainSliderContainer.parentNode.getBoundingClientRect()
                if (sizes.height > 100 && sizes.width > 100) {
                    resolve(sizes)

                    return
                }

                const observer = new MutationObserver(() => {
                    sizes = mainSliderContainer.parentNode.getBoundingClientRect()
                    if (sizes.height > 100) {
                        resolve(sizes)

                        observer.disconnect()
                    }
                })

                observer.observe(mainSliderContainer, { attributes: true })
            })
        }
    })
}
