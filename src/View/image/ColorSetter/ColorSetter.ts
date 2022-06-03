import add from '../Blue/add.svg';
import directories from '../Blue/directories.svg';
import door from '../Blue/door.svg';
import dot from '../Blue/dot.svg';
import download from '../Blue/download.svg';
import draft from '../Blue/draft.svg';
import edit from '../Blue/edit.svg';
import file from '../Blue/file.svg';
import input from '../Blue/input.svg';
import lock from '../Blue/lock.svg';
import Logo from '../Blue/Logo.svg';
import logoAndTitle from '../Blue/logoAndTitle.svg';
import LogoSigin from '../Blue/LogoSigin.svg';
import otvet from '../Blue/otvet.svg';
import out from '../Blue/out.svg';
import plus from '../Blue/plus.svg';
import profile from '../Blue/profile.svg';
import reMail from '../Blue/reMail.svg';
import remove from '../Blue/remove.svg';
import settings from '../Blue/settings.svg';
import spam from '../Blue/spam.svg';

import add_g from '../Green/add_g.svg';
import directories_g from '../Green/directories_g.svg';
import door_g from '../Green/door_g.svg';
import dot_g from '../Green/dot_g.svg';
import download_g from '../Green/download_g.svg';
import draft_g from '../Green/draft_g.svg';
import edit_g from '../Green/edit_g.svg';
import file_g from '../Green/file_g.svg';
import input_g from '../Green/input_g.svg';
import lock_g from '../Green/lock_g.svg';
import Logo_g from '../Green/Logo_g.svg';
import logoAndTitle_g from '../Green/logoAndTitle_g.svg';
import LogoSigin_g from '../Green/LogoSigin_g.svg';
import otvet_g from '../Green/otvet_g.svg';
import out_g from '../Green/out_g.svg';
import plus_g from '../Green/plus_g.svg';
import profile_g from '../Green/profile_g.svg';
import reMail_g from '../Green/reMail_g.svg';
import remove_g from '../Green/remove_g.svg';
import settings_g from '../Green/settings_g.svg';
import spam_g from '../Green/spam_g.svg';

import add_p from '../Pink/add_p.svg';
import directories_p from '../Pink/directories_p.svg';
import door_p from '../Pink/door_p.svg';
import dot_p from '../Pink/dot_p.svg';
import download_p from '../Pink/download_p.svg';
import draft_p from '../Pink/draft_p.svg';
import edit_p from '../Pink/edit_p.svg';
import file_p from '../Pink/file_p.svg';
import input_p from '../Pink/input_p.svg';
import lock_p from '../Pink/lock_p.svg';
import Logo_p from '../Pink/Logo_p.svg';
import logoAndTitle_p from '../Pink/logoAndTitle_p.svg';
import LogoSigin_p from '../Pink/LogoSigin_p.svg';
import otvet_p from '../Pink/otvet_p.svg';
import out_p from '../Pink/out_p.svg';
import plus_p from '../Pink/plus_p.svg';
import profile_p from '../Pink/profile_p.svg';
import reMail_p from '../Pink/reMail_p.svg';
import remove_p from '../Pink/remove_p.svg';
import settings_p from '../Pink/settings_p.svg';
import spam_p from '../Pink/spam_p.svg';

import add_o from '../Orange/add_o.svg';
import directories_o from '../Orange/directories_o.svg';
import door_o from '../Orange/door_o.svg';
import dot_o from '../Orange/dot_o.svg';
import download_o from '../Orange/download_o.svg';
import draft_o from '../Orange/draft_o.svg';
import edit_o from '../Orange/edit_o.svg';
import file_o from '../Orange/file_o.svg';
import input_o from '../Orange/input_o.svg';
import lock_o from '../Orange/lock_o.svg';
import Logo_o from '../Orange/Logo_o.svg';
import logoAndTitle_o from '../Orange/logoAndTitle_o.svg';
import LogoSigin_o from '../Orange/LogoSigin_o.svg';
import otvet_o from '../Orange/otvet_o.svg';
import out_o from '../Orange/out_o.svg';
import plus_o from '../Orange/plus_o.svg';
import profile_o from '../Orange/profile_o.svg';
import reMail_o from '../Orange/reMail_o.svg';
import remove_o from '../Orange/remove_o.svg';
import settings_o from '../Orange/settings_o.svg';
import spam_o from '../Orange/spam_o.svg';
import {http} from "../../../index";
import {router} from "../../../Presenter/Router/Router";

export class ColorSetter {
    private color: {main: string, icon: string, fill: string, bg: string, svg: any};
    constructor() {
        this.setGreen(false);
    }

    getData = (): {
        main: string,
        icon: string,
        fill: string,
        bg: string,
        svg: {
            add: string,
            avatar: string,
            close: string,
            directories: string,
            door: string,
            dot: string,
            download: string,
            draft: string,
            edit: string,
            file: string,
            input: string,
            lock: string,
            Logo: string,
            logoAndTitle: string,
            LogoSigin: string,
            otvet: string,
            out: string,
            plus: string,
            profile: string,
            reMail: string,
            remove: string,
            settings: string,
            spam: string,
        }
    } => {
        return this.color;
    }

    setBlue = (flag: boolean) => {
        this.color = {
            main: '#93B1E7',
            icon: '#2E6395',
            fill: '#C3D4F3',
            bg: 'https://overmail.online/static/overmail_bg_blue.png',
            svg: {
                add,
                directories,
                door,
                dot,
                download,
                draft,
                edit,
                file,
                input,
                lock,
                Logo,
                logoAndTitle,
                LogoSigin,
                otvet,
                out,
                plus,
                profile,
                reMail,
                remove,
                settings,
                spam,
            }
        }
        document.body.style.backgroundImage = `url("${http}://${window.location.hostname}/static/overmail_bg_blue.png")`;
        document.body.style.setProperty('--background-color-main', 'var(--background-color-main-theme1)');
        document.body.style.setProperty('--background-color-icon', 'var(--background-color-icon-theme1)');
        document.body.style.setProperty('--background-color-sec', 'var(--background-color-sec-theme1)');
        if (flag) {
            window.location.reload();
        }
    }

    setGreen = (flag: boolean) => {
        this.color = {
            main: '#91E896',
            icon: '#309837',
            fill: '#C1F3C5',
            bg: 'https://overmail.online/static/overmail_bg_green.png',
            svg: {
                 add: add_g,
                 directories: directories_g,
                 door: door_g,
                 dot: dot_g,
                 download: download_g,
                 draft: draft_g,
                 edit: edit_g,
                 file: file_g,
                 input: input_g,
                 lock: lock_g,
                 Logo: Logo_g,
                 logoAndTitle: logoAndTitle_g,
                 LogoSigin: LogoSigin_g,
                 otvet: otvet_g,
                 out: out_g,
                 plus: plus_g,
                 profile: profile_g,
                 reMail: reMail_g,
                 remove: remove_g,
                 settings: settings_g,
                 spam: spam_g,
            }
        }
        document.body.style.backgroundImage = `url("${http}://${window.location.hostname}/static/overmail_bg_green.png")`;
        document.body.style.setProperty('--background-color-main', 'var(--background-color-main-theme3)');
        document.body.style.setProperty('--background-color-icon', 'var(--background-color-icon-theme3)');
        document.body.style.setProperty('--background-color-sec', 'var(--background-color-sec-theme3)');
        if (flag) {
            window.location.reload();
        }
    }

    setPink = (flag: boolean) => {
        this.color = {
            main: '#F196B8',
            icon: '#9E325A',
            fill: '#F8C5D8',
            bg: 'https://overmail.online/static/overmail_bg_pink.png',
            svg: {
                 add: add_p,
                 directories: directories_p,
                 door: door_p,
                 dot: dot_p,
                 download: download_p,
                 draft: draft_p,
                 edit: edit_p,
                 file: file_p,
                 input: input_p,
                 lock: lock_p,
                 Logo: Logo_p,
                 logoAndTitle: logoAndTitle_p,
                 LogoSigin: LogoSigin_p,
                 otvet: otvet_p,
                 out: out_p,
                 plus: plus_p,
                 profile: profile_p,
                 reMail: reMail_p,
                 remove: remove_p,
                 settings: settings_p,
                 spam: spam_p,
            }
        }
        document.body.style.backgroundImage = `url("${http}://${window.location.hostname}/static/overmail_bg_pink.png")`;
        document.body.style.setProperty('--background-color-main', 'var(--background-color-main-theme2)');
        document.body.style.setProperty('--background-color-icon', 'var(--background-color-icon-theme2)');
        document.body.style.setProperty('--background-color-sec', 'var(--background-color-sec-theme2)');
        if (flag) {
            window.location.reload();
        }
    }

    setOrange = (flag: boolean) => {
        this.color = {
            main: '#FFC89F',
            icon: '#A76535',
            fill: '#FFE1CB',
            bg: 'https://overmail.online/static/overmail_bg_orange.png',
            svg: {
                add: add_o,
                directories: directories_o,
                door: door_o,
                dot: dot_o,
                download: download_o,
                draft: draft_o,
                edit: edit_o,
                file: file_o,
                input: input_o,
                lock: lock_o,
                Logo: Logo_o,
                logoAndTitle: logoAndTitle_o,
                LogoSigin: LogoSigin_o,
                otvet: otvet_o,
                out: out_o,
                plus: plus_o,
                profile: profile_o,
                reMail: reMail_o,
                remove: remove_o,
                settings: settings_o,
                spam: spam_o,
            }
        }
        document.body.style.backgroundImage = `url("${http}://${window.location.hostname}/static/overmail_bg_orange.png")`;
        document.body.style.setProperty('--background-color-main', 'var(--background-color-main-theme4)');
        document.body.style.setProperty('--background-color-icon', 'var(--background-color-icon-theme4)');
        document.body.style.setProperty('--background-color-sec', 'var(--background-color-sec-theme4)');
        if (flag) {
            window.location.reload();
        }
    }
}

export const color = new ColorSetter();