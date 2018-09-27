/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that ensures through each feed
         * in the allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('each feed in allFeeds object array has url and url is not empty', function () {
            allFeeds.forEach(function (element) {
                expect(element.url).toBeDefined();
                expect(element.url.length).toBeGreaterThan(0);
            }, this);
        });

        /* A test that ensures each feed
         * in the allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('each feed in allFeeds object array has name and name is not empty', function () {
            allFeeds.forEach(function (element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).toBeGreaterThan(0);
            }, this);
        });
    });


    /* Test suite named "The menu" contains test cases about menu button*/
    describe('The menu', function () {

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('menu toggles when menu button button clicked/unclicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });


    /* A test suite named "Initial Entries"- contains test cases about loadFeed() */
    describe('Initial Entries', function () {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('feed container has at least 1 entry', function () {
            var entries = document.querySelector('.feed').querySelectorAll('.entry').length;
            expect(entries).toBeGreaterThan(0);
        });

    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function (done) {
            // load first feed
            loadFeed(0, function () {
                initialFeedHtml = $('.feed').html();

                // Load second feed
                loadFeed(1, function () {
                    done();
                });
            });

        });
        
        it('entries loaded when feed is changed', function (done) {
            var newFeedHtml = $('.feed').html();
            expect(newFeedHtml).not.toBe(initialFeedHtml);
            done();
        });
    });

}());