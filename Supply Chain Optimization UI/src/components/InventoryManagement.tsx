import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Package, AlertTriangle, TrendingDown, TrendingUp, RefreshCw, ShoppingCart, Warehouse } from 'lucide-react';

const inventoryItems = [
  {
    id: 'INV001',
    material: 'Concrete Mix',
    currentStock: 245,
    maxCapacity: 500,
    reorderPoint: 100,
    unit: 'tons',
    lastDelivery: '2024-01-15',
    supplier: 'ConcreteCorp',
    cost: '$125/ton',
    status: 'sufficient'
  },
  {
    id: 'INV002',
    material: 'Steel Rebar',
    currentStock: 75,
    maxCapacity: 400,
    reorderPoint: 80,
    unit: 'tons',
    lastDelivery: '2024-01-12',
    supplier: 'SteelWorks Inc',
    cost: '$850/ton',
    status: 'low'
  },
  {
    id: 'INV003',
    material: 'Lumber',
    currentStock: 320,
    maxCapacity: 600,
    reorderPoint: 120,
    unit: 'm³',
    lastDelivery: '2024-01-18',
    supplier: 'TimberPlus',
    cost: '$180/m³',
    status: 'sufficient'
  },
  {
    id: 'INV004',
    material: 'PVC Pipes',
    currentStock: 45,
    maxCapacity: 200,
    reorderPoint: 50,
    unit: 'units',
    lastDelivery: '2024-01-10',
    supplier: 'PipeLine Ltd',
    cost: '$25/unit',
    status: 'critical'
  },
  {
    id: 'INV005',
    material: 'Cement Bags',
    currentStock: 1800,
    maxCapacity: 2500,
    reorderPoint: 500,
    unit: 'bags',
    lastDelivery: '2024-01-16',
    supplier: 'CementMax',
    cost: '$8/bag',
    status: 'sufficient'
  },
  {
    id: 'INV006',
    material: 'Insulation',
    currentStock: 85,
    maxCapacity: 150,
    reorderPoint: 30,
    unit: 'm²',
    lastDelivery: '2024-01-14',
    supplier: 'InsulPro',
    cost: '$45/m²',
    status: 'sufficient'
  }
];

const historicalData = [
  { month: 'Jul', concrete: 400, steel: 300, lumber: 500, pipes: 150 },
  { month: 'Aug', concrete: 350, steel: 250, lumber: 450, pipes: 120 },
  { month: 'Sep', concrete: 450, steel: 320, lumber: 380, pipes: 140 },
  { month: 'Oct', concrete: 380, steel: 280, lumber: 520, pipes: 100 },
  { month: 'Nov', concrete: 420, steel: 350, lumber: 460, pipes: 160 },
  { month: 'Dec', concrete: 300, steel: 200, lumber: 340, pipes: 90 },
  { month: 'Jan', concrete: 245, steel: 75, lumber: 320, pipes: 45 }
];

const seasonalTrends = [
  { season: 'Q1', demand: 85, supply: 90 },
  { season: 'Q2', demand: 120, supply: 110 },
  { season: 'Q3', demand: 140, supply: 135 },
  { season: 'Q4', demand: 95, supply: 100 }
];

const lowStockAlerts = inventoryItems.filter(item => item.status === 'low' || item.status === 'critical');

export function InventoryManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sufficient': return 'text-green-600 bg-green-50 border-green-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 20) return 'bg-red-500';
    if (percentage < 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Inventory Alerts */}
      {lowStockAlerts.length > 0 && (
        <div className="space-y-3">
          {lowStockAlerts.map((item) => (
            <Alert key={item.id} className={item.status === 'critical' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
              <AlertTriangle className={`h-4 w-4 ${item.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
              <AlertDescription>
                <span className="font-medium">{item.material}</span> is running low: {item.currentStock} {item.unit} remaining 
                (Reorder at {item.reorderPoint} {item.unit})
                <Button size="sm" className="ml-2" variant="outline">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Reorder Now
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Inventory Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{inventoryItems.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{lowStockAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Stock Level</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
              <Warehouse className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Turnover</p>
                <p className="text-2xl font-bold">$124K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Inventory Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Real-time Inventory Tracker
            </span>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryItems.map((item) => {
              const percentage = getStockPercentage(item.currentStock, item.maxCapacity);
              return (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{item.material}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>Current: </span>
                          <span className="font-medium text-foreground">{item.currentStock} {item.unit}</span>
                        </div>
                        <div>
                          <span>Capacity: </span>
                          <span className="font-medium text-foreground">{item.maxCapacity} {item.unit}</span>
                        </div>
                        <div>
                          <span>Supplier: </span>
                          <span className="font-medium text-foreground">{item.supplier}</span>
                        </div>
                        <div>
                          <span>Cost: </span>
                          <span className="font-medium text-foreground">{item.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={percentage} className="h-2" />
                      <div 
                        className="absolute top-0 h-2 w-0.5 bg-red-500"
                        style={{ left: `${(item.reorderPoint / item.maxCapacity) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>Reorder Point: {item.reorderPoint}</span>
                      <span>{item.maxCapacity}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Update Stock</Button>
                    {(item.status === 'low' || item.status === 'critical') && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="concrete" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="steel" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="lumber" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="pipes" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Concrete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Steel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Lumber</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Pipes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seasonal Demand Fluctuations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="#3B82F6" name="Demand" />
                <Bar dataKey="supply" fill="#10B981" name="Supply" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Automatic Ordering System */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Reordering System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Recommended Orders</h4>
              <div className="space-y-2">
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <p className="font-medium text-sm">Steel Rebar</p>
                  <p className="text-xs text-muted-foreground">Order 200 tons in next 2 days</p>
                  <Button size="sm" className="mt-2 w-full">Approve Order</Button>
                </div>
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <p className="font-medium text-sm">PVC Pipes</p>
                  <p className="text-xs text-muted-foreground">Order 100 units immediately</p>
                  <Button size="sm" className="mt-2 w-full">Approve Order</Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-yellow-600">Pending Approvals</h4>
              <div className="space-y-2">
                <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <p className="font-medium text-sm">Cement Bags</p>
                  <p className="text-xs text-muted-foreground">Awaiting budget approval</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">Review</Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Recent Orders</h4>
              <div className="space-y-2">
                <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <p className="font-medium text-sm">Concrete Mix</p>
                  <p className="text-xs text-muted-foreground">Delivered Jan 15, 2024</p>
                  <Badge variant="outline" className="mt-2">Completed</Badge>
                </div>
                <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <p className="font-medium text-sm">Lumber</p>
                  <p className="text-xs text-muted-foreground">Delivered Jan 18, 2024</p>
                  <Badge variant="outline" className="mt-2">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}