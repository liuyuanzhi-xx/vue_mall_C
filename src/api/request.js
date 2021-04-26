import axios from 'axios'
const ins = axios.create();
ins.interceptors.request.use((config) => {
    return {
        ...config,

        params: {
            ...config.params,
            appkey: "imocL_1617348207285"
        }

    }
})
ins.interceptors.response.use(resp => {
    if (resp.status == 0) {
        return null;
    }
    console.log(resp)
    return resp.data;
})
export default ins;