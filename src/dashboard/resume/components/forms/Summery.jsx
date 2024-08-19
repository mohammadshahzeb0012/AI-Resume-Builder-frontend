import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { useContext, useEffect, useState } from "react"
import { Form, useParams } from "react-router-dom"
import globalApies from "./../../../../../service/globalApies"
import { toast } from "sonner"
import { Brain, LoaderCircle } from "lucide-react"
import { AIChatSession } from './../../../../../service/AiModel'
const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summery, setSummery] = useState()
  const [loading, setisloading] = useState(false)
  const { resumeId } = useParams()
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    enabledNext(false)
    summery && setResumeInfo({
      ...resumeInfo,
      summery: summery
    })
  }, [summery])


  const generateSummeryFromAi = async () => {
    setisloading(true)
    const PROMPT = prompt.replace(`{jobTitle}`, resumeInfo?.jobTitle)
    try {
      const result = await AIChatSession.sendMessage(PROMPT)
      setAiGenerateSummeryList(JSON.parse(result.response.text()))
      setisloading(false)
    } catch (error) {
      setisloading(false)
      toast("failed to generate summary")
    }
  }

  const onSave = (e) => {
    e.preventDefault();
    setisloading(true)
    const data = {
        summery: summery   
    }
    globalApies.updateResume(resumeId, data)
      .then(() => {
        setisloading(false)
        toast("summery updated")
        enabledNext(true)
      }).catch(() => {
        setisloading(false)
        enabledNext(false)
        toast("failed to update please try agian")
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
    >
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Add summery for your job title</p>
      <Form className="mt-3" onSubmit={onSave}>
        <div className="mt-7">
          <div className="flex justify-between ">
            <label>Add Summary</label>
            <Button variant="outline" className="border-primary text-primary gap-2"
              type="button" onClick={generateSummeryFromAi}
              size="sm"><Brain className="h-4 w-4" />Generate from AI</Button>
          </div>
          <Textarea className="mt-5" required
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <Button
              disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </div>
      </Form>
      {aiGeneratedSummeryList && <div className='my-5'>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummeryList?.map((item, index) => {
          return <div key={index}
            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'
          >
            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
            <p>{item?.summary}</p>
          </div>
        })}
      </div>}
    </div>
  )
}

export default Summery