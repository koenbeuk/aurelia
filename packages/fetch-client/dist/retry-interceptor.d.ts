import { HttpClient } from './http-client.js';
import { Interceptor, RetryableRequest, RetryConfiguration } from './interfaces.js';
export declare const retryStrategy: {
    fixed: 0;
    incremental: 1;
    exponential: 2;
    random: 3;
};
/**
 * Interceptor that retries requests on error, based on a given RetryConfiguration.
 */
export declare class RetryInterceptor implements Interceptor {
    retryConfig: RetryConfiguration;
    /**
     * Creates an instance of RetryInterceptor.
     */
    constructor(retryConfig?: RetryConfiguration);
    /**
     * Called with the request before it is sent. It remembers the request so it can be retried on error.
     *
     * @param request - The request to be sent.
     * @returns The existing request, a new request or a response; or a Promise for any of these.
     */
    request(request: RetryableRequest): RetryableRequest;
    /**
     * Called with the response after it is received. Clears the remembered request, as it was succesfull.
     *
     * @param response - The response.
     * @returns The response; or a Promise for one.
     */
    response(response: Response, request: RetryableRequest): Response;
    /**
     * Handles fetch errors and errors generated by previous interceptors. This
     * function acts as a Promise rejection handler. It wil retry the remembered request based on the
     * configured RetryConfiguration.
     *
     * @param error - The rejection value from the fetch request or from a
     * previous interceptor.
     * @returns The response of the retry; or a Promise for one.
     */
    responseError(error: Response, request: RetryableRequest, httpClient: HttpClient): Response | Promise<Response>;
}
//# sourceMappingURL=retry-interceptor.d.ts.map