"use client"

import { useState } from "react"
import {
  FileText,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Home,
  Menu,
  XCircle,
  LogOut,
  User,
  ArrowLeft,
  Download,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  Building,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "./auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const sidebarItems = [
  { icon: FileText, label: "Eligibility", active: true, href: "/eligibility" },
  { icon: ClipboardList, label: "Pre-authorization", active: false, href: "/pre-authorization" },
  { icon: Users, label: "Claims coding Queue", active: false, href: "/claims-coding" },
  { icon: BarChart3, label: "Claims QC", active: false, href: "/claims-qc" },
  { icon: Settings, label: "Denial Management", active: false, href: "/denial-management" },
  { icon: Home, label: "Dashboard", active: false, href: "/dashboard" },
  { icon: BarChart3, label: "Payment allocation", active: false, href: "/payment-allocation" },
  { icon: FileText, label: "Reports", active: false, href: "/reports" },
]

// Mock data for the eligibility detail
const eligibilityDetail = {
  civilId: "7104335",
  name: "Ahmed Al-Rashid",
  dateOfBirth: "15/03/1985",
  gender: "Male",
  nationality: "Omani",
  phone: "+968 9123 4567",
  email: "ahmed.rashid@email.com",
  address: "Al Khuwair, Muscat, Oman",
  insurance: "Mednet",
  policyNumber: "MED-2024-001234",
  category: "Omani with insurance",
  status: "New visit",
  visitDate: "11.05.2025",
  specialty: "Internal medicine",
  physician: "Dr. Fatma Al-Zahra",
  visitType: "Inpatient",
  facility: "Royal Hospital Muscat",
  facilityId: "223344",
  eligibilityStatus: "Pending",
  eligibilityHistory: [
    {
      date: "11.05.2025 09:30",
      action: "Eligibility Check Initiated",
      status: "Pending",
      user: "System",
      notes: "Automatic eligibility verification started",
    },
    {
      date: "11.05.2025 09:15",
      action: "Patient Registration",
      status: "Completed",
      user: "Reception Staff",
      notes: "Patient registered for internal medicine consultation",
    },
  ],
  coverageDetails: {
    annualLimit: "50,000 OMR",
    usedAmount: "12,500 OMR",
    remainingAmount: "37,500 OMR",
    deductible: "500 OMR",
    coPayment: "10%",
    coverageType: "Comprehensive",
  },
}

interface EligibilityDetailScreenProps {
  civilId: string
}

export default function EligibilityDetailScreen({ civilId }: EligibilityDetailScreenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Eligible":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Not Eligible":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "Completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "Eligible":
        return <CheckCircle className="w-4 h-4" />
      case "Not Eligible":
        return <AlertCircle className="w-4 h-4" />
      case "Completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/moh-english-logo.png"
                  alt="Ministry of Health Oman"
                  width={120}
                  height={48}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 px-4 lg:px-6 pb-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-10 px-3 text-sm ${
                    item.active ? "bg-blue-50 text-blue-700 hover:bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 lg:px-6 pb-6">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1 truncate">
                  Eligibility Details - {eligibilityDetail.name}
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">Civil ID: {eligibilityDetail.civilId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <span className="hidden sm:block text-sm lg:text-lg font-medium text-gray-900 truncate">
                Royal Hospital Muscat
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-8 h-8 rounded-full bg-blue-600 p-0 text-white hover:bg-blue-700">
                    KA
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      KA
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Status and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(eligibilityDetail.eligibilityStatus)}
                <Badge variant="outline" className={getStatusBadgeStyle(eligibilityDetail.eligibilityStatus)}>
                  {eligibilityDetail.eligibilityStatus}
                </Badge>
                <span className="text-sm text-gray-500">Last updated: 11.05.2025 09:30</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  Verify Eligibility
                </Button>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="coverage">Coverage</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Patient Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Full Name:</span>
                          <p className="font-medium">{eligibilityDetail.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Civil ID:</span>
                          <p className="font-medium">{eligibilityDetail.civilId}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date of Birth:</span>
                          <p className="font-medium">{eligibilityDetail.dateOfBirth}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Gender:</span>
                          <p className="font-medium">{eligibilityDetail.gender}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Nationality:</span>
                          <p className="font-medium">{eligibilityDetail.nationality}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <p className="font-medium">{eligibilityDetail.category}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Phone className="w-3 h-3" />
                          {eligibilityDetail.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Mail className="w-3 h-3" />
                          {eligibilityDetail.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {eligibilityDetail.address}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Insurance Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Insurance Provider:</span>
                          <p className="font-medium">{eligibilityDetail.insurance}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Policy Number:</span>
                          <p className="font-medium">{eligibilityDetail.policyNumber}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Coverage Type:</span>
                          <p className="font-medium">{eligibilityDetail.coverageDetails.coverageType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Annual Limit:</span>
                          <p className="font-medium">{eligibilityDetail.coverageDetails.annualLimit}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Deductible:</span>
                          <p className="font-medium">{eligibilityDetail.coverageDetails.deductible}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Co-Payment:</span>
                          <p className="font-medium">{eligibilityDetail.coverageDetails.coPayment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visit Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Visit Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Visit Date:</span>
                          <p className="font-medium">{eligibilityDetail.visitDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Visit Type:</span>
                          <p className="font-medium">{eligibilityDetail.visitType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Specialty:</span>
                          <p className="font-medium">{eligibilityDetail.specialty}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Physician:</span>
                          <p className="font-medium">{eligibilityDetail.physician}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p className="font-medium">{eligibilityDetail.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Facility Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Facility Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">Facility Name:</span>
                          <p className="font-medium">{eligibilityDetail.facility}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Facility ID:</span>
                          <p className="font-medium">{eligibilityDetail.facilityId}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="coverage" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Coverage Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-700 mb-1">
                          {eligibilityDetail.coverageDetails.annualLimit}
                        </div>
                        <div className="text-sm text-blue-600">Annual Limit</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-700 mb-1">
                          {eligibilityDetail.coverageDetails.usedAmount}
                        </div>
                        <div className="text-sm text-green-600">Used Amount</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="text-2xl font-bold text-orange-700 mb-1">
                          {eligibilityDetail.coverageDetails.remainingAmount}
                        </div>
                        <div className="text-sm text-orange-600">Remaining Amount</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Eligibility History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eligibilityDetail.eligibilityHistory.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.action}</h4>
                              <Badge variant="outline" className={getStatusBadgeStyle(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{item.notes}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{item.date}</span>
                              <span>by {item.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Related Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No documents available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
