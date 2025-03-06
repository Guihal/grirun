import { getSlidesPerView } from './getSlidesPerView'
import { moveSliderOnClick } from './moveSliderOnClick'
import { updateSwiperOnDownloadImages } from './updateSwiperOnDownloadImages'
import { elementReady } from './utils/elementReady'
import { throttle } from './utils/throttle'

export async function addSlides(isLoadScripts) {
    const mainSlider = await elementReady('.t-store__product-snippet .t-slds__main')
    const idSlider = 'guihal-swiper-thumbs'
    const slider = Object.assign(document.createElement('div'), { className: 'swiper-container' })

    slider.innerHTML = `
        <svg class="swiper-nav_prev" width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.47177 14.9384L0.471846 14.9383L12.8376 0.525053C13.0211 0.31122 13.259 0.200001 13.4977 0.200001C13.7364 0.200001 13.9742 0.311218 14.1577 0.525059L14.1577 0.525082L26.5282 14.9384L26.5282 14.9384C26.6124 15.0364 26.6809 15.1555 26.7281 15.2893C26.7754 15.4232 26.8 15.5679 26.8 15.7148C26.8 15.8617 26.7754 16.0065 26.7281 16.1404C26.6809 16.2742 26.6124 16.3933 26.5282 16.4913L26.528 16.4915C26.354 16.6947 26.1287 16.8 25.903 16.8C25.6773 16.8 25.452 16.6947 25.278 16.4915L25.2779 16.4914L13.6495 2.93753L13.4977 2.76059L13.3459 2.93755L1.71986 16.4913C1.71985 16.4913 1.71983 16.4913 1.71982 16.4913C1.54594 16.6938 1.32105 16.7986 1.09582 16.7986C0.870585 16.7986 0.645671 16.6938 0.471788 16.4913L0.47177 16.4913C0.387602 16.3933 0.319135 16.2742 0.271887 16.1404C0.224643 16.0065 0.2 15.8617 0.2 15.7148C0.2 15.5679 0.224643 15.4232 0.271887 15.2893C0.319135 15.1555 0.387602 15.0364 0.47177 14.9384Z" fill="#5C5A5A" stroke="#F7F7F7" stroke-width="0.4"/>
        </svg>
        <div class="swiper" id="${idSlider}">
            <div class="swiper-wrapper"></div>
        </div>
        <svg class="swiper-nav_next" width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.47177 2.06158L0.471846 2.06167L12.8376 16.4749C13.0211 16.6888 13.259 16.8 13.4977 16.8C13.7364 16.8 13.9742 16.6888 14.1577 16.4749L14.1577 16.4749L26.5282 2.06164L26.5282 2.06158C26.6124 1.96359 26.6809 1.84454 26.7281 1.71069C26.7754 1.57684 26.8 1.43207 26.8 1.28516C26.8 1.13825 26.7754 0.993476 26.7281 0.859632C26.6809 0.725776 26.6124 0.606727 26.5282 0.508737L26.528 0.508497C26.354 0.305274 26.1287 0.2 25.903 0.2C25.6773 0.2 25.452 0.305274 25.278 0.508497L25.2779 0.508648L13.6495 14.0625L13.4977 14.2394L13.3459 14.0625L1.71986 0.508716C1.71985 0.5087 1.71983 0.508683 1.71982 0.508667C1.54594 0.306209 1.32105 0.201358 1.09582 0.201358C0.870585 0.201358 0.645671 0.306226 0.471788 0.508716L0.47177 0.508736C0.387602 0.606726 0.319135 0.725775 0.271887 0.859632C0.224643 0.993478 0.2 1.13826 0.2 1.28516C0.2 1.43206 0.224643 1.57684 0.271887 1.71069C0.319135 1.84454 0.387602 1.96359 0.47177 2.06158Z" fill="#5C5A5A" stroke="#F7F7F7" stroke-width="0.4"/>
        </svg>
    `

    slider.addEventListener('click', moveSliderOnClick)

    mainSlider.after(slider)

    let swiper

    // let lastwidth = window.innerWidth

    await isLoadScripts

    const initSwiper = async () => {
        // if ((window.innerWidth >= 980 && lastwidth >= 980) || (window.innerWidth < 980 && lastwidth < 980)) return

        let slide

        if (swiper !== undefined) {
            slide = swiper.activeIndex
            swiper.destroy(true, true)
        }

        const slidesPerView = await getSlidesPerView(mainSlider, slider)

        console.log(slidesPerView)

        if (window.innerWidth >= 980) {
            console.log('big')
            swiper = new Swiper(`#${idSlider}`, {
                direction: 'vertical',
                spaceBetween: 10,
                slidesPerView: slidesPerView,
                observer: true,

                navigation: {
                    nextEl: '.swiper-nav_next',
                    prevEl: '.swiper-nav_prev',
                },
            })
        } else {
            console.log('small')
            swiper = new Swiper(`#${idSlider}`, {
                direction: 'horizontal',
                spaceBetween: 10,
                slidesPerView: slidesPerView,
                observer: true,

                navigation: {
                    nextEl: '.swiper-nav_next',
                    prevEl: '.swiper-nav_prev',
                },
            })
        }

        if (slide !== undefined && swiper !== undefined) {
            swiper.slideTo(slide, 0, false)
        }

        // lastwidth = window.innerWidth
    }

    window.addEventListener('resize', throttle(initSwiper), 50)

    initSwiper()

    document.addEventListener('click', (ev) => {
        if (!ev.isTrusted) return
        if (!ev.target.closest('.t-product__option-item')) return

        setTimeout(() => {
            const slide = document.querySelector('.t-slds__item_active')

            if (!slide) return

            const index = slide.dataset.slideIndex

            if (index === undefined) return

            swiper.slideTo(index, 0, false)
        }, 100)
    })

    updateSwiperOnDownloadImages(mainSlider, slider)
}
