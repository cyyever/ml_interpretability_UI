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

export const getDatasetLabel = (datasetName, datasetType) => {
  let url =
    URI +
    "/datasetLabel?datasetName=" +
    datasetName +
    "&datasetType=" +
    datasetType;
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

export const getLabelIndices = (datasetName, datasetType, datasetLabel) => {
  let url =
    URI +
    "/datasetLabelIndices?datasetName=" +
    datasetName +
    "&datasetType=" +
    datasetType +
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


export const getImageData = (datasetName , datasetType , indices) => {
  let url = URI + "/rawData?datasetName=" + datasetName + "&datasetType=" + datasetType + "&indices="+indices.toString();
  return axios.get(url).then((response) => {
    return response.data;
  }).catch((error) => {
    console.log("failed to get image data");
    throw error;
  })
};


export const getModalName = () =>{
  let url = URI + "/getModal"
  return axios.get(url).then((response) =>{
    return response.data;
  }).catch((error) => {
    console.log("failed to get modal name");
    throw error;
  })
};

