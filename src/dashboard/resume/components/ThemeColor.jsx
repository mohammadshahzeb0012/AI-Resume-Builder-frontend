import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { LayoutGrid } from "lucide-react"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import globalApies from "./../../../../service/globalApies"
import { toast } from "sonner"

const ThemeColor = () => {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { resumeId } = useParams();

    const onColorSelect = (color) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })
        const data = {
            themeColor: color
        }
        globalApies.updateResume(resumeId, data)
            .then(() => {
                toast("theme update")
            })
            .catch(() => {
                toast("faild to update")
            })
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="sm"
                    className="flex gap-2"><LayoutGrid /> Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className="grid grid-cols-5 gap-3">
                    {colors.map((item, index) => {
                        return <div className={`
                            h-5 w-5 rounded-full
                        cursor-pointer hover:border-black border
                         ${selectedColor == item && `border-black`}
                            `}
                            style={{ background: item }} key={index}
                            onClick={() => onColorSelect(item)}
                        >
                        </div>
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor