import axios from 'axios'
// export function request(config, succcess ,failure) {
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//   instance(config)
//     .then(res=>{
//       console.log(res);
//       succcess(res)
//     })
//     .catch(err=>{
//       console.log(err);
//       failure(res)
//     })
// }

// export function request(config, succcess ,failure) {
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })
//     instance(config)
//       .then(res=>{
//         console.log(res);
//         succcess(res)
//       })
//       .catch(err=>{
//         console.log(err);
//         failure(res)
//       })
// }

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })
//     instance(config)
//       .then(res=>{
//         resolve(res)
//       })
//       .catch(err=>{
//         reject(err)
//       })
//   })
// }

export function request(config) {
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:5000
    })

  instance.interceptors.request.use((config=>{
    console.log(config);


    return config;
  },err=>{
    console.log(err);
  }))
  return instance(config)
}


