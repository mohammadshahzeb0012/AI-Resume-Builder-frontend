import { Link, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Loader2Icon, MoreVertical } from "lucide-react"
import globalApies from "./../../../service/globalApies"
import { toast } from "sonner"


const ResumeCardItem = ({ resume, refreshData }) => {

    const navigate = useNavigate()
    const [openAlert, setOpenAlert] = useState(false)
    const [loading, SetLoading] = useState(false)
    const navigation = (url) => {
        navigate(url)
    }

    const deleteHandel = () => {
        SetLoading(true)
        globalApies.DeleteResumeById(resume.documentId)
            .then(() => {
                SetLoading(false);
                setOpenAlert(false);
                refreshData()
                toast("resume deleted")
            })
            .catch(() => {
                SetLoading(false);
                toast("failed to delete try again")
            })
    }
    return (
        <div className="">
            <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
                <div className='p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        '
                    style={{
                        borderColor: resume?.themeColor
                    }}
                >
                    <div className='flex 
        items-center justify-center h-[180px] '>
                        {/* <Notebook/> */}
                        <img src="/cv.png" width={80} height={80} />
                    </div>
                </div>
            </Link>
            <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
                style={{
                    background: resume.themeColor ? resume.themeColor :  '#9A5BF3'
                }}>
                <h2 className="text-sm">{resume.title}</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>Downlowd</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={openAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteHandel}
                                disabled={loading}>
                                {loading ? <Loader2Icon className='animate-spin' /> : 'Continue'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default ResumeCardItem