import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CloudSnow, Zap, Users, Truck, MapPin, AlertTriangle, Calendar, Clock, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const activeDisruptions = [
  {
    id: 'D001',
    type: 'Weather',
    title: 'Heavy Snow Storm',
    description: 'Severe weather conditions affecting multiple delivery routes in the northeast region',
    severity: 'High',
    affectedRoutes: ['Route 12', 'Route 15', 'Route 18'],
    estimatedDelay: '4-6 hours',
    startTime: '2024-01-18 06:00',
    expectedResolution: '2024-01-18 18:00',
    mitigation: 'Alternative routes activated, 3 deliveries rescheduled',
    icon: CloudSnow,
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'D002',
    type: 'Strike',
    title: 'Port Workers Strike',
    description: 'Labor strike at main shipping port affecting steel and cement imports',
    severity: 'Critical',
    affectedRoutes: ['Import Route A', 'Import Route B'],
    estimatedDelay: '2-3 days',
    startTime: '2024-01-17 00:00',
    expectedResolution: '2024-01-20 23:59',
    mitigation: 'Backup suppliers contacted, emergency stock allocation',
    icon: Users,
    color: 'text-red-600 bg-red-50 border-red-200'
  },
  {
    id: 'D003',
    type: 'Transportation',
    title: 'Highway Closure',
    description: 'Major highway closure due to bridge maintenance affecting primary transport route',
    severity: 'Medium',
    affectedRoutes: ['Route 7', 'Route 9'],
    estimatedDelay: '1-2 hours',
    startTime: '2024-01-18 09:00',
    expectedResolution: '2024-01-19 17:00',
    mitigation: 'Traffic rerouted through secondary highways',
    icon: Truck,
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
  }
];

const riskAssessment = [
  { region: 'Northeast', weather: 85, political: 20, transport: 45, overall: 'High' },
  { region: 'Southeast', weather: 30, political: 15, transport: 25, overall: 'Low' },
  { region: 'Midwest', weather: 60, political: 35, transport: 55, overall: 'Medium' },
  { region: 'West Coast', weather: 40, political: 60, transport: 40, overall: 'Medium' },
  { region: 'Southwest', weather: 20, political: 25, transport: 30, overall: 'Low' }
];

const historicalDisruptions = [
  { month: 'Jul', weather: 5, strikes: 1, transport: 3, other: 2 },
  { month: 'Aug', weather: 8, strikes: 0, transport: 4, other: 1 },
  { month: 'Sep', weather: 12, strikes: 2, transport: 2, other: 3 },
  { month: 'Oct', weather: 15, strikes: 1, transport: 5, other: 2 },
  { month: 'Nov', weather: 20, strikes: 3, transport: 3, other: 4 },
  { month: 'Dec', weather: 25, strikes: 1, transport: 6, other: 2 },
  { month: 'Jan', weather: 18, strikes: 2, transport: 4, other: 1 }
];

const mitigationActions = [
  {
    disruption: 'Heavy Snow Storm',
    actions: [
      'Activate backup Route 22 and Route 25',
      'Deploy snow plows on affected roads',
      'Reschedule 3 non-critical deliveries to tomorrow',
      'Contact affected customers with updates'
    ]
  },
  {
    disruption: 'Port Workers Strike',
    actions: [
      'Source materials from alternative suppliers',
      'Use emergency stock reserves',
      'Negotiate expedited shipping once strike ends',
      'Monitor strike negotiations for updates'
    ]
  }
];

export function DisruptionManagement() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Disruptions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Disruptions</p>
                <p className="text-2xl font-bold text-red-600">{activeDisruptions.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Affected Routes</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                <p className="text-2xl font-bold">12.5h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold text-red-600">High</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Disruption Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Disruptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDisruptions.map((disruption) => {
              const IconComponent = disruption.icon;
              return (
                <div key={disruption.id} className={`border rounded-lg p-4 ${disruption.color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6" />
                      <div>
                        <h4 className="font-medium">{disruption.title}</h4>
                        <p className="text-sm text-muted-foreground">{disruption.description}</p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(disruption.severity)} variant="outline">
                      {disruption.severity}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Affected Routes</p>
                      <p className="text-sm text-muted-foreground">
                        {disruption.affectedRoutes.join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Estimated Delay</p>
                      <p className="text-sm text-muted-foreground">{disruption.estimatedDelay}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expected Resolution</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(disruption.expectedResolution).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Mitigation Actions</p>
                    <p className="text-sm text-muted-foreground">{disruption.mitigation}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Update Status</Button>
                    <Button size="sm">Resolve</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1723367194881-fe2e53534170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYWVyaWFsfGVufDF8fHx8MTc1ODEyOTg3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Regional risk map"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">High Risk Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium Risk Zones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low Risk Zones</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {riskAssessment.map((region) => (
                <div key={region.region} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{region.region}</p>
                    <p className="text-sm text-muted-foreground">
                      Weather: {region.weather}% | Political: {region.political}% | Transport: {region.transport}%
                    </p>
                  </div>
                  <Badge className={getRiskColor(region.overall)}>
                    {region.overall} Risk
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mitigation Action Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mitigationActions.map((plan, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-3">{plan.disruption}</h4>
                  <div className="space-y-2">
                    {plan.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Execute All Mitigations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Historical Disruption Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Disruption Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalDisruptions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="weather" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="strikes" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              <Area type="monotone" dataKey="transport" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Area type="monotone" dataKey="other" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Weather</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Strikes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Transport</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Other</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Response Center */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Response Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-red-600">Immediate Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Declare Emergency
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Notify All Stakeholders
                </Button>
                <Button variant="outline" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Reroute All Deliveries
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-yellow-600">Preventive Measures</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Review Weather Forecast
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Monitor Traffic Conditions
                </Button>
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Check Emergency Supplies
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Communication</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Send Customer Updates
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Suppliers
                </Button>
                <Button variant="outline" className="w-full">
                  Update Project Managers
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}