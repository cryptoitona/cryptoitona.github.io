import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { withErrorBoundary, FallbackProps } from "react-error-boundary";

const CryptoItona = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

const withNoSSR = (
  Component: ComponentType<AppProps>
): ComponentType<AppProps> => {
  const NoSSRComponent = NoSSRWrap(Component);
  return function WithNoSSR(props: AppProps): JSX.Element {
    return <NoSSRComponent {...props} />;
  };
};

const NoSSRWrap = (
  Component: ComponentType<AppProps>
): ComponentType<AppProps> => {
  const ErrorWrappedComponent = withErrorBoundary(Component, {
    FallbackComponent: ErrorFallback,
    onError(error, info) {
      // See: https://github.com/bvaughn/react-error-boundary#table-of-contents
      // Do something with the error
      // E.g. log to an error logging client here
      console.error("caught an error has caused", error, info);
    },
  });
  return dynamic(() => Promise.resolve(ErrorWrappedComponent), { ssr: false });
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default withNoSSR(CryptoItona);
