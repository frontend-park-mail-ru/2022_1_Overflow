import {isMobile} from "../IsMobile/IsMobile";

export const calcSecondPositionXY = (x: number, y: number, popUpReal: HTMLElement, popUpFolder: HTMLElement) => {
    const popUpWidth = popUpReal.offsetWidth;
    const popUpHeight = popUpReal.offsetHeight;
    let xRes: number = (isMobile()) ? x : x + popUpWidth;
    let yRes: number = (isMobile()) ? y + popUpHeight : y;
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const popUpFolderWidth = popUpFolder.offsetWidth;
    const popUpFolderHeight = popUpFolder.offsetHeight;

    if (!isMobile()) {
        if (screenHeight - y < popUpFolderHeight) {
            yRes = screenHeight - popUpFolderHeight;
        }

        if (screenWidth - x < popUpWidth + popUpFolderWidth) {
            xRes = x - popUpFolderWidth;
        }
    } else {
        if (screenHeight - (y + popUpHeight)  < popUpFolderHeight) {
            yRes = y - popUpFolderHeight;
        }
    }
    return {x: xRes, y: yRes};
}