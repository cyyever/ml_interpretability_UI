import axios from 'axios'

const URI =  process.env.REACT_APP_DEVELOPMENT_URI

export const getDatasetName = () =>{
    let url = URI + "/datasetName"
    return axios.get(url).then(response =>{
        return response.data
    }).catch(error =>{
        console.log("failed to get dataset name")
        throw error
    })
}


export const getDataset = (param) =>{
    let url = URI + "/dataset?datasetName="+param
    console.log(url)
    return axios.get(url).then(response =>{
        return response.data
    }).catch(error =>{
        console.log("failed to get dataset")
        throw error
    })
} 