import { elementReady } from './utils/elementReady'

export async function getSlideImages() {
    const slider = await elementReady('.t-store__product-snippet .t-slds__wrapper')

    const images = []

    slider.querySelectorAll('.t-slds__imgwrapper').forEach((imgWrapper) => {
        images.push(imgWrapper.imgZoomUrl)
    })

    return images
}
