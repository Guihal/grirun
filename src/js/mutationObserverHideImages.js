import { initHideImages } from './initHideImages'
import { elementReady } from './utils/elementReady'

export async function mutationObserverHideImages() {
    const records = await elementReady('#allrecords')

    const observer = new MutationObserver(initHideImages)

    observer.observe(records, { childList: true, subtree: true })
}
