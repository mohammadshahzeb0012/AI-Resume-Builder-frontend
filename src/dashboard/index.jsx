import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import { useEffect, useState } from "react"
import globalApies from "./../../service/globalApies"
import ResumeCardItem from "./components/ResumeCardItem"
import { toast } from "sonner"

const DashBoard = () => {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    //used to get resume list
    user && getResumesList()
  }, [user])

  const getResumesList = async () => {
    try {
      const res = await globalApies.getUserResumes(user?.primaryEmailAddress?.emailAddress)
      setResumeList(res.data.data)
    } catch (error) {
      toast("failed to fetch please try again")
    }
  }

  return (
    <div className="p-10 md:px-2 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 
      lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {
          resumeList && resumeList.map((resume, index) => {
            return <ResumeCardItem resume={resume} key={index} refreshData={getResumesList} />
          })
        }
      </div>
    </div>
  )
}

export default DashBoard