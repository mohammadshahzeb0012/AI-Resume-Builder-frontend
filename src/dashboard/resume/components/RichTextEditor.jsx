import { Button } from "@/components/ui/button"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { Brain, LoaderCircle } from "lucide-react"
import { useContext, useState } from "react"
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from "react-simple-wysiwyg"
import { AIChatSession } from "./../../../../service/AiModel"
import { toast } from "sonner"
const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
    const [value, setValue] = useState(`{positionTitle}`,)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)

    const generateSummeryFromAi = async () => {
        setLoading(true)
        if (!resumeInfo.experience[index].title) {
            toast("please add position title")
            return
        }
        const prompt = PROMPT.replace(`{positionTitle}`, resumeInfo.experience[index].title)
        try {
            const result = await AIChatSession.sendMessage(prompt)
            const resp = result.response.text()
            setValue(resp
                .replace('[', '')
                .replace(']', '')
                .replace(/"\s*:\s*/g, ':')
                .replace(/"\s*:\s*"/g, '')
                .replace(/{"/g, '')
                .replace(/"}\s*/g, '')
                .replace(/",\s*"/g, ''))
                .replace(/"/g, ' ')
                .replace(/_/g, ' ')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast("Failed to generate summery please try again")
        }
    }

    return (
        <div>
            <div className="flex justify-between my-2">
                <label htmlFor="" className="text-xs">Summery</label>
                <Button
                    variant="outline" size="sm"
                    className="flex gap-2 border-primary text-primary"
                    onClick={generateSummeryFromAi}
                >

                    {
                        loading ?
                            <LoaderCircle className='animate-spin' /> :
                            <>
                                <Brain className='h-4 w-4' /> Generate from AI
                            </>
                    }

                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor