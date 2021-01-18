/**
 * Module to make http calls to various servers
 * @module       HttpHelper
 * @author       @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since        1.0.0
 */

import config from 'configVariables';
const request = require('superagent');

/**
 * A class with utility methods to call Server APIs
 * @class
 * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
 * @since 1.0.0
 */
class HttpClient {
    #baseURL;
    #timeout = 10000;
    #isHttp2 = false;

    /**
     * Initializes a new server client
     * @param {String} baseURL The base URL of the Server
     * @param {Number} [timeout=10000] The maximum time in milliseconds our clients waits for the response
     * @param {Boolean} [isHttp2=false] If enabled http2 will be used
     */
    constructor(baseURL, timeout, isHttp2) {
        this.#baseURL = baseURL;
        this.#timeout = timeout;
        this.#isHttp2 = isHttp2;
    }

    /**
     * Sends HTTP POST Request to Auth Server on given `endpointPath` with given `body`
     * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
     * @since 1.0.0
     * @param {String} endpointPath The API's Endpoint path
     * @param {Object} body The request body
     * @return {Promise}
     * @fulfil {Response} The Response on `200` response status
     * @reject {Error} Any other Error
     */
    post(endpointPath, body) {
        return request
            .post(this.#baseURL + endpointPath)
            .withCredentials()
            .send(body)
            .timeout(this.#timeout);
        // .http2(this.#isHttp2)
        // .trustLocalhost(process.env.NODE_ENV == 'development');
    }

    /**
     * Sends HTTP GET Request to Auth Server on given `endpointPath` with given `body`
     * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
     * @since 1.0.0
     * @param {String} endpointUrl The API's Endpoint path
     * @return {Promise}
     * @fulfil {Response} The Response on `200` response status
     * @reject {Error} Any other Error
     */
    get(endpointUrl) {
        return request
            .get(this.#baseURL + endpointUrl)
            .withCredentials()
            .timeout(this.#timeout);
        // .http2(this.#isHttp2)
        // .trustLocalhost(process.env.NODE_ENV == 'development');
    }

    /**
     * Sends HTTP PUT Request to Auth Server on given `endpointPath` with given `body`
     * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
     * @since 1.0.0
     * @param {String} endpointUrl The API's Endpoint path
     * @param {Object} body The request body
     * @return {Promise}
     * @fulfil {Response} The Response on `200` response status
     * @reject {Error} Any other Error
     */
    put(endpointUrl, body) {
        return request
            .put(this.#baseURL + endpointUrl)
            .withCredentials()
            .send(body)
            .timeout(this.#timeout);
        // .http2(this.#isHttp2)
        // .trustLocalhost(process.env.NODE_ENV == 'development');
    };

    /**
     * Sends HTTP DELETE Request to Auth Server on given `endpointPath` with given `body`
     * @author @Kanna727 <prasanth.chitturi@pinelabs.com>
     * @since 1.0.0
     * @param {String} endpointUrl The API's Endpoint path
     * @param {Object} [body] The request body
     * @return {Promise}
     * @fulfil {Response} The Response on `200` response status
     * @reject {Error} Any other Error
     */
    delete(endpointUrl, body) {
        return request
            .del(this.#baseURL + endpointUrl)
            .withCredentials()
            .send(body)
            .timeout(this.#timeout);
        // .http2(this.#isHttp2)
        // .trustLocalhost(process.env.NODE_ENV == 'development');
    };
}


const backendServer = new HttpClient(
    config.backendURL,
);

export { backendServer };
