import { addSlides } from './addSlides'
import { isProductPage } from './isProductPage'
import { mutationObserverHideImages } from './mutationObserverHideImages'

const isLoadScripts = isProductPage()
addSlides(isLoadScripts)
mutationObserverHideImages()
