import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { useGoogleLogin } from "@react-oauth/google";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent(): React.JSX.Element {
  const handleGoogleLogin = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/adwords",
    onSuccess: async ({ access_token }) => {
      try {
        const { data } = await axios.get(
          "https://localservices.googleapis.com/v1/detailedLeadReports:search",
          {
            params: {
              manager_customer_id: "",
            },
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (err) => {
      console.log("Login Failed");
      console.error(err);
    },
  });

  return (
    <div>
      <Card className="max-w-xl w-full mx-auto">
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleGoogleLogin()}
            className="w-full"
            type="button"
            variant="outline"
          >
            Sign in with google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
