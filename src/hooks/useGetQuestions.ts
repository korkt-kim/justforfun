import { useCallback, useEffect, useState } from "react"
import { useOctokit, useOctokitIterator } from "../utils/github"

export const useGetQuestions = () => {
    const [issues, setIssues] = useState<object[]>([])
    
    const oct = useOctokit({
        auth: process.env.REACT_APP_OCTOKIT_TOKEN,
      })

      const [setIterator, invokeNext]  = useOctokitIterator(oct?.octokit.issues.listForRepo,res=>{
        console.log(res)
        if(res.done){
            return;
        }
        setIssues(prev => [
            ...prev,
            ...res.value.data.map(({ title,created_at }) => ({
              title,
              createdAt: created_at,
            })),
          ])
      })

      const getIssues = useCallback((params: { owner: string; repo: string,labels:string }) => {
        setIssues([])
        setIterator(
          oct?.octokit.paginate.iterator(oct?.octokit.issues.listForRepo, params)
        )
        invokeNext()
      },[invokeNext,oct, setIterator])

      useEffect(()=>{
        if(!invokeNext){
            return;
        }
        getIssues({owner:'korkt-kim',repo:'justforfun',labels:'question'})
      },[getIssues, invokeNext])

      return [issues,()=>getIssues({owner:'korkt-kim',repo:'justforfun',labels:'question'})]
}