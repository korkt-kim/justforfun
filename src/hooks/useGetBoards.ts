import { useCallback, useEffect, useState } from "react"
import { useOctokit, useOctokitIterator } from "../utils/github"

export const useGetBoards = () => {
    const [issues, setIssues] = useState<{title:string}[]>([])
    
    
    const oct = useOctokit({
        auth: process.env.REACT_APP_OCTOKIT_TOKEN,
      })

    const onIteratorFulfilled = useCallback( (res:any)=>{
      console.log(res)
      if(res.done){
          return;
      }
      setIssues(prev => [
          ...prev,
          ...res.value.data.map(({ title,created_at }:{title:string,created_at:string}) => ({
            title,
            createdAt: created_at,
          })),
        ])
    },[])

      const [setIterator, invokeNext]  = useOctokitIterator(oct?.octokit.issues.listForRepo,onIteratorFulfilled)

      const getIssues = useCallback((params: { owner: string; repo: string,labels:string,per_page:number }) => {
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
        
        getIssues({owner:'korkt-kim',repo:'justforfun',labels:'board',per_page:5})
      },[getIssues, invokeNext])

     
      return [issues,()=>getIssues({owner:'korkt-kim',repo:'justforfun',labels:'board',per_page:5})] as const
}