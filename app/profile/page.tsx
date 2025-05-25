"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Calendar,
  TrendingUp,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart,
} from "recharts"

// Mock data for analytics
const calculatorHistory = [
  { date: "2024-01", totalCost: 125000, penalties: 15000, losses: 110000 },
  { date: "2024-02", totalCost: 118000, penalties: 12000, losses: 106000 },
  { date: "2024-03", totalCost: 95000, penalties: 8000, losses: 87000 },
  { date: "2024-04", totalCost: 89000, penalties: 5000, losses: 84000 },
  { date: "2024-05", totalCost: 76000, penalties: 3000, losses: 73000 },
]

const advisoryHistory = [
  { month: "Jan", tddCompliance: 85, recommendations: 3 },
  { month: "Feb", tddCompliance: 88, recommendations: 2 },
  { month: "Mar", tddCompliance: 92, recommendations: 2 },
  { month: "Apr", tddCompliance: 95, recommendations: 1 },
  { month: "May", tddCompliance: 98, recommendations: 1 },
]

const smartMeterData = [
  { time: "00:00", voltage: 415, current: 245, powerFactor: 0.92, thd: 4.2 },
  { time: "04:00", voltage: 418, current: 280, powerFactor: 0.89, thd: 5.1 },
  { time: "08:00", voltage: 412, current: 420, powerFactor: 0.85, thd: 7.8 },
  { time: "12:00", voltage: 410, current: 450, powerFactor: 0.83, thd: 8.9 },
  { time: "16:00", voltage: 414, current: 380, powerFactor: 0.87, thd: 6.5 },
  { time: "20:00", voltage: 416, current: 320, powerFactor: 0.9, thd: 5.2 },
]

const energyConsumption = [
  { month: "Jan", consumption: 45000, cost: 382500 },
  { month: "Feb", consumption: 42000, cost: 357000 },
  { month: "Mar", consumption: 48000, cost: 408000 },
  { month: "Apr", consumption: 46000, cost: 391000 },
  { month: "May", consumption: 44000, cost: 374000 },
]

const harmonicDistribution = [
  { name: "3rd Harmonic", value: 35, color: "#8884d8" },
  { name: "5th Harmonic", value: 25, color: "#82ca9d" },
  { name: "7th Harmonic", value: 20, color: "#ffc658" },
  { name: "11th Harmonic", value: 12, color: "#ff7300" },
  { name: "Others", value: 8, color: "#00ff00" },
]

export default function ProfilePage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <img
                  src={user.imageUrl || "/placeholder.svg"}
                  alt={user.fullName || "User"}
                  className="w-24 h-24 rounded-full border-4 border-primary/20"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold">{user.fullName || "User"}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user?.createdAt!.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Power Quality Engineer</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Premium User</Badge>
                  <Badge variant="outline">IEEE 519 Certified</Badge>
                  <Badge variant="outline">Industrial Systems</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="smart-meters">Smart Meters</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹49,000</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">TDD Compliance</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">Within IEEE 519 limits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 high, 1 medium priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
                <Activity className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% improvement</p>
              </CardContent>
            </Card>
          </div>

     
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Calculator Trends</CardTitle>
                <CardDescription>Monthly cost analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={calculatorHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                    <Line type="monotone" dataKey="totalCost" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="penalties" stroke="#ff7300" strokeWidth={2} />
                    <Line type="monotone" dataKey="losses" stroke="#82ca9d" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TDD Compliance Progress</CardTitle>
                <CardDescription>Advisory results over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={advisoryHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="tddCompliance" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Analysis</CardTitle>
              <CardDescription>Monthly energy usage and costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsBarChart data={energyConsumption}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="consumption" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="cost" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Meters Tab */}
        <TabsContent value="smart-meters" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Voltage</CardTitle>
                <Zap className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">414V</div>
                <p className="text-xs text-muted-foreground">±2% variation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Load Current</CardTitle>
                <Activity className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">380A</div>
                <p className="text-xs text-muted-foreground">85% of rated capacity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Power Factor</CardTitle>
                <TrendingUp className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.87</div>
                <p className="text-xs text-muted-foreground">Lagging</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">THD Current</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.5%</div>
                <p className="text-xs text-muted-foreground">Above 5% threshold</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Power Quality</CardTitle>
                <CardDescription>24-hour monitoring data</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={smartMeterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="voltage" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="current" stroke="#82ca9d" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Harmonic Distribution</CardTitle>
                <CardDescription>Current harmonic content breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <RechartsPieChart
                      data={harmonicDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    //   fill="#8884d8"
                      dataKey="value"
                    >
                      {harmonicDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Power Factor & THD Trends</CardTitle>
              <CardDescription>Daily power quality metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={smartMeterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="powerFactor" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="thd" stroke="#ff7300" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
                <CardDescription>Comprehensive monthly analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Period:</span>
                  <span className="text-sm text-muted-foreground">May 2024</span>
                </div>
                <Button className="w-full" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Report</CardTitle>
                <CardDescription>IEEE 519 compliance analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="outline">Generating</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ETA:</span>
                  <span className="text-sm text-muted-foreground">5 minutes</span>
                </div>
                <Button className="w-full" size="sm" disabled>
                  <Clock className="mr-2 h-4 w-4" />
                  Processing...
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Analysis</CardTitle>
                <CardDescription>Detailed financial impact report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Savings:</span>
                  <span className="text-sm text-green-600">₹49,000</span>
                </div>
                <Button className="w-full" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Excel
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">April 2024 Monthly Report</h4>
                    <p className="text-sm text-muted-foreground">Generated on May 1, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Q1 2024 Compliance Report</h4>
                    <p className="text-sm text-muted-foreground">Generated on April 1, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">March 2024 Cost Analysis</h4>
                    <p className="text-sm text-muted-foreground">Generated on April 1, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
