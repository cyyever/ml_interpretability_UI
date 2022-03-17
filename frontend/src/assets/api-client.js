import axios from "axios";

const URI = process.env.REACT_APP_DEVELOPMENT_URI;

export const getDatasetName = () => {
  let url = URI + "/datasetName";
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("failed to get dataset name");
      throw error;
    });
};

export const getDatasetLabel = (datasetName, datasetSplit) => {
  let url =
    URI +
    "/datasetLabel?datasetName=" +
    datasetName +
    "&datasetSplit=" +
    datasetSplit;
  return axios
    .get(url)
    .then((reponse) => {
      return reponse.data;
    })
    .catch((error) => {
      console.log("failed to get dataset Label");
      throw error;
    });
};

export const getLabelIndices = (datasetName, datasetSplit, datasetLabel) => {
  let url =
    URI +
    "/datasetLabelIndices?datasetName=" +
    datasetName +
    "&datasetSplit=" +
    datasetSplit +
    "&datasetLabel=" +
    datasetLabel;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("failed to get indices");
      throw error;
    });
};


export const getRawData = (datasetName , datasetSplit ,datasetType , indices) => {
  let url = URI + "/rawData?datasetName=" + datasetName + "&datasetSplit=" + datasetSplit + "&datasetType=" + datasetType +"&indices="+indices.toString();
  return axios.get(url).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log("failed to get image data");
    throw error;
  })
};


export const getModelName = () =>{
  let url = URI + "/getModel"
  return axios.get(url).then((response) =>{
    return response.data;
  }).catch((error) => {
    console.log("failed to get model name");
    throw error;
  })
};

export const startRunModel = (datasetName , modelName , numOfEpochs , learningRate , learningRateSchedulerName , optimizer , useHydra , trackingPercentage) =>{

  let url  = URI + "/startRunModel?datasetName=" + datasetName + "&modelName=" + modelName + "&numOfEpochs=" + numOfEpochs +  "&learningRateSchedulerName=" + learningRateSchedulerName + "&optimizer=" + optimizer + "&useHydra=" + useHydra 
  
  if(learningRate & learningRate !== ""){
    url  += "&learningRate=" + learningRate
  }
  if(trackingPercentage && trackingPercentage!== ""){
    url += "&trackingPercentage=" + trackingPercentage
  }
  
  return axios.get(url).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log("failed to start run model");
    throw error;
  })
}

export const getModelResult = (modelId , intervalId) => {
  let url = URI + "/getModelResult?modelId=" + modelId
  return axios.get(url).then((response) =>{
    return response.data;
  }).catch((error) => {
    console.log("failed to get model result");
    clearInterval(intervalId)
    throw error;
  })
}

export const getContributionResult = (modelId) => {
  let url = URI + "/getContributionResult?modelId=" + modelId
  return axios.get(url).then((response) =>{
    return response.data;
  }).catch((error) => {
    console.log("failed to get model contribution result");
    throw error;
  })
}


export const getLearningRateScheduler = () => {
  let url = URI + "/getLearningRateScheduler"
  return axios.get(url).then((response) =>{
    return response.data
  }).catch((error) =>{
    console.log("failed to get learning rate scheduler")
    throw error;
  })
}

export const getOptimizers = () =>{
  let url = URI + "/getOptimizers"
  return axios.get(url).then((response) =>{
    return response.data
  }).catch((error) =>{
    console.log("failed to get optimizers")
    throw error;
  })
}