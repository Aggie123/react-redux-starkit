import formurlencoded from 'form-urlencoded';

let request = {

    getHeaders() {
        return ({
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Origin':'http://10.38.11.167'
            //'User-Agent': this.preFixUA(),
            //'UA-pixels': Constants.UA_pixels
        });
    },

    async requestData(url, data) {
        // console.log('requestData:', url, data);
        let pipeUrl = url;

        return await this.requestWithSpecifiedKey(pipeUrl, data, 'data');
    },

    /**
     * 后台获取数据
     * @param url 请求的url
     * @param data 请求的数据,是一个object,默认包一层body.
     * @param key 如果指定了key,则post的数据格式为@code{$key=data.body},如果没有指定key,则将data.body解析成key=vaule格式.
     * @return 返回的数据报文.
     * @throws #Error 401或其他错误
     */
    async requestWithSpecifiedKey(url, data, key) {
        // let reqStart = new Date();
        data = data || {};
        data.method = "POST";
        data.headers = this.getHeaders();
         //TODO test
        // data.credentials ='include';
        data.credentials = 'omit';
        // data.mode='cors';
        // data.mode='no-cors';
        data.headers.DToken = "";
        if (key) {
            let obj = {};
            try {
                obj[key] = JSON.stringify(data.body);
                data.body = formurlencoded(obj);
            } catch (error) {
                console.log(error);
            }
        } else {
            data.body = formurlencoded(data.body);
        }
        let result = await this.fetchData(url, data, data.showLogin || false, 0)
        // console.log('command request time:', '' + (new Date() - reqStart), url, data.body);
        return result;

    },

    async fetchData(url, postData, showLogin, deep) {
        try {
            // console.log('before response',url,postData)
            let response = await fetch(url, postData);
            if (!response) {
                let error = new Error("Server not response");
                error.response = "no data response";
                throw error;
            } else if (response.ok) {
                try {
                    let jsondata = await response.json();
                    return jsondata.result || jsondata;
                } catch (error) {
                    let error = new Error("Error JSON ");
                    error.response = "error JSON format";
                    throw error;
                }
            } else if (~~response.status === 401) {
                //需要登录 TODO :
                if (~~deep === 0) {
                    // await AuthUtil.asyncMainLogin(showLogin)
                    //   return await this.fetchData(url, postData, showLogin, deep + 1)
                } else {
                    let error = new Error("Login Error");
                    error.response = response;
                    error.code = 401;
                    throw error;
                }
            } else {
                let error = new Error("Request Error");
                error.response = response;
                throw error;
            }
        } catch (error) {
            console.log('request failed with error:', error,window.navigator.onLine);
            if (!window.navigator.onLine) {
                console.log('net disconnected.');
                let error = new Error('网络错误');
                error.code = -1;
                throw error;
            } else {
                throw error;
            }
        }
    },

}

export default request;
