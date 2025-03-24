
import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
            aria-label={isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tight">趣活动</span>
            <span className="text-sm text-muted-foreground">管理平台</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" aria-label="通知">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <span className="text-sm font-medium">团委管理员</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-sm font-medium">管</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
