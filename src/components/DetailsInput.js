import React, { useEffect } from 'react';
import { useGlobalContext } from './QuizSection';
export default function DetailsInput(){

    const {setDetailsGiven,
           noOfQuestions,setNoOfQuestions,
           rangeOfNumbers,setRangeOfNumbers,
           operators,setOperators
          } = useGlobalContext();

    const handleOperators = (e)=>{
       const clickedOperator = e.target.value;
       const currentValue=e.target.checked;
       setOperators({...operators,[clickedOperator]:currentValue});
    }
    
    const checkOperatorSelected = ()=>{
         if(operators.plus) return true;
         if(operators.minus) return true;
         if(operators.multiply) return true;
         if(operators.divide) return true;
         return false;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!checkOperatorSelected()) return;
        setDetailsGiven(true);
    }
    useEffect(()=>{
        // console.log(operators);
    },[]);
    
    return <form onSubmit={handleSubmit}>
        <div class="alert alert-warning alert-dismissible">
            <strong>Select atleast one operator.</strong>
        </div>
        <div className='mt-3 mx-4 p-4' align='left'>
                <label htmlFor='noOfQuestions' className='form-label'>How many Questions will be in the quiz?</label>
                <input id='noOfQuestions' type='number' className='form-control mt-2 mb-4 w-25'
                       min='5'
                       value={noOfQuestions}
                       onChange={(e)=>setNoOfQuestions(e.target.value)}
                ></input>

                <label htmlFor='rangeOfNumbers' className='form-label'>Range of the numbers.  
                      <span className='fw-bold text-primary'> {rangeOfNumbers} </span>
                </label>
                <input id='rangeOfNumbers' type='range' className='form-range mt-2 mb-4 w-75 d-block'
                       min='5' max='200'
                       value={rangeOfNumbers} 
                       onChange={(e)=>setRangeOfNumbers(e.target.value)}></input>
                 
                 <label className='form-label'>select the operators you want to practice.</label>
                 <br/>
                 <div className='form-check'>
                    <input className="form-check-input" type="checkbox" checked={operators.plus} onChange={handleOperators}  value="plus" id="plus"/>
                    <label className="form-check-label" htmlFor="plus">
                        PLUS(+)
                    </label>
                 </div>
                 <div className='form-check'>
                    <input className="form-check-input" type="checkbox" checked={operators.minus} onChange={handleOperators} value="minus" id="minus"/>
                    <label className="form-check-label" htmlFor="minus">
                        MINUS(-)
                    </label>
                 </div>
                 <div className='form-check'>
                    <input className="form-check-input" type="checkbox" checked={operators.multiply} onChange={handleOperators} value='multiply' id="multiply"/>
                    <label className="form-check-label" htmlFor="multiply">
                        MULTIPLY(*)
                    </label>
                 </div>
                 <div className='form-check'>
                    <input className="form-check-input" type="checkbox" checked={operators.divide} onChange={handleOperators} value='divide' id="divide"/>
                    <label className="form-check-label" htmlFor="divide">
                        DIVIDE(/)
                    </label>
                 </div>
                <button type='submit' className='btn btn-primary mt-5'
                        >Submit details and start</button>
        </div>
    </form>
}