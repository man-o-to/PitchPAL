import { BillingForm } from "./billing-form"
import { Separator } from "@/components/ui/separator"

export default function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your subscription and payment information.</p>
      </div>
      <Separator />
      <BillingForm />
    </div>
  )
}