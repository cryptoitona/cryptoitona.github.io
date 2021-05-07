import Layout from "~/components/Layout";
import { Fragment, ReactNode } from "react";
import { ChartPieIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { DonateAnnounce } from "~/components/Donation";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const profile = {
  coverUrl:
    "https://pbs.twimg.com/profile_banners/1387997386182520833/1620143450/1500x500",
  iconUrl:
    "https://pbs.twimg.com/profile_images/1388439229244477445/N7swBt6B_400x400.jpg",
  twitter: "https://twitter.com/cryptoitona",
  github: "https://github.com/cryptoitona",
  name: "Itona Shinozaki",
  description:
    "Hi 👋\nI'm cryptoitona. I have been interested in cryptocurrency since 2021-05, so I started to invest my assets in cryptocurrency while studying.",
};

const IndexPage = () => (
  <Layout title="Home | cryptoitona homepage">
    <article className="flex items-center flex-col md:w-auto">
      <div className="w-screen h-full md:w-2/3 md:border-l md:border-r md:border-b pb-8">
        <div className="">
          <img
            className="h-52 w-full object-cover lg:h-72"
            src={profile.coverUrl}
            alt=""
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="-mt-12 md:-mt-16 md:flex md:items-end md:space-x-5">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white md:h-32 md:w-32"
              src={profile.iconUrl}
              alt="icon"
            />
            <div className="mt-6 md:flex-1 md:min-w-0 md:flex md:items-center md:justify-end md:space-x-6 md:pb-1">
              <div className="mt-6 flex flex-col justify-stretch space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <a
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  href={profile.twitter}
                >
                  <TwitterIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Twitter</span>
                </a>
                <a
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  href={profile.github}
                >
                  <GitHubIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {profile.name}
            </h1>
          </div>
        </div>

        <Section title="About">
          {profile.description.split("\n").map((str, index) => (
            <Fragment key={index}>
              <div>{str}</div>
            </Fragment>
          ))}
          <DonateAnnounce />
        </Section>

        <Section title="Tools">
          <Tools />
        </Section>
      </div>
    </article>
  </Layout>
);

export default IndexPage;

interface TwitterIconProps {
  className: string;
}
const TwitterIcon = (props: TwitterIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      fill="currentColor"
      className={classNames(props.className, "text-white opacity-40")}
    >
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
    </svg>
  );
};

interface GitHubIconProps {
  className: string;
}

const GitHubIcon = (props: GitHubIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={classNames(props.className)}
    >
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      ></path>
    </svg>
  );
};

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = (props: SectionProps) => {
  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="text-md font-medium text-gray-500">{props.title}</div>
      <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
        {props.children}
      </div>
    </div>
  );
};

const toolItems = [
  {
    name: "Remove Liquidity Maker",
    description:
      "Create a Remove Liquidity URL for pancakeswap based on the token contract addresses you specified",
    icon: ChartPieIcon,
    iconBackground: "bg-blue-500",
    addedAt: "2020-05-05",
    href: "/tools/remove_liquidity_maker",
  },
];

const Tools = () => {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {toolItems
          .sort((a, b) => {
            return (
              new Date(a.addedAt).getDate() - new Date(b.addedAt).getDate()
            );
          })
          .map((v) => (
            <li key={v.name} className="md:py-4 md:px-2 hover:bg-gray-100">
              <Link href={v.href}>
                <a>
                  <div className="flex space-x-3">
                    <span
                      className={classNames(
                        v.iconBackground,
                        "h-8 w-8 rounded-full flex items-center justify-center"
                      )}
                    >
                      <v.icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{v.name}</h3>
                        <p className="hidden md:block text-sm text-gray-500">
                          {v.addedAt}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{v.description}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
