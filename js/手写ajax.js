// 手写ajax
const ajax = (method, url, params, success, fail) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = function () {
        /*
        0	UNSENT	Client has been created. open() not called yet.
        1	OPENED	open() has been called.
        2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
        3	LOADING	Downloading; responseText holds partial data.
        4	DONE	The operation is complete.
        */
        if (request.readyState === 4) {
            if ((request.response.status >= 200 && request.response.status < 300) || request.response.status === 304) {
                success(request.response)
            } else {
                fail(request.response)
            }
        }
    }
    request.send(JSON.stringify(params))
}

