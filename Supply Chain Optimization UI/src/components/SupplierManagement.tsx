import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star, TrendingUp, TrendingDown, Phone, Mail, MapPin, Clock, Package, Award } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const suppliers = [
  {
    id: 'SUP001',
    name: 'ConcreteCorp',
    category: 'Concrete & Cement',
    rating: 4.8,
    reliability: 95,
    quality: 92,
    onTimeDelivery: 89,
    cost: 'Competitive',
    totalOrders: 156,
    lastDelivery: '2024-01-18',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    email: 'orders@concretecorp.com',
    location: 'Chicago, IL',
    performance: {
      reliability: 95,
      quality: 92,
      pricing: 88,
      communication: 90,
      delivery: 89,
      service: 93
    }
  },
  {
    id: 'SUP002',
    name: 'SteelWorks Inc',
    category: 'Steel & Metal',
    rating: 4.6,
    reliability: 88,
    quality: 96,
    onTimeDelivery: 92,
    cost: 'Premium',
    totalOrders: 89,
    lastDelivery: '2024-01-16',
    status: 'Active',
    phone: '+1 (555) 234-5678',
    email: 'sales@steelworks.com',
    location: 'Pittsburgh, PA',
    performance: {
      reliability: 88,
      quality: 96,
      pricing: 82,
      communication: 85,
      delivery: 92,
      service: 90
    }
  },
  {
    id: 'SUP003',
    name: 'TimberPlus',
    category: 'Lumber & Wood',
    rating: 4.3,
    reliability: 82,
    quality: 87,
    onTimeDelivery: 85,
    cost: 'Budget',
    totalOrders: 203,
    lastDelivery: '2024-01-17',
    status: 'Active',
    phone: '+1 (555) 345-6789',
    email: 'info@timberplus.com',
    location: 'Portland, OR',
    performance: {
      reliability: 82,
      quality: 87,
      pricing: 95,
      communication: 80,
      delivery: 85,
      service: 83
    }
  },
  {
    id: 'SUP004',
    name: 'PipeLine Ltd',
    category: 'Plumbing & Pipes',
    rating: 3.9,
    reliability: 75,
    quality: 83,
    onTimeDelivery: 78,
    cost: 'Budget',
    totalOrders: 67,
    lastDelivery: '2024-01-15',
    status: 'Under Review',
    phone: '+1 (555) 456-7890',
    email: 'support@pipeline.com',
    location: 'Houston, TX',
    performance: {
      reliability: 75,
      quality: 83,
      pricing: 92,
      communication: 70,
      delivery: 78,
      service: 76
    }
  },
  {
    id: 'SUP005',
    name: 'ElectricPro Supply',
    category: 'Electrical',
    rating: 4.7,
    reliability: 91,
    quality: 94,
    onTimeDelivery: 88,
    cost: 'Competitive',
    totalOrders: 124,
    lastDelivery: '2024-01-17',
    status: 'Active',
    phone: '+1 (555) 567-8901',
    email: 'orders@electricpro.com',
    location: 'Atlanta, GA',
    performance: {
      reliability: 91,
      quality: 94,
      pricing: 86,
      communication: 92,
      delivery: 88,
      service: 89
    }
  }
];

const performanceData = [
  { month: 'Jul', avgRating: 4.2, onTime: 85, quality: 88 },
  { month: 'Aug', avgRating: 4.3, onTime: 87, quality: 89 },
  { month: 'Sep', avgRating: 4.4, onTime: 88, quality: 90 },
  { month: 'Oct', avgRating: 4.5, onTime: 89, quality: 91 },
  { month: 'Nov', avgRating: 4.4, onTime: 87, quality: 89 },
  { month: 'Dec', avgRating: 4.6, onTime: 91, quality: 92 },
  { month: 'Jan', avgRating: 4.5, onTime: 88, quality: 91 }
];

const categoryPerformance = [
  { category: 'Concrete', suppliers: 3, avgRating: 4.5, avgDelivery: 89 },
  { category: 'Steel', suppliers: 2, avgRating: 4.6, avgDelivery: 92 },
  { category: 'Lumber', suppliers: 4, avgRating: 4.2, avgDelivery: 83 },
  { category: 'Electrical', suppliers: 3, avgRating: 4.7, avgDelivery: 88 },
  { category: 'Plumbing', suppliers: 2, avgRating: 3.9, avgDelivery: 78 }
];

export function SupplierManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50 border-green-200';
      case 'Under Review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Premium': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Competitive': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Budget': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Supplier Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">4.5</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                <p className="text-2xl font-bold">88%</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-2xl font-bold">91%</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Supplier Performance Tracker</span>
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Add New Supplier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {supplier.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{supplier.name}</h4>
                      <p className="text-sm text-muted-foreground">{supplier.category}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(supplier.rating)}
                        <span className="text-sm text-muted-foreground ml-1">({supplier.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                    <Badge className={getCostColor(supplier.cost)}>
                      {supplier.cost}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Reliability</p>
                    <div className="flex items-center gap-2">
                      <Progress value={supplier.reliability} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{supplier.reliability}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quality Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={supplier.quality} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{supplier.quality}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">On-Time Delivery</p>
                    <div className="flex items-center gap-2">
                      <Progress value={supplier.onTimeDelivery} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{supplier.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Orders</p>
                    <p className="text-lg font-semibold">{supplier.totalOrders}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Last delivery: {supplier.lastDelivery}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgRating" stroke="#3B82F6" strokeWidth={2} name="Avg Rating" />
                <Line type="monotone" dataKey="onTime" stroke="#10B981" strokeWidth={2} name="On-Time %" />
                <Line type="monotone" dataKey="quality" stroke="#8B5CF6" strokeWidth={2} name="Quality %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgRating" fill="#3B82F6" name="Avg Rating" />
                <Bar dataKey="avgDelivery" fill="#10B981" name="Delivery %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Performance Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Analysis - Top Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {suppliers.slice(0, 3).map((supplier) => (
              <div key={supplier.id} className="space-y-4">
                <div className="text-center">
                  <h4 className="font-medium">{supplier.name}</h4>
                  <p className="text-sm text-muted-foreground">{supplier.category}</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={[supplier.performance]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={60} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Performance"
                      dataKey="reliability"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Quality"
                      dataKey="quality"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Delivery"
                      dataKey="delivery"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Reliability: {supplier.performance.reliability}%</div>
                  <div>Quality: {supplier.performance.quality}%</div>
                  <div>Pricing: {supplier.performance.pricing}%</div>
                  <div>Communication: {supplier.performance.communication}%</div>
                  <div>Delivery: {supplier.performance.delivery}%</div>
                  <div>Service: {supplier.performance.service}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Suppliers Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Suppliers by Material</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { material: 'Concrete', best: 'ConcreteCorp', rating: 4.8, reason: 'Highest reliability and quality scores' },
              { material: 'Steel', best: 'SteelWorks Inc', rating: 4.6, reason: 'Superior quality and on-time delivery' },
              { material: 'Lumber', best: 'TimberPlus', rating: 4.3, reason: 'Best pricing with good quality' },
              { material: 'Electrical', best: 'ElectricPro Supply', rating: 4.7, reason: 'Excellent communication and service' },
              { material: 'Plumbing', best: 'Alternative needed', rating: 0, reason: 'Current supplier under review' },
              { material: 'Insulation', best: 'Sourcing new suppliers', rating: 0, reason: 'Category expansion needed' }
            ].map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{rec.material}</h4>
                {rec.rating > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-gold-500" />
                      <span className="font-medium text-sm">{rec.best}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(rec.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                    <Button size="sm" className="w-full mt-3">Select Supplier</Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-red-600 mb-2">{rec.best}</p>
                    <p className="text-xs text-muted-foreground mb-3">{rec.reason}</p>
                    <Button size="sm" variant="outline" className="w-full">Find Suppliers</Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}