
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  Users, 
  Bell,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  title, 
  path, 
  isActive 
}) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <Icon size={18} />
      <span>{title}</span>
      {isActive && <ChevronRight size={16} className="ml-auto" />}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, title: '总览仪表盘', path: '/' },
    { icon: Calendar, title: '活动管理', path: '/activities' },
    { icon: Award, title: '积分与成绩单', path: '/credits' },
    { icon: Users, title: '用户权限', path: '/users' },
    { icon: Bell, title: '消息中心', path: '/notifications' },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0" // Always show on medium screens and up
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto pt-20 pb-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">主菜单</h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path}
                icon={item.icon}
                title={item.title}
                path={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-auto px-4 py-4">
          <div className="rounded-lg bg-secondary p-4">
            <h3 className="text-sm font-medium">需要帮助？</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              查看我们的帮助文档获取更多信息和使用指南。
            </p>
            <Button className="mt-3 text-xs" variant="outline" size="sm">查看文档</Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

// For TypeScript support
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm";
}> = ({ 
  children, 
  className, 
  variant = "default", 
  size = "default", 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 rounded-md px-3 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Sidebar;
