import { Separator } from "@/components/ui/separator"
import { GeneralForm } from "./general-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your general settings here.
        </p>
      </div>
      <Separator />
      <GeneralForm />
    </div>
  )
}