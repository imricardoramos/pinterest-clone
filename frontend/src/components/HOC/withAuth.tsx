import { ComponentType } from "react";
import withAuthRedirect from "./withAuthRedirect";

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth(
  WrappedComponent: ComponentType,
  location = "/login",
) {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}
