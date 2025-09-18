import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Truck, Clock, Route, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';

const deliveryRoutes = [
  {
    id: 'R001',
    destination: 'Site Alpha - Downtown',
    material: 'Concrete Mix',
    quantity: '25 tons',
    status: 'In Transit',
    estimatedTime: '2h 15m',
    driver: 'John Smith',
    truck: 'TRK-001',
    delay: null,
    progress: 65
  },
  {
    id: 'R002',
    destination: 'Site Beta - Industrial',
    material: 'Steel Beams',
    quantity: '15 tons',
    status: 'Scheduled',
    estimatedTime: '4h 30m',
    driver: 'Mike Johnson',
    truck: 'TRK-002',
    delay: null,
    progress: 0
  },
  {
    id: 'R003',
    destination: 'Site Gamma - Residential',
    material: 'Lumber Package',
    quantity: '200 m³',
    status: 'Delayed',
    estimatedTime: '6h 45m',
    driver: 'Sarah Davis',
    truck: 'TRK-003',
    delay: '45 min - Traffic',
    progress: 30
  },
  {
    id: 'R004',
    destination: 'Site Delta - Commercial',
    material: 'Pipes & Fittings',
    quantity: '500 units',
    status: 'Completed',
    estimatedTime: 'Delivered',
    driver: 'Tom Wilson',
    truck: 'TRK-004',
    delay: null,
    progress: 100
  }
];

const scheduledDeliveries = [
  { time: '08:00', site: 'Site Alpha', material: 'Concrete', truck: 'TRK-005', status: 'confirmed' },
  { time: '10:30', site: 'Site Beta', material: 'Steel Rebar', truck: 'TRK-006', status: 'confirmed' },
  { time: '13:00', site: 'Site Gamma', material: 'Insulation', truck: 'TRK-007', status: 'pending' },
  { time: '15:45', site: 'Site Delta', material: 'Roofing', truck: 'TRK-008', status: 'pending' },
  { time: '17:00', site: 'Site Echo', material: 'Electrical', truck: 'TRK-009', status: 'rescheduled' }
];

const performanceMetrics = [
  { metric: 'On-Time Delivery Rate', value: '87%', trend: '+5%', color: 'text-green-600' },
  { metric: 'Average Lead Time', value: '4.2 days', trend: '-0.8 days', color: 'text-green-600' },
  { metric: 'Route Efficiency', value: '92%', trend: '+3%', color: 'text-green-600' },
  { metric: 'Fuel Consumption', value: '145L/day', trend: '-12L', color: 'text-green-600' }
];

export function DeliveryOptimization() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-500';
      case 'Scheduled': return 'bg-gray-500';
      case 'Delayed': return 'bg-red-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'rescheduled': return <Badge className="bg-red-100 text-red-800 border-red-200">Rescheduled</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.metric}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className={`text-sm ${metric.color}`}>{metric.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map View and Real-time Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Delivery Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1665521032636-e8d2f6927053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwbG9naXN0aWNzfGVufDF8fHx8MTc1ODE0NDg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Delivery logistics map"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-blue-900/20 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm">4 Active Routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">2 Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">1 Delayed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Route className="h-4 w-4 mr-2" />
                Optimize All Routes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Delivery Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledDeliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                      {delivery.time}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{delivery.site}</p>
                      <p className="text-xs text-muted-foreground">
                        {delivery.material} - {delivery.truck}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(delivery.status)}
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Reschedule Deliveries
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Delivery Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Active Delivery Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveryRoutes.map((route) => (
              <div key={route.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(route.status)}`}></div>
                    <div>
                      <h4 className="font-medium">{route.destination}</h4>
                      <p className="text-sm text-muted-foreground">
                        {route.material} - {route.quantity}
                      </p>
                    </div>
                  </div>
                  <Badge variant={route.status === 'Delayed' ? 'destructive' : route.status === 'Completed' ? 'default' : 'secondary'}>
                    {route.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span>{route.truck} - {route.driver}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{route.estimatedTime}</span>
                  </div>
                  {route.delay && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{route.delay}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{route.progress}%</span>
                  </div>
                  <Progress value={route.progress} />
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Track Route</Button>
                  <Button size="sm" variant="outline">Contact Driver</Button>
                  {route.status === 'Delayed' && (
                    <Button size="sm" variant="destructive">Find Alternative</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Time Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Time Predictions by Material</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { material: 'Concrete', predicted: '3.2 days', historical: '3.8 days', confidence: '94%' },
              { material: 'Steel Rebar', predicted: '5.1 days', historical: '5.5 days', confidence: '89%' },
              { material: 'Lumber', predicted: '2.8 days', historical: '3.2 days', confidence: '91%' },
              { material: 'PVC Pipes', predicted: '4.5 days', historical: '4.8 days', confidence: '87%' },
              { material: 'Insulation', predicted: '6.2 days', historical: '6.8 days', confidence: '85%' },
              { material: 'Roofing Materials', predicted: '7.1 days', historical: '7.9 days', confidence: '82%' }
            ].map((item) => (
              <div key={item.material} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{item.material}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Predicted:</span>
                    <span className="font-medium text-green-600">{item.predicted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Historical:</span>
                    <span>{item.historical}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{item.confidence}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}