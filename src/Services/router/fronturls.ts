/***
 * Page urls
 */
 class FrontUrls {
    /***
     * Get main page
     * @returns {string}
     */
    get main() {
        return '/';
    }

    /***
     * Get profile page
     * @returns {string}
     */
     get solomessage() {
        return '/message';
    }

    /***
     * Get profile page
     * @returns {string}
     */
     get security() {
        return '/securite';
    }

    /***
     * Get registration page
     * @returns {string}
     */
    get registration() {
        return '/signup';
    }

    get login() {
        return '/signin'
    }
    /***
     * Get profile page
     * @returns {string}
     */
    get userProfile() {
        return '/profile';
    }
}

export const frontUrls = new FrontUrls();