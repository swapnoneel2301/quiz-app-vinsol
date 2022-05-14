import React, { useEffect } from 'react';
import { useGlobalContext } from './QuizSection';

export default function Result(){
    const {questions,givenAnswers,totalMarks,setTotalMarks
           ,resetDetails} = useGlobalContext();
    
    const getAnswer = (firstNo,secondNo,operator)=>{
        if(operator==='+') return firstNo+secondNo;
        if(operator==='-') return firstNo-secondNo;
        if(operator==='*') return firstNo*secondNo;
        if(operator==='/') return Math.floor(firstNo/secondNo);
    }
    const calculateMarks = ()=>{
        let marks = 0;
        for(let i=0;i<questions.length;i++){
           const {firstNo,secondNo,operator} = questions[i];
           if(givenAnswers[i]==getAnswer(firstNo,secondNo,operator)) marks++;
        }
        setTotalMarks(marks);
    }
    useEffect(()=>{
       calculateMarks();
    },[]);
    return <div>
        <h2 className='fw-bold text-success display-4'>Result - {totalMarks}/{questions.length}</h2>
        <h4 className='text-decoration-underline'>Answer Details</h4>
        <div className='text-white px-5 my-3' align='center'>
            {
                questions.map((question,index)=>{
                    const {firstNo,secondNo,operator} = question;
                    const correctAnswer=getAnswer(firstNo,secondNo,operator);
                    const userAnswer = givenAnswers[index];
                    const isCorrect = (Number(correctAnswer)===Number(userAnswer));
                    console.log(isCorrect); 
                    return <h5 key={index} className={`${isCorrect?'bg-success':'bg-danger'} w-75`}>
                        Question : <span>{firstNo} {operator} {secondNo}</span>
                        <br/>
                        Actual Answer : <span>{correctAnswer}</span>
                        <br/>
                        Your Answer : <span>{userAnswer===''?'Not Answered':userAnswer}</span>
                    </h5>
                })
            }
        </div>
        <button className='btn btn-primary my-4 mx-3'
                    onClick={resetDetails}
                >Refresh
            </button>
    </div>
}