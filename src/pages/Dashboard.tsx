
import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Award,
  CreditCard,
  AlertTriangle,
  PlusCircle,
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ChartComponent from '@/components/dashboard/ChartComponent';
import { Button } from '@/components/ui/button';

// Mock data
const activityData = [
  { name: '周一', value: 24 },
  { name: '周二', value: 13 },
  { name: '周三', value: 29 },
  { name: '周四', value: 34 },
  { name: '周五', value: 40 },
  { name: '周六', value: 48 },
  { name: '周日', value: 35 },
];

const creditDistribution = [
  { name: '社会实践', value: 30 },
  { name: '志愿服务', value: 25 },
  { name: '文体活动', value: 20 },
  { name: '学术科研', value: 15 },
  { name: '其他', value: 10 },
];

const topActivities = [
  { id: 1, name: '校园歌手大赛', participants: 328, completion: 92 },
  { id: 2, name: '志愿者服务日', participants: 256, completion: 88 },
  { id: 3, name: '学术论坛', participants: 187, completion: 79 },
  { id: 4, name: '篮球联赛', participants: 164, completion: 95 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">总览仪表盘</h1>
          <p className="mt-1 text-base text-muted-foreground">
            欢迎回来，查看校园活动的最新数据和待办事项
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>发布新活动</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <StatCard
          title="活动总数"
          value="134"
          trend={{ value: 7.2, isPositive: true }}
          description="较上月增长7.2%"
          icon={Calendar}
        />
        <StatCard
          title="参与学生"
          value="4,563"
          trend={{ value: 9.3, isPositive: true }}
          description="较上月增长9.3%"
          icon={Users}
        />
        <StatCard
          title="累计发放积分"
          value="23,721"
          trend={{ value: 5.8, isPositive: true }}
          description="较上月增长5.8%"
          icon={Award}
        />
        <StatCard
          title="学分达标率"
          value="84%"
          trend={{ value: 2.4, isPositive: true }}
          description="较上月提高2.4%"
          icon={CreditCard}
        />
      </div>
      
      {/* Charts and Data Section */}
      <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Activity Trend */}
        <DashboardCard title="近7天活动参与趋势" className="lg:col-span-2">
          <ChartComponent 
            type="area" 
            data={activityData} 
            showGrid={true}
            showTooltip={true}
          />
        </DashboardCard>
        
        {/* Credit Distribution */}
        <DashboardCard title="积分类型分布">
          <ChartComponent 
            type="pie" 
            data={creditDistribution} 
            showTooltip={true}
            showLegend={true}
            height={250}
          />
        </DashboardCard>
      </div>
      
      {/* Alerts and Reminders */}
      <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
        <DashboardCard 
          title="待办事项" 
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-yellow-500 mr-2" />
                <span className="text-sm font-medium">待审核活动 (5)</span>
              </div>
              <Button size="sm" variant="outline">查看</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-md border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center">
                <Award size={18} className="text-blue-500 mr-2" />
                <span className="text-sm font-medium">待发放积分 (12)</span>
              </div>
              <Button size="sm" variant="outline">处理</Button>
            </div>
            
            <div className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 p-3">
              <div className="flex items-center">
                <AlertTriangle size={18} className="text-red-500 mr-2" />
                <span className="text-sm font-medium">低参与率活动 (3)</span>
              </div>
              <Button size="sm" variant="outline">查看</Button>
            </div>
          </div>
        </DashboardCard>
        
        {/* Top Activities */}
        <DashboardCard 
          title="热门活动排行" 
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-1 text-left text-sm font-medium text-muted-foreground">活动名称</th>
                  <th className="py-2 px-1 text-right text-sm font-medium text-muted-foreground">参与人数</th>
                  <th className="py-2 px-1 text-right text-sm font-medium text-muted-foreground">完成率</th>
                </tr>
              </thead>
              <tbody>
                {topActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-border">
                    <td className="py-3 px-1 text-sm">{activity.name}</td>
                    <td className="py-3 px-1 text-right text-sm">{activity.participants}</td>
                    <td className="py-3 px-1 text-right text-sm">
                      <span 
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          activity.completion >= 90 
                            ? 'bg-green-100 text-green-800' 
                            : activity.completion >= 80 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {activity.completion}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm" className="w-full">查看全部活动</Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
