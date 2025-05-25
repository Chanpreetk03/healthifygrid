


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, HelpCircle, Info } from "lucide-react"
import jsPDF from "jspdf";

export default function IscIlAdvisory() {
  // Form state
  const [shortCircuitCurrent, setShortCircuitCurrent] = useState("")
  const [loadCurrent, setLoadCurrent] = useState("")
  const [voltageLevel, setVoltageLevel] = useState("")
  const [systemType, setSystemType] = useState("")
  const [userTdd, setUserTdd] = useState("")

  // Results state
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    iscIlRatio: number
    permissibleTdd: number
    currentTdd: number
    status: "safe" | "warning" | "danger"
    message: string
    recommendations: string[]
  }>({
    iscIlRatio: 0,
    permissibleTdd: 0,
    currentTdd: 0,
    status: "safe", // 'safe', 'warning', or 'danger'
    message: "",
    recommendations: [],
  })

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    const isc = Number.parseFloat(shortCircuitCurrent)
    const il = Number.parseFloat(loadCurrent)
    const currentTdd = Number.parseFloat(userTdd)       

    if (!isc || !il || isNaN(isc) || isNaN(il) || il === 0 || isNaN(currentTdd)) {
      setResults({
        iscIlRatio: 0,
        permissibleTdd: 0,
        currentTdd: 0,
        status: "danger",
        message: "Invalid input. Please enter valid nonzero values.",
        recommendations: [],
      })
      setShowResults(true)
      return
    }

    // Calculate Isc/Il ratio
    const ratio = isc / il

    // Determine permissible TDD based on IEEE 519 standards
    let permissibleTdd = 0
    if (ratio < 20) {
      permissibleTdd = 5
    } else if (ratio < 50) {
      permissibleTdd = 8
    } else if (ratio < 100) {
      permissibleTdd = 12
    } else if (ratio < 1000) {
      permissibleTdd = 15
    } else {
      permissibleTdd = 20
    }

    // Determine system status
    let status: "safe" | "warning" | "danger" = "safe"
    let message = ""
    let recommendations = []

    if (currentTdd > permissibleTdd) {
      status = "danger"
      message = "Your system exceeds permissible TDD limits. Immediate action is recommended."
      recommendations = ["Install harmonic filters", "Upgrade converters", "Consult a power expert"]
    } else if (currentTdd > permissibleTdd * 0.8) {
      status = "warning"
      message = "Your system is approaching permissible TDD limits. Preventive measures are recommended."
      recommendations = ["Monitor harmonics regularly", "Plan for mitigation"]
    } else {
      status = "safe"
      message = "Your system is within safe TDD limits."
      recommendations = ["Regular monitoring"]
    }

    setResults({ iscIlRatio: ratio, permissibleTdd, currentTdd, status, message, recommendations })
    setShowResults(true)
  }

  const handleReset = () => {
    setShortCircuitCurrent("")
    setLoadCurrent("")
    setVoltageLevel("")
    setSystemType("")
    setUserTdd("")
    setShowResults(false)
  }


  const generateReport = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("TDD Compliance Advisory Report", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Isc/Il Ratio: ${results.iscIlRatio.toFixed(2)}`, 20, 40);
    doc.text(`Permissible TDD: ${results.permissibleTdd}%`, 20, 50);
    doc.text(`Current Estimated TDD: ${results.currentTdd.toFixed(1)}%`, 20, 60);
    doc.text(`Status: ${results.status}`, 20, 70);
    doc.text(`Message: ${results.message}`, 20, 80);
  
    doc.text("Recommendations:", 20, 100);
    results.recommendations.forEach((rec, index) => {
      doc.text(`- ${rec}`, 20, 110 + index * 10);
    });
  
    doc.save("TDD_Compliance_Advisory_Report.pdf");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Isc/Il Advisory Platform</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Get advice on permissible TDD limits based on your system&apos;s short circuit current to load current ratio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>System Parameters</CardTitle>
            <CardDescription>Enter your system details to calculate permissible TDD limits</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="short-circuit-current">
                  Short Circuit Current (Isc) in Amperes
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-4 w-4 rounded-full"
                    type="button"
                    onClick={() =>
                      alert(
                        "The maximum current that can flow during a short circuit at the point of common coupling (PCC).",
                      )
                    }
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </Label>
                <Input
                  id="short-circuit-current"
                  type="number"
                  placeholder="e.g. 10000"
                  value={shortCircuitCurrent}
                  onChange={(e) => setShortCircuitCurrent(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="load-current">
                  Maximum Load Current (Il) in Amperes
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-4 w-4 rounded-full"
                    type="button"
                    onClick={() => alert("The maximum demand load current at the point of common coupling (PCC).")}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </Label>
                <Input
                  id="load-current"
                  type="number"
                  placeholder="e.g. 500"
                  value={loadCurrent}
                  onChange={(e) => setLoadCurrent(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voltage-level">Voltage Level</Label>
                <Select value={voltageLevel} onValueChange={setVoltageLevel} required>
                  <SelectTrigger id="voltage-level">
                    <SelectValue placeholder="Select voltage level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lv">Low Voltage (&lt; 1 kV)</SelectItem>
                    <SelectItem value="mv">Medium Voltage (1-69 kV)</SelectItem>
                    <SelectItem value="hv">High Voltage (69-161 kV)</SelectItem>
                    <SelectItem value="ehv">Extra High Voltage (&gt; 161 kV)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-type">System Type</Label>
                <Select value={systemType} onValueChange={setSystemType} required>
                  <SelectTrigger id="system-type">
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Distribution System</SelectItem>
                    <SelectItem value="dedicated">Dedicated System</SelectItem>
                    <SelectItem value="special">Special Applications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-tdd">
                  Current TDD (%)
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-4 w-4 rounded-full"
                    type="button"
                    onClick={() => alert("Enter your measured Total Demand Distortion (TDD) value in percentage.")}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </Label>
                <Input
                  id="current-tdd"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 6.5"
                  value={userTdd}
                  onChange={(e) => setUserTdd(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Calculate
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {showResults ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Advisory Results</CardTitle>
                {results.status === "safe" ? (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Safe
                  </div>
                ) : results.status === "warning" ? (
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Warning
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Action Needed
                  </div>
                )}
              </div>
              <CardDescription>Based on IEEE 519 standards and PSERC regulations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Isc/Il Ratio</div>
                  <div className="text-2xl font-bold">{results.iscIlRatio.toFixed(2)}</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Permissible TDD</div>
                  <div className="text-2xl font-bold">{results.permissibleTdd}%</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Current Estimated TDD</span>
                  <span
                    className={`font-bold ${
                      results.currentTdd > results.permissibleTdd
                        ? "text-destructive"
                        : results.currentTdd > results.permissibleTdd * 0.8
                          ? "text-amber-500"
                          : "text-green-600"
                    }`}
                  >
                    {results.currentTdd.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      results.currentTdd > results.permissibleTdd
                        ? "bg-destructive"
                        : results.currentTdd > results.permissibleTdd * 0.8
                          ? "bg-amber-500"
                          : "bg-green-600"
                    }`}
                    style={{ width: `${Math.min(100, (results.currentTdd / results.permissibleTdd) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  results.status === "safe"
                    ? "bg-green-50 border-green-200"
                    : results.status === "warning"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {results.status === "safe" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  ) : results.status === "warning" ? (
                    <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium mb-1">Advisory</h3>
                    <p className="text-sm">{results.message}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={generateReport}>Generate Detailed Report</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="flex flex-col justify-center items-center p-8">
            <div className="text-center space-y-4 max-w-md">
              <Info className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold">TDD Compliance Advisory</h3>
              <p className="text-muted-foreground">
                Enter your system parameters to check if you&apos;re within permissible TDD limits and get personalized
                recommendations.
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4 text-left">
                <h4 className="font-medium mb-2">What is TDD?</h4>
                <p className="text-sm text-muted-foreground">
                  Total Demand Distortion (TDD) is a measure of harmonic current distortion. It&apos;s similar to THD but is
                  expressed as a percentage of the maximum demand load current rather than the fundamental current.
                </p>
                <h4 className="font-medium mt-4 mb-2">Why is Isc/Il important?</h4>
                <p className="text-sm text-muted-foreground">
                  The ratio of short circuit current (Isc) to load current (Il) determines the permissible TDD limits
                  according to IEEE 519 standards. Higher ratios allow for higher TDD limits.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

