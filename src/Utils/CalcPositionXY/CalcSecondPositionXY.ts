export const calcSecondPositionXY = (x: number, y: number, popUpReal: HTMLElement, popUpFolder: HTMLElement) => {
    const popUpWidth = popUpReal.offsetWidth;
    let xRes: number = x + popUpWidth;
    let yRes: number = y;
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const popUpFolderWidth = popUpFolder.offsetWidth;
    const popUpFolderHeight = popUpFolder.offsetHeight;


    if (screenHeight - y < popUpFolderHeight) {
        yRes = screenHeight - popUpFolderHeight;
    }

    if (screenWidth - x < popUpWidth + popUpFolderWidth) {
        xRes = x - popUpFolderWidth;
    }
    return {x: xRes, y: yRes};
}