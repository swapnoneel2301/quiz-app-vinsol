import logo from './logo.svg';
import './App.css';
import QuizSection from './components/QuizSection';

function App() {
  return (
    <main align='center' className='mt-5'>
        <h1>Quiz App</h1>
        <section className='d-flex'>
            <div className='mx-2' style={{width:'50%'}}>
                <QuizSection />
            </div>
            <div className='mx-2' style={{width:'50%'}}>
                <QuizSection />
            </div>
        </section>
    </main>
  );
}

export default App;
