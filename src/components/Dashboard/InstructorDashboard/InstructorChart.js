import React , {useState} from 'react'
import {Chart , registerables} from 'chart.js'
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables)


const InstructorChart = ({courses}) => {
    const [currChart , setCurrChart] = useState("students")

    const generateRandomColors = (numColors) => {
        const colors = []
        for(let i = 0 ; i < numColors ; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)} ,  ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    // students information
    const chartDataStudents = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor : generateRandomColors(courses.length)
            }
        ]
    }

    // income information
    const chartIncomeData = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalAmountGenerated),
                backgroundColor : generateRandomColors(courses.length)
            }
        ]
    }

    // options for the chat
    const options = {
        maintainAspectRatio : false
    }


  return (
    <div className='flex flex-1 flex-col gap-y-4 rounded-md bg-white p-6'>
        <p className='text-lg font-bold text-darkblue font-walsheim'>Visualize</p>
        <div className='space-x-4 font-semibold'>
            <button 
            onClick={() => setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-300 ${currChart === "students" ? "bg-richblack-700 text-white font-walsheimMed" : "text-yellow-800"}`}>Students</button>
            <button 
            onClick={() => setCurrChart("income")}
            className={`rounded-sm p-1 px-3 transition-all duration-300 ${currChart === "income" ? "bg-richblack-700 text-white font-walsheimMed" : "text-yellow-800"}`}>Income</button>
        </div>

        <div className="relative mx-auto aspect-squar h-full w-full">
            {/* render the pie chart based on what type you have selected */}
            <Pie data={currChart === "students" ? chartDataStudents : chartIncomeData} options={options}>
            </Pie>
        </div>
    </div>
  )
}

export default InstructorChart