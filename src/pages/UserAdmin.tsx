
import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Shield,
  User
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';

// Mock data for users
const usersMock = [
  {
    id: 1,
    name: '张主任',
    username: 'zhangzhuran',
    email: 'zhang@example.com',
    role: 'admin',
    department: '校团委',
    lastActive: '2023-10-15 14:30'
  },
  {
    id: 2,
    name: '王老师',
    username: 'wanglaoshi',
    email: 'wang@example.com',
    role: 'manager',
    department: '计算机学院',
    lastActive: '2023-10-14 09:45'
  },
  {
    id: 3,
    name: '李老师',
    username: 'lilaoshi',
    email: 'li@example.com',
    role: 'manager',
    department: '机械工程学院',
    lastActive: '2023-10-13 16:20'
  },
  {
    id: 4,
    name: '赵助理',
    username: 'zhaozl',
    email: 'zhao@example.com',
    role: 'assistant',
    department: '校团委',
    lastActive: '2023-10-12 11:15'
  },
  {
    id: 5,
    name: '刘班长',
    username: 'liuban',
    email: 'liu@example.com',
    role: 'class',
    department: '计算机1班',
    lastActive: '2023-10-11 15:30'
  }
];

// Filter options
const roles = ['全部角色', 'admin', 'manager', 'assistant', 'class'];
const departments = ['全部部门', '校团委', '计算机学院', '机械工程学院', '计算机1班'];

const UserAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('全部角色');
  const [selectedDepartment, setSelectedDepartment] = useState('全部部门');
  const [users] = useState(usersMock);

  // Filter users based on search term, role and department
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '全部角色' || user.role === selectedRole;
    const matchesDepartment = selectedDepartment === '全部部门' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return (
          <span className="flex items-center text-purple-600 bg-purple-50 px-2 py-1 rounded-full text-xs">
            <Shield size={12} className="mr-1" />
            系统管理员
          </span>
        );
      case 'manager':
        return (
          <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
            <Users size={12} className="mr-1" />
            院系管理员
          </span>
        );
      case 'assistant':
        return (
          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <User size={12} className="mr-1" />
            部门助理
          </span>
        );
      case 'class':
        return (
          <span className="flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs">
            <User size={12} className="mr-1" />
            班级管理员
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户权限管理</h1>
          <p className="mt-1 text-base text-muted-foreground">
            管理系统用户、分配角色和权限
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            <span>添加用户</span>
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
              placeholder="搜索用户姓名、用户名或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <select
                className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'admin' ? '系统管理员' : 
                     role === 'manager' ? '院系管理员' : 
                     role === 'assistant' ? '部门助理' : 
                     role === 'class' ? '班级管理员' : 
                     '全部角色'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      {/* Users Table */}
      <DashboardCard title="用户列表">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">用户姓名</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">用户名</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">邮箱</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">角色</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">部门</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">最后活跃</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/20">
                    <td className="py-4 px-2 text-sm font-medium">{user.name}</td>
                    <td className="py-4 px-2 text-sm">{user.username}</td>
                    <td className="py-4 px-2 text-sm">{user.email}</td>
                    <td className="py-4 px-2 text-sm">{getRoleBadge(user.role)}</td>
                    <td className="py-4 px-2 text-sm">{user.department}</td>
                    <td className="py-4 px-2 text-sm">{user.lastActive}</td>
                    <td className="py-4 px-2 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 px-2 text-center text-sm text-muted-foreground">
                    没有找到符合条件的用户
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            显示 {filteredUsers.length} 个用户，共 {users.length} 个
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled>上一页</Button>
            <Button size="sm" variant="outline">下一页</Button>
          </div>
        </div>
      </DashboardCard>
      
      {/* Role Descriptions */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <DashboardCard title="系统管理员">
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              拥有全部权限，可以管理所有学院的活动、积分，配置系统规则。
            </p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="院系管理员">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              可以管理本院系活动、积分，审核本院系学生成绩单。
            </p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="部门助理">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              协助管理员处理日常事务，有限的活动管理权限。
            </p>
          </div>
        </DashboardCard>
        
        <DashboardCard title="班级管理员">
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              管理本班级活动发布，监控本班学生参与数据。
            </p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default UserAdmin;
