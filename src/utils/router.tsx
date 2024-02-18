import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Board from '../pages/Board'
import Qna from '../pages/Qna'
import CreateQna from '../pages/Qna/create'
import CreateBoard from '../pages/Board/create'


const Router = () => {
   return  (<Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/qna" element={<Qna/>} />
         <Route path="/qna/create" element={<CreateQna />}/>
         <Route path="/board" element={<Board/>}/>
         <Route path="/board/create" element={<CreateBoard />}/>
    </Routes>)
}

export default Router