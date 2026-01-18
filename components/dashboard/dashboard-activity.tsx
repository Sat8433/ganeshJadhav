"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Activity, Search, FileText, Eye } from 'lucide-react'

interface ActivityEvent {
  id: string
  event_type: string
  page_url: string
  created_at: string
  event_data?: any
}

interface DashboardActivityProps {
  activities: ActivityEvent[]
}

export function DashboardActivity({ activities }: DashboardActivityProps) {
  const getIcon = (eventType: string) => {
    switch (eventType) {
      case "search":
        return Search
      case "view":
        return Eye
      case "verification":
        return FileText
      default:
        return Activity
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and searches</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No activity yet. Start exploring!</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = getIcon(activity.event_type)
                return (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.event_type.charAt(0).toUpperCase() + activity.event_type.slice(1)}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{activity.page_url}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
