export const calcPositionXY = (x: number, y: number, popUpReal: HTMLDivElement) => {
    let xRes = x;
    let yRes = y;
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const popUpWidth = popUpReal.offsetWidth;
    const popUpHeight = popUpReal.offsetHeight;

    if (screenHeight - y < popUpHeight) {
        yRes = screenHeight - popUpHeight;
    }

    if (screenWidth - x < popUpWidth) {
        xRes = screenWidth - popUpWidth;
    }
    return {x: xRes, y: yRes};
}