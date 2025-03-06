export function hideImages(options, count) {
    // if (options.querySelector('.hide.hidden-images')) return
    if (count <= 1) return
    count--

    const block = Object.assign(document.createElement('div'), { className: 'hidden-images', innerHTML: '<div class="counter"></div>' })
    const counter = block.querySelector('.counter')

    options.forEach((option, index) => {
        if (index > count) {
            option.classList.add('hidden')
            return
        }

        if (index < count) {
            option.classList.remove('hidden')
            return
        }

        options[index - 1].after(block)
        block.append(option)

        if (!counter) return
        counter.textContent = `+${options.length - count}`
    })

    block.addEventListener('click', () => {
        const prod = block.closest('.js-product')
        if (!prod) return

        let link = prod.dataset.productUrl
        console.log(link)
        if (link === undefined) return

        link = new URL(link)

        const url = new URL(link.pathname, window.location.origin)
        console.log(url)
        window.location.href = url

        // block.classList.add('hide')

        // options.forEach((option) => {
        //     option.classList.remove('hidden')
        // })
    })
}
