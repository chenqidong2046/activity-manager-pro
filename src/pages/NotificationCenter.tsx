
import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Search,
  RefreshCw
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';

// Mock data for notifications
const notificationsMock = [
  {
    id: 1,
    title: '新活动审核请求',
    message: '计算机学院申请发布"程序设计大赛"活动，请及时审核。',
    type: 'alert',
    time: '5分钟前',
    read: false
  },
  {
    id: 2,
    title: '积分发放完成',
    message: '"校园歌手大赛"活动积分已成功发放给328名参与学生。',
    type: 'success',
    time: '1小时前',
    read: false
  },
  {
    id: 3,
    title: '系统更新通知',
    message: '系统将于今晚22:00-23:00进行维护更新，请提前保存工作。',
    type: 'info',
    time: '3小时前',
    read: true
  },
  {
    id: 4,
    title: '学生积分申诉',
    message: '学生张三(2023001)对"志愿者服务日"活动积分提出申诉。',
    type: 'alert',
    time: '5小时前',
    read: true
  },
  {
    id: 5,
    title: '活动报名截止提醒',
    message: '"篮球友谊赛"活动报名将于明天12:00截止。',
    type: 'calendar',
    time: '昨天',
    read: true
  },
  {
    id: 6,
    title: '未达标学生预警',
    message: '有12名大四学生积分未达标，请注意关注。',
    type: 'alert',
    time: '2天前',
    read: true
  }
];

// Filter options
const types = ['全部类型', 'alert', 'success', 'info', 'calendar'];
const readStatuses = ['全部', '未读', '已读'];

const NotificationCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('全部类型');
  const [selectedReadStatus, setSelectedReadStatus] = useState('全部');
  const [notifications, setNotifications] = useState(notificationsMock);

  // Filter notifications based on search term, type and read status
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '全部类型' || notification.type === selectedType;
    const matchesReadStatus = 
      selectedReadStatus === '全部' || 
      (selectedReadStatus === '未读' && !notification.read) ||
      (selectedReadStatus === '已读' && notification.read);
    
    return matchesSearch && matchesType && matchesReadStatus;
  });

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  // Mark as read/unread
  const toggleReadStatus = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <AlertCircle size={20} className="text-yellow-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      case 'calendar':
        return <Calendar size={20} className="text-purple-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">消息中心</h1>
          <p className="mt-1 text-base text-muted-foreground">
            查看系统通知、审批提醒和其他重要消息
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <Button variant="outline" onClick={markAllAsRead} className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>全部标为已读</span>
          </Button>
          <Button className="flex items-center gap-2">
            <RefreshCw size={18} />
            <span>刷新</span>
          </Button>
        </div>
      </div>
      
      {/* Notification Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
        <DashboardCard title="">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mr-3">
                <Bell size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">所有消息</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mr-3">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">未读消息</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => !n.read).length}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 mr-3">
                <AlertCircle size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">需要处理</p>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'alert' && !n.read).length}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
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
              placeholder="搜索消息..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'alert' ? '提醒' : 
                   type === 'success' ? '成功' : 
                   type === 'info' ? '通知' : 
                   type === 'calendar' ? '日程' : 
                   '全部类型'}
                </option>
              ))}
            </select>
            
            <select
              className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedReadStatus}
              onChange={(e) => setSelectedReadStatus(e.target.value)}
            >
              {readStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </DashboardCard>
      
      {/* Notifications List */}
      <DashboardCard title="消息列表">
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex p-4 rounded-lg border ${
                  notification.read 
                    ? 'bg-card border-border' 
                    : 'bg-primary/5 border-primary/20'
                } transition-all hover:shadow-sm`}
              >
                <div className="mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleReadStatus(notification.id)}
                      >
                        {notification.read ? '标为未读' : '标为已读'}
                      </Button>
                      {notification.type === 'alert' && !notification.read && (
                        <Button size="sm">处理</Button>
                      )}
                    </div>
                    {!notification.read && (
                      <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Bell size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">没有消息</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                当前没有符合条件的消息。
              </p>
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
};

export default NotificationCenter;
