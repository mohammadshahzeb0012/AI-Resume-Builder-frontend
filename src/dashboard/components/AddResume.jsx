import { Loader2, PlusSquare } from "lucide-react"
// DialogTrigger,
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import globalApies from "./../../../service/globalApies"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
// import axios from "axios"
// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY


const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTittle, setResumeTittle] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const navigate = useNavigate()

  const onCreate = async () => {
    setIsLoading(true);
    const UUID = uuidv4();
    const data = {
      title: resumeTittle,
      resumeId: UUID,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName
    };

    try {
      const res = await globalApies.createNewResume(data)
      setIsLoading(false);
      const strapiDocumentId = res.data.data.documentId
      navigate(`/dashboard/resume/${strapiDocumentId}/edit`)
    } catch (error) {
      setIsLoading(false);
      toast("failed to create please try again")
    }
  };

  return (
    <div>

      <div className="p-14 py-24 border
    items-center flex justify-center bg-secondary
    rounded-lg h-[280px]
    hover:scale-105 transition-all hover:shadow-md
    cursor-pointer border-dashed
    "
        onClick={() => { setOpenDialog(true) }}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add tittle for your new resume</p>
              <Input className="my-2"
                placeholder="Ex. Full Stack resume"
                onChange={(e) => setResumeTittle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => { setOpenDialog(false) }} variant="ghost">Cancek</Button>
              <Button
                disabled={!resumeTittle || isLoading}
                onClick={() => onCreate()}>
                {
                  isLoading ? <Loader2 className="animate-spin" />
                    : "Create"
                }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddResume