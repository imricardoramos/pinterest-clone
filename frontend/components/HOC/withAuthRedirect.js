import { useRouter } from 'next/router';
import { useAuth } from '~/providers/Auth';

function DefaultLoadingFallback() {
  return <p>Loading...</p>;
}
export default function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = DefaultLoadingFallback,
  expectedAuth,
  location
}) {
  const WithAuthRedirectWrapper = props => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (typeof window !== 'undefined' && expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
