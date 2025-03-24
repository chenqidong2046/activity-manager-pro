
import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

// Mock data for activities
const activitiesMock = [
  {
    id: 1,
    title: '校园歌手大赛',
    category: '文艺活动',
    startDate: '2023-10-15',
    endDate: '2023-10-20',
    status: 'completed',
    participants: 328,
    credits: 2.0
  },
  {
    id: 2,
    title: '志愿者服务日',
    category: '志愿服务',
    startDate: '2023-10-25',
    endDate: '2023-10-25',
    status: 'active',
    participants: 156,
    credits: 1.5
  },
  {
    id: 3,
    title: '学术研讨会',
    category: '学术活动',
    startDate: '2023-11-05',
    endDate: '2023-11-06',
    status: 'upcoming',
    participants: 0,
    credits: 2.0
  },
  {
    id: 4,
    title: '篮球友谊赛',
    category: '体育活动',
    startDate: '2023-11-10',
    endDate: '2023-11-12',
    status: 'upcoming',
    participants: 0,
    credits: 1.0
  },
  {
    id: 5,
    title: '创新创业大赛',
    category: '竞赛活动',
    startDate: '2023-10-01',
    endDate: '2023-10-30',
    status: 'active',
    participants: 87,
    credits: 3.0
  },
];

// Filter options
const categories = [
  '全部类型',
  '文艺活动',
  '志愿服务',
  '学术活动',
  '体育活动',
  '竞赛活动'
];

const statuses = [
  '全部状态',
  'completed',
  'active',
  'upcoming'
];

const ActivityManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部类型');
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [activities] = useState(activitiesMock);

  // Filter activities based on search term, category and status
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部类型' || activity.category === selectedCategory;
    const matchesStatus = selectedStatus === '全部状态' || activity.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={12} className="mr-1" />
            已完成
          </span>
        );
      case 'active':
        return (
          <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
            <Clock size={12} className="mr-1" />
            进行中
          </span>
        );
      case 'upcoming':
        return (
          <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">
            <Calendar size={12} className="mr-1" />
            即将开始
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs">
            <XCircle size={12} className="mr-1" />
            未知
          </span>
        );
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">活动管理</h1>
          <p className="mt-1 text-base text-muted-foreground">
            管理所有活动的创建、审核和执行流程
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            <span>创建活动</span>
          </Button>
        </div>
      </div>
      
      {/* Filter and Search */}
      <DashboardCard title="" className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="搜索活动名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <select
                className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'completed' ? '已完成' : 
                     status === 'active' ? '进行中' : 
                     status === 'upcoming' ? '即将开始' : 
                     '全部状态'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      {/* Activities Table */}
      <DashboardCard title="活动列表">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">活动名称</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">类别</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">时间</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">参与人数</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">积分值</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-border hover:bg-muted/20">
                    <td className="py-4 px-2 text-sm font-medium">{activity.title}</td>
                    <td className="py-4 px-2 text-sm">{activity.category}</td>
                    <td className="py-4 px-2 text-sm">{activity.startDate} ~ {activity.endDate}</td>
                    <td className="py-4 px-2 text-sm">{getStatusBadge(activity.status)}</td>
                    <td className="py-4 px-2 text-sm text-right">{activity.participants}</td>
                    <td className="py-4 px-2 text-sm text-right">{activity.credits}</td>
                    <td className="py-4 px-2 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">查看</Button>
                        <Button size="sm" variant="outline">编辑</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 px-2 text-center text-sm text-muted-foreground">
                    没有找到符合条件的活动
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            显示 {filteredActivities.length} 个活动，共 {activities.length} 个
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled>上一页</Button>
            <Button size="sm" variant="outline">下一页</Button>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ActivityManagement;
