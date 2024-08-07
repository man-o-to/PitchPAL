import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">Update your profile information and preferences.</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}