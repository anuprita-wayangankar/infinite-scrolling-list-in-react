import axios from "axios";

export const getData = (currentOffset) =>
    new Promise((resolve, reject) => {
        axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${currentOffset}&_limit=10`)
            .then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
    });