import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  )
}

export default page