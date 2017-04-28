
import axios from 'axios';
import { Message } from 'iview';

function checkStatus(res) {
    if (res.status_code === Constants.API_STATUS.OK) {
        return res;
    }

    const errorMsg = res.data && res.data.prompts ||
                     res.data && res.data.message ||
                     res.status_msg || res.msg || '请求或操作失败，请重试！';
    const error = new Error(errorMsg);
    error.res = res;

    throw error;
}

 function get(url, params = {}) {
    return axios.get(url, { params })
        .then(res => res.data)
        .then(checkStatus)
        .catch((error) => {
            Message.error(error);
            throw error;
        });
};

 function post(url, params = {}, config = {}) {
    return axios.post(url, params, config)
        .then(res => res.data)
        .then(checkStatus)
        .catch((error) => {
            Message.error(error);
            throw error;
        });
};


export default {
    get,
    post
};