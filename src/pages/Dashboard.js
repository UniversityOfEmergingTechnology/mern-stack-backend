import {useSelector} from 'react-redux'
import {Outlet} from 'react-router-dom'

import Navbar from '../components/common/Navbar'
import Sidebar from '../components/Dashboard/Sidebar'
import './Dashboard.css'


function Dashboard(){
    const {loading : profileLoading} = useSelector((state) => state.profile)
    const {loading : authLoading} = useSelector((state) => state.auth)
    if(profileLoading || authLoading){
        return(
            <div className='grid min-h-[calc(100vh - 3.5rem)] place-items-center'>
                <div className='loader'></div>
            </div>
        )
    }
    return(
        <>
            <Navbar/>
            <div className='relative flex min-h-[calc(100vh - 3.5rem)]'>
                <Sidebar/>
                <div className='h-[calc(100vh-3.5rem)] bg-white flex-1 overflow-auto scrollbar'>
                    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;