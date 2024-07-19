import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/>
    </div>
  )
}

export default page