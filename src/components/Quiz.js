import React ,{useState,useEffect,useRef}from 'react';
import { useGlobalContext } from './QuizSection';
export default function Quiz(){
    const {setQuizStarted,
           setDetailsGiven,
           noOfQuestions,
           resetDetails,
           questions,
           givenAnswers,
           setGivenAnswers,
           totalMarks,
           setTotalMarks
          }=useGlobalContext();

    const [currentQuestion,setCurrentQuestion]=useState(1);
    const [answer,setAnswer]=useState('');
    const [isTimerOn,setIsTimerOn] = useState(false);
    const [timer,setTimer] = useState(0);
    const maxTimerValue = 20000;
    let timerInterval;
    let questionTimeout;
    
    useEffect(()=>{
       setIsTimerOn(true);
    },[]);

    useEffect(()=>{
        if(isTimerOn){
             setTimer(0);
             // timer
             timerInterval = setInterval(()=>{
              setTimer(currentTimer=>currentTimer+1);   
             },1000);
             // question no
             questionTimeout = setTimeout(()=>{
                 setIsTimerOn(false);
                 setCurrentQuestion((prevQuestion)=>prevQuestion+1);
             },maxTimerValue);
         }
         return ()=>{
             clearInterval(timerInterval);
             clearTimeout(questionTimeout);
         }
    },[isTimerOn]);

    useEffect(()=>{
        if(currentQuestion<=noOfQuestions){
        //   console.log('question number changed');
          if(questions.length>0)
             setGivenAnswers((prevAns)=>{
                 return [...prevAns,answer];
             });
          setAnswer('');
          setIsTimerOn(true);
      }
      else {
             setGivenAnswers((prevAns)=>{
                 return [...prevAns,answer];
             });
      }
      
    },[currentQuestion]);

    const handleReset = ()=>{
        setIsTimerOn(false);
        resetDetails();
    }
    const handleNext = ()=>{
        setIsTimerOn(false);
        setCurrentQuestion(prevQuestion=>prevQuestion+1);
    }

    const showTimer = (maxTimerValue/1000)-timer-1;
    const showTimerStr = `00:${('0'+showTimer).slice(-2)}`;

    //UI part
    
    if(currentQuestion<=noOfQuestions)
        return <div className='mt-5 mx-4 px-5' align='right'>
            <h4 className='my-4 text-danger fw-bold'>{showTimerStr}</h4>
            <h2 align='left'>Question {currentQuestion}/{noOfQuestions}</h2>
            {   
                questions.length &&
                <div align='middle' className='my-4 fw-bold display-4'>
                    <span>{questions[currentQuestion-1].firstNo} </span>
                    <span>{questions[currentQuestion-1].operator} </span>
                    <span>{questions[currentQuestion-1].secondNo} </span>
                    <span>= </span>
                    <input type='number' className='w-25' value={answer} onChange={(e)=>setAnswer(e.target.value)}></input>
                </div>
            }
            <button className='btn btn-primary my-4'
                    onClick={handleNext}>
                {
                    currentQuestion==noOfQuestions?'submit':'next'
                }
            </button>
            <button className='btn btn-warning my-4 mx-3 float-start'
                    onClick={handleReset}
                >Reset
            </button>
        </div>
}