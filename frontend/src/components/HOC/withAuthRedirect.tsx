import { useRouter } from "next/router";
import { useAuth } from "@/providers/Auth";
import { ComponentType, JSX } from "react";

function DefaultLoadingFallback() {
  return <p>Loading...</p>;
}

type WithAuthRedirectParams = {
  WrappedComponent: ComponentType;
  LoadingComponent?: () => JSX.Element;
  expectedAuth: boolean;
  location: string;
};
export default function withAuthRedirect<P extends JSX.IntrinsicAttributes>({
  WrappedComponent,
  LoadingComponent = DefaultLoadingFallback,
  expectedAuth,
  location,
}: WithAuthRedirectParams) {
  const WithAuthRedirectWrapper = (props: P) => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
