import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Package, Truck, AlertTriangle, Clock } from 'lucide-react';

const kpiData = [
  { name: 'Jan', demand: 85, deliveries: 78, inventory: 92 },
  { name: 'Feb', demand: 92, deliveries: 85, inventory: 88 },
  { name: 'Mar', demand: 88, deliveries: 90, inventory: 85 },
  { name: 'Apr', demand: 95, deliveries: 88, inventory: 90 },
  { name: 'May', demand: 78, deliveries: 95, inventory: 95 },
  { name: 'Jun', demand: 90, deliveries: 92, inventory: 88 }
];

const materialData = [
  { name: 'Concrete', value: 35, color: '#3B82F6' },
  { name: 'Steel', value: 25, color: '#8B5CF6' },
  { name: 'Lumber', value: 20, color: '#10B981' },
  { name: 'Pipes', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 8, color: '#EF4444' }
];

const deliveryData = [
  { day: 'Mon', completed: 24, scheduled: 28 },
  { day: 'Tue', completed: 32, scheduled: 35 },
  { day: 'Wed', completed: 28, scheduled: 30 },
  { day: 'Thu', completed: 35, scheduled: 38 },
  { day: 'Fri', completed: 30, scheduled: 32 },
  { day: 'Sat', completed: 18, scheduled: 20 },
  { day: 'Sun', completed: 12, scheduled: 15 }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Demand Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450 tons</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Lead Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.8 days</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Level</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">-5%</span> from target
            </p>
            <Progress value={89} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disruptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Weather delays affecting 2 routes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="demand" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="deliveries" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="inventory" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Material Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {materialData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Delivery Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="scheduled" fill="#E5E7EB" name="Scheduled" />
              <Bar dataKey="completed" fill="#3B82F6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Weather Delay - Route 45</p>
                  <p className="text-sm text-muted-foreground">Heavy snow affecting concrete deliveries</p>
                </div>
              </div>
              <Badge variant="destructive">High</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Low Stock Alert - Steel Rebar</p>
                  <p className="text-sm text-muted-foreground">Current level: 15% (Reorder threshold: 20%)</p>
                </div>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Delivery Completed</p>
                  <p className="text-sm text-muted-foreground">Site B - 50 tons concrete delivered on time</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">Success</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}