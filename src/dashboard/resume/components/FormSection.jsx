import { useContext, useState } from "react"
import PersonalDetail from "./forms/PersonalDetail"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft, ArrowBigRight, Home, LayoutGrid } from "lucide-react"
import Summery from "./forms/Summery"
import Experience from "./forms/Experience"
import Education from "./forms/Education"
import Skills from "./forms/Skills"
import { Link, Navigate, useParams } from "react-router-dom"
import ThemeColor from "./ThemeColor"

const FormSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const { resumeId } = useParams()
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to={'/dashboard'}>
            <Button size="sm"><Home /></Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && <Button size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          ><ArrowBigLeft /></Button>}
          <Button className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next<ArrowBigRight />
          </Button>
        </div>
      </div>
      {/* persional details  */}
      {activeFormIndex === 1 ? <PersonalDetail resumeInfo={resumeInfo}
        enabledNext={(v) => setEnableNext(v)} />
        : null
      }
      {/* summary  */}
      {activeFormIndex === 2 ? <Summery
        enabledNext={(v) => setEnableNext(v)}
      /> : null}
      {/* experiance */}
      {activeFormIndex === 3 ? <Experience resumeInfo={resumeInfo}
        enabledNext={(v) => setEnableNext(v)}
      /> : null}
      {/* educational details  */}
      {activeFormIndex === 4 ? <Education 
       enabledNext={(v) => setEnableNext(v)}
      />
        : null}
      {/* skills */}
      {activeFormIndex === 5 ? <Skills 
        enabledNext={(v) => setEnableNext(v)}
      />
        : null}
      {/* Preview */}
      {activeFormIndex === 6 ?
        <Navigate to={`/my-resume/${resumeId}/view`} /> : null
      }
    </div>
  )
}

export default FormSection