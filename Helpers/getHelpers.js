import axios from "axios";

//async funcition to get joke
export const getJoke = async () => {
  //variable to handle api url
  const apiUrl = process.env.API_URL;
  try {
    //variable to handle axios request
    const response = await axios.get(`${apiUrl}/jokes/random`);

    //if response has data return the joke
    if (response.data) {
      return response.data.joke;
    } else {
      console.log("No joke found in response:", response.data);
      return "No joke found.";
    }
  } catch (error) {
    //catch if any errors
    console.error("Error fetching joke:", error.message);
  }
};

export const getRiddle = async () => {
  //variable to handle api url
  const apiUrl = process.env.API_URL;
  try {
    //variable to handle axios request
    const response = await axios.get(`${apiUrl}/riddles/random`);
    //if response has data return the joke
    if (response.data) {
      return response.data.riddle;
    } else {
      console.log("No riddle found.");
      return "No riddle found.";
    }
  } catch (error) {
    //catch if any errors
    console.error("Error fetching riddle:", error.message);
  }
};

export const getFact = async () => {
  const apiUrl = process.env.API_URL;

  try {
    const response = await axios.get(`${apiUrl}/facts/random`);

    if (response.data) {
      return response.data.fact;
    } else {
      console.log("No fact found.");
      return "No fact found.";
    }
  } catch (error) {
    console.error("Error fetching fact:", error.message);
  }
};
