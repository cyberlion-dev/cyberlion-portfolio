// CyberLion Web Solutions - Family Christmas Drawing (Easter Egg)
// Hidden page for family gift exchange tracking

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Gift,
  Shuffle,
  History,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
  Copy,
  Check,
  LogOut
} from "lucide-react";
import { getApiUrl } from "./api-config";

interface Assignment {
  giver: string;
  receiver: string;
}

interface YearDrawing {
  year: number;
  assignments: Assignment[];
  generatedDate: string;
  locked: boolean;
}

interface DrawingHistory {
  years: YearDrawing[];
}

const FAMILIES = [
  "Nicole & Kevin",
  "Nathan & Alicia",
  "Brittany & Jose",
  "Jordan & Emily",
  "Chris & Stephanie",
  "Zach & Jess"
];

const PASSWORD = "cyberlion2025"; // Simple password for family access
const ADMIN_PASSWORD = "cyberlionadmin2025"; // Admin password for generate/lock/delete
const USE_API = true; // Set to false to use localStorage (for testing)
const AUTH_STORAGE_KEY = "christmas-drawing-auth";
const AUTH_EXPIRY_DAYS = 30; // Keep logged in for 30 days

export default function ChristmasDrawing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [history, setHistory] = useState<DrawingHistory>({ years: [] });
  const [currentYear] = useState(new Date().getFullYear());
  const [showHistory, setShowHistory] = useState(false);
  const [revealedAssignments, setRevealedAssignments] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");
  const [copiedAssignment, setCopiedAssignment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing auth token on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const { isAdmin: storedIsAdmin, timestamp } = JSON.parse(storedAuth);
        const now = new Date().getTime();
        const expiryTime = AUTH_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds

        // Check if token is still valid
        if (now - timestamp < expiryTime) {
          setIsAuthenticated(true);
          setIsAdmin(storedIsAdmin);
        } else {
          // Token expired, clear it
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch {
        // Invalid token, clear it
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  // Load history from API or localStorage on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated]);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      if (USE_API) {
        // Load from API
        const response = await fetch(getApiUrl('drawing'));
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setHistory(data);
      } else {
        // Load from localStorage (fallback for testing)
        const stored = localStorage.getItem("christmas-drawing-history");
        if (stored) {
          const parsed = JSON.parse(stored);
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load history:", e);
      setError("Failed to load drawing history. Check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save history to API or localStorage
  const saveHistory = async (newHistory: DrawingHistory) => {
    setHistory(newHistory);

    try {
      if (USE_API) {
        // Save to API
        const response = await fetch(getApiUrl('drawing'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newHistory),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
      } else {
        // Save to localStorage (fallback for testing)
        localStorage.setItem("christmas-drawing-history", JSON.stringify(newHistory));
      }
    } catch (e) {
      console.error("Failed to save history:", e);
      setError("Failed to save drawing. Check your internet connection.");
    }
  };

  const handleLogin = () => {
    let adminStatus = false;

    if (passwordInput === ADMIN_PASSWORD) {
      adminStatus = true;
    } else if (passwordInput === PASSWORD) {
      adminStatus = false;
    } else {
      setError("Incorrect password. Try again!");
      setPasswordInput("");
      return;
    }

    // Store auth token in localStorage
    const authToken = {
      isAdmin: adminStatus,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authToken));

    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setRevealedAssignments(new Set());
  };

  // Generate a valid assignment that doesn't repeat recent years
  const generateDrawing = (): Assignment[] | null => {
    const maxAttempts = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const shuffled = [...FAMILIES].sort(() => Math.random() - 0.5);
      const assignments: Assignment[] = [];

      // Create circular assignment (each gives to next in shuffled list)
      for (let i = 0; i < shuffled.length; i++) {
        const giver = shuffled[i];
        const receiver = shuffled[(i + 1) % shuffled.length];

        // No self-assignment
        if (giver === receiver) continue;

        assignments.push({ giver, receiver });
      }

      // Check if valid (no self-assignments)
      if (assignments.length !== FAMILIES.length) continue;

      // Check against recent history (avoid duplicates from last 2 years)
      const recentYears = history.years
        .sort((a, b) => b.year - a.year)
        .slice(0, 2);

      const isDuplicate = recentYears.some(yearData =>
        yearData.assignments.some(oldAssignment =>
          assignments.some(newAssignment =>
            newAssignment.giver === oldAssignment.giver &&
            newAssignment.receiver === oldAssignment.receiver
          )
        )
      );

      if (!isDuplicate) {
        return assignments;
      }
    }

    return null; // Failed to generate valid drawing
  };

  const handleGenerateDrawing = async () => {
    const existingYear = history.years.find(y => y.year === currentYear);

    if (existingYear) {
      setError(`A drawing for ${currentYear} already exists! Delete it first if you want to regenerate.`);
      return;
    }

    const assignments = generateDrawing();

    if (!assignments) {
      setError("Failed to generate a valid drawing. Try again or contact admin.");
      return;
    }

    const newYearDrawing: YearDrawing = {
      year: currentYear,
      assignments,
      generatedDate: new Date().toISOString(),
      locked: false,
    };

    const newHistory = {
      years: [...history.years, newYearDrawing].sort((a, b) => b.year - a.year)
    };

    await saveHistory(newHistory);
    setError("");
    setRevealedAssignments(new Set());
  };

  const toggleLock = async (year: number) => {
    const newHistory = {
      years: history.years.map(y =>
        y.year === year ? { ...y, locked: !y.locked } : y
      )
    };
    await saveHistory(newHistory);
  };

  const deleteYear = async (year: number) => {
    if (confirm(`Are you sure you want to delete the drawing for ${year}?`)) {
      const newHistory = {
        years: history.years.filter(y => y.year !== year)
      };
      await saveHistory(newHistory);
      setError("");
    }
  };

  const toggleReveal = (giver: string) => {
    const newRevealed = new Set(revealedAssignments);
    if (newRevealed.has(giver)) {
      newRevealed.delete(giver);
    } else {
      newRevealed.add(giver);
    }
    setRevealedAssignments(newRevealed);
  };

  const copyAssignmentText = async (giver: string, receiver: string) => {
    const message = `🎄 Hey ${giver}! 🎅

Your ${currentYear} Christmas gift assignment is:

🎁 You're giving to: ${receiver}

Remember:
- Keep it secret! 🤫
- Budget: $50 (or whatever you agreed)
- Gift exchange: [Add your date]

Merry Christmas! 🎄`;

    try {
      await navigator.clipboard.writeText(message);
      setCopiedAssignment(giver);
      setTimeout(() => setCopiedAssignment(null), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const copyAllAssignments = async () => {
    if (!currentYearDrawing) return;

    const allMessages = currentYearDrawing.assignments.map(a =>
      `${a.giver} → ${a.receiver}`
    ).join('\n');

    const fullMessage = `🎄 ${currentYear} Christmas Drawing Results 🎅\n\n${allMessages}\n\nMerry Christmas! 🎄`;

    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopiedAssignment('all');
      setTimeout(() => setCopiedAssignment(null), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const currentYearDrawing = history.years.find(y => y.year === currentYear);
  const pastYears = history.years.filter(y => y.year < currentYear);

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950/20 via-green-950/20 to-background p-4">
        <Card className="w-full max-w-md border-2 border-primary/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center">
                <Gift className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-red-500 via-green-500 to-red-500 bg-clip-text text-transparent">
                Family Christmas Drawing
              </span>
            </CardTitle>
            <CardDescription>
              🎄 Secret page for the Boyce family gift exchange 🎅
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter Family Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Password..."
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <Button onClick={handleLogin} className="w-full" size="lg">
              <Unlock className="w-4 h-4 mr-2" />
              Access Drawing
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Hint: Ask Jordan for the password 😉
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isAuthenticated && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950/10 via-green-950/10 to-background p-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center mb-6 animate-pulse">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-lg font-semibold text-muted-foreground">Loading Christmas drawings...</p>
            <p className="text-sm text-muted-foreground mt-2">Fetching data from the cloud 🎄</p>
          </div>
        </div>
      </div>
    );
  }

  // Main authenticated view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950/10 via-green-950/10 to-background p-4 py-20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-green-500/20 border border-red-500/30">
              <Gift className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold">Family Only</span>
              {isAdmin && (
                <Badge variant="default" className="ml-2">Admin</Badge>
              )}
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-red-500 via-green-500 to-red-500 bg-clip-text text-transparent">
              🎄 Boyce Family Christmas Drawing 🎅
            </span>
          </h1>
          <p className="text-muted-foreground">
            Tracking our annual gift exchange since {history.years[history.years.length - 1]?.year || currentYear}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-2 border-orange-500/50 bg-orange-500/10">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Current Year Drawing */}
        <Card className="mb-6 border-2 border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  {currentYear} Drawing
                </CardTitle>
                <CardDescription>
                  {currentYearDrawing
                    ? `Generated on ${new Date(currentYearDrawing.generatedDate).toLocaleDateString()}`
                    : "Not yet generated"
                  }
                </CardDescription>
              </div>
              {currentYearDrawing && isAdmin && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleLock(currentYear)}
                  >
                    {currentYearDrawing.locked ? (
                      <><Lock className="w-4 h-4 mr-2" /> Locked</>
                    ) : (
                      <><Unlock className="w-4 h-4 mr-2" /> Unlocked</>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteYear(currentYear)}
                    disabled={currentYearDrawing.locked}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentYearDrawing ? (
              <div className="space-y-3">
                {currentYearDrawing.assignments.map((assignment, idx) => (
                  <Card key={idx} className="p-4 bg-card/50 border-2 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{assignment.giver}</div>
                          {revealedAssignments.has(assignment.giver) ? (
                            <div className="text-sm text-muted-foreground">
                              → gives to <span className="text-primary font-semibold">{assignment.receiver}</span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              → gives to <span className="text-orange-500">****** (hidden)</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleReveal(assignment.giver)}
                        >
                          {revealedAssignments.has(assignment.giver) ? (
                            <><EyeOff className="w-4 h-4 mr-2" /> Hide</>
                          ) : (
                            <><Eye className="w-4 h-4 mr-2" /> Reveal</>
                          )}
                        </Button>
                        {isAdmin && revealedAssignments.has(assignment.giver) && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => copyAssignmentText(assignment.giver, assignment.receiver)}
                          >
                            {copiedAssignment === assignment.giver ? (
                              <><Check className="w-4 h-4 mr-2" /> Copied!</>
                            ) : (
                              <><Copy className="w-4 h-4 mr-2" /> Copy Text</>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Copy All Assignments */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Copy className="w-5 h-5 text-blue-500" />
                        Copy Assignments
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isAdmin ? "Copy all assignments to send to everyone, or copy individual texts above" : "Copy the full list of assignments"}
                      </p>
                    </div>
                    <Button
                      onClick={copyAllAssignments}
                      variant="default"
                    >
                      {copiedAssignment === 'all' ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy All
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-6">
                  No drawing has been generated for {currentYear} yet.
                </p>
                {isAdmin ? (
                  <Button onClick={handleGenerateDrawing} size="lg">
                    <Shuffle className="w-5 h-5 mr-2" />
                    Generate {currentYear} Drawing
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Only the admin can generate the drawing. Ask Jordan!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Section */}
        {pastYears.length > 0 && (
          <Card className="border-2 border-border">
            <CardHeader>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center justify-between w-full text-left"
              >
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Past Years ({pastYears.length})
                  </CardTitle>
                  <CardDescription>View previous drawings</CardDescription>
                </div>
                {showHistory ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </CardHeader>
            {showHistory && (
              <CardContent>
                <div className="space-y-4">
                  {pastYears.map((yearData) => (
                    <Card key={yearData.year} className="p-4 bg-muted/30 border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{yearData.year}</Badge>
                          {yearData.locked && (
                            <Badge variant="secondary" className="gap-1">
                              <Lock className="w-3 h-3" />
                              Locked
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteYear(yearData.year)}
                          disabled={yearData.locked}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        {yearData.assignments.map((assignment, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium">{assignment.giver}</span>
                            <span>→</span>
                            <span className="text-foreground">{assignment.receiver}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border-2 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>How it works:</strong> Each family is randomly assigned another family to give a gift to.
              The algorithm ensures no family gets themselves, and avoids repeating assignments from the past 2 years.
              Click &quot;Reveal&quot; to see who each family gives to. Lock the year when finalized to prevent accidental deletion.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
