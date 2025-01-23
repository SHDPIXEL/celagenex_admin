import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Users, Rows3, Video, Play, ArrowDownToLine } from "lucide-react";
import API from "../lib/api";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";


const Dashboard = () => {

    const [dashboardStats, SetDashboardStats] = useState({
        totalUsers: 0,
        totalForms: 0,
        totalVideos: 0,
    })
    const [downloadData, setDownloadData] = useState();
    const [downloadLoader, serDownloadLoader] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get("/api/auth/dashboard-stats");
                const data = response.data.data;
                SetDashboardStats(data);
                console.log(data)

                if (response.status === 200 || 201) {
                    console.log("dashboard stats fetched successfully")
                }
            } catch (e) {
                console.error("Error in fetching dashboars stats")
            }
        }
        fetchStats()
    }, [])

    const handleBulkProcess = () => {
        toast.success("Bulk Process Started");
    }

    const handleDownload = () => {
        const downloadPromise = API.get("/api/auth/download-data", {
            responseType: 'blob'
        }).then(response => {
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx'); 
            document.body.appendChild(link);
            link.click();
            
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    
        toast.promise(downloadPromise, {
            loading: 'Downloading...',
            success: 'Data downloaded successfully',
            error: 'Failed to download data'
        });
    };

    const DashboardItems = [
        {
            title: "Total Users",
            value: dashboardStats.totalUsers,
            icon: <Users className="h-5 w-5 text-gray-600" />,
        },
        {
            title: "Total Forms Submitted",
            value: dashboardStats.totalForms, // Correct property for total forms
            icon: <Rows3 className="h-5 w-5 text-gray-600" />,
        },
        {
            title: "Total Video Processed",
            value: dashboardStats.totalVideos, // Correct property for total videos
            icon: <Video className="h-5 w-5 text-gray-600" />,
        },
    ];


    return (
        <div className="mx-6 min-h-[100dvh]">
            <Helmet>
                <title>Celagenex | Dashboard</title>
                <meta name="Dashboard" content="Celagenex Dashboard!" />
            </Helmet>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
                {DashboardItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}
            </div>
            <section className="flex items-center justify-center mt-20 gap-x-10">
                <div
                    onClick={handleBulkProcess}
                    className="flex items-center justify-center h-20 px-14 bg-[#E4F5A0] hover:bg-[#F4FFC3] text-gray-800 shadow-sm gap-3 rounded-sm cursor-pointer">
                    <Play className="h-5 w-5" />
                    <button
                        className="font-semibold">
                        Start Bulk Process
                    </button>
                </div>
                <div
                    onClick={handleDownload}
                    className="flex items-center justify-center h-20 px-14 bg-[#E4F5A0] hover:bg-[#F4FFC3] text-gray-800 shadow-sm gap-3 rounded-sm cursor-pointer">
                    <ArrowDownToLine className="h-5 w-5" />
                    <button
                        className="font-semibold">
                            Download
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
