import axios from 'axios';
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'https://ai-resume-builder-backend-9wbm.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const getUserResumes = async (userEmail) => axiosClient.get(`/api/user-resumes?filters[userEmail][$eq]=${userEmail}`)
const getResumeById = async(id)=>axiosClient.get(`/api/user-resumes/`+id+`?populate=*`)
const createNewResume = async (data) => {
    return axiosClient.post("/api/user-resumes", {
        data: { ...data }
    })
};
const updateResume = async (resumeId, data) => {
        return  axiosClient.put(`/api/user-resumes/${resumeId}`, {
             data: {...data}
          })        
}

const DeleteResumeById = async (id) => axiosClient.delete(`/api/user-resumes/`+id)

export default {
    createNewResume,
    getUserResumes,
    getResumeById,
    updateResume,
    DeleteResumeById
};