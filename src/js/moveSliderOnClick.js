export function moveSliderOnClick(ev) {
    const slide = ev.target.closest('.swiper-slide')

    if (!slide) return
    const bullet = document.querySelector('.t-slds__thumbsbullet')

    if (!bullet) return

    bullet.dataset.slideBulletFor = slide.dataset.index
    bullet.click()
}
