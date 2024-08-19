import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import globalApies from "./../../../../../service/globalApies";
import { toast } from "sonner";

const Skills = ({enabledNext}) => {
  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating: 0
  }])
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(()=>{
    resumeInfo&&setSkillsList(resumeInfo?.skills)
  },[])

  const handleChange = (index, name, value) => {
    enabledNext(false)
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  }

  const addNewSkills = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0
    }])
  }

  const removeSkills = () => {
    setSkillsList(skillsList => skillsList.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const newArr = skillsList.map((item) => ({
      name: item.name,
      rating: item.rating,
    }));

    const data = {
      skills: [
     ...newArr
      ]
    }
    console.log(data)
    globalApies.updateResume(resumeId, data)
      .then(() => {
        setLoading(false)
        toast("skills updated")
        enabledNext(true)
      })
      .catch(() => {
        setLoading(false)
        toast("failed to update skills")
        enabledNext(false)
      })
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList
    })
  }, [skillsList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {skillsList?.map((item, index) => {
          return <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
            <div>
              <label className="text-xs">Name</label>
              <label className='text-xs'>Name</label>
              <Input className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating}
              onChange={(v) => handleChange(index, 'rating', v)} />
          </div>
        })}
      </div>
      <div className='flex justify-between'>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewSkills} className="text-primary"> + Add More Skill</Button>
          <Button variant="outline" onClick={removeSkills} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills