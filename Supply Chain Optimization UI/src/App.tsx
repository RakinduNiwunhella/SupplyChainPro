import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Dashboard } from './components/Dashboard';
import { MaterialForecasting } from './components/MaterialForecasting';
import { DeliveryOptimization } from './components/DeliveryOptimization';
import { InventoryManagement } from './components/InventoryManagement';
import { DisruptionManagement } from './components/DisruptionManagement';
import { SupplierManagement } from './components/SupplierManagement';
import { 
  LayoutDashboard, 
  Package2, 
  Truck, 
  Package, 
  AlertTriangle, 
  Users, 
  Search, 
  Bell, 
  Settings, 
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'forecasting', label: 'Material Forecasting', icon: Package2 },
    { id: 'delivery', label: 'Delivery Optimization', icon: Truck },
    { id: 'inventory', label: 'Inventory Management', icon: Package },
    { id: 'disruptions', label: 'Disruption Management', icon: AlertTriangle },
    { id: 'suppliers', label: 'Supplier Management', icon: Users },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SupplyChain Pro</h1>
                <p className="text-sm text-gray-500">Construction Supply Chain Optimization</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search materials, suppliers, orders..." 
                className="pl-10 w-80"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white">
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 pt-20 lg:pt-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Project Info Card */}
            <Card className="mt-8 p-4">
              <div className="space-y-3">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1706027554815-ae587412dbef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjB3YXJlaG91c2V8ZW58MXx8fHwxNzU4MTc5MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Construction warehouse"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Downtown Tower Project</h3>
                  <p className="text-sm text-gray-500">Phase 2: Foundation</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 pt-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600">
                {activeTab === 'dashboard' && 'Real-time overview of your supply chain performance and key metrics'}
                {activeTab === 'forecasting' && 'AI-powered material demand predictions and project timeline forecasting'}
                {activeTab === 'delivery' && 'Optimize delivery routes, track shipments, and manage lead times'}
                {activeTab === 'inventory' && 'Monitor stock levels, manage reorders, and track inventory trends'}
                {activeTab === 'disruptions' && 'Monitor and respond to supply chain disruptions and risks'}
                {activeTab === 'suppliers' && 'Manage supplier relationships, performance, and ratings'}
              </p>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'forecasting' && <MaterialForecasting />}
              {activeTab === 'delivery' && <DeliveryOptimization />}
              {activeTab === 'inventory' && <InventoryManagement />}
              {activeTab === 'disruptions' && <DisruptionManagement />}
              {activeTab === 'suppliers' && <SupplierManagement />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}