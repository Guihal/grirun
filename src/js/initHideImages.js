import { hideImages } from './hideImages'

export function initHideImages() {
    document.querySelectorAll('.js-store-grid-cont:not(.check)').forEach(async (productCont) => {
        productCont.classList.add('check')

        await waiting(productCont, '.js-product .t-product__option-variants_image')

        setTimeout(() => {
            document.querySelectorAll('.js-product .t-product__option-variants_image:not(.check)').forEach(async (variants) => {
                variants.classList.add('check')
                await waiting(variants, '.t-product__option-item')
                const options = variants.querySelectorAll('.t-product__option-item')

                if (options.length === 0) return

                const count = Math.round(variants.offsetWidth / (options[0].offsetWidth + 7))
                if (count >= options.length) return

                hideImages(options, count)
            })
        })
    })
}

function waiting(parent, className) {
    return new Promise((resolve, reject) => {
        waitBlock(parent, className, resolve)

        const observer = new MutationObserver(() => {
            waitBlock(parent, className, resolve)
        })

        observer.observe(parent, { childList: true, subtree: true })
    })
}

function waitBlock(parent, className, resolve) {
    const block = parent.querySelector(className)

    if (block) resolve()
}
