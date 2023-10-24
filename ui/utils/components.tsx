import type { FC, PropsWithChildren } from "react";

/** Creates a new component that wraps the given `Component` with the `WrapperComponent` */
export const withWrapper = <WP, P>(
  WrapperComponent: FC<PropsWithChildren<WP>>,
  Component: FC<P>
): FC<
  unknown extends (WP & P) ? {} : (WP & P)
> => (props) => <WrapperComponent
  {...props as any}
  children={<Component {...props as any} />}
/>
