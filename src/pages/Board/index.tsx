import { useState } from "react"
import { getAllIssues, useOctokit, useOctokitIterator } from "../../utils/github"
import { useGetBoards } from "../../hooks/useGetBoards"
import { List } from "../../components/List"

const Board = () => {
    const [issues,getNextIssue] = useGetBoards()

   

  return <>
    <List items={issues}/>
  </>
}

export default Board