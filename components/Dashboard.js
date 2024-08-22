'use client'
import React, {useEffect, useState} from 'react'
import {Fugaz_One} from "next/font/google";
import Calendar from "@/components/Calendar";
import {useAuth} from "@/context/AuthContext";
import {db} from "@/firebase";
import {doc, setDoc} from "firebase/firestore";
import Login from "@/components/Login";
import Loading from "@/components/loading";

const fugaz = Fugaz_One({ subsets: ["latin"] , weight: ['400'] });

export default function Dashboard() {
    const {currentUser, userDataObj , setUserDataObj ,loading} = useAuth();
    const [data, setData] = useState({})
    const now = new Date()


    function countValues(){
        let total_number_of_days = 0
        let sum_moods = 0
        for(const year in data){
            for(const month in data[year]){
                for(const day in data[year][month]){
                    total_number_of_days++
                    sum_moods += data[year][month][day]
                }
            }
        }
        return {
           num_days: total_number_of_days,
            average_mood: sum_moods / total_number_of_days
        }
    }

    const statuses = {
       ...countValues(),
        time_remaining:    `${23-now.getHours()}H ${60-now.getMinutes()}M`,
    }

   async function handleSetMood(mood ){
       const day = now.getDate()
       const month = now.getMonth()
       const year = now.getFullYear()

        try {
            const newData = {...userDataObj}
            if (!newData?.[year]) {
                newData[year] = {}
            }
            if (!newData[year]?.[month]) {
                newData[year][month] = {}
            }
            newData[year] [month] [day] = mood
            setData(newData)
            setUserDataObj(newData)
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await  setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            }, {merge: true})
        }
        catch (error) {
            console.log(error);
        }
    }



    const moods = {
        '&*@#$' : '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            return
        }
    setData(userDataObj)
    }, [currentUser, userDataObj])


    if(loading){
        return <Loading/>
    }

    if(!currentUser){
        return <Login/>
    }


    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg">
                {Object.keys(statuses).map((status, statusIndex) => {
                return (
                    <div key={statusIndex} className='p-4 gap-4 flex flex-col  sm:gap-2'>
                        <p className='font-medium capitalize text-xs sm:text-s truncate '>{status.replaceAll('_', ' ')}</p>
                        <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}{
                            status === 'num_days' ? ' 🔥' : ''
                        }</p>
                    </div>
                )
                })}
            </div>
            <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
                    How do you <span className='textGradient'>feel </span> today?
            </h4>
            <div className="flex items-stretch flex-wrap  gap-4">
                {
                    Object.keys(moods).map((mood, moodIndex) => {
                        return (
                           <button onClick={() => {
                               const currentMoodValue = moodIndex + 1
                                 handleSetMood(currentMoodValue)
                           }} key={moodIndex} className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center flex-1 ' }>
                                <p className="text-4xl sm:text-5xl md:text-6xl">
                                   {moods[mood]}
                                </p>
                               <p className={ 'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>
                                   {mood}
                               </p>
                            </button>
                        )
                    })
                }
            </div>
            <Calendar completeData={data} handleSetMood={handleSetMood}/>
        </div>
    )
}
