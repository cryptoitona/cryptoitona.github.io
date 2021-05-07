import { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="divide-y md:divide-y-0">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className="min-w-screen min-h-screen">{children}</main>
    <footer className="text-center text-gray-500 text-sm -mt-14 py-4">
      <div>
        Copyright &copy;{" "}
        <Link href="/">
          <a className="underline">cryptoitona</a>
        </Link>{" "}
        - {new Date().getFullYear()}
      </div>
    </footer>
  </div>
);

export default Layout;
