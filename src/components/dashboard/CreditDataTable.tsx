
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface CreditData {
  id: number;
  category: string;
  name: string;
  totalCredits: number;
  studentCount: number;
  averageCredits: number;
}

interface CreditDataTableProps {
  data: CreditData[];
  activeCategoryFilter: string | null;
  onClearFilter: () => void;
}

const CreditDataTable: React.FC<CreditDataTableProps> = ({
  data,
  activeCategoryFilter,
  onClearFilter,
}) => {
  return (
    <div className="w-full">
      {activeCategoryFilter && (
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm bg-muted inline-flex items-center rounded-md px-3 py-1">
            <span className="mr-1 font-medium">筛选类型:</span> {activeCategoryFilter}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 h-6 w-6 p-0"
              onClick={onClearFilter}
            >
              ✕
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={14} />
            <span>导出数据</span>
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>积分类别</TableHead>
              <TableHead>活动名称</TableHead>
              <TableHead className="text-right">总积分</TableHead>
              <TableHead className="text-right">参与人数</TableHead>
              <TableHead className="text-right">人均积分</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  未找到数据
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-right">{row.totalCredits}</TableCell>
                  <TableCell className="text-right">{row.studentCount}</TableCell>
                  <TableCell className="text-right">{row.averageCredits.toFixed(1)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CreditDataTable;
