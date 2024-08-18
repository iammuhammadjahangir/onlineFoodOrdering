import React from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
// const API = axios.create({
//     baseURL: "https://api.instagram.com"
//     // baseURL: "https://goldappreal.herokuapp.com",
// });
// const config = {
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     }
// };

const Insta = () => {
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("code"))
    // const { code } = useParams();
    const code = "AQBd0sKu-m93dYrDX75pSwo5BgYf_t3uSGC_0hgTArNOWtB6BsO4KSdUdVaARy09xzeuNjhTV1la9PEo3dv_2PyuiYqVgkPAqDrrExvp0Tw79aLOon23yqz7WREoy9UQV01ziWXoKbiMjsL6JACWi31OU3_fUIVyY30yZunkMAJ3nbJMFvo3wyS4nPUcvxPnN-mJLKse6Qt8z-CsIDYCvr3-m1A6ObzBOLehRMHsxy-qZg";
    // console.log(code);
    const data = {
        "client_id": "1069172800417348",
        "client_secret": "24aaec87d762feec9e6eccf3691ae27b",
        "grant_type": "authorization_code",
        "redirect_uri": "https://localhost:3000/insta/",
        "code": code
    }
    return (
        <>
            <Button variant="contained" onClick={async () => {
                try {
                    var FormData = require('form-data');
                    var data = new FormData();
                    data.append('client_id', '1069172800417348');
                    data.append('client_secret', '24aaec87d762feec9e6eccf3691ae27b');
                    data.append('grant_type', 'authorization_code');
                    data.append('redirect_uri', 'https://localhost:3000/insta/');
                    data.append('code', code);

                    var config = {
                        method: 'post',
                        url: 'https://api.instagram.com/oauth/access_token',

                        data: data
                    };

                    const resp = await axios(config);
                    console.log(resp);

                }
                catch (e) {
                    console.log(e);
                }

            }}>Add from Insta</Button>

        </>
    )
}

export default Insta
