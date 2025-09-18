import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Package2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const forecastData = [
  { month: 'Week 1', concrete: 450, steel: 320, lumber: 180, pipes: 90 },
  { month: 'Week 2', concrete: 380, steel: 290, lumber: 220, pipes: 110 },
  { month: 'Week 3', concrete: 520, steel: 380, lumber: 160, pipes: 85 },
  { month: 'Week 4', concrete: 610, steel: 420, lumber: 240, pipes: 130 },
  { month: 'Week 5', concrete: 480, steel: 350, lumber: 200, pipes: 95 },
  { month: 'Week 6', concrete: 590, steel: 440, lumber: 280, pipes: 140 },
  { month: 'Week 7', concrete: 520, steel: 380, lumber: 190, pipes: 100 },
  { month: 'Week 8', concrete: 650, steel: 480, lumber: 260, pipes: 150 }
];

const consumptionTrends = [
  { date: 'Jan', concrete: 2400, steel: 1800, lumber: 1200 },
  { date: 'Feb', concrete: 2200, steel: 1600, lumber: 1400 },
  { date: 'Mar', concrete: 2800, steel: 2000, lumber: 1100 },
  { date: 'Apr', concrete: 3200, steel: 2400, lumber: 1600 },
  { date: 'May', concrete: 2900, steel: 2100, lumber: 1300 },
  { date: 'Jun', concrete: 3400, steel: 2600, lumber: 1800 }
];

const materialRequirements = [
  { material: 'Concrete', current: 1250, forecast: 1650, unit: 'tons', priority: 'High', change: '+32%' },
  { material: 'Steel Rebar', current: 850, forecast: 1200, unit: 'tons', priority: 'High', change: '+41%' },
  { material: 'Lumber', current: 650, forecast: 750, unit: 'm³', priority: 'Medium', change: '+15%' },
  { material: 'PVC Pipes', current: 320, forecast: 420, unit: 'units', priority: 'Medium', change: '+31%' },
  { material: 'Cement Bags', current: 2400, forecast: 3100, unit: 'bags', priority: 'Low', change: '+29%' },
  { material: 'Insulation', current: 180, forecast: 200, unit: 'm²', priority: 'Low', change: '+11%' }
];

export function MaterialForecasting() {
  const [timeRange, setTimeRange] = useState([4]);
  const [selectedPhase, setSelectedPhase] = useState('Foundation');

  const phases = ['Foundation', 'Framing', 'Roofing', 'Interior', 'Finishing'];

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline & Phase Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Forecast Timeline (Weeks)</label>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={12}
                min={1}
                step={1}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Showing forecast for next {timeRange[0]} weeks
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Project Phase</label>
              <div className="flex gap-2 flex-wrap">
                {phases.map((phase) => (
                  <Button
                    key={phase}
                    variant={selectedPhase === phase ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPhase(phase)}
                  >
                    {phase}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Material Demand Forecast - {selectedPhase} Phase</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData.slice(0, timeRange[0])}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="concrete" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="steel" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="lumber" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="pipes" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Concrete (tons)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm">Steel (tons)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Lumber (m³)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Pipes (units)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Requirements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Material Requirements Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {materialRequirements.map((item) => (
              <div key={item.material} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Package2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{item.material}</h4>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.current} {item.unit} → Forecast: {item.forecast} {item.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="font-medium">{item.change}</span>
                    </div>
                  </div>
                  <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'secondary' : 'outline'}>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Consumption Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Consumption Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consumptionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="concrete" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="steel" stroke="#8B5CF6" strokeWidth={3} />
              <Line type="monotone" dataKey="lumber" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}