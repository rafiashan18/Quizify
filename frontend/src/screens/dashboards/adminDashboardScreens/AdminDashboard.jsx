import React from 'react';
import DashboardStats from '../../../components/AdminDashboard/dashboardStats';
import WelcomeAdmin from '../../../components/AdminDashboard/WelcomeAdmin';


import { useDispatch } from 'react-redux';

import UserSignupChart from '../../../components/AdminDashboard/Charts/UserSignupChart';
import PremiumPurchasesChart from '../../../components/AdminDashboard/Charts/PremiumPurchasesChart';
import MostPlayedQuizes from '../../../components/AdminDashboard/Charts/MostPlayedQuizes';

const AdminDashboard = () => {
    const dispatch = useDispatch();




    return (
        <div className='grid grid-cols-1  gap-y-4'>
            <div className=''>
                <div>
                    <DashboardStats />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6' >

                <div className=''>
                    <WelcomeAdmin />
                </div>
                <div className=''>
                    <UserSignupChart />
                    {/* <RecentUsers /> */}
                </div>
            </div>

            <div className='grid md:grid-cols-2 gap-6 sm:grid-cols-1'>
                <div>
                    < MostPlayedQuizes />
                </div>
                <div className='grid grid-cols-1 '>
                    <PremiumPurchasesChart />
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;