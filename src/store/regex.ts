export const PATH_SLASH = /\//g;
export const PATH_ARG = /:\w+/g;
export const PATH_ARG_CG = /:(\w+)/g;
export const EMAIL =
    /^([a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*)(@)([a-zA-Z0-9]+)([.][a-zA-Z0-9]+)?\.([a-zA-Z0-9]+)$/g;
export const NAME = /^([\wА-Яа-я]+)$/g;
export const NUMBER = /[0-9]/g;
export const LETTER = /[a-zA-Z]/g;
export const LOWERCASE_LETTER = /[a-z]/g;
export const UPPERCASE_LETTER = /[A-Z]/g;
export const SPECIAL_CHARACTER = /[@ !"#$%&'()*+,\-./:;<=>?[\\\]^_]/g;
export const enum pathsURLfrontend {
	root = '/',
	country = '/country',
	login = '/login',
	register = '/signup',
	profile = '/profile',
	sight = '/sight',
	trip = '/trip',
	album = '/album',
	sights = '/sights',
	tag = '/tag',
	users = '/user',
	search = '/search',
}

export const enum paramsURLfrontend {
	id = 'id',
	name = 'name',
	edit = 'edit',
	tag = 'tag',
}