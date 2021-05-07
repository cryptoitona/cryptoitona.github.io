import Layout from "~/components/Layout";
import useSWR from "swr";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, PlusIcon } from "@heroicons/react/solid";
import { DonateAnnounce } from "~/components/Donation";

interface TokenApi {
  name: string;
  symbol: string;
  price: string;
  price_BNB: string;
}

// API Price State
interface TokenApiList {
  /* eslint-disable camelcase */
  [key: string]: TokenApi;
}

interface TokenApiResponse {
  /* eslint-disable camelcase */
  updated_at: string;
  data: TokenApiList;
}

const fetcher = (url: string): Promise<TokenApiResponse> =>
  fetch(url).then((res) => res.json());

interface PageState {
  tokenList?: TokenApiList;
  error?: any;
  contractAddrA: string;
  contractAddrB: string;
  valid: boolean;
}

const regexp = new RegExp("^(0x[0-9a-fA-F]{40}|BNB)$", "s");

const IndexPage = () => {
  const { data, error } = useSWR<TokenApiResponse, any>(
    "https://api.pancakeswap.info/api/v2/tokens",
    fetcher
  );
  const [state, setState] = useState<PageState>({
    tokenList: data?.data,
    error: error,
    contractAddrA: "",
    contractAddrB: "",
    valid: false,
  });

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        tokenList: data?.data,
        error: error,
      };
    });
  }, [data, error]);

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        valid:
          regexp.test(prev.contractAddrA) && regexp.test(prev.contractAddrB),
      };
    });
  }, [state.contractAddrA, state.contractAddrB]);

  if (state.error) return <div>failed to load</div>;
  if (!state.tokenList) return <div>loading...</div>;

  const tokenList = state.tokenList as TokenApiList;

  return (
    <Layout title="Remove Liquidity Maker | cryptoitona homepage">
      <article className="h-screen bg-gray-100 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Remove Liquidity Maker
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Please input 2 token contract addresses or “BNB”. They are used in
              Remove Liquidity page on the pancakeswap.
            </p>
            <p className="mt-4 font-bold text-lg leading-6 text-gray-800">
              Please use this tool at your own risk.
            </p>

            <div className="my-4">
              <DonateAnnounce />
            </div>
          </div>
          <div className="mt-12">
            <div className="flex flex-col space-y-4">
              <div>
                <div className="mt-1 relative rounded-md">
                  <div className="flex items-center">
                    <SelectBox
                      tokenList={tokenList}
                      selectedAddr={state.contractAddrA}
                      setSelectedAddr={(address) => {
                        setState((prev) => {
                          return {
                            ...prev,
                            contractAddrA: address,
                          };
                        });
                      }}
                    />
                    <input
                      type="text"
                      name="contract_address_a"
                      id="contract_address_a"
                      autoComplete="contract_address"
                      className="pl-4 py-3 w-full border-l focus:outline-none rounded-r-md sm:text-sm"
                      placeholder="Input contract address or BNB here"
                      value={state.contractAddrA}
                      onChange={(e) => {
                        const address = e.target.value;
                        if (address in tokenList) {
                          setState((prev) => {
                            return {
                              ...prev,
                              contractAddrA: address,
                            };
                          });
                        } else {
                          setState((prev) => {
                            return {
                              ...prev,
                              contractAddrA: address,
                            };
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="bg-green-500 mx-auto h-8 w-8 rounded-full flex items-center justify-center">
                  <PlusIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
              </div>

              <div>
                <div className="mt-1 relative rounded-md">
                  <div className="flex items-center">
                    <SelectBox
                      tokenList={tokenList}
                      selectedAddr={state.contractAddrB}
                      setSelectedAddr={(address) => {
                        setState((prev) => {
                          return {
                            ...prev,
                            contractAddrB: address,
                          };
                        });
                      }}
                    />
                    <input
                      type="text"
                      name="contract_address_b"
                      id="contract_address_b"
                      autoComplete="contract_address"
                      className="pl-4 py-3 w-full border-l focus:outline-none rounded-r-md sm:text-sm"
                      placeholder="Input contract address or BNB here"
                      value={state.contractAddrB}
                      onChange={(e) => {
                        const address = e.target.value;
                        if (address in tokenList) {
                          setState((prev) => {
                            return {
                              ...prev,
                              contractAddrB: address,
                            };
                          });
                        } else {
                          setState((prev) => {
                            return {
                              ...prev,
                              contractAddrB: address,
                            };
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="mt-12 mx-auto flex justify-center py-3 px-4 shadow-sm text-md font-medium rounded-md text-white bg-blue-500 disabled:opacity-50 hover:bg-blue-600 focus:outline-none"
                  disabled={!state.valid}
                  onClick={() => {
                    const url = `https://exchange.pancakeswap.finance/#/remove/${state.contractAddrA}/${state.contractAddrB}`;
                    window.location.href = url;
                  }}
                >
                  Go to Pancakeswap
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SelectBoxProps {
  tokenList: TokenApiList;
  selectedAddr: string;
  setSelectedAddr: (v: string) => void;
}

const SelectBox = ({
  tokenList,
  selectedAddr,
  setSelectedAddr,
}: SelectBoxProps) => {
  return (
    <Listbox value={selectedAddr} onChange={setSelectedAddr}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="bg-blue-500 font-semibold text-white relative w-32 rounded-l-md pl-4 pr-8 py-3 text-left cursor-default focus:outline-none sm:text-sm">
              <span className="block truncate">
                {((): string => {
                  if (selectedAddr === "BNB") return "BNB";
                  if (selectedAddr in tokenList)
                    return tokenList[selectedAddr].symbol;
                  return "UNKNOWN";
                })()}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-200"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {[...new Set(["BNB", ...Object.keys(tokenList ?? {}), ""])].map(
                  (address) => (
                    <Listbox.Option
                      key={address}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-blue-500" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={address}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {((): string => {
                              if (address === "BNB") return "BNB";
                              if (address in tokenList)
                                return tokenList[address].symbol;
                              return "UNKNOWN";
                            })()}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  )
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default IndexPage;
