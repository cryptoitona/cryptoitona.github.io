import { DuplicateIcon } from "@heroicons/react/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const DonateAnnounce = () => {
  const address = "0x371A5c7d3234716179e2633cD84A151B00FFa913";
  return (
    <div className="text-left flex flex-col w-full border rounded-md p-4 bg-white text-sm">
      <div>My wallet address</div>
      <div className="flex flex-row items-center justify-between space-x-2 bg-gray-100 rounded-md p-2">
        <div className="flex flex-row space-x-2 truncate">
          <img
            className="w-5 h-5"
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
          />
          <p className="text-gray-600 font-bold truncate">
            <a href={`https://bscscan.com/address/${address}`} target="_blank">
              {address}
            </a>
          </p>
        </div>
        <CopyToClipboard
          text={address}
          onCopy={() => alert(`Copied: ${address}`)}
        >
          <DuplicateIcon className="text-gray-600 hover:text-gray-400 cursor-pointer w-6 h-6" />
        </CopyToClipboard>
      </div>
      <div className="mt-2">
        If you can support me in developing any tools, please donate some BNB
        (Binance Smart Chain) coins 🙇‍♀️
      </div>
    </div>
  );
};
