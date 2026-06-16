import { RESUME_PDF } from "@/lib/constants";
import ResumeActions from "./ResumeActions";

export const metadata = {
  title: "Resume | Saran Baral",
  robots: { index: false },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <ResumeActions />
      <iframe
        src={encodeURI(RESUME_PDF)}
        title="Saran Baral Resume"
        className="w-full flex-1 min-h-[calc(100vh-4.5rem)] border-0 bg-white"
      />
    </div>
  );
}
