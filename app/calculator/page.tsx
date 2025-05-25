"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calculator, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { jsPDF } from "jspdf"

export default function HarmonicCalculator() {
  // Form state
  const [transformerCapacity, setTransformerCapacity] = useState("")
  const [loadFactor, setLoadFactor] = useState("")
  const [thd, setThd] = useState("")
  const [operatingHours, setOperatingHours] = useState("")
  const [electricityRate, setElectricityRate] = useState("")

  // Results state
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({
    annualLosses: 0,
    penalties: 0,
    equipmentLifeReduction: 0,
    totalCost: 0,
    recommendedSolution: "",
    estimatedRoi: 0,
  })

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const capacity = Number.parseFloat(transformerCapacity) || 0;
    const load = Math.min(Number.parseFloat(loadFactor) / 100, 1); // Clamped at 100%
    const harmonics = Math.min(Number.parseFloat(thd) / 100, 1); // Clamped at 100%
    const hours = Math.min(Number.parseFloat(operatingHours), 8760); // Max 8760 hours
    const rate = Math.max(Number.parseFloat(electricityRate), 0.01); // Prevents zero rate

    if (capacity <= 0 || load <= 0 || hours <= 0 || rate < 0) {
      alert("Invalid input values. Ensure all inputs are positive numbers.");
      return;
    }

    // Improved harmonic loss calculation
    // const harmonicLossFactor = 0.4; // More realistic value
    // const annualLosses = capacity * load * (1 + harmonicLossFactor * harmonics ** 2) * hours * rate;

     //  IEEE Std 519 suggests harmonics increase losses in transformers primarily due to increased I²R losses in the windings and stray losses. The multiplier (0.15) reflects the additional burden caused by THD, though exact values depend on transformer design.
    const fundamentalLosses = capacity * load * hours * rate;
    const harmonicLosses = capacity * load * (harmonics ** 2) * 0.15 * hours * rate; // ~15% of harmonic current losses
    const annualLosses = fundamentalLosses + harmonicLosses;

   
    // Actual penalty schemes vary by country and utility, but using a per-kVA charge is a more realistic model
    const penaltyThreshold = 0.05;
    const penaltyRatePerKVA = 20; // Utility-defined rate per kVA over the limit 
    const excessHarmonics = harmonics > penaltyThreshold ? harmonics - penaltyThreshold : 0;
    const penalties = excessHarmonics > 0
        ? capacity * load * excessHarmonics * penaltyRatePerKVA
        : 0;
    

    // Improved equipment life reduction using exponential model
      
    //This approximates insulation aging using Arrhenius’ Law, where every 6–10°C rise cuts life in half.
    const tempRiseDueToHarmonics = 30 * harmonics; // 30°C extra at 100% THD
const lifeReduction = 1 - Math.exp(-tempRiseDueToHarmonics / 60); // Based on thermal acceleration
const equipmentLifeReduction = lifeReduction * 100;




    // Total cost
    const totalCost = annualLosses + penalties;

    // ROI & mitigation recommendation
    const passiveFilterCost = capacity * 100;
    const activeFilterCost = capacity * 250;

    // Determine recommended harmonic mitigation strategy and estimate ROI:
  // - No mitigation if THD ≤ 5% (typically acceptable per IEEE 519).
  // - Recommend passive filters for moderate distortion (5% < THD ≤ 10%).
  // - Recommend active filters for high distortion (THD > 10%).
  // - ROI is calculated as payback period in years (cost of filter / annual savings).

    let recommendedSolution = "";
    let estimatedRoiYears = 0;

    if (harmonics <= 0.05) {
        recommendedSolution = "No mitigation required";
    } else if (harmonics <= 0.1) {
        recommendedSolution = "Passive harmonic filters";
        estimatedRoiYears = passiveFilterCost / totalCost;
    } else {
        recommendedSolution = "Active harmonic filters";
        estimatedRoiYears = activeFilterCost / totalCost;
    }

    setResults({
      annualLosses: parseFloat(annualLosses.toFixed(2)),
      penalties: parseFloat(penalties.toFixed(2)),
      equipmentLifeReduction: parseFloat(equipmentLifeReduction.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      recommendedSolution,
      estimatedRoi: parseFloat(estimatedRoiYears.toFixed(2)),
    });

    setShowResults(true);
  };


  const handleReset = () => {
    setTransformerCapacity("")
    setLoadFactor("")
    setThd("")
    setOperatingHours("")
    setElectricityRate("")
    setShowResults(false)
  }

  const handleDownloadReport = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Harmonic Cost Analysis Report", 20, 20)

    doc.setFontSize(12)
    doc.text(`Transformer Capacity: ${transformerCapacity} kVA`, 20, 40)
    doc.text(`Average Load Factor: ${loadFactor}%`, 20, 50)
    doc.text(`Total Harmonic Distortion (THD): ${thd}%`, 20, 60)
    doc.text(`Annual Operating Hours: ${operatingHours}`, 20, 70)
    doc.text(`Electricity Rate: ₹${electricityRate}/kWh`, 20, 80)

    doc.text("Summary:", 20, 100)
    doc.text(`Annual Losses: ₹${results.annualLosses.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 110)
    doc.text(`Regulatory Penalties: ₹${results.penalties.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 120)
    doc.text(`Equipment Life Reduction: ${results.equipmentLifeReduction.toFixed(1)}%`, 20, 130)
    doc.text(`Total Annual Cost: ₹${results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 140)

    doc.addPage()
    doc.text("Detailed Analysis:", 20, 20)
    doc.text("Losses Breakdown:", 20, 30)
    doc.text(`Increased Copper Losses: ₹${(results.annualLosses * 0.4).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 40)
    doc.text(`Increased Iron Losses: ₹${(results.annualLosses * 0.3).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 50)
    doc.text(`Neutral Conductor Losses: ₹${(results.annualLosses * 0.2).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 60)
    doc.text(`Other System Losses: ₹${(results.annualLosses * 0.1).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 20, 70)

    doc.text("Penalty Calculation:", 20, 90)
    doc.text(results.penalties > 0 ? "Your system exceeds permissible harmonic limits" : "Your system is within permissible harmonic limits", 20, 100)

    doc.text("Equipment Impact:", 20, 120)
    doc.text(`Transformer Life Reduction: ${(results.equipmentLifeReduction * 1.2).toFixed(1)}%`, 20, 130)
    doc.text(`Motor Life Reduction: ${(results.equipmentLifeReduction * 0.9).toFixed(1)}%`, 20, 140)
    doc.text(`Capacitor Bank Life Reduction: ${(results.equipmentLifeReduction * 1.5).toFixed(1)}%`, 20, 150)

    doc.addPage()
    doc.text("Recommendations:", 20, 20)
    doc.text(`Recommended Solution: ${results.recommendedSolution}`, 20, 30)
    doc.text(`Estimated ROI: ${results.estimatedRoi.toFixed(1)} years`, 20, 40)

    doc.text("Implementation Benefits:", 20, 60)
    doc.text("Eliminate regulatory penalties", 20, 70)
    doc.text("Reduce energy losses by up to 85%", 20, 80)
    doc.text("Extend equipment lifespan", 20, 90)
    doc.text("Improve power quality and system reliability", 20, 100)

    doc.save("Harmonic_Cost_Analysis_Report.pdf")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Harmonic Cost Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Calculate the hidden costs of excessive harmonics and find the best mitigation solution with ROI analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Input Parameters
              </CardTitle>
              <CardDescription>Enter your system details to calculate harmonic costs</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transformer-capacity">Transformer Capacity (kVA)</Label>
                  <Input
                    id="transformer-capacity"
                    type="number"
                    placeholder="e.g. 1000"
                    value={transformerCapacity}
                    onChange={(e) => setTransformerCapacity(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="load-factor">Average Load Factor (%)</Label>
                  <Input
                    id="load-factor"
                    type="number"
                    placeholder="e.g. 75"
                    value={loadFactor}
                    onChange={(e) => setLoadFactor(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thd">Total Harmonic Distortion - THD (%)</Label>
                  <Input
                    id="thd"
                    type="number"
                    placeholder="e.g. 8.5"
                    value={thd}
                    onChange={(e) => setThd(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operating-hours">Annual Operating Hours</Label>
                  <Input
                    id="operating-hours"
                    type="number"
                    placeholder="e.g. 8760"
                    value={operatingHours}
                    onChange={(e) => setOperatingHours(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="electricity-rate">Electricity Rate (₹/kWh)</Label>
                  <Input
                    id="electricity-rate"
                    type="number"
                    step="0.01"
                    placeholder="e.g. 8.5"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(e.target.value)}
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
        </div>

        <div className="lg:col-span-2">
          {showResults ? (
            <Card>
              <CardHeader>
                <CardTitle>Calculation Results</CardTitle>
                <CardDescription>The financial impact of harmonics on your system</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Annual Losses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-primary">
                            ₹{results.annualLosses.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Regulatory Penalties</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-destructive">
                            ₹{results.penalties.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Equipment Life Reduction</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-amber-500">
                            {results.equipmentLifeReduction.toFixed(1)}%
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Total Annual Cost</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">
                            ₹{results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" onClick={handleDownloadReport}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Losses Breakdown</h3>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Increased Copper Losses:</span>
                              <span>
                                ₹{(results.annualLosses * 0.4).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Increased Iron Losses:</span>
                              <span>
                                ₹{(results.annualLosses * 0.3).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Neutral Conductor Losses:</span>
                              <span>
                                ₹{(results.annualLosses * 0.2).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Other System Losses:</span>
                              <span>
                                ₹{(results.annualLosses * 0.1).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Penalty Calculation</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Based on PSERC regulations for harmonic limits
                          </p>
                          <div className="flex items-center">
                            {results.penalties > 0 ? (
                              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                            )}
                            <span>
                              {results.penalties > 0
                                ? "Your system exceeds permissible harmonic limits"
                                : "Your system is within permissible harmonic limits"}
                            </span>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Equipment Impact</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Harmonics reduce equipment lifespan due to increased heating and insulation stress
                          </p>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>Transformer Life Reduction:</span>
                              <span>{(results.equipmentLifeReduction * 1.2).toFixed(1)}%</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Motor Life Reduction:</span>
                              <span>{(results.equipmentLifeReduction * 0.9).toFixed(1)}%</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Capacitor Bank Life Reduction:</span>
                              <span>{(results.equipmentLifeReduction * 1.5).toFixed(1)}%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Solution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Info className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{results.recommendedSolution}</h3>
                            <p className="text-muted-foreground mt-1">
                              Based on your harmonic profile and system characteristics
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-4">
                          <div>
                            <h4 className="font-medium">Return on Investment</h4>
                            <p className="text-2xl font-bold mt-1">{results.estimatedRoi.toFixed(1)} years</p>
                          </div>

                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Implementation Benefits</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                                <span>Eliminate regulatory penalties</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                                <span>Reduce energy losses by up to 85%</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                                <span>Extend equipment lifespan</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                                <span>Improve power quality and system reliability</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Detailed Report
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8">
              <div className="text-center space-y-4 max-w-md">
                <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Harmonic Cost Analysis</h3>
                <p className="text-muted-foreground">
                  Enter your system parameters to calculate the financial impact of harmonics and get personalized
                  recommendations.
                </p>
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h4 className="font-medium mb-2">What You&apos;ll Get:</h4>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span>Estimated annual losses due to harmonics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span>Potential regulatory penalties under PSERC rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span>Equipment life reduction analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span>Recommendations for best-fit harmonic filters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span>Downloadable report for management review</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

