import { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function App() {
   const [ allWorkers, setAllWorkers ] = useState([]);
   const [ theme, setTheme ] = useState(true);
   const [ superDiv, setSuperDiv ] = useState('bg-slate-200');
   const [ table, setTable ] = useState('bg-slate-100');
   const [ leters, setLeters ] = useState('text-slate-900')

   useEffect(() => {
      async function getData(): Promise<void> {
        const originalData = await fetch("http://localhost:8080/api/workers");
        const data = await originalData.json();
        
        setAllWorkers(data);
      };
      getData();
   }, []);

   const handleTheme = () => {
      (theme ? setTheme(false) : setTheme(true));
      changeDivTheme();
      changeTableTheme();
      changeLeters();
   };

   const changeDivTheme = () => theme ? setSuperDiv('bg-slate-700') : setSuperDiv('bg-slate-200');

   const changeTableTheme = () => theme ? setTable('bg-slate-800') : setTable('bg-slate-100');

   const changeLeters = () => theme ? setLeters('text-slate-50') : setLeters('text-slate-900');

   return(
      <div className={`flex flex-col items-center justify-center min-h-screen max-h-fit ${superDiv}`}>

         <div className='absolute top-10'>

            { 
               theme 
               ? 
               <FaToggleOff 
                  className='text-2xl md:text-3xl lg:text-4xl' 
                  onClick={handleTheme} 
               /> 
               : 
               <FaToggleOn 
                  className='text-2xl text-slate-200 md:text-3xl lg:text-4xl' 
                  onClick={handleTheme}
               /> 
            }

         </div>

         <table className={`w-screen text-center border border-slate-400 ${table} md:w-10/12 lg:w-9/12 xl:w-8/12`}>

            <thead className=''>
               <tr className='h-16 font-semibold bg-blue-100'>
                  <td>Nome</td>
                  <td>Sobrenome</td>
                  <td>Idade</td>
                  <td>Cargo</td>
               </tr>
            </thead>

            <tbody className={`${leters}`}>
               {

                  allWorkers.map(worker => {
                     return(
                        <tr className='h-20 border-b border-blue-600' key={worker.id}>
                           <td>{worker.nome}</td>
                           <td>{worker.sobrenome}</td>
                           <td>{worker.idade}</td>
                           <td>{worker.cargo}</td>
                        </tr>
                     );
                  })

               }
            </tbody>

         </table>
      </div>
   );
};


