import { Form, useParams } from "react-router-dom"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import globalApies from "./../../../../../service/globalApies"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"


const PersonalDetail = ({ enabledNext }) => {
  const { resumeId } = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [formData, setFormdata] = useState({})
  const [loading, setisloading] = useState(false)

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value,
    })
    setResumeInfo({
      ...resumeInfo,
      [name]: value
    })
  }

  const onSave = (e) => {
    e.preventDefault();
    setisloading(true)
    const data = formData
    globalApies.updateResume(resumeId, data)
      .then(() => {
        setisloading(false)
        toast("Persional details updated")
        enabledNext(true)
      }).catch(() => {
        setisloading(true)
        enabledNext(false)
        toast("failed to update please try agian")
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
    >
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <Form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName" required onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input name="jobTitle" required
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address" required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone" required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit"
            disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default PersonalDetail