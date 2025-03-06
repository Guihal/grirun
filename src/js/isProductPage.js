import { elementReady } from './utils/elementReady'

export function isProductPage() {
    return new Promise(async (resolve, reject) => {
        const head = await elementReady('head')

        if (!window.location.pathname.includes('tproduct')) return

        const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' })
        const script = Object.assign(document.createElement('script'), { src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js' })

        let isLoadScript = false
        let isLoadCss = false

        head.append(link)
        head.append(script)

        link.addEventListener('load', () => {
            isLoadScript = true
            isLoadScripts()
        })

        script.addEventListener('load', () => {
            isLoadCss = true
            isLoadScripts()
        })

        function isLoadScripts() {
            if (isLoadCss && isLoadScript) {
                resolve()
                console.log('all ok')
            }
        }
    })
}
