import React from 'react';
import DashboardStats from '../../../components/AdminComponents/dashboardStats';
import WelcomeAdmin from '../../../components/AdminComponents/WelcomeAdmin';


import { useDispatch } from 'react-redux';

import UserSignupChart from '../../../components/AdminComponents/Charts/UserSignupChart';
import PremiumPurchasesChart from '../../../components/AdminComponents/Charts/PremiumPurchasesChart';
import MostPlayedQuizes from '../../../components/AdminComponents/Charts/MostPlayedQuizes';

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

            <div className='grid grid-cols-2 gap-6'>
                <div>
                    < MostPlayedQuizes />
                </div>
                <div className='grid grid-cols-2 '>
                    <PremiumPurchasesChart />
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;