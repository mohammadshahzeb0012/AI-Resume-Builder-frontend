import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import globalApies from "./../../../../service/globalApies";
import { toast } from "sonner";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { RWebShare } from "react-web-share";


const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();



    useEffect(() => {
        GetResumeInfo()
    }, [])

    const GetResumeInfo = () => {
        globalApies.getResumeById(resumeId)
            .then(res => {
                setResumeInfo(res.data.data)
            })
            .catch(() => {
                toast("failed to generate resume privew")
            })
    }

    const handelPrint = () => {
        window.print()
    }

    if (!resumeInfo) {
        return <div className="flex items-center justify-center items-center h-screen gap-5">
        <p className="text-2xl  font-bold">Please Wait </p>  
         <div
                className="animate-spin rounded-full border-t-2 border-b-2 border-transparent"
                style={{
                    borderTopColor: '#5A33FF',
                    width: '50px',
                    height: '50px',
                }}
            />
        </div>
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume url with your friends and family </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={handelPrint}>Downlowd</Button>

                        <RWebShare
                            data={{
                                // http://localhost:5173/my-resume/p7hq9x2ixpq4xw6vmjl0cx5x/view
                                text: "Hello There, This is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL + `/my-resume/${resumeId}/view`,
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>

                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume