import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RichTextEditor from "../RichTextEditor";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import globalApies from "./../../../../../service/globalApies";
import { toast } from "sonner";

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

const Experience = ({enabledNext}) => {

  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.experience.length > 0 && setExperinceList(resumeInfo?.experience)
  }, [])

  const addNewExperiance = () => {
    setExperinceList([...experinceList, formField])
  }

  const RemoveExperience = () => {
    setExperinceList(experinceList => experinceList.slice(0, -1))
  }

  const handleChange = (index, event) => {
    enabledNext(false)
    const newEntries = experinceList.slice()
    const { name, value } = event.target
    newEntries[index][name] = value
    setExperinceList(newEntries)
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experinceList
    });
  }, [experinceList]);

  const handelRichTextEditorChange = (e, name, index) => {
    enabledNext(false)
    const newEntries = experinceList.slice()
    newEntries[index][name] = e.target.value
    setExperinceList(newEntries)
  }


  const onSave = () => {
    setLoading(true)
    const res3 = experinceList.map(item => ({
      city: item.city,
      companyName: item.companyName,
      endDate: item.endDate,
      startDate: item.startDate,
      state: item.state,
      title: item.title,
      workSummery: item.workSummery
    }));
    const datas = {
      experience: [
        ...res3
      ]
    }
    globalApies.updateResume(resumeId, datas)
      .then(() => {
        setLoading(false)
        toast("experiance updated")
        enabledNext(true)
      })
      .catch(() => {
        setLoading(false)
        toast("failed to update")
        enabledNext(false)
      })
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList?.map((item, index) => {
            return <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  {/* Work Summery  */}
                  <RichTextEditor
                    index={index}
                    onRichTextEditorChange={event => handelRichTextEditorChange(event, `workSummery`, index)}
                  />
                </div>
              </div>
            </div>
          })}
        </div>
        <div className="flex justify-between">
          <div className='flex gap-2'>
            <Button onClick={addNewExperiance} variant="outline" className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button
            disabled={loading} onClick={() => onSave()}
          >
            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience