import { useCallback, useEffect, useState } from "react"
import { getAllIssues, useOctokit, useOctokitIterator } from "../utils/github"
import Carousel from "../components/Carousel"
import Logo1 from '../assets/logo192.png'
import Logo2 from '../assets/logo512.png'
import { invoke } from "lodash-es"
import { useGetQuestions } from "../hooks/useGetQuestions"
import { useGetBoards } from "../hooks/useGetBoards"

const Home = () => {
  const [questions, setQuestions] = useGetQuestions()
  const [boards, setBoards] = useGetBoards()


  
  return <>
    <Carousel style={{background:'grey', height:'500px'}} images={[Logo1,Logo2]}/>
  </>
}

export default Home