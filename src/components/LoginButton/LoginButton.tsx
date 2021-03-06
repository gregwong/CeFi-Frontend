import React, { useContext } from "react";
import {
  AppContext,
  AppContextState,
  Web3Type,
  Web3State,
} from "./../../context/app";
import Web3 from "web3";
import Onboard from "bnc-onboard";
import { BlockNativeOptions } from "./../../util/constants";
import PrimaryButton from "../UI/PrimaryButton";
import copy from "../../copy.json";

function truncate(n: number) {
  const length = this.length;
  if (length <= n) {
    return this;
  }
  return `${this.substr(0, n - 1)}...${this.substr(length - 4, length)}`;
}

export async function web3FromProvider(updateAppState: Function) {
  const wallets = [
    { walletName: "metamask", preferred: true },
    {
      walletName: "walletConnect",
      preferred: true,
      infuraKey: process.env.INFURA_API_KEY,
    },
    {
      walletName: "walletLink",
      rpcUrl: process.env.RPC_URL,
      label: "Coinbase",
      appName: "Teller Finance",
      preferred: true,
    },
    { walletName: "fortmatic", preferred: true },
    { walletName: "portis", preferred: true },
  ];
  const onboard = Onboard({
    walletSelect: {
      wallets: wallets,
    },
    ...BlockNativeOptions,
    subscriptions: {
      network: async (network: any) => {
        network =
          typeof network === "number" && !Number.isNaN(network)
            ? network.toString()
            : "unknown";
        updateAppState((st: AppContextState) => {
          const web3State = st.web3State;
          web3State.network = network;
          return { ...st, web3State };
        });
      },
      wallet: async (wallet: any) => {
        const web3 = new Web3(wallet.provider);
        const web3State = {
          type: Web3Type.BlockNative,
          web3,
          onboard,
        } as Web3State;
        updateAppState((st: AppContextState) => {
          return { ...st, web3State };
        });
      },
      address: async (address: any) => {
        updateAppState((st: AppContextState) => {
          const web3State = st.web3State;
          web3State.address = address;
          return { ...st, web3State };
        });
      },
    },
  });
  await onboard.walletSelect();
  await onboard.walletCheck();
}

export const NavLoginButton = () => {
  const { state, updateAppState } = useContext(AppContext);
  const loggedIn = state.web3State?.address || "";
  const { loginButtonTitle } = copy.CTAs;
  return (
    <div className="font-medium login-button menu-button">
      {!loggedIn ? (
        <div
          className="text-lg my-3 my-md-3 mx-4 mx-md-4"
          onClick={() => web3FromProvider(updateAppState)}
        >
          {loginButtonTitle}
        </div>
      ) : (
        <div className="text-lg my-2 my-md-3 mx-3 mx-md-4">
          {truncate.apply(loggedIn, [6])}
        </div>
      )}
    </div>
  );
};

const LoginButton = () => {
  const { updateAppState } = useContext(AppContext);

  return (
    <PrimaryButton
      onClick={() => web3FromProvider(updateAppState)}
      text="Connect wallet"
    />
  );
};
export default LoginButton;
