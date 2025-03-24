
import React, { useState } from 'react';
import {
  Award,
  Download,
  Upload,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ChartComponent from '@/components/dashboard/ChartComponent';
import { Button } from '@/components/ui/button';

// Mock data
const creditDistributionData = [
  { name: '志愿服务', value: 35 },
  { name: '学术活动', value: 25 },
  { name: '文体活动', value: 20 },
  { name: '社会实践', value: 15 },
  { name: '其他', value: 5 },
];

const studentCreditsMock = [
  { id: 1, name: '张三', studentId: '2023001', totalCredits: 24.5, requiredCredits: 20, status: 'completed' },
  { id: 2, name: '李四', studentId: '2023002', totalCredits: 18.5, requiredCredits: 20, status: 'warning' },
  { id: 3, name: '王五', studentId: '2023003', totalCredits: 21.0, requiredCredits: 20, status: 'completed' },
  { id: 4, name: '赵六', studentId: '2023004', totalCredits: 15.0, requiredCredits: 20, status: 'danger' },
  { id: 5, name: '孙七', studentId: '2023005', totalCredits: 19.5, requiredCredits: 20, status: 'warning' },
  { id: 6, name: '周八', studentId: '2023006', totalCredits: 22.5, requiredCredits: 20, status: 'completed' },
];

// Filter options
const statusOptions = ['全部状态', 'completed', 'warning', 'danger'];

const CreditSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [students] = useState(studentCreditsMock);

  // Filter students based on search term and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm);
    const matchesStatus = selectedStatus === '全部状态' || student.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, credits: number, required: number) => {
    const percentage = Math.round((credits / required) * 100);
    
    switch(status) {
      case 'completed':
        return (
          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={12} className="mr-1" />
            已达标 ({percentage}%)
          </span>
        );
      case 'warning':
        return (
          <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">
            <AlertTriangle size={12} className="mr-1" />
            接近达标 ({percentage}%)
          </span>
        );
      case 'danger':
        return (
          <span className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
            <XCircle size={12} className="mr-1" />
            未达标 ({percentage}%)
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
          <h1 className="text-3xl font-bold tracking-tight">积分与成绩单</h1>
          <p className="mt-1 text-base text-muted-foreground">
            管理学生积分发放、第二课堂成绩单生成
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload size={18} />
            <span>导入数据</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Download size={18} />
            <span>导出成绩单</span>
          </Button>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <DashboardCard title="总览">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-primary/5">
              <span className="text-3xl font-bold text-primary">{students.length}</span>
              <span className="text-sm text-muted-foreground mt-1">学生总数</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-50">
              <span className="text-3xl font-bold text-green-600">
                {students.filter(s => s.status === 'completed').length}
              </span>
              <span className="text-sm text-muted-foreground mt-1">已达标</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-red-50">
              <span className="text-3xl font-bold text-red-600">
                {students.filter(s => s.status === 'danger').length}
              </span>
              <span className="text-sm text-muted-foreground mt-1">未达标</span>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="达标率">
          <div className="flex items-center justify-center h-full">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-primary"
                  strokeWidth="10"
                  strokeDasharray={365}
                  strokeDashoffset={365 * (1 - 0.67)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>
              <span className="absolute text-2xl font-bold">67%</span>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="积分分布">
          <ChartComponent 
            type="pie" 
            data={creditDistributionData} 
            height={160}
            showLegend={true}
          />
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
              placeholder="搜索学生姓名或学号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <select
              className="rounded-md border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'completed' ? '已达标' : 
                   status === 'warning' ? '接近达标' : 
                   status === 'danger' ? '未达标' : 
                   '全部状态'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DashboardCard>
      
      {/* Students Table */}
      <DashboardCard title="学生积分明细">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">学生姓名</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">学号</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">累计积分</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">需要积分</th>
                <th className="py-3 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                <th className="py-3 px-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/20">
                    <td className="py-4 px-2 text-sm font-medium">{student.name}</td>
                    <td className="py-4 px-2 text-sm">{student.studentId}</td>
                    <td className="py-4 px-2 text-sm text-right">{student.totalCredits.toFixed(1)}</td>
                    <td className="py-4 px-2 text-sm text-right">{student.requiredCredits.toFixed(1)}</td>
                    <td className="py-4 px-2 text-sm">
                      {getStatusBadge(student.status, student.totalCredits, student.requiredCredits)}
                    </td>
                    <td className="py-4 px-2 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">查看明细</Button>
                        <Button size="sm" variant="outline">添加积分</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-2 text-center text-sm text-muted-foreground">
                    没有找到符合条件的学生
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            显示 {filteredStudents.length} 名学生，共 {students.length} 名
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

export default CreditSystem;
