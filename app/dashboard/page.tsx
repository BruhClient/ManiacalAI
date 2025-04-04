
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getProjects } from "@/server/db/projects";
import { File, FileUp, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectCard from "./_component/ProjectCard";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "@/lib/motion-wrapper";
async function Dashboard() {


    const session = await auth()

    if (!session) redirect("/")
    const projects = await getProjects(session.user.id)

    

    
    return ( <div className="w-full px-3 py-3">
        <div className="text-3xl font-serif pl-3">
            Projects <Button size={"icon"} variant={"ghost"} asChild><Link href={"/dashboard/upload"}><Plus /></Link></Button>
        </div>

        <div className="w-full h-[80vh]">

            {projects.length === 0 ? 
            
            <div className="w-full h-full flex gap-3 justify-center items-center flex-col">
                <FileUp size={60} />
                <div className="text-4xl">Huh , no projects ?</div>
                <div className=" font-serif text-muted-foreground">
                    Cmon , Lets get started !
                </div>
                <Button className="w-full max-w-[200px]" asChild><Link href={"/dashboard/upload"} className="flex gap-2 items-center"><File /> Upload PDF</Link></Button>
            </div>
            
            : 
            
            
            <div className="grid grid-cols-1 md:grid-cols-3 px-3 py-4">
                <AnimatePresence>
                    {projects.map(({createdAt,id,name}) => 
                        <MotionDiv key={id} initial={{opacity : 0, y: 20}} transition={{ duration: 0.2 }} animate={{opacity : 1, y: 0}} exit={{opacity : 0}}>
                            <ProjectCard  createdAt={createdAt} id={id} name={name}/>
                        </MotionDiv>
                        
                    )}
                </AnimatePresence>
                
            </div>
            
            }

        </div>
    </div> );
}

export default Dashboard;