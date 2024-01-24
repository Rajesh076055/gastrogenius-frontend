import axios from "axios";
import {SERVER_ADDRESS} from './variables.js'

const startSession = async(data)=> {
    try {

        const response = await axios.post(SERVER_ADDRESS + '/start-session', data, {
            headers:{ 'Content-Type': 'application/json'},
        })
        
        return response;

    } catch (error) {
        
        console.log("Something error with feedback line. ", error);
    }
}

const downloadZip = async(data, socket)=>  {

    try {
        const response = await fetch( SERVER_ADDRESS + '/download-zip', {
            method: 'POST', // Assuming your Flask route is set up to handle POST requests
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: data['name'] }), // Sending the name as JSON in the request body
          });
      
          const blob = await response.blob();
      
          // Create a link element and simulate a click to trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${data['name']}_${data['diagnosis']}.zip`;
          link.click();
          socket.emit('leave', data["name"]);
          socket.emit('clean', `${data['name']}_${data['diagnosis']}.zip`);

    } catch (error) {
        console.log("Something error with downloading zipfile. ", error);
    }
}
const confirmSelection = async(data)=> {
    

    try {

        const response = await axios.post(SERVER_ADDRESS + '/feedback', data, {
            headers:{ 'Content-Type': 'application/json'},
        })
        
        return response;

    } catch (error) {
        
        console.log("Something error with feedback line. ", error);
    }
};


const postVideo = async(formData)=> {

  
    try {
        
        const response = await axios.post(`${SERVER_ADDRESS}/send-videos`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        console.log(response)
        return response;
    } catch (error) {

        alert(error)
    }
}

export {startSession, downloadZip, postVideo, confirmSelection};