import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  hash: string;
  type: 'project_creation' | 'carbon_credit' | 'verification' | 'payment' | 'ownership_transfer';
  from: string;
  to: string;
  amount?: number;
  currency?: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber: number;
  gasUsed: number;
  description: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
}

const transactionTypes = {
  project_creation: { 
    label: 'Project Creation', 
    color: 'bg-success text-success-foreground',
    icon: '🌱'
  },
  carbon_credit: { 
    label: 'Carbon Credit', 
    color: 'bg-primary text-primary-foreground',
    icon: '💚'
  },
  verification: { 
    label: 'Verification', 
    color: 'bg-accent text-accent-foreground',
    icon: '✅'
  },
  payment: { 
    label: 'Payment', 
    color: 'bg-secondary text-secondary-foreground',
    icon: '💰'
  },
  ownership_transfer: { 
    label: 'Transfer', 
    color: 'bg-warning text-warning-foreground',
    icon: '🔄'
  }
};

const statusConfig = {
  pending: { color: 'bg-warning text-warning-foreground', icon: Clock },
  confirmed: { color: 'bg-success text-success-foreground', icon: CheckCircle },
  failed: { color: 'bg-destructive text-destructive-foreground', icon: XCircle }
};

export function TransactionTable({ transactions, className }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || tx.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Blockchain Transactions
        </CardTitle>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by hash or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            {Object.entries(transactionTypes).map(([key, config]) => (
              <option key={key} value={key}>
                {config.icon} {config.label}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-1">
          {filteredTransactions.map((tx) => {
            const isExpanded = expandedRows.has(tx.id);
            const typeConfig = transactionTypes[tx.type];
            const statusData = statusConfig[tx.status];
            const StatusIcon = statusData.icon;

            return (
              <div key={tx.id} className="border-b last:border-b-0">
                {/* Main Row */}
                <div 
                  className="flex items-center gap-3 p-4 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => toggleRowExpansion(tx.id)}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Transaction Type */}
                    <Badge className={typeConfig.color} variant="secondary">
                      <span className="mr-1">{typeConfig.icon}</span>
                      {typeConfig.label}
                    </Badge>

                    {/* Transaction Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {truncateHash(tx.hash)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(tx.hash);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {tx.description}
                      </p>
                    </div>
                  </div>

                  {/* Status and Amount */}
                  <div className="flex items-center gap-3">
                    {tx.amount && (
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {tx.amount} {tx.currency}
                        </p>
                      </div>
                    )}

                    <Badge className={statusData.color} variant="secondary">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {tx.status}
                    </Badge>

                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t bg-muted/20 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="text-muted-foreground">From:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-background px-2 py-1 rounded text-xs">
                              {formatAddress(tx.from)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(tx.from)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <span className="text-muted-foreground">To:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-background px-2 py-1 rounded text-xs">
                              {formatAddress(tx.to)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(tx.to)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-muted-foreground">Block:</span>
                          <p className="font-mono text-xs">#{tx.blockNumber}</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Gas Used:</span>
                          <p className="font-mono text-xs">{tx.gasUsed.toLocaleString()}</p>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Timestamp:</span>
                          <p className="text-xs">{new Date(tx.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <LinkIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}