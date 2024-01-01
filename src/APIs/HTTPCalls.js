import axios from "axios";

const SERVER = 'http://localhost:8000'
const startSession = async(filename)=> {
    try {
        const response = await axios.post(SERVER + '/start-session', filename, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        console.log(response);
        return response

    } catch (error) {
        console.log("Error at starting the session.", error);
    }
}

const postVideo = async(videoFile)=> {

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
        const response = await axios.post(SERVER + '/send-videos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return response;
    } catch (error) {

        console.log("Error at sending the video to server.", error);
    }
}

export { startSession, postVideo};