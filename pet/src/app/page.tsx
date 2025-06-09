"use client"

import { useState } from "react"
import { Button } from "@/component/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/component/ui/avatar"
import { Progress } from "@/component/ui/progress"
import { Badge } from "@/component/ui/badge"
import {
  Heart,
  MapPin,
  Clock,
  Calendar,
  Play,
  Pause,
  Square,
  Footprints,
  Trophy,
  Camera,
  Plus,
  Home,
  BarChart3,
  Settings,
  History,
  Bell,
  Users,
  Droplets,
  Zap,
} from "lucide-react"

type Screen = "dashboard" | "record" | "history" | "stats" | "pets" | "settings"

export default function PetWalkApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [isWalking, setIsWalking] = useState(false)
  const [walkTime, setWalkTime] = useState(0)
  const [selectedPet, setSelectedPet] = useState(0)

  const pets = [
    {
      id: 1,
      name: "ポチ",
      type: "柴犬",
      age: "3歳",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-orange-100",
      todayWalks: 2,
      totalTime: 45,
    },
    {
      id: 2,
      name: "ミケ",
      type: "三毛猫",
      age: "2歳",
      avatar: "/placeholder.svg?height=40&width=40",
      color: "bg-pink-100",
      todayWalks: 1,
      totalTime: 20,
    },
  ]

  const recentWalks = [
    {
      id: 1,
      pet: "ポチ",
      duration: "25分",
      distance: "1.2km",
      time: "今日 14:30",
      mood: "😊",
      toilet: { pee: 2, poop: 1 },
      photos: 3,
    },
    {
      id: 2,
      pet: "ミケ",
      duration: "15分",
      distance: "0.8km",
      time: "今日 10:15",
      mood: "😸",
      toilet: { pee: 1, poop: 0 },
      photos: 1,
    },
    {
      id: 3,
      pet: "ポチ",
      duration: "30分",
      distance: "1.5km",
      time: "昨日 16:00",
      mood: "😄",
      toilet: { pee: 3, poop: 1 },
      photos: 5,
    },
  ]

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-pink-100 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {[
            { id: "dashboard", icon: Home, label: "ホーム" },
            { id: "history", icon: History, label: "履歴" },
            { id: "record", icon: Plus, label: "記録", primary: true },
            { id: "stats", icon: BarChart3, label: "統計" },
            { id: "settings", icon: Settings, label: "設定" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id as Screen)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${currentScreen === item.id ? "text-pink-500 bg-pink-50" : "text-gray-500 hover:text-gray-700"
                } ${item.primary ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-3 -mt-6 shadow-lg" : ""}`}
            >
              <item.icon className={`w-5 h-5 ${item.primary ? "w-6 h-6" : ""}`} />
              <span className={`text-xs ${item.primary ? "hidden" : ""}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )

  const DashboardScreen = () => (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Footprints className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">おさんぽ手帳</h1>
                <p className="text-sm text-gray-500">今日も一緒にお散歩しよう！</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Users className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Pet Selection */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              今日のお散歩仲間
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pets.map((pet, index) => (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPet(index)}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer ${selectedPet === index
                    ? "bg-gradient-to-r from-pink-200 to-purple-200 ring-2 ring-pink-300"
                    : "bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-150 hover:to-purple-150"
                    }`}
                >
                  <Avatar className="w-14 h-14 border-2 border-white">
                    <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                    <AvatarFallback className={pet.color}>{pet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800">{pet.name}</p>
                      {selectedPet === index && (
                        <Badge variant="secondary" className="text-xs">
                          選択中
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {pet.type} • {pet.age}
                    </p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                      <span>今日: {pet.todayWalks}回</span>
                      <span>{pet.totalTime}分</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">45分</p>
              <p className="text-xs text-gray-600">今日の合計</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-100 to-emerald-100">
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">2.8km</p>
              <p className="text-xs text-gray-600">今日の距離</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-100 to-orange-100">
            <CardContent className="p-4 text-center">
              <Footprints className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">3回</p>
              <p className="text-xs text-gray-600">今日の散歩</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Goal */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              今日の目標
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">散歩時間</span>
                <span className="text-sm font-semibold text-gray-800">45分 / 60分</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">散歩回数</span>
                <span className="text-sm font-semibold text-gray-800">3回 / 4回</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Walks */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              最近のお散歩記録
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("history")}
              className="text-purple-500 hover:text-purple-600"
            >
              すべて見る
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentWalks.slice(0, 3).map((walk) => (
              <div
                key={walk.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{walk.mood}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{walk.pet}とお散歩</p>
                    <p className="text-sm text-gray-600">{walk.time}</p>
                    <div className="flex gap-2 mt-1">
                      {walk.toilet.pee > 0 && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          <Droplets className="w-3 h-3 mr-1" />
                          {walk.toilet.pee}
                        </Badge>
                      )}
                      {walk.toilet.poop > 0 && (
                        <Badge variant="outline" className="text-xs bg-brown-50">
                          💩 {walk.toilet.poop}
                        </Badge>
                      )}
                      {walk.photos > 0 && (
                        <Badge variant="outline" className="text-xs bg-pink-50">
                          <Camera className="w-3 h-3 mr-1" />
                          {walk.photos}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{walk.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{walk.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )

  const RecordScreen = () => (
    <div className="space-y-6 pb-20">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">散歩を記録</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Walk Timer */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-100 to-cyan-100">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-gray-800">
                {Math.floor(walkTime / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(walkTime % 60).toString().padStart(2, "0")}
              </div>
              <p className="text-gray-600">お散歩時間</p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setIsWalking(!isWalking)}
                  className={`rounded-full w-20 h-20 ${isWalking ? "bg-orange-400 hover:bg-orange-500" : "bg-green-400 hover:bg-green-500"
                    }`}
                >
                  {isWalking ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full w-20 h-20 border-2 border-gray-300 hover:border-gray-400"
                  onClick={() => {
                    setIsWalking(false)
                    setWalkTime(0)
                  }}
                >
                  <Square className="w-8 h-8" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex flex-col items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>0.0km</span>
                  <span className="text-xs">距離</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Camera className="w-5 h-5" />
                  <span>0枚</span>
                  <span className="text-xs">写真</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Droplets className="w-5 h-5" />
                  <span>0回</span>
                  <span className="text-xs">トイレ</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">写真を撮る</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">トイレ記録</p>
            </CardContent>
          </Card>
        </div>

        {/* Toilet Record */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">トイレ記録</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-blue-50">
                <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">おしっこ</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    -
                  </Button>
                  <span className="text-xl font-bold w-8">0</span>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    +
                  </Button>
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50">
                <div className="text-3xl mb-2">💩</div>
                <p className="font-semibold text-gray-800">うんち</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    -
                  </Button>
                  <span className="text-xl font-bold w-8">0</span>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    +
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )

  const HistoryScreen = () => (
    <div className="space-y-6 pb-20">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">散歩履歴</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-4">
        {recentWalks.map((walk) => (
          <Card key={walk.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{walk.mood}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{walk.pet}とお散歩</p>
                    <p className="text-sm text-gray-600">{walk.time}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {walk.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {walk.distance}
                      </Badge>
                      {walk.toilet.pee > 0 && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          <Droplets className="w-3 h-3 mr-1" />
                          {walk.toilet.pee}
                        </Badge>
                      )}
                      {walk.toilet.poop > 0 && (
                        <Badge variant="outline" className="text-xs bg-amber-50">
                          💩 {walk.toilet.poop}
                        </Badge>
                      )}
                      {walk.photos > 0 && (
                        <Badge variant="outline" className="text-xs bg-pink-50">
                          <Camera className="w-3 h-3 mr-1" />
                          {walk.photos}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  詳細
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )

  const StatsScreen = () => (
    <div className="space-y-6 pb-20">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">統計</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Weekly Stats */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">今週の統計</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-blue-50">
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">4.5時間</p>
                <p className="text-xs text-gray-600">合計時間</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50">
                <MapPin className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">12.3km</p>
                <p className="text-xs text-gray-600">合計距離</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50">
                <Footprints className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-800">18回</p>
                <p className="text-xs text-gray-600">散歩回数</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pet Stats */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">ペット別統計</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pets.map((pet) => (
              <div key={pet.id} className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                    <AvatarFallback className={pet.color}>{pet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">{pet.name}</p>
                    <p className="text-sm text-gray-600">{pet.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{pet.todayWalks}回</p>
                    <p className="text-gray-600">今日</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{pet.totalTime}分</p>
                    <p className="text-gray-600">合計時間</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-800">2.1km</p>
                    <p className="text-gray-600">平均距離</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )

  const SettingsScreen = () => (
    <div className="space-y-6 pb-20">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">設定</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-4">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">通知設定</span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">家族共有</span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Notion連携</span>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen />
      case "record":
        return <RecordScreen />
      case "history":
        return <HistoryScreen />
      case "stats":
        return <StatsScreen />
      case "settings":
        return <SettingsScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {renderScreen()}
      <Navigation />
    </div>
  )
}
